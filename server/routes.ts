import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { weatherRequestSchema, cropRecommendationSchema, type WeatherData, type CropRecommendation } from "@shared/schema";
import { GoogleGenAI } from "@google/genai";
import { readFileSync } from "fs";
import { join } from "path";

function getGeminiApiKey(): string {
  try {
    const configPath = join(process.cwd(), "config", "api-publica.json");
    const configData = JSON.parse(readFileSync(configPath, "utf-8"));
    return configData.gemini_api_key;
  } catch (error) {
    return process.env.GEMINI_API_KEY || "";
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/weather", async (req, res) => {
    try {
      const { latitude, longitude } = weatherRequestSchema.parse(req.body);

      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation&daily=temperature_2m_max,precipitation_sum&timezone=Africa/Luanda&forecast_days=7`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data from Open-Meteo");
      }

      const data = await response.json();

      const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
      const forecast = data.daily.time.map((dateStr: string, index: number) => {
        const date = new Date(dateStr);
        const dayName = days[date.getDay()];
        return {
          day: dayName,
          temp: Math.round(data.daily.temperature_2m_max[index]),
          rain: Math.round(data.daily.precipitation_sum[index]),
        };
      });

      const weatherData: WeatherData = {
        location: `${latitude.toFixed(2)}°, ${longitude.toFixed(2)}°`,
        temperature: Math.round(data.current.temperature_2m),
        humidity: Math.round(data.current.relative_humidity_2m),
        windSpeed: Math.round(data.current.wind_speed_10m),
        precipitation: Math.round(data.current.precipitation * 10) / 10,
        forecast,
      };

      res.json(weatherData);
    } catch (error) {
      console.error("Weather API error:", error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to fetch weather data" });
      }
    }
  });

  app.post("/api/crop-recommendations", async (req, res) => {
    try {
      const weatherData = req.body as WeatherData;

      const apiKey = getGeminiApiKey();
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY não configurado");
      }

      const genAI = new GoogleGenAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


      const prompt = `Você é um especialista agrícola em Angola. Analise os seguintes dados meteorológicos e forneça recomendações de culturas para plantar.\n\nDados meteorológicos:\n- Temperatura atual: ${weatherData.temperature}°C\n- Humidade: ${weatherData.humidity}%\n- Velocidade do vento: ${weatherData.windSpeed} km/h\n- Precipitação atual: ${weatherData.precipitation} mm\n- Previsão 7 dias: ${weatherData.forecast.map(d => `${d.day}: ${d.temp}°C, ${d.rain}mm chuva`).join(", ")}\n\nForneça uma resposta em JSON com o seguinte formato:\n{\n  "crops": [\n    {"name": "nome da cultura", "icon": "wheat|corn|carrot", "suitability": "high|medium|low"}\n  ],\n  "advice": "conselho em português para agricultores angolanos (2-3 frases)"\n}\n\nEscolha entre 3-5 culturas típicas de Angola (milho, feijão, mandioca, batata-doce, amendoim, etc.). Use "wheat" para culturas de grãos, "corn" para milho, e "carrot" para tubérculos.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      if (!text) {
        throw new Error("Gemini não retornou resposta");
      }

      const parsedData = JSON.parse(text);
      const recommendation = cropRecommendationSchema.parse(parsedData);
      res.json(recommendation);
    } catch (error) {
      console.error("Crop recommendation error:", error);
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(500).json({ error: "Failed to generate crop recommendations" });
      }
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}

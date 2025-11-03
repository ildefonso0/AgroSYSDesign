import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { weatherRequestSchema, cropRecommendationSchema, type WeatherData, type CropRecommendation } from "@shared/schema";
import { GoogleGenAI } from "@google/genai";

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

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error("GEMINI_API_KEY não configurado");
      }

      const ai = new GoogleGenAI({ apiKey });

      const prompt = `Você é um especialista agrícola em Angola. Analise os seguintes dados meteorológicos e forneça recomendações de culturas para plantar.

Dados meteorológicos:
- Temperatura atual: ${weatherData.temperature}°C
- Humidade: ${weatherData.humidity}%
- Velocidade do vento: ${weatherData.windSpeed} km/h
- Precipitação atual: ${weatherData.precipitation} mm
- Previsão 7 dias: ${weatherData.forecast.map(d => `${d.day}: ${d.temp}°C, ${d.rain}mm chuva`).join(", ")}

Forneça uma resposta em JSON com o seguinte formato:
{
  "crops": [
    {"name": "nome da cultura", "icon": "wheat|corn|carrot", "suitability": "high|medium|low"}
  ],
  "advice": "conselho em português para agricultores angolanos (2-3 frases)"
}

Escolha entre 3-5 culturas típicas de Angola (milho, feijão, mandioca, batata-doce, amendoim, etc.). Use "wheat" para culturas de grãos, "corn" para milho, e "carrot" para tubérculos.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: "object",
            properties: {
              crops: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    name: { type: "string" },
                    icon: { type: "string", enum: ["wheat", "corn", "carrot"] },
                    suitability: { type: "string", enum: ["high", "medium", "low"] },
                  },
                  required: ["name", "icon", "suitability"],
                },
              },
              advice: { type: "string" },
            },
            required: ["crops", "advice"],
          },
        },
        contents: prompt,
      });

      const text = response.text;
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

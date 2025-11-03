import { Thermometer, Droplets, Wind, CloudRain, Calendar } from "lucide-react";
import WeatherCard from "./WeatherCard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  precipitation: number;
  forecast: Array<{
    day: string;
    temp: number;
    rain: number;
  }>;
}

interface WeatherDashboardProps {
  data: WeatherData;
}

export default function WeatherDashboard({ data }: WeatherDashboardProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-heading font-bold text-2xl mb-1" data-testid="text-location-name">
          {data.location}
        </h2>
        <p className="text-sm text-muted-foreground">
          Atualizado agora • Próxima atualização em 30 minutos
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <WeatherCard
          icon={Thermometer}
          label="Temperatura"
          value={data.temperature}
          unit="°C"
          large
        />
        <WeatherCard
          icon={Droplets}
          label="Humidade"
          value={data.humidity}
          unit="%"
        />
        <WeatherCard
          icon={Wind}
          label="Velocidade do Vento"
          value={data.windSpeed}
          unit="km/h"
        />
        <WeatherCard
          icon={CloudRain}
          label="Precipitação"
          value={data.precipitation}
          unit="mm"
        />
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-primary" />
          <h3 className="font-heading font-semibold text-lg">
            Previsão 7 dias
          </h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {data.forecast.map((day, index) => (
            <div
              key={index}
              className="p-3 rounded-md bg-muted/50 text-center hover-elevate"
              data-testid={`forecast-day-${index}`}
            >
              <p className="text-xs font-medium text-muted-foreground mb-2">
                {day.day}
              </p>
              <p className="font-mono text-lg font-semibold mb-1">
                {day.temp}°
              </p>
              <Badge variant="secondary" className="text-xs">
                {day.rain}mm
              </Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Droplets, Wind, CloudRain, Calendar, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { WeatherData, CropRecommendation } from "@shared/schema";

interface WeatherDetailCardProps {
  weatherData: WeatherData;
  cropData?: CropRecommendation | null;
  onClose: () => void;
  isLoading?: boolean;
}

export default function WeatherDetailCard({
  weatherData,
  cropData,
  onClose,
  isLoading = false,
}: WeatherDetailCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <Card
        className="w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </Button>

        <div className="mb-6">
          <h2 className="font-heading font-bold text-2xl mb-1">{weatherData.location}</h2>
          <p className="text-sm text-muted-foreground">
            Atualizado agora • Próxima atualização em 30 minutos
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Temperatura</p>
                <p className="font-mono text-3xl font-bold">{weatherData.temperature}°C</p>
              </div>
              <div className="p-2 rounded-md bg-primary/10">
                <Thermometer className="w-5 h-5 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Humidade</p>
                <p className="font-mono text-3xl font-bold">{weatherData.humidity}%</p>
              </div>
              <div className="p-2 rounded-md bg-primary/10">
                <Droplets className="w-5 h-5 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Vento</p>
                <p className="font-mono text-2xl font-bold">{weatherData.windSpeed} km/h</p>
              </div>
              <div className="p-2 rounded-md bg-primary/10">
                <Wind className="w-5 h-5 text-primary" />
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">Chuva</p>
                <p className="font-mono text-2xl font-bold">{weatherData.precipitation} mm</p>
              </div>
              <div className="p-2 rounded-md bg-primary/10">
                <CloudRain className="w-5 h-5 text-primary" />
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-heading font-semibold text-lg">Previsão 7 dias</h3>
          </div>
          <div className="grid grid-cols-7 gap-3">
            {weatherData.forecast.map((day, index) => (
              <div
                key={index}
                className="p-3 rounded-lg bg-muted/50 text-center"
              >
                <p className="text-xs font-medium text-muted-foreground mb-2">{day.day}</p>
                <p className="font-mono text-lg font-semibold mb-1">{day.temp}°</p>
                <Badge variant="secondary" className="text-xs">{day.rain}mm</Badge>
              </div>
            ))}
          </div>
        </Card>

        {isLoading ? (
          <Card className="p-8 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block"
            >
              <Sparkles className="w-8 h-8 text-primary" />
            </motion.div>
            <p className="mt-4 font-medium">A gerar recomendações com IA...</p>
          </Card>
        ) : cropData ? (
          <Card className="p-6 border-2 border-primary/20">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-md bg-primary/10">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg">Recomendações IA</h3>
                <p className="text-xs text-muted-foreground">Análise Gemini AI</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm leading-relaxed">{cropData.advice}</p>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Culturas recomendadas:</p>
              <div className="flex flex-wrap gap-2">
                {cropData.crops.map((crop, index) => {
                  const iconMap = { wheat: "🌾", corn: "🌽", carrot: "🥕" };
                  const colorMap = {
                    high: "bg-chart-1 text-white",
                    medium: "bg-chart-2 text-white",
                    low: "bg-muted text-muted-foreground",
                  };

                  return (
                    <Badge
                      key={index}
                      className={`px-3 py-2 gap-2 ${colorMap[crop.suitability]}`}
                    >
                      <span>{iconMap[crop.icon]}</span>
                      {crop.name}
                    </Badge>
                  );
                })}
              </div>
            </div>
          </Card>
        ) : null}
      </Card>
    </motion.div>
  );
}

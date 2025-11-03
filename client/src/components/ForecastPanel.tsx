import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Thermometer, Droplets, Wind, CloudRain, Calendar, Sparkles, TrendingUp, TrendingDown } from "lucide-react";
import type { WeatherData, CropRecommendation } from "@shared/schema";

interface ForecastPanelProps {
  weatherData: WeatherData | null;
  cropData: CropRecommendation | null;
  locationName: string;
  isLoading?: boolean;
}

export default function ForecastPanel({
  weatherData,
  cropData,
  locationName,
  isLoading = false,
}: ForecastPanelProps) {
  if (!weatherData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="p-12 text-center max-w-md">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
            <Calendar className="w-10 h-10 text-primary" />
          </div>
          <h3 className="font-heading font-bold text-xl mb-2">
            Sem dados de previsão
          </h3>
          <p className="text-muted-foreground">
            Selecione uma localização no mapa ou use a pesquisa para ver a previsão meteorológica
          </p>
        </Card>
      </div>
    );
  }

  const avgTemp = Math.round(
    weatherData.forecast.reduce((sum, day) => sum + day.temp, 0) / weatherData.forecast.length
  );
  const totalRain = weatherData.forecast.reduce((sum, day) => sum + day.rain, 0);
  const tempTrend = weatherData.forecast[weatherData.forecast.length - 1].temp - weatherData.forecast[0].temp;

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h2 className="font-heading font-bold text-2xl mb-1">{locationName}</h2>
              <p className="text-sm text-muted-foreground">
                Previsão para os próximos 7 dias
              </p>
            </div>
            <Badge variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              7 Dias
            </Badge>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chart-1/20">
                <Thermometer className="w-5 h-5 text-chart-1" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Temp. Média</p>
                <p className="font-mono text-xl font-bold">{avgTemp}°C</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chart-2/20">
                <CloudRain className="w-5 h-5 text-chart-2" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Chuva Total</p>
                <p className="font-mono text-xl font-bold">{totalRain.toFixed(1)}mm</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chart-3/20">
                {tempTrend >= 0 ? (
                  <TrendingUp className="w-5 h-5 text-chart-3" />
                ) : (
                  <TrendingDown className="w-5 h-5 text-chart-3" />
                )}
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Tendência</p>
                <p className="font-mono text-xl font-bold">
                  {tempTrend >= 0 ? '+' : ''}{tempTrend.toFixed(1)}°
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-chart-4/20">
                <Wind className="w-5 h-5 text-chart-4" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Vento Atual</p>
                <p className="font-mono text-xl font-bold">{weatherData.windSpeed} km/h</p>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-6">
            <Calendar className="w-5 h-5 text-primary" />
            <h3 className="font-heading font-semibold text-lg">Previsão Detalhada</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {weatherData.forecast.map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
              >
                <Card className="p-4 text-center hover:shadow-lg transition-shadow bg-gradient-to-br from-card to-muted/20">
                  <p className="text-xs font-medium text-muted-foreground mb-3">
                    {day.day}
                  </p>

                  <div className="mb-3">
                    <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                      {day.rain > 5 ? (
                        <CloudRain className="w-6 h-6 text-chart-2" />
                      ) : (
                        <Thermometer className="w-6 h-6 text-chart-1" />
                      )}
                    </div>
                  </div>

                  <p className="font-mono text-2xl font-bold mb-1">
                    {day.temp}°
                  </p>

                  <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                    <Droplets className="w-3 h-3" />
                    <span>{day.rain}mm</span>
                  </div>

                  {day.rain > 10 && (
                    <Badge variant="secondary" className="mt-2 text-xs">
                      Chuva
                    </Badge>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {cropData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <Card className="p-6 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded-md bg-primary/10">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg">
                  Recomendações Agrícolas
                </h3>
                <p className="text-xs text-muted-foreground">Análise com IA Gemini</p>
              </div>
            </div>

            <div className="mb-4 p-4 rounded-lg bg-muted/50">
              <p className="text-sm leading-relaxed">{cropData.advice}</p>
            </div>

            <div>
              <p className="text-sm font-medium mb-3">Culturas recomendadas para esta previsão:</p>
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
        </motion.div>
      )}

      {isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center"
        >
          <Card className="p-8 text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="inline-block mb-4"
            >
              <Sparkles className="w-8 h-8 text-primary" />
            </motion.div>
            <p className="font-medium">A carregar dados meteorológicos...</p>
          </Card>
        </motion.div>
      )}
    </div>
  );
}

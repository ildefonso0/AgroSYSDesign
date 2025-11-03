import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Smartphone } from "lucide-react";
import type { WeatherData, CropRecommendation } from "@shared/schema";

interface AnimatedMobilePreviewProps {
  weatherData?: WeatherData | null;
  cropData?: CropRecommendation | null;
  locationName?: string;
}

export default function AnimatedMobilePreview({
  weatherData,
  cropData,
  locationName,
}: AnimatedMobilePreviewProps) {
  const hasData = weatherData && cropData;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 mb-4">
        <Smartphone className="w-5 h-5 text-muted-foreground" />
        <p className="text-sm font-medium text-muted-foreground">
          Visualização Móvel SMS
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="relative mx-auto max-w-[340px] w-full">
          <div className="rounded-[3rem] border-[14px] border-foreground/20 bg-card shadow-2xl overflow-hidden">
            <div className="bg-foreground/5 h-8 flex items-center justify-center">
              <div className="w-32 h-5 bg-foreground/10 rounded-full" />
            </div>

            <div className="p-6 min-h-[600px] flex flex-col">
              <div className="text-center mb-6">
                <p className="text-xs text-muted-foreground mb-1">AgroSYS SMS</p>
                <h4 className="font-heading font-bold text-lg">
                  {locationName || "Selecione uma localização"}
                </h4>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto">
                <AnimatePresence mode="wait">
                  {hasData ? (
                    <motion.div
                      key="data"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="space-y-4"
                    >
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Card className="p-4 bg-primary/5 border-primary/20">
                          <p className="text-xs font-medium text-muted-foreground mb-2">
                            Previsão de Hoje
                          </p>
                          <div className="flex items-baseline gap-2 mb-2">
                            <span className="font-mono text-3xl font-bold">
                              {weatherData.temperature}°C
                            </span>
                          </div>
                          <p className="text-sm">
                            {weatherData.precipitation > 0
                              ? `Chuva prevista: ${weatherData.precipitation}mm`
                              : "Céu limpo, sem chuva prevista"}
                          </p>
                        </Card>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <Card className="p-4">
                          <p className="text-xs font-medium text-muted-foreground mb-2">
                            Culturas ideais
                          </p>
                          <p className="text-sm font-medium mb-3">
                            {cropData.crops
                              .filter((c) => c.suitability === "high")
                              .map((c) => c.name)
                              .join(", ") || "A analisar..."}
                          </p>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {cropData.advice}
                          </p>
                        </Card>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Card className="p-4 bg-muted/30">
                          <p className="text-xs font-medium text-muted-foreground mb-2">
                            Próximos 7 dias
                          </p>
                          <div className="space-y-2">
                            {weatherData.forecast.slice(0, 3).map((day, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between text-sm"
                              >
                                <span className="text-muted-foreground">{day.day}</span>
                                <div className="flex items-center gap-3">
                                  <span className="font-mono font-semibold">{day.temp}°</span>
                                  <span className="text-xs text-muted-foreground">
                                    {day.rain}mm
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </Card>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12"
                    >
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-4xl">📍</span>
                      </div>
                      <p className="text-sm text-muted-foreground px-8">
                        Clique num ponto do mapa para ver a previsão meteorológica e recomendações agrícolas
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="text-center pt-4 border-t mt-4">
                <p className="text-xs text-muted-foreground">
                  Mensagem enviada às 08:00
                </p>
              </div>
            </div>

            <div className="bg-foreground/5 h-12 flex items-center justify-center">
              <div className="w-40 h-1.5 bg-foreground/20 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-4">
        Exemplo de como o agricultor recebe as informações
      </p>
    </div>
  );
}

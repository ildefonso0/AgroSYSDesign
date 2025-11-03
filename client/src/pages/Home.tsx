import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { WeatherData, CropRecommendation as CropRecommendationType } from "@shared/schema";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationSearch from "@/components/LocationSearch";
import WeatherDashboard from "@/components/WeatherDashboard";
import CropRecommendation from "@/components/CropRecommendation";
import MobilePhoneMockup from "@/components/MobilePhoneMockup";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [cropData, setCropData] = useState<CropRecommendationType | null>(null);
  const [lastCoordinates, setLastCoordinates] = useState<{ latitude: number; longitude: number } | null>(null);
  const { toast } = useToast();
  const refreshIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const weatherMutation = useMutation({
    mutationFn: async (params: { latitude: number; longitude: number }) => {
      const response = await apiRequest("POST", "/api/weather", params);
      const data: WeatherData = await response.json();
      return data;
    },
    onSuccess: (data) => {
      setWeatherData(data);
      cropMutation.mutate(data);
    },
    onError: (error) => {
      toast({
        title: "Erro ao obter dados meteorológicos",
        description: error instanceof Error ? error.message : "Ocorreu um erro inesperado",
        variant: "destructive",
      });
    },
  });

  const cropMutation = useMutation({
    mutationFn: async (weather: WeatherData) => {
      const response = await apiRequest("POST", "/api/crop-recommendations", weather);
      const data: CropRecommendationType = await response.json();
      return data;
    },
    onSuccess: (data) => {
      setCropData(data);
    },
    onError: (error) => {
      toast({
        title: "Erro ao gerar recomendações",
        description: error instanceof Error ? error.message : "Ocorreu um erro inesperado",
        variant: "destructive",
      });
    },
  });

  const handleSearch = (location: string, lat?: number, lon?: number) => {
    if (lat !== undefined && lon !== undefined) {
      const coords = { latitude: lat, longitude: lon };
      setLastCoordinates(coords);
      weatherMutation.mutate(coords);
    }
  };

  useEffect(() => {
    if (lastCoordinates && weatherData) {
      if (refreshIntervalRef.current) {
        clearInterval(refreshIntervalRef.current);
      }

      refreshIntervalRef.current = setInterval(() => {
        console.log("Auto-refreshing weather data...");
        weatherMutation.mutate(lastCoordinates);
      }, 30 * 60 * 1000);

      return () => {
        if (refreshIntervalRef.current) {
          clearInterval(refreshIntervalRef.current);
        }
      };
    }
  }, [lastCoordinates, weatherData]);

  const isLoading = weatherMutation.isPending || cropMutation.isPending;
  const hasSearched = weatherData !== null;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          {!hasSearched ? (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                  Previsão meteorológica para Angola
                </h2>
                <p className="text-muted-foreground text-lg">
                  Obtenha dados climáticos em tempo real e recomendações
                  agrícolas baseadas em IA
                </p>
              </div>

              <LocationSearch onSearch={handleSearch} />

              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-md bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">🌤️</span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">
                    Dados em tempo real
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Previsões meteorológicas atualizadas a cada 30 minutos
                  </p>
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-md bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">🤖</span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">
                    Análise com IA
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Recomendações agrícolas geradas por Gemini AI
                  </p>
                </div>
                <div className="p-6">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-md bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg mb-2">
                    Acesso móvel
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Informações acessíveis via SMS para todos os agricultores
                  </p>
                </div>
              </div>
            </div>
          ) : isLoading ? (
            <div className="max-w-4xl mx-auto">
              <LocationSearch onSearch={handleSearch} />
              <Card className="p-12 mt-6">
                <div className="flex flex-col items-center justify-center gap-4">
                  <Loader2 className="w-12 h-12 animate-spin text-primary" />
                  <p className="text-lg font-medium">
                    {weatherMutation.isPending
                      ? "A obter dados meteorológicos..."
                      : "A gerar recomendações com IA..."}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Por favor, aguarde um momento
                  </p>
                </div>
              </Card>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <LocationSearch onSearch={handleSearch} />
                <WeatherDashboard data={weatherData!} />
                {cropData && <CropRecommendation {...cropData} />}
              </div>

              <div className="lg:col-span-1">
                <MobilePhoneMockup
                  temperature={weatherData!.temperature}
                  condition={
                    weatherData!.precipitation > 0
                      ? `Chuva prevista: ${weatherData!.precipitation}mm`
                      : "Céu limpo, sem chuva prevista"
                  }
                  crops={
                    cropData
                      ? cropData.crops
                          .filter((c) => c.suitability === "high")
                          .map((c) => c.name)
                          .join(" e ") || "A analisar..."
                      : "A analisar..."
                  }
                />
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

import { useState, useEffect, useRef } from "react";
import { useMutation } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { apiRequest } from "@/lib/queryClient";
import type { WeatherData, CropRecommendation as CropRecommendationType } from "@shared/schema";
import type { AngolaCity } from "@/data/angolaCities";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import InteractiveMap from "@/components/InteractiveMap";
import WeatherDetailCard from "@/components/WeatherDetailCard";
import AnimatedMobilePreview from "@/components/AnimatedMobilePreview";
import LocationSearch from "@/components/LocationSearch";
import WelcomeScreen from "@/components/WelcomeScreen";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [cropData, setCropData] = useState<CropRecommendationType | null>(null);
  const [selectedCity, setSelectedCity] = useState<AngolaCity | null>(null);
  const [showDetailCard, setShowDetailCard] = useState(false);
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
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

  const handleCitySelect = (city: AngolaCity) => {
    setShowWelcome(false);
    setSelectedCity(city);
    const coords = { latitude: city.latitude, longitude: city.longitude };
    setLastCoordinates(coords);
    weatherMutation.mutate(coords);
    setShowDetailCard(true);
  };

  const handleSearch = (location: string, lat?: number, lon?: number) => {
    if (lat !== undefined && lon !== undefined) {
      const coords = { latitude: lat, longitude: lon };
      setLastCoordinates(coords);
      weatherMutation.mutate(coords);
      setShowLocationDialog(false);
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

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Sidebar
        onSelectLocation={() => setShowLocationDialog(true)}
        onShowForecast={() => setShowDetailCard(true)}
        onShowSettings={() => setShowSettingsDialog(true)}
      />

      <main className="md:ml-20 min-h-screen pt-20 pb-28 md:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full px-4 md:px-6">
          <div className="md:col-span-2 h-full relative">
            {showWelcome ? (
              <WelcomeScreen />
            ) : (
              <InteractiveMap
                onCitySelect={handleCitySelect}
                selectedCity={selectedCity}
              />
            )}
          </div>

          <div className="hidden md:block md:col-span-1 h-full">
            <AnimatedMobilePreview
              weatherData={weatherData}
              cropData={cropData}
              locationName={selectedCity?.name}
            />
          </div>
        </div>

        <AnimatePresence>
          {showDetailCard && weatherData && (
            <Dialog open={showDetailCard} onOpenChange={setShowDetailCard}>
              <DialogContent className="max-w-4xl">
                <WeatherDetailCard
                  weatherData={weatherData}
                  cropData={cropData}
                  onClose={() => setShowDetailCard(false)}
                  isLoading={isLoading}
                />
              </DialogContent>
            </Dialog>
          )}
        </AnimatePresence>

        <Dialog open={showLocationDialog} onOpenChange={setShowLocationDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl">Selecionar Localização</DialogTitle>
              <DialogDescription>
                Pesquise por uma cidade ou insira coordenadas para obter dados meteorológicos
              </DialogDescription>
            </DialogHeader>
            <LocationSearch onSearch={handleSearch} />
          </DialogContent>
        </Dialog>

        <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="font-heading text-2xl">Configurações</DialogTitle>
              <DialogDescription>
                Ajuste as configurações da aplicação.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p>Aqui você poderá ajustar as configurações da aplicação.</p>
            </div>
          </DialogContent>
        </Dialog>
      </main>

      <Footer />
    </div>
  );
}

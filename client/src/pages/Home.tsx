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
import ForecastPanel from "@/components/ForecastPanel";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [cropData, setCropData] = useState<CropRecommendationType | null>(null);
  const [selectedCity, setSelectedCity] = useState<AngolaCity | null>(null);
  const [showDetailCard, setShowDetailCard] = useState(false);
  const [showLocationDialog, setShowLocationDialog] = useState(false);
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [activeTab, setActiveTab] = useState("map");
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
        onNavigate={setActiveTab}
        activeTab={activeTab}
      />

      <main className="ml-16 md:ml-20 min-h-screen pt-20 pb-8">
        <div className="container mx-auto px-4 lg:px-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="mb-6 grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="map">Mapa</TabsTrigger>
              <TabsTrigger value="forecast">Previsão</TabsTrigger>
            </TabsList>

            <TabsContent value="map" className="mt-0">
              <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                <div className="xl:col-span-2 w-full">
                  <div className="relative h-[600px] lg:h-[700px] w-full">
                    <InteractiveMap
                      onCitySelect={handleCitySelect}
                      selectedCity={selectedCity}
                    />
                    <AnimatePresence>
                      {showWelcome && <WelcomeScreen />}
                    </AnimatePresence>
                  </div>
                </div>

                <div className="xl:col-span-1 w-full">
                  <div className="sticky top-24 h-[600px] lg:h-[700px]">
                    <AnimatedMobilePreview
                      weatherData={weatherData}
                      cropData={cropData}
                      locationName={selectedCity?.name}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="forecast" className="mt-0">
              <ForecastPanel
                weatherData={weatherData}
                cropData={cropData}
                locationName={selectedCity?.name || "Selecione uma localização"}
                isLoading={isLoading}
              />
            </TabsContent>
          </Tabs>
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

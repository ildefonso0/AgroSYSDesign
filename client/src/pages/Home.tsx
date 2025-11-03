import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LocationSearch from "@/components/LocationSearch";
import WeatherDashboard from "@/components/WeatherDashboard";
import CropRecommendation from "@/components/CropRecommendation";
import MobilePhoneMockup from "@/components/MobilePhoneMockup";

export default function Home() {
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (location: string, lat?: number, lon?: number) => {
    console.log("Searching for:", { location, lat, lon });
    setHasSearched(true);
  };

  const mockWeatherData = {
    location: "Luanda, Angola",
    temperature: 29,
    humidity: 75,
    windSpeed: 18,
    precipitation: 2.5,
    forecast: [
      { day: "Seg", temp: 28, rain: 0 },
      { day: "Ter", temp: 30, rain: 5 },
      { day: "Qua", temp: 29, rain: 12 },
      { day: "Qui", temp: 27, rain: 8 },
      { day: "Sex", temp: 28, rain: 3 },
      { day: "Sáb", temp: 31, rain: 0 },
      { day: "Dom", temp: 30, rain: 2 },
    ],
  };

  const mockCropData = {
    crops: [
      { name: "Milho", icon: "corn" as const, suitability: "high" as const },
      { name: "Feijão", icon: "wheat" as const, suitability: "high" as const },
      {
        name: "Mandioca",
        icon: "carrot" as const,
        suitability: "medium" as const,
      },
    ],
    advice:
      "Boa altura para o milho e feijão. As condições climáticas atuais favorecem o plantio destas culturas. A precipitação esperada nos próximos 7 dias é adequada para o desenvolvimento inicial.",
  };

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
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <LocationSearch onSearch={handleSearch} />
                <WeatherDashboard data={mockWeatherData} />
                <CropRecommendation {...mockCropData} />
              </div>

              <div className="lg:col-span-1">
                <MobilePhoneMockup
                  temperature={mockWeatherData.temperature}
                  condition="Céu limpo, sem chuva prevista"
                  crops="Milho e feijão"
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

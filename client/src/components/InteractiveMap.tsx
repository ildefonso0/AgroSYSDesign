import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { angolaCities, type AngolaCity } from "@/data/angolaCities";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Cloud, Droplets, Wind, Thermometer } from "lucide-react";
import "leaflet/dist/leaflet.css";

interface InteractiveMapProps {
  onCitySelect: (city: AngolaCity) => void;
  selectedCity: AngolaCity | null;
}

const customIcon = new L.Icon({
  iconUrl: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%232E7D32'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function MapController({ selectedCity }: { selectedCity: AngolaCity | null }) {
  const map = useMap();

  useEffect(() => {
    if (selectedCity) {
      map.flyTo([selectedCity.latitude, selectedCity.longitude], 10, {
        duration: 1.5,
      });
    }
  }, [selectedCity, map]);

  return null;
}

export default function InteractiveMap({ onCitySelect, selectedCity }: InteractiveMapProps) {
  const mapRef = useRef<L.Map | null>(null);

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden shadow-lg border border-border">
      <MapContainer
        center={[-12.5, 17.5]}
        zoom={6}
        className="h-full w-full"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {angolaCities.map((city) => (
          <Marker
            key={city.id}
            position={[city.latitude, city.longitude]}
            icon={customIcon}
            eventHandlers={{
              click: () => onCitySelect(city),
            }}
          >
            <Popup>
              <Card className="border-0 shadow-none p-3 min-w-[200px]">
                <div className="flex items-start gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-heading font-bold text-base">{city.name}</h3>
                    <p className="text-xs text-muted-foreground">{city.province}</p>
                  </div>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Thermometer className="w-4 h-4 text-chart-1" />
                    <span className="text-muted-foreground">A carregar...</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Cloud className="w-4 h-4 text-chart-2" />
                    <span className="text-muted-foreground">A carregar...</span>
                  </div>
                </div>

                <Button
                  size="sm"
                  className="w-full"
                  onClick={() => onCitySelect(city)}
                >
                  Ver Detalhes
                </Button>
              </Card>
            </Popup>
          </Marker>
        ))}

        <MapController selectedCity={selectedCity} />
      </MapContainer>
    </div>
  );
}

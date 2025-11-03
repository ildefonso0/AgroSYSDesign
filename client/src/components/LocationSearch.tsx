import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface LocationSearchProps {
  onSearch: (location: string, lat?: number, lon?: number) => void;
}

export default function LocationSearch({ onSearch }: LocationSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [useCoordinates, setUseCoordinates] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (useCoordinates && latitude && longitude) {
      onSearch("", parseFloat(latitude), parseFloat(longitude));
    } else if (searchTerm) {
      onSearch(searchTerm);
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="location-search" className="text-sm font-medium mb-2 block">
            Procurar localização
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              id="location-search"
              type="text"
              placeholder="Ex: Luanda, Huambo, Benguela..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setUseCoordinates(false);
              }}
              className="pl-10"
              disabled={useCoordinates}
              data-testid="input-location-search"
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1 border-t" />
          <span className="text-xs text-muted-foreground">ou use coordenadas</span>
          <div className="flex-1 border-t" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="latitude" className="text-sm font-medium mb-2 block">
              Latitude
            </Label>
            <Input
              id="latitude"
              type="number"
              step="0.01"
              placeholder="-12.77"
              value={latitude}
              onChange={(e) => {
                setLatitude(e.target.value);
                if (e.target.value) setUseCoordinates(true);
              }}
              data-testid="input-latitude"
            />
          </div>
          <div>
            <Label htmlFor="longitude" className="text-sm font-medium mb-2 block">
              Longitude
            </Label>
            <Input
              id="longitude"
              type="number"
              step="0.01"
              placeholder="15.73"
              value={longitude}
              onChange={(e) => {
                setLongitude(e.target.value);
                if (e.target.value) setUseCoordinates(true);
              }}
              data-testid="input-longitude"
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full"
          disabled={!searchTerm && (!latitude || !longitude)}
          data-testid="button-search-location"
        >
          <MapPin className="w-4 h-4 mr-2" />
          Obter previsão meteorológica
        </Button>
      </form>
    </Card>
  );
}

import { useState, useMemo } from "react";
import { Search, MapPin } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { angolaCities } from "@/data/angolaCities";

interface LocationSearchProps {
  onSearch: (location: string, lat?: number, lon?: number) => void;
}

export default function LocationSearch({ onSearch }: LocationSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [useCoordinates, setUseCoordinates] = useState(false);
  const [open, setOpen] = useState(false);

  const filteredCities = useMemo(() => {
    if (!searchTerm) return [];
    const term = searchTerm.toLowerCase();
    return angolaCities.filter(
      city =>
        city.name.toLowerCase().includes(term) ||
        city.province.toLowerCase().includes(term)
    ).slice(0, 8);
  }, [searchTerm]);

  const handleCitySelect = (city: typeof angolaCities[0]) => {
    setSearchTerm(city.name);
    setOpen(false);
    onSearch(city.name, city.latitude, city.longitude);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (useCoordinates && latitude && longitude) {
      onSearch("", parseFloat(latitude), parseFloat(longitude));
    } else if (searchTerm) {
      const exactMatch = angolaCities.find(
        city => city.name.toLowerCase() === searchTerm.toLowerCase()
      );
      if (exactMatch) {
        onSearch(exactMatch.name, exactMatch.latitude, exactMatch.longitude);
      } else {
        onSearch(searchTerm);
      }
    }
  };

  return (
    <Card className="p-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="location-search" className="text-sm font-medium mb-2 block">
            Procurar localização
          </Label>
          <Popover open={open && filteredCities.length > 0} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground z-10" />
                <Input
                  id="location-search"
                  type="text"
                  placeholder="Ex: Luanda, Huambo, Benguela..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setUseCoordinates(false);
                    setOpen(true);
                  }}
                  onFocus={() => searchTerm && setOpen(true)}
                  className="pl-10"
                  disabled={useCoordinates}
                  data-testid="input-location-search"
                />
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-[400px] p-0" align="start">
              <Command>
                <CommandList>
                  <CommandGroup heading="Cidades de Angola">
                    {filteredCities.map((city) => (
                      <CommandItem
                        key={city.id}
                        onSelect={() => handleCitySelect(city)}
                        className="cursor-pointer"
                      >
                        <MapPin className="mr-2 h-4 w-4 text-primary" />
                        <div className="flex flex-col">
                          <span className="font-medium">{city.name}</span>
                          <span className="text-xs text-muted-foreground">{city.province}</span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
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

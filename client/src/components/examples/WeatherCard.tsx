import { Thermometer } from "lucide-react";
import WeatherCard from "../WeatherCard";

export default function WeatherCardExample() {
  return (
    <div className="p-6 max-w-md">
      <WeatherCard
        icon={Thermometer}
        label="Temperatura"
        value={29}
        unit="°C"
        large
      />
    </div>
  );
}

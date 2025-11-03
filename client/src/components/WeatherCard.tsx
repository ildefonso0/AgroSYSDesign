import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface WeatherCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  unit?: string;
  large?: boolean;
}

export default function WeatherCard({
  icon: Icon,
  label,
  value,
  unit,
  large = false,
}: WeatherCardProps) {
  return (
    <Card className={`p-6 ${large ? "col-span-2" : ""}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{label}</p>
          <div className="flex items-baseline gap-1">
            <span
              className={`font-mono font-semibold ${
                large ? "text-4xl" : "text-2xl"
              }`}
              data-testid={`text-${label.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {value}
            </span>
            {unit && (
              <span className="text-lg text-muted-foreground">{unit}</span>
            )}
          </div>
        </div>
        <div className="p-3 rounded-md bg-primary/10">
          <Icon className="w-6 h-6 text-primary" />
        </div>
      </div>
    </Card>
  );
}

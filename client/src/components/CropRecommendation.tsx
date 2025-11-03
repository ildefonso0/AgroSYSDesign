import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Wheat, Popcorn, Carrot } from "lucide-react";

interface Crop {
  name: string;
  icon: "wheat" | "corn" | "carrot";
  suitability: "high" | "medium" | "low";
}

interface CropRecommendationProps {
  crops: Crop[];
  advice: string;
}

const iconMap = {
  wheat: Wheat,
  corn: Popcorn,
  carrot: Carrot,
};

const suitabilityColors = {
  high: "bg-chart-1 text-white",
  medium: "bg-chart-2 text-white",
  low: "bg-muted text-muted-foreground",
};

export default function CropRecommendation({
  crops,
  advice,
}: CropRecommendationProps) {
  return (
    <Card className="p-6 border-2 border-primary/20">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 rounded-md bg-primary/10">
          <Sparkles className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-lg">
            Recomendações IA
          </h3>
          <p className="text-xs text-muted-foreground">Análise Gemini AI</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-sm leading-relaxed" data-testid="text-crop-advice">
          {advice}
        </p>
      </div>

      <div>
        <p className="text-sm font-medium mb-3">Culturas recomendadas:</p>
        <div className="flex flex-wrap gap-2">
          {crops.map((crop, index) => {
            const Icon = iconMap[crop.icon];
            return (
              <Badge
                key={index}
                className={`px-3 py-2 gap-2 ${suitabilityColors[crop.suitability]}`}
                data-testid={`badge-crop-${index}`}
              >
                <Icon className="w-4 h-4" />
                {crop.name}
              </Badge>
            );
          })}
        </div>
      </div>
    </Card>
  );
}

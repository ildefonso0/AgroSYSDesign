import { Card } from "@/components/ui/card";
import { Smartphone } from "lucide-react";

interface MobilePhoneMockupProps {
  temperature: number;
  condition: string;
  crops: string;
}

export default function MobilePhoneMockup({
  temperature,
  condition,
  crops,
}: MobilePhoneMockupProps) {
  return (
    <div className="sticky top-24">
      <div className="flex items-center gap-2 mb-4">
        <Smartphone className="w-5 h-5 text-muted-foreground" />
        <p className="text-sm font-medium text-muted-foreground">
          Visualização móvel
        </p>
      </div>

      <div className="relative mx-auto max-w-[300px]">
        <div className="rounded-3xl border-8 border-foreground/10 bg-card shadow-2xl overflow-hidden">
          <div className="bg-foreground/5 h-6 flex items-center justify-center">
            <div className="w-24 h-4 bg-foreground/10 rounded-full" />
          </div>

          <div className="p-6 space-y-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground mb-1">AgroSYS SMS</p>
              <h4 className="font-heading font-bold text-lg mb-2">
                Previsão de Hoje
              </h4>
            </div>

            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm">Temperatura</span>
                <span className="font-mono text-2xl font-bold" data-testid="text-mobile-temperature">
                  {temperature}°C
                </span>
              </div>
              <p className="text-xs text-muted-foreground">{condition}</p>
            </Card>

            <Card className="p-4">
              <p className="text-xs font-medium text-muted-foreground mb-2">
                Cultura ideal
              </p>
              <p className="text-sm font-medium" data-testid="text-mobile-crops">
                {crops}
              </p>
            </Card>

            <div className="text-center pt-2">
              <p className="text-xs text-muted-foreground">
                Mensagem enviada às 08:00
              </p>
            </div>
          </div>

          <div className="bg-foreground/5 h-10 flex items-center justify-center">
            <div className="w-32 h-1 bg-foreground/20 rounded-full" />
          </div>
        </div>
      </div>

      <p className="text-xs text-muted-foreground text-center mt-4">
        Exemplo de como o agricultor recebe as informações
      </p>
    </div>
  );
}

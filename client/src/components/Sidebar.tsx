import { Sprout, Map, Cloud, Settings, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  onSelectLocation: () => void;
}

export default function Sidebar({ onSelectLocation }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-20 bg-primary border-r border-primary-border flex flex-col items-center py-6 z-40">
      <div className="mb-8">
        <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
          <Sprout className="w-7 h-7 text-primary-foreground" />
        </div>
      </div>

      <nav className="flex-1 flex flex-col gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 text-primary-foreground hover:bg-primary-foreground/10"
          onClick={onSelectLocation}
          title="Selecionar Local"
        >
          <Map className="w-6 h-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 text-primary-foreground hover:bg-primary-foreground/10"
          title="Previsão"
        >
          <Cloud className="w-6 h-6" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 text-primary-foreground hover:bg-primary-foreground/10"
          title="Configurações"
        >
          <Settings className="w-6 h-6" />
        </Button>
      </nav>

      <Button
        variant="ghost"
        size="icon"
        className="w-12 h-12 text-primary-foreground hover:bg-primary-foreground/10"
        title="Sobre o Projeto"
      >
        <Info className="w-6 h-6" />
      </Button>
    </aside>
  );
}

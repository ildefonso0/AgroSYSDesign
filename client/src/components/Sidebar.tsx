import { Sprout, Map, Cloud, Settings, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  onSelectLocation: () => void;
  onShowForecast: () => void;
  onShowSettings: () => void;
}

export default function Sidebar({ onSelectLocation, onShowForecast, onShowSettings }: SidebarProps) {
  return (
    <>
      {/* Mobile Bottom Bar */}
      <aside className="fixed bottom-0 left-0 w-full bg-primary border-t border-primary-border flex justify-around items-center py-2 z-40 md:hidden">
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
          onClick={onShowForecast}
        >
          <Cloud className="w-6 h-6" />
        </Button>
        <div className="w-12 h-12 rounded-2xl bg-primary-foreground/10 flex items-center justify-center">
          <Sprout className="w-8 h-8 text-primary-foreground" />
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 text-primary-foreground hover:bg-primary-foreground/10"
          title="Configurações"
          onClick={onShowSettings}
        >
          <Settings className="w-6 h-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="w-12 h-12 text-primary-foreground hover:bg-primary-foreground/10"
          title="Sobre o Projeto"
        >
          <Info className="w-6 h-6" />
        </Button>
      </aside>

      {/* Desktop Sidebar */}
      <aside className="hidden md:fixed md:left-0 md:top-0 md:h-screen md:w-20 bg-primary border-r border-primary-border md:flex md:flex-col md:items-center py-6 z-40">
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
            onClick={onShowForecast}
          >
            <Cloud className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 text-primary-foreground hover:bg-primary-foreground/10"
            title="Configurações"
            onClick={onShowSettings}
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
    </>
  );
}

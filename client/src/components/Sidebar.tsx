import { Sprout, Map, Cloud, Settings, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarProps {
  onSelectLocation: () => void;
  onNavigate?: (tab: string) => void;
  activeTab?: string;
}

export default function Sidebar({ onSelectLocation, onNavigate, activeTab }: SidebarProps) {
  return (
    <TooltipProvider>
      <aside className="fixed left-0 top-0 h-screen w-16 md:w-20 bg-primary border-r border-primary-border flex flex-col items-center py-4 md:py-6 z-40">
        <div className="mb-6 md:mb-8">
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
            <Sprout className="w-5 h-5 md:w-7 md:h-7 text-primary-foreground" />
          </div>
        </div>

        <nav className="flex-1 flex flex-col gap-3 md:gap-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`w-10 h-10 md:w-12 md:h-12 text-primary-foreground hover:bg-primary-foreground/10 transition-all ${
                  activeTab === 'map' ? 'bg-primary-foreground/20' : ''
                }`}
                onClick={() => onNavigate?.('map')}
              >
                <Map className="w-5 h-5 md:w-6 md:h-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Ver Mapa</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`w-10 h-10 md:w-12 md:h-12 text-primary-foreground hover:bg-primary-foreground/10 transition-all ${
                  activeTab === 'forecast' ? 'bg-primary-foreground/20' : ''
                }`}
                onClick={() => onNavigate?.('forecast')}
              >
                <Cloud className="w-5 h-5 md:w-6 md:h-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Previsão Meteorológica</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-10 h-10 md:w-12 md:h-12 text-primary-foreground hover:bg-primary-foreground/10 transition-all"
                onClick={onSelectLocation}
              >
                <Settings className="w-5 h-5 md:w-6 md:h-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Pesquisar Localização</p>
            </TooltipContent>
          </Tooltip>
        </nav>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-10 h-10 md:w-12 md:h-12 text-primary-foreground hover:bg-primary-foreground/10 transition-all"
            >
              <Info className="w-5 h-5 md:w-6 md:h-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Sobre o AgroSYS</p>
          </TooltipContent>
        </Tooltip>
      </aside>
    </TooltipProvider>
  );
}

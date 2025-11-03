import { Moon, Sun, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/95">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-md bg-primary-foreground/10">
            <Sprout className="w-6 h-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="font-heading font-bold text-xl text-primary-foreground" data-testid="text-site-title">
              AgroSYS
            </h1>
            <p className="text-xs text-primary-foreground/80">
              Tecnologia para o agricultor angolano
            </p>
          </div>
        </div>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="text-primary-foreground hover:bg-primary-foreground/10"
          data-testid="button-theme-toggle"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
          <span className="sr-only">Alternar tema</span>
        </Button>
      </div>
    </header>
  );
}

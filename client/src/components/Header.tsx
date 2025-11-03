import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="fixed top-0 left-20 right-0 z-40 w-[calc(100%-5rem)] border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/95">
      <div className="px-6 py-4 flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-bold text-2xl text-foreground" data-testid="text-site-title">
            AgroSYS
          </h1>
          <p className="text-sm text-muted-foreground">
            Tecnologia para o agricultor angolano
          </p>
        </div>

        <Button
          size="icon"
          variant="ghost"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="hover:bg-muted"
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

import { Facebook, Twitter, Instagram, Linkedin, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="border-t bg-background mt-12">
      <div className="container mx-auto px-4 py-6 lg:py-8 ml-0 lg:ml-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <p className="text-xs lg:text-sm text-muted-foreground text-center lg:text-left">
            © 2025 AgroSYS — Joaquim Ildefonso Mucuateno. Todos os direitos reservados.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center gap-1 sm:gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 sm:w-9 sm:h-9 text-muted-foreground hover:text-primary transition-colors"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 sm:w-9 sm:h-9 text-muted-foreground hover:text-primary transition-colors"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 sm:w-9 sm:h-9 text-muted-foreground hover:text-primary transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 sm:w-9 sm:h-9 text-muted-foreground hover:text-primary transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>

            <div className="hidden sm:block w-px h-6 bg-border" />

            <Button
              variant="outline"
              size="sm"
              className="gap-2 text-xs sm:text-sm"
            >
              <Info className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Saber mais sobre o projeto</span>
              <span className="sm:hidden">Sobre</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}

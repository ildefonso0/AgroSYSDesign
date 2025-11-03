import { Facebook, Twitter, Instagram, Linkedin, Info } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-8 ml-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © 2025 AgroSYS — Joaquim Ildefonso Mucuateno. Todos os direitos reservados.
          </p>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="w-9 h-9 text-muted-foreground hover:text-primary"
                title="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-9 h-9 text-muted-foreground hover:text-primary"
                title="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-9 h-9 text-muted-foreground hover:text-primary"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-9 h-9 text-muted-foreground hover:text-primary"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>

            <div className="w-px h-6 bg-border" />

            <Button
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Info className="w-4 h-4" />
              Saber mais sobre o projeto
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}

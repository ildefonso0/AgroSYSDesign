import { motion } from "framer-motion";
import { MapPin, Sparkles, Cloud } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function WelcomeScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-10 flex items-center justify-center bg-background/90 backdrop-blur-sm p-8"
    >
      <Card className="max-w-2xl w-full p-8 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-primary/10 flex items-center justify-center">
            <MapPin className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-heading font-bold text-3xl mb-2">
            Bem-vindo ao AgroSYS
          </h2>
          <p className="text-muted-foreground text-lg">
            Plataforma inteligente de meteorologia agrícola para Angola
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <div className="p-4">
            <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-chart-1/10 flex items-center justify-center">
              <Cloud className="w-6 h-6 text-chart-1" />
            </div>
            <h3 className="font-semibold mb-1">Dados em Tempo Real</h3>
            <p className="text-sm text-muted-foreground">
              Previsões meteorológicas atualizadas de toda Angola
            </p>
          </div>

          <div className="p-4">
            <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-chart-2/10 flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-chart-2" />
            </div>
            <h3 className="font-semibold mb-1">Análise com IA</h3>
            <p className="text-sm text-muted-foreground">
              Recomendações agrícolas geradas por Gemini AI
            </p>
          </div>

          <div className="p-4">
            <div className="w-12 h-12 mx-auto mb-3 rounded-lg bg-primary/10 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <h3 className="font-semibold mb-1">20 Cidades</h3>
            <p className="text-sm text-muted-foreground">
              Cobertura completa das principais regiões de Angola
            </p>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-sm text-muted-foreground"
        >
          Clique em qualquer ponto do mapa ou use a barra lateral para começar
        </motion.p>
      </Card>
    </motion.div>
  );
}

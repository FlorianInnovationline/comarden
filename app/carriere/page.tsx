import type { Metadata } from "next";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Carrières - Comarden",
  description: "Rejoignez l'équipe Comarden.",
};

export default function CarrierePage() {
  return (
    <div className="pt-20">
      <section className="py-16 lg:py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Carrières
            </h1>
            <p className="text-lg text-white/80 max-w-2xl">
              Rejoignez l'équipe Comarden.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <p className="text-muted-foreground mb-6">
              Cette page sera bientôt disponible.
            </p>
            <Button asChild href="/contact" size="lg">
              Nous contacter
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

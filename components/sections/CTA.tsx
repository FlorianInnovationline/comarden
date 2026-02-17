import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { site } from "@/lib/site";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function CTACompact() {
  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-accent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary tracking-tight mb-2 sm:mb-3 text-balance px-2">
              Prêt à démarrer votre projet ?
            </h2>
            <p className="text-sm sm:text-base text-primary/80 max-w-xl mx-auto mb-5 sm:mb-6 px-2">
              Nos experts sont à votre disposition pour vous conseiller et vous accompagner.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                asChild
                href="/contact"
                size="md"
                className="bg-primary text-white hover:bg-primary/90 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base"
              >
                Demander un devis
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
              </Button>
              <Button
                asChild
                href={`tel:${site.phone.primary}`}
                size="md"
                className="bg-accent-light text-primary hover:bg-accent-light/90 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base"
              >
                <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                {site.phone.display}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

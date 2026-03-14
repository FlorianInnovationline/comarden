import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-primary">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80')",
        }}
      />

      {/* Dark overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-primary/70" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-32">
        <div className="max-w-3xl">
          <p
            className="text-accent font-semibold text-xs sm:text-sm tracking-widest uppercase mb-3 sm:mb-4 animate-fadeInUp"
            style={{ animationDelay: "100ms" }}
          >
            Depuis 1977
          </p>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight text-balance animate-fadeInUp"
            style={{ animationDelay: "200ms" }}
          >
            L&apos;expertise des matériaux de construction
          </h1>
          <p
            className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-white/80 max-w-xl leading-relaxed animate-fadeInUp"
            style={{ animationDelay: "300ms" }}
          >
            Toiture, charpente, isolation et façades. Façonnage sur mesure et livraison avec camion-grue partout en
            Wallonie.
          </p>
          <div
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 animate-fadeInUp"
            style={{ animationDelay: "400ms" }}
          >
            <Button
              asChild
              size="lg"
              className="bg-accent text-primary hover:bg-accent/90 h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold rounded-sm group transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Link href="/do-it-yourself">
                DO IT YOURSELF
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-accent text-primary hover:bg-accent/90 h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold rounded-sm group transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              <Link href="/trouver-professionnel">
                Trouver un professionnel
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white bg-transparent hover:bg-white/10 h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-medium rounded-sm transition-all duration-300 hover:scale-105"
            >
              <Link href="/produits">Voir nos produits</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

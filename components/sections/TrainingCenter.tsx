import Link from "next/link";
import { ArrowRight, GraduationCap, BadgeCheck } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function TrainingCenter() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-accent/20 mb-6">
            <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-accent" />
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-4">
            Centre de formation
          </h2>

          <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto leading-relaxed mb-6">
            La rentabilité et la satisfaction de vos clients passent avant tout par des chantiers professionnels,
            réalisés par des collaborateurs bien formés.
          </p>

          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-2 mb-8">
            <BadgeCheck className="w-4 h-4 text-accent flex-shrink-0" />
            <span className="text-sm font-semibold text-white">Agréé Constructiv.</span>
          </div>

          <div className="block">
            <Link
              href="/formations"
              className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-primary font-semibold px-6 py-3 rounded-sm transition-all duration-300 hover:scale-105 hover:shadow-lg group"
            >
              Découvrez l&apos;offre Comarden
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Truck, Clock, MapPin, ShieldCheck } from "lucide-react";
import CTACompact from "@/components/sections/CTA";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Transport & Livraison - Comarden",
  description:
    "Service de livraison camion-grue soigné et réfléchi. Livraison 24-48h en Wallonie et Bruxelles depuis Bertrix et Naninne.",
};

const features = [
  {
    icon: Truck,
    title: "Camion-grue",
    description:
      "Livraison avec camion-grue pour déposer les matériaux directement sur le chantier, en toiture ou à l'étage. Gain de temps et de main d'œuvre.",
  },
  {
    icon: Clock,
    title: "Délai 24-48h",
    description:
      "Pour les produits en stock, livraison sous 24 à 48h depuis nos deux sites de Bertrix et Naninne. Réactivité garantie pour vos chantiers.",
  },
  {
    icon: MapPin,
    title: "Wallonie & Bruxelles",
    description:
      "Zone de livraison couvrant toute la Wallonie et Bruxelles. Nos 3 camions assurent un service quotidien fiable et ponctuel.",
  },
  {
    icon: ShieldCheck,
    title: "Livraison soignée",
    description:
      "Chaque livraison est réfléchie et soignée. Nos chauffeurs sont formés au transport de matériaux de toiture fragiles : ardoises, tôles, panneaux.",
  },
];

export default function TransportPage() {
  return (
    <div className="pt-20">
      <section className="relative overflow-hidden bg-primary py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2f4a] via-primary to-[#2B4162]" />
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(245,192,0,0.4) 0%, transparent 70%)",
            bottom: "0%",
            left: "-5%",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
            <Reveal>
              <div>
                <span className="text-accent font-medium tracking-wide uppercase text-xs sm:text-sm">
                  Services
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6 mt-3 leading-tight">
                  Transport &amp; Livraison
                </h1>
                <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl">
                  Camion-grue, livraison soignée et réfléchie. Comarden renforce sa flotte pour vous offrir un service de livraison toujours plus rapide et fiable.
                </p>
              </div>
            </Reveal>
            <Reveal delay={150}>
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10">
                <Image
                  src="/images/Services/Transport/1.jpg"
                  alt="Transport et livraison Comarden — camion-grue"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4 text-center">
              Un service de livraison pensé pour les pros
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto text-center mb-12">
              3 nouveaux camions, une flotte modernisée pour des livraisons plus rapides et plus fiables.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-6">
            {features.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 100}>
                  <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 hover:shadow-lg transition-all duration-300 h-full">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
              Planifier une livraison
            </h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Contactez-nous pour organiser la livraison de vos matériaux. Nous planifions ensemble la date et le créneau qui conviennent à votre chantier.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Nous contacter
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTACompact />
    </div>
  );
}

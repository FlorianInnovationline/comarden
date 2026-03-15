import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, TreePine, Ruler, Truck, ShieldCheck } from "lucide-react";
import CTACompact from "@/components/sections/CTA";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Charpente bois - Comarden",
  description:
    "Bois de charpente et structures en bois pour la construction et la rénovation. Disponible chez Comarden à Bertrix et Naninne.",
};

const features = [
  {
    icon: TreePine,
    title: "Bois de qualité",
    description: "Bois de charpente sélectionné, traité et calibré pour garantir durabilité et résistance mécanique.",
  },
  {
    icon: Ruler,
    title: "Découpe sur mesure",
    description: "Nos ateliers réalisent la découpe et le façonnage selon vos plans et spécifications techniques.",
  },
  {
    icon: ShieldCheck,
    title: "Traitement et certification",
    description: "Bois traité classe d'emploi adaptée, certifié pour les constructions résidentielles et industrielles.",
  },
  {
    icon: Truck,
    title: "Livraison sur chantier",
    description: "Livraison camion-grue partout en Wallonie avec manutention sécurisée de vos éléments de charpente.",
  },
];

export default function CharpentePage() {
  return (
    <div className="pt-20">
      <section className="relative py-16 sm:py-20 lg:py-28 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a2f4a] via-primary to-[#2B4162]" />
          <div
            className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(253,208,0,0.4) 0%, transparent 70%)",
              top: "10%",
              right: "-10%",
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-3 mb-6">
                <span className="flex h-3 w-3 relative">
                  <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
                </span>
                <span className="text-accent font-medium tracking-wide uppercase text-xs sm:text-sm">
                  Structure bois
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                Charpente bois
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
                Bois de charpente, poutres, chevrons et structures pour la construction et la rénovation.
                Découpe sur mesure et livraison depuis nos sites de Bertrix et Naninne.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 100}>
                  <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 h-full hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-primary text-lg mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{item.description}</p>
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
              Vous cherchez des charpentes préfabriquées ?
            </h2>
            <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
              Comarden propose également des charpentes préfabriquées en bois, conçues et assemblées en usine pour une pose rapide et précise.
            </p>
            <Link
              href="/produits/charpentes-prefabriquees"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Charpentes préfabriquées
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTACompact />
    </div>
  );
}

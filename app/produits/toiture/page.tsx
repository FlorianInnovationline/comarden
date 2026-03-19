import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Shield, Layers, Droplets, Home } from "lucide-react";
import CTACompact from "@/components/sections/CTA";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Toiture - Comarden",
  description:
    "Matériaux de couverture pour toitures inclinées et plates. Tuiles, ardoises, tôles, EPDM et accessoires chez Comarden à Bertrix et Naninne.",
};

const categories = [
  {
    title: "Ardoises & Couverture",
    href: "/produits/ardoises",
    icon: Layers,
    description:
      "Ardoises naturelles, Cedral Alterna, systèmes EPDM Elevate et solutions SOPREMA pour toitures inclinées et plates.",
  },
  {
    title: "Tôles & Panneaux",
    href: "/produits/toles-panneaux",
    icon: Home,
    description:
      "Tôles acier profilées, panneaux sandwich isolés, plaques fibrociment. Importateur exclusif ISOPAN pour le BENELUX.",
  },
  {
    title: "EPDM & Étanchéité",
    href: "/produits/epdm",
    icon: Droplets,
    description:
      "Membranes EPDM Elevate (RubberGard, RubberCover), systèmes d'étanchéité pour toitures plates résidentielles et industrielles.",
  },
  {
    title: "Isolation",
    href: "/produits/isolation",
    icon: Shield,
    description:
      "Piliers ITE FAYNOT, solutions URSA, vis isolants ETANCO. Isolation de toiture par l'extérieur sans dérangement intérieur.",
  },
];

export default function ToiturePage() {
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div>
                <div className="inline-flex items-center gap-3 mb-6">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
                  </span>
                  <span className="text-accent font-medium tracking-wide uppercase text-xs sm:text-sm">
                    Matériaux de couverture
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                  Toiture
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
                  Comarden propose une gamme complète de matériaux pour toitures inclinées et plates :
                  ardoises, tuiles, tôles, EPDM, isolation et accessoires. Deux sites en Wallonie à votre service.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="hidden lg:block">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10">
                  <Image
                    src="/images/placeholder/toiture-hero.jpg"
                    alt="Matériaux de toiture"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-12 text-center">
              Nos solutions toiture
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <Reveal key={cat.href} delay={i * 100}>
                  <Link
                    href={cat.href}
                    className="group block bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-200 hover:shadow-lg hover:border-primary/20 transition-all duration-300"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-2 group-hover:text-accent transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed mb-4">
                      {cat.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-accent transition-colors">
                      Découvrir <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTACompact />
    </div>
  );
}

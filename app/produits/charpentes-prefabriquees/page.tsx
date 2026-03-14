import type { Metadata } from "next";
import Link from "next/link";
import { Clock, Ruler, Layout, Truck, Home, PlusSquare, Warehouse, Factory, ArrowRight } from "lucide-react";
import CTACompact from "@/components/sections/CTA";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Charpentes préfabriquées - Comarden",
  description:
    "Charpentes bois préfabriquées prêtes à poser pour constructions résidentielles, industrielles et agricoles en Belgique et en Wallonie.",
};

const avantages = [
  {
    icon: Clock,
    title: "Gain de temps",
    description:
      "Éléments préparés en atelier : pose sur chantier rapide et planifiée, moins de délais météo.",
  },
  {
    icon: Ruler,
    title: "Précision en usine",
    description:
      "Coupes et assemblages réalisés en usine pour une géométrie parfaite et une mise en œuvre fiable.",
  },
  {
    icon: Layout,
    title: "Adaptation sur mesure",
    description:
      "Charpentes conçues selon vos plans et contraintes pour s’adapter à tous les projets.",
  },
  {
    icon: Truck,
    title: "Disponibilité rapide",
    description:
      "Livraison organisée selon votre planning pour une coordination optimale du chantier.",
  },
];

const applications = [
  { icon: Home, label: "Maisons unifamiliales" },
  { icon: PlusSquare, label: "Extensions" },
  { icon: Warehouse, label: "Bâtiments agricoles" },
  { icon: Factory, label: "Toitures industrielles" },
];

export default function CharpentesPrefabriqueesPage() {
  return (
    <div className="pt-20">
      {/* ── HERO ── */}
      <section className="relative py-16 sm:py-20 lg:py-28 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a2f4a] via-primary to-[#2B4162]" />
          <div
            className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
            style={{
              background:
                "radial-gradient(circle, rgba(245,192,0,0.4) 0%, transparent 70%)",
              top: "10%",
              right: "-10%",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
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
                  Solutions bois
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                Charpentes préfabriquées — Solutions bois pour tous vos projets
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
                Comarden distribue des charpentes bois préfabriquées, prêtes à
                poser, pour tous types de constructions résidentielles,
                industrielles et agricoles en Belgique et en Wallonie.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── AVANTAGES ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4">
                Avantages
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                La charpente préfabriquée combine rapidité, précision et
                flexibilité pour vos projets de construction.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {avantages.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 100}>
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 h-full hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-primary text-lg mb-2">
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

      {/* ── APPLICATIONS ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4">
                Applications
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Nos charpentes préfabriquées conviennent à une large gamme de
                projets, du résidentiel à l’industriel.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {applications.map((app, i) => {
              const Icon = app.icon;
              return (
                <Reveal key={app.label} delay={i * 100}>
                  <div className="flex items-center gap-4 bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-primary/20 hover:bg-primary/5 transition-colors">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <span className="font-medium text-slate-800">{app.label}</span>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA DEVIS ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                Un projet de charpente ?
              </h2>
              <p className="text-base sm:text-lg text-white/80 mb-8 leading-relaxed">
                Demandez un devis personnalisé pour votre construction ou
                rénovation. Notre équipe vous accompagne de la conception à la
                livraison.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-accent text-primary font-semibold px-8 py-3.5 rounded-full hover:bg-accent/90 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Demander un devis
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTACompact />
    </div>
  );
}

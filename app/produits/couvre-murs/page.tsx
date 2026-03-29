import type { Metadata } from "next";
import Link from "next/link";
import {
  Shield,
  Paintbrush,
  CloudRain,
  Wrench,
  Palette,
  ArrowRight,
  Phone,
  Fence,
  Waves,
  Landmark,
  Boxes,
  Building2,
  RefreshCw,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import CTACompact from "@/components/sections/CTA";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Couvre-murs - Comarden",
  description:
    "Protégez et valorisez vos murets extérieurs avec les couvre-murs Comarden. Gamme standard et sur mesure, disponibles en plusieurs coloris.",
  keywords:
    "couvre-mur extérieur, couvre-mur sur mesure, couvre-mur béton, protection muret jardin, couvre-mur design, Comarden, couvre-mur clôture, coiffe de mur",
};

const benefits = [
  {
    icon: Shield,
    title: "Protection efficace",
    description:
      "Contre les infiltrations d\u2019eau, le gel et les UV pour prolonger la durée de vie de vos murets.",
  },
  {
    icon: Paintbrush,
    title: "Design soigné",
    description:
      "Lignes épurées pour valoriser l\u2019aspect extérieur de votre propriété ou chantier.",
  },
  {
    icon: CloudRain,
    title: "Entretien minimal",
    description:
      "Matériaux sélectionnés pour leur résistance aux salissures et aux intempéries.",
  },
  {
    icon: Wrench,
    title: "Pose facilitée",
    description:
      "Système pensé pour les professionnels comme pour les particuliers bricoleurs.",
  },
  {
    icon: Palette,
    title: "Personnalisation complète",
    description:
      "Couleur, finition et dimensions adaptées à votre projet avec la gamme sur mesure.",
  },
];

const useCases = [
  { icon: Fence, label: "Clôtures et murets de jardin" },
  { icon: Waves, label: "Murets de piscine" },
  { icon: Landmark, label: "Murets de soutènement" },
  { icon: Boxes, label: "Murets en parpaing ou en béton" },
  { icon: Building2, label: "Construction neuve" },
  { icon: RefreshCw, label: "Rénovation" },
];

export default function CouvreMursPage() {
  return (
    <div className="pt-20">
      {/* ── HERO ── */}
      <section className="relative py-20 sm:py-24 lg:py-32 bg-primary text-white overflow-hidden">
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
            className="absolute w-[400px] h-[400px] rounded-full blur-[100px] opacity-15"
            style={{
              background:
                "radial-gradient(circle, rgba(245,192,0,0.3) 0%, transparent 70%)",
              bottom: "-10%",
              left: "10%",
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
                  Nouveau produit
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                Couvre-murs Comarden
                <span className="block text-accent text-2xl sm:text-3xl md:text-4xl mt-2">
                  Protection &amp; design pour vos murets
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
                Protégez et valorisez vos murets extérieurs avec les couvre-murs
                Comarden. Une gamme pensée pour durer, facile d&apos;entretien,
                disponible en standard ou sur mesure pour s&apos;adapter
                parfaitement à chaque projet.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60V30C240 10 480 0 720 0C960 0 1200 10 1440 30V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── SECTION 1 — Notre gamme ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4">
                Deux gammes pour tous les projets
              </h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {/* Standard */}
            <Reveal delay={0}>
              <div className="bg-slate-50 rounded-2xl p-8 sm:p-10 border border-slate-200 h-full">
                <div className="w-12 h-12 rounded-xl bg-slate-200 flex items-center justify-center mb-6">
                  <Boxes className="w-6 h-6 text-slate-600" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4">
                  Gamme standard
                </h3>
                <p className="text-slate-600 leading-relaxed mb-8">
                  Disponible immédiatement en trois coloris soigneusement
                  sélectionnés pour s&apos;harmoniser avec les environnements les
                  plus courants. La solution idéale pour les projets rapides.
                </p>

                <h4 className="text-sm font-bold text-primary uppercase tracking-widest mb-4">
                  Coloris disponibles
                </h4>
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-300 border-2 border-gray-400 shadow-inner" />
                    <span className="text-sm font-medium text-slate-700">Gris clair</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-600 border-2 border-gray-700 shadow-inner" />
                    <span className="text-sm font-medium text-slate-700">Gris anthracite</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-900 border-2 border-black shadow-inner" />
                    <span className="text-sm font-medium text-slate-700">Noir</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Sur mesure */}
            <Reveal delay={100}>
              <div className="bg-primary rounded-2xl p-8 sm:p-10 text-white h-full relative overflow-hidden">
                <div
                  className="absolute w-[300px] h-[300px] rounded-full blur-[80px] opacity-20"
                  style={{
                    background: "radial-gradient(circle, rgba(245,192,0,0.5) 0%, transparent 70%)",
                    bottom: "-20%",
                    right: "-10%",
                  }}
                />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-6">
                    <Palette className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4">
                    Gamme sur mesure
                  </h3>
                  <p className="text-white/80 leading-relaxed mb-8">
                    Choisissez la teinte qui correspond exactement à votre projet.
                    Notre gamme sur mesure s&apos;adapte à toutes les exigences
                    architecturales et s&apos;intègre parfaitement à votre environnement.
                  </p>

                  <span className="inline-flex items-center gap-2 bg-accent text-primary font-bold px-5 py-2.5 rounded-full text-sm">
                    <Sparkles className="w-4 h-4" />
                    Personnalisation complète
                  </span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── SECTION 2 — Pourquoi choisir ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4">
                Un couvre-mur conçu pour simplifier votre quotidien
              </h2>
              <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Un produit design qui allie résistance, praticité et esthétique —
                pour que vos murets extérieurs restent beaux, quelle que soit la saison.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
              {benefits.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md hover:border-accent/30 transition-all duration-300">
                    <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold text-primary mb-2">{item.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{item.description}</p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 3 — Utilisations ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-primary text-white relative overflow-hidden">
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(245,192,0,0.4) 0%, transparent 70%)",
            top: "-15%",
            right: "-5%",
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-12 lg:mb-16">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                Idéal pour tous types de murets
              </h2>
              <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto leading-relaxed">
                Les couvre-murs Comarden s&apos;adaptent à une grande variété d&apos;applications.
              </p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 lg:gap-6 max-w-4xl mx-auto">
              {useCases.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-5 sm:p-6 text-center hover:bg-white/10 transition-colors flex flex-col items-center justify-center min-h-[130px]">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-accent" />
                    </div>
                    <span className="text-sm sm:text-base font-medium text-white/90 leading-tight">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION 4 — CTA ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#FDD000]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4">
              Demandez votre devis personnalisé
            </h2>
            <p className="text-base sm:text-lg text-primary/80 leading-relaxed mb-8 max-w-2xl mx-auto">
              Notre équipe est disponible pour vous conseiller sur le choix de
              votre couvre-mur et vous proposer un devis sur mesure adapté à
              votre projet.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-xl text-base sm:text-lg"
              >
                Nous contacter
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="tel:+3261412706"
                className="inline-flex items-center gap-2 bg-white/80 text-primary font-semibold px-6 py-3.5 rounded-full hover:bg-white transition-colors text-base"
              >
                <Phone className="w-4 h-4" />
                061 41 27 06
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTACompact />
    </div>
  );
}

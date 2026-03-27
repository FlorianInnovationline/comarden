import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  CheckCircle2,
} from "lucide-react";
import CTACompact from "@/components/sections/CTA";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Ardoises - Comarden",
  description:
    "Découvrez notre gamme complète d\u2019ardoises naturelles. Ardoisières de Fonsagrada, La Bana. Comarden, votre partenaire toiture en Belgique.",
};

const naturalSlateFeatures = [
  {
    title: "Dimensions",
    description:
      "Un large choix de formats pour s\u2019adapter à tous les styles architecturaux et toutes les configurations de toiture.",
  },
  {
    title: "Les couleurs",
    description:
      "Des teintes naturelles allant du gris anthracite au noir profond, pour un rendu élégant et authentique.",
  },
  {
    title: "1er & 2ème choix",
    description:
      "Deux niveaux de sélection pour répondre à vos exigences de qualité et à votre budget.",
  },
  {
    title: "ATG",
    description:
      "Toutes nos ardoises disposent d\u2019un ATG, garantissant leur conformité aux normes belges.",
  },
];

const atgBenefits = [
  "Défendre vos projets lors de la vente",
  "Assurer un suivi efficace après-vente",
  "Renforcer votre crédibilité technique",
];

export default function ArdoisesPage() {
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div>
                <div className="inline-flex items-center gap-3 mb-6">
                  <span className="flex h-3 w-3 relative">
                    <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-accent" />
                  </span>
                  <span className="text-accent font-medium tracking-wide uppercase text-xs sm:text-sm">
                    Toiture &amp; couverture
                  </span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                  Ardoises
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
                  Spécialiste de l&apos;ardoise naturelle, Comarden vous propose une
                  sélection rigoureuse de matériaux pour des toitures durables,
                  esthétiques et performantes.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="hidden lg:block">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10">
                  <Image
                    src="/images/placeholder/ardoises-hero.jpg"
                    alt="Ardoises naturelles"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── ARDOISES NATURELLES ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4">
                Ardoises Naturelles
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                L&apos;ardoise naturelle est un matériau 100% naturel, prévu
                pour résister 100&nbsp;ans, durable et intemporel. Elle offre à
                chaque toiture une élégance unique, tout en garantissant une
                longévité exceptionnelle.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {naturalSlateFeatures.map((feature, i) => (
              <Reveal key={feature.title} delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 h-full hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-primary text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-1 w-8 rounded-full bg-accent" />
                <span className="text-sm font-semibold text-primary uppercase tracking-wide">
                  3 marques, 3 références qualité, 3 gammes de prix
                </span>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16">
                <Image
                  src="/images/logos/ardoisieres-de-fonsagrada-logo.png"
                  alt="Ardoisières de Fonsagrada"
                  width={160}
                  height={60}
                  className="h-10 sm:h-12 w-auto object-contain"
                />
                <Image
                  src="/images/logos/la-bana-logo.png"
                  alt="La Bana"
                  width={160}
                  height={60}
                  className="h-10 sm:h-12 w-auto object-contain"
                />
                <Image
                  src="/images/logos/cafersa-logo.png"
                  alt="Cafersa"
                  width={420}
                  height={160}
                  className="h-20 sm:h-24 w-auto object-contain"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ATG ARDOISES ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4">
                ATG Ardoises&nbsp;: Comprendre pour mieux vendre et intervenir
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
                Découvrez les ATG Ardoises, un outil indispensable pour les
                professionnels de la toiture. Cette formation vous permettra
                de&nbsp;:
              </p>
            </Reveal>

            <Reveal delay={100}>
              <ul className="space-y-4 mb-10 text-left max-w-lg mx-auto">
                {atgBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-base text-slate-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={200}>
              <Link
                href="/formations"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-3.5 rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Découvrir nos formations
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTACompact />
    </div>
  );
}

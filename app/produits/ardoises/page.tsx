import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Award,
  Leaf,
  Users,
  CheckCircle2,
} from "lucide-react";
import CTACompact from "@/components/sections/CTA";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Ardoises & Couverture - Comarden",
  description:
    "Découvrez notre gamme complète d\u2019ardoises naturelles, systèmes EPDM Elevate et solutions SOPREMA. Comarden, votre partenaire toiture en Belgique.",
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

const elevateProductsIndustrial = [
  { name: "RubberGard EPDM", description: "Membrane haute performance pour toitures plates commerciales et industrielles." },
  { name: "RubberGard EPDM SA", description: "Version auto-adhésive pour une pose simplifiée et rapide." },
];

const elevateProductsResidential = [
  { name: "RubberCover EPDM", description: "Solution EPDM dédiée aux toitures plates résidentielles." },
  { name: "RubberGutter EPDM SA", description: "Membrane spécialement conçue pour les chéneaux et gouttières." },
];

const sopremaArguments = [
  {
    icon: Award,
    title: "Qualité professionnelle reconnue",
    description:
      "Des produits certifiés et éprouvés, plébiscités par les professionnels du bâtiment à travers le monde.",
  },
  {
    icon: Shield,
    title: "Gamme complète pour les couvreurs",
    description:
      "Étanchéité, isolation, toiture plate : une réponse à chaque besoin technique de vos chantiers.",
  },
  {
    icon: Leaf,
    title: "Performance énergétique & durabilité",
    description:
      "Des solutions qui contribuent à l\u2019efficacité thermique et à la longévité des bâtiments.",
  },
  {
    icon: Users,
    title: "Expertise et proximité Comarden",
    description:
      "Un accompagnement technique personnalisé et un stock disponible en Belgique.",
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
          <Reveal>
            <div className="max-w-3xl">
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
                Ardoises &amp; Couverture
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
                Spécialiste de l&apos;ardoise et de la couverture, Comarden vous
                propose une sélection rigoureuse de matériaux pour des toitures
                durables, esthétiques et performantes.
              </p>
            </div>
          </Reveal>
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
              <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
                <Image
                  src="/images/logos/ardoisieres-de-fonsagrada-logo.png"
                  alt="Ardoisières de Fonsagrada"
                  width={160}
                  height={60}
                  className="h-10 sm:h-12 w-auto object-contain"
                />
                <Image
                  src="/images/logos/cedral-logo.png"
                  alt="Cedral"
                  width={160}
                  height={60}
                  className="h-10 sm:h-12 w-auto object-contain"
                />
                <Image
                  src="/images/logos/wienenberger-logo.png"
                  alt="Wienerberger"
                  width={160}
                  height={60}
                  className="h-10 sm:h-12 w-auto object-contain"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ELEVATE (EPDM) ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-red-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12">
              <div className="max-w-2xl">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                  ELEVATE
                </h2>
                <p className="text-lg sm:text-xl font-medium text-white/90 mb-2">
                  Comarden, distributeur officiel ELEVATE en Belgique
                </p>
                <p className="text-base text-white/75 leading-relaxed">
                  Les systèmes de toitures EPDM de Holcim Building Envelope
                  assurent une solution durable et fiable pour les applications
                  de toitures commerciales, industrielles et résidentielles.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Image
                  src="/images/logos/elevate-logo.png"
                  alt="Elevate"
                  width={180}
                  height={60}
                  className="h-12 sm:h-14 w-auto object-contain brightness-0 invert"
                />
              </div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Reveal delay={100}>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/60 mb-4">
                  Industriel / Commercial
                </h3>
                <div className="space-y-4">
                  {elevateProductsIndustrial.map((product) => (
                    <div
                      key={product.name}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/15 hover:bg-white/15 transition-colors"
                    >
                      <h4 className="font-semibold text-lg mb-1">
                        {product.name}
                      </h4>
                      <p className="text-sm text-white/70">
                        {product.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/60 mb-4">
                  Résidentiel
                </h3>
                <div className="space-y-4">
                  {elevateProductsResidential.map((product) => (
                    <div
                      key={product.name}
                      className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/15 hover:bg-white/15 transition-colors"
                    >
                      <h4 className="font-semibold text-lg mb-1">
                        {product.name}
                      </h4>
                      <p className="text-sm text-white/70">
                        {product.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/15">
              <Shield className="w-6 h-6 text-white/80 flex-shrink-0" />
              <p className="text-sm sm:text-base text-white/90">
                Bénéficiez des garanties solides d&apos;un des plus grands
                groupes mondiaux&nbsp;:{" "}
                <strong className="text-white">HOLCIM</strong>.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SOPREMA ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#003366] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12">
              <div className="max-w-2xl">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                  SOPREMA
                </h2>
                <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                  Comarden partenaire officiel SOPREMA. Comarden distribue en
                  Belgique la gamme complète SOPREMA, référence mondiale en
                  étanchéité, isolation et toiture plate.
                </p>
              </div>
              <div className="flex-shrink-0">
                <Image
                  src="/images/logos/soprema-logo.png"
                  alt="Soprema"
                  width={180}
                  height={60}
                  className="h-12 sm:h-14 w-auto object-contain"
                />
              </div>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sopremaArguments.map((arg, i) => {
              const Icon = arg.icon;
              return (
                <Reveal key={arg.title} delay={i * 100}>
                  <div className="bg-white rounded-2xl p-6 h-full shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-[#003366]/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-[#003366]" />
                    </div>
                    <h3 className="font-semibold text-[#003366] text-lg mb-2">
                      {arg.title}
                    </h3>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {arg.description}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
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

      {/* ── STACBOND — Nouveau service de découpe + CLIPS&GO 2.0 ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <Image
                src="/images/logos/stackbond-logo.png"
                alt="STACBOND"
                width={140}
                height={48}
                className="h-10 w-auto object-contain"
              />
              <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight">
                STACBOND — Nouveau service de découpe
              </h2>
            </div>
            <p className="text-slate-600 mb-10 max-w-3xl">
              Comarden a investi dans une toute nouvelle machine panneauteuse pour vous offrir plus de service, de qualité et de flexibilité pour vos chantiers. Découpe STACBOND, pliage et façonnage.
            </p>

            <p className="text-sm font-semibold text-primary mb-2">Accessoires CLIPS&GO 2.0</p>
            <p className="text-xs text-slate-500 mb-4">
              Système 2 pièces (profilé base + bourrelet), compatible bitume 4-5 mm, joint dilatation 5 mm / 3 mm.
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: "Rive 100 mm, longueur 3 m", color: "Noir 9005", type: "Rive" },
                { name: "Rive 70 mm, longueur 3 m", color: "Noir 9005", type: "Rive" },
                { name: "Arrêt 100 mm", color: "Noir 9005", type: "Arrêt" },
                { name: "Arrêt 70 mm", color: "Noir 9005", type: "Arrêt" },
                { name: "Coin intérieur 100 mm 30×30", color: "Noir 9005", type: "Coin intérieur" },
                { name: "Coin extérieur 100 mm 30×30", color: "Noir 9005", type: "Coin extérieur" },
                { name: "Raccord 100 mm", color: "Noir 9005", type: "Raccord" },
                { name: "Profil base 3 m", color: "BRUT", type: "Profilé de base" },
                { name: "Couvre-joint 100 mm", color: "Noir 9005", type: "Couvre-joint" },
                { name: "Easy Corner", color: "BRUT", type: "Angle" },
              ].map((item, i) => (
                <Reveal key={item.name} delay={i * 50}>
                  <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                    <span className="inline-flex w-fit px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 rounded mb-3">
                      ACCESSOIRE
                    </span>
                    <h3 className="font-bold text-primary text-sm sm:text-base mb-2 leading-tight">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-600 mb-1">
                      <span className="font-medium">Couleur :</span> {item.color}
                    </p>
                    <p className="text-xs text-slate-600 mt-auto">
                      <span className="font-medium">Type :</span> {item.type}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTACompact />
    </div>
  );
}

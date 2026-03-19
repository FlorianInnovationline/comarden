import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import CTACompact from "@/components/sections/CTA";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Isolation - Comarden",
  description:
    "Isolation de toiture par l'extérieur avec les piliers FAYNOT EASY-SARKLING à Comarden Bertrix et Naninne. Systèmes ITE brevetés, vis sarking et solutions URSA pour professionnels en Belgique.",
};

const montageStepsH120 = [
  "01 — Retirer l'ancien isolant, mettre la toiture à nu. Poser un écran pare-vapeur si nécessaire. Installer la 1ère couche d'isolant entre les chevrons existants.",
  "02 — Fixer chaque pilier directement sur les chevrons existants avec les tirefonds fournis. Positionner un pilier au croisement d'un chevron et d'une panne, deux piliers de part et d'autre de la panne sablière.",
  "03 — Dérouler la 2ème couche d'isolant d'épaisseur identique à la hauteur des piliers.",
  "04 — Fixer les nouveaux chevrons latéralement aux piliers avec les tirefonds fournis. Abouter les chevrons au faîtage si nécessaire.",
  "05 — Dérouler la 3ème couche d'isolant d'épaisseur identique à la hauteur des nouveaux chevrons.",
  "06 — Installer la couverture (écran souple, liteaux, tuiles ou ardoises) comme pour une charpente traditionnelle.",
];

const mainProducts = [
  {
    title: "PILIER ITE H120 SUPPORT CHEVRONS — Isolation de toiture par l'extérieur (FAYNOT)",
    brand: "FAYNOT",
    description:
      "Système breveté pour isolation toiture par l'extérieur sans dérangement intérieur. Acier galvanisé à chaud Z275. Résistance thermique R = 5,7 m².K/W (200mm isolant total, λ35). Fixation sur tôle métallique ondulée, en creux d'onde. Compatible tous isolants souples : laine de verre, laine de roche, fibre de bois, chanvre.",
    avantages: [
      "Isolation par l'extérieur : préservez votre espace intérieur",
      "Aucun pont thermique : piliers entièrement enveloppés dans le complexe isolant",
      "Système breveté et calculé : solidité certifiée",
      "Compatible tous isolants souples",
      "Correction planéité jusqu'à 40 mm avec calage complémentaire",
      "Pas de formation spécifique requise",
    ],
    specs: [
      "R = 5,7 m².K/W",
      "200 mm isolant total λ35",
      "Acier galvanisé Z275",
      "Système breveté",
      "Zéro pont thermique",
      "ITE couverture",
    ],
    shopSlug: "pilier-ite-h120",
    steps: montageStepsH120,
  },
  {
    title: "PILIER ITE H80 — Isolation de toiture par l'extérieur (FAYNOT)",
    brand: "FAYNOT",
    description:
      "Même système que le H120 pour une épaisseur d'isolant réduite. R = 4,5 m².K/W (160mm isolant total, λ35). Fixation sur tôle métallique ondulée, en creux d'onde. Aucun pont thermique, compatible tous isolants souples.",
    avantages: [
      "Isolation par l'extérieur : préservez votre espace intérieur",
      "Aucun pont thermique",
      "Système breveté et calculé",
      "Compatible tous isolants souples",
      "Correction planéité jusqu'à 40 mm",
      "Pas de formation spécifique requise",
    ],
    specs: [
      "R = 4,5 m².K/W",
      "160 mm isolant total λ35",
      "Acier galvanisé Z275",
      "Système breveté",
      "Zéro pont thermique",
      "ITE couverture",
    ],
    shopSlug: "pilier-ite-h80",
  },
];

const kitProducts = [
  {
    title: "KIT ITE H120 — Pilier + Vis tête fraisée Super Bois Ø8 (FAYNOT)",
    brand: "FAYNOT",
    description:
      "Kit complet incluant le pilier H120 et la vis tête fraisée Super Bois zinguée diamètre 8 pour bois (SARKING). Solution tout-en-un pour installation rapide et complète.",
  },
  {
    title: "KIT ITE H80 — Pilier + Vis tête fraisée Super Bois Ø8 (FAYNOT)",
    brand: "FAYNOT",
    description:
      "Kit complet incluant le pilier H80 + vis sarking. R = 4,5 m².K/W. Solution tout-en-un pour installation rapide et complète.",
  },
];

export default function IsolationPage() {
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
                  Performance thermique
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                Isolation
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
                Isolation de toiture par l&apos;extérieur avec les piliers FAYNOT EASY-SARKLING. Systèmes ITE brevetés, vis sarking et solutions URSA à Bertrix et Naninne.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── URSA ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-start gap-6">
              <div className="flex-shrink-0">
                <Image
                  src="/images/logos/ursa-by-etex-logo.png"
                  alt="URSA by Etex"
                  width={160}
                  height={60}
                  className="object-contain h-12 w-auto"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4">
                  URSA — Isolation durable en Belgique chez Comarden
                </h2>
                <p className="text-slate-600 font-medium mb-2">URSA, marque du groupe Etex</p>
                <div className="bg-primary/5 border-l-4 border-accent rounded-r-xl px-6 py-5">
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                    Chez Comarden à Naninne et Bertrix, découvrez les solutions d&apos;isolation URSA, leader européen du groupe Etex, pour des bâtiments plus performants et respectueux de l&apos;environnement. URSA propose des panneaux isolants, toitures isolées et solutions acoustiques, adaptés aux projets résidentiels, industriels et commerciaux en Belgique et au BENELUX. Grâce à ce partenariat stratégique, Comarden et URSA offrent performance énergétique, durabilité et finitions de qualité, avec un service rapide et des produits sur mesure. Optimisez vos bâtiments dès aujourd&apos;hui : contactez Comarden pour un devis rapide et profitez des solutions d&apos;isolation fiables et certifiées URSA.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PAVATEX ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mb-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4">
                PAVATEX — Fibre de bois
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
                Isolation en fibre de bois pour la toiture : confort été/hiver, régulation hygrométrique et performance durable. Solutions adaptées aux toitures inclinées en rénovation ou neuf.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  "Confort d'été supérieur (inertie)",
                  "Matériau 100% naturel",
                  "Bonne régulation de l'humidité",
                  "Compatible sarking / sous-toiture",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <span className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                    <p className="text-sm text-slate-700">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STEICO ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-4 mb-4">
              <Image
                src="/images/logos/steico-logo.png"
                alt="STEICO"
                width={140}
                height={50}
                className="h-8 sm:h-10 w-auto object-contain"
              />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight">
                Isolation fibre de bois pour toiture
              </h2>
            </div>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mb-10">
              Une isolation toiture haute performance, <strong className="text-primary">100 % naturelle</strong>, qui régule la chaleur en été comme en hiver et répond aux exigences RE2020.
            </p>
          </Reveal>

          <Reveal delay={50}>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
              {[
                { title: "Confort d\u2019été supérieur", text: "La densité élevée de la fibre de bois lui confère une inertie thermique exceptionnelle — elle ralentit la chaleur estivale bien mieux que la laine minérale." },
                { title: "Confort d\u2019hiver", text: "Excellente performance thermique pour une toiture plus stable et plus agréable en toutes saisons." },
                { title: "Acoustique", text: "Réduction des bruits d\u2019impact et amélioration significative du confort sonore intérieur." },
              ].map((b) => (
                <div key={b.title} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:shadow-md transition-shadow">
                  <h3 className="text-base font-bold text-primary mb-2">{b.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{b.text}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="bg-primary rounded-2xl p-6 sm:p-8 text-white overflow-hidden relative">
              <div className="absolute inset-0 opacity-25 bg-[radial-gradient(ellipse_at_top_right,rgba(245,208,0,0.35),transparent_60%)]" />
              <div className="relative">
                <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-2">Points clés</p>
                <h3 className="text-xl sm:text-2xl font-bold mb-6">Pourquoi choisir la fibre de bois ?</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    "Améliore le confort du bâtiment et l\u2019environnement urbain",
                    "Protection de l\u2019étanchéité (EPDM / bitume) et durée de vie prolongée",
                    "Systèmes adaptés aux toitures plates ou inclinées",
                    "Pose professionnelle, solutions fiables et durables",
                  ].map((p) => (
                    <div key={p} className="rounded-xl bg-white/10 border border-white/15 p-4">
                      <p className="text-sm text-white/90 leading-relaxed">{p}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FAYNOT ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mb-10">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4">
                FAYNOT — Systèmes ITE couverture
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
                Le système breveté FAYNOT pour l&apos;isolation thermique de toiture par l&apos;extérieur. Performances élevées sans perte d&apos;espace intérieur.
              </p>
            </div>
          </Reveal>

          <div className="grid sm:grid-cols-2 gap-6">
            {kitProducts.map((kit, i) => (
              <Reveal key={kit.title} delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow h-full">
                  <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">
                    {kit.brand}
                  </p>
                  <h3 className="text-lg sm:text-xl font-bold text-primary mb-3">
                    {kit.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {kit.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PILIER ITE ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4">
                Pilier ITE — EASY-SARKLING / Support chevrons
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl">
                Piliers ITE FAYNOT pour isolation de toiture par l&apos;extérieur : H120 et H80. Compatible laine minérale et fibre de bois, zéro pont thermique.
              </p>
            </div>
          </Reveal>

          <div className="space-y-6">
            {mainProducts.map((product, i) => (
              <Reveal key={product.title} delay={i * 100}>
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                    <div className="flex-1">
                      <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">
                        {product.brand}
                      </p>
                      <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3">
                        {product.title}
                      </h3>
                      <p className="text-base text-slate-600 leading-relaxed mb-4">
                        {product.description}
                      </p>

                      {"avantages" in product && product.avantages && product.avantages.length > 0 && (
                        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 mb-4">
                          {product.avantages.map((a, idx) => (
                            <li key={idx}>{a}</li>
                          ))}
                        </ul>
                      )}

                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.specs.map((spec) => (
                          <span
                            key={spec}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/5 text-primary border border-primary/10"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>

                      {"steps" in product && product.steps && (
                        <div className="mt-6">
                          <p className="text-sm font-semibold text-primary mb-3">Montage en 6 étapes</p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {product.steps.map((step, stepIdx) => (
                              <div
                                key={stepIdx}
                                className="flex items-start gap-2 rounded-xl bg-slate-50 border border-slate-200 px-4 py-3"
                              >
                                <span className="flex-shrink-0 text-xs font-bold text-primary">
                                  {step.slice(0, 4)}
                                </span>
                                <span className="text-sm text-slate-700">{step.slice(4).trim()}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {product.shopSlug && (
                      <div className="flex-shrink-0">
                        <Link
                          href={`/shop/produit/${product.shopSlug}`}
                          className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm"
                        >
                          Voir dans le magasin
                          <ShoppingCart className="w-4 h-4" />
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTACompact />
    </div>
  );
}

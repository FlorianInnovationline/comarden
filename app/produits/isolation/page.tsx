import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
import CTACompact from "@/components/sections/CTA";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Isolation - Comarden",
  description:
    "Solutions d\u2019isolation pour toiture et bâtiment : PILIER EASY-SARKLING FAYNOT, URSA, ETANCO, ELEVATE, DuPont Tyvek. Disponible chez Comarden en Belgique.",
};

const montageSteps = [
  "01 Retirer ancien isolant / pare-vapeur / 1ère couche",
  "02 Fixer piliers avec tirefonds",
  "03 Dérouler 2ème couche",
  "04 Fixer nouveaux chevrons",
  "05 Dérouler 3ème couche",
  "06 Poser couverture",
];

const mainProducts = [
  {
    title: "PILIER EASY-SARKLING — H120",
    brand: "FAYNOT",
    description:
      "Système breveté d\u2019isolation de toiture par l\u2019extérieur (SARKING). Préserve l\u2019espace intérieur habitable et élimine les ponts thermiques pour une performance énergétique optimale. Acier galvanisé Z275.",
    specs: [
      "R = 5,7 m².K/W",
      "200 mm d\u2019isolant total \u03BB35",
      "Acier galvanisé Z275",
      "Système breveté",
      "Zéro pont thermique",
      "ITE couverture",
    ],
    link: "https://www.faynot.com/isolation-thermique-exterieur/ite-couverture/piliers-et-accessoires.html",
    steps: montageSteps,
  },
  {
    title: "PILIER ITE H80",
    brand: "FAYNOT",
    description:
      "Version compacte du système EASY-SARKING pour les projets nécessitant une épaisseur d\u2019isolant réduite, tout en conservant d\u2019excellentes performances thermiques.",
    specs: [
      "R = 4,5 m².K/W",
      "160 mm d\u2019isolant total",
      "\u03BB35",
      "Système breveté",
      "Zéro pont thermique",
      "ITE couverture",
    ],
    link: "https://www.faynot.com/isolation-thermique-exterieur/ite-couverture/piliers-et-accessoires.html",
  },
];

const kitProducts = [
  {
    title: "Kit H120 + Vis SARKING",
    brand: "FAYNOT",
    description:
      "Kit complet comprenant les piliers H120 et les vis SARKING adaptées pour une installation rapide et conforme du système d\u2019isolation par l\u2019extérieur. Vis tête fraisée Super Bois zinguée Ø8 (SARKING).",
  },
  {
    title: "Kit H80 + Vis SARKING",
    brand: "FAYNOT",
    description:
      "Kit complet comprenant les piliers H80 et les vis SARKING adaptées. Solution prête à poser pour l\u2019ITE couverture. Vis tête fraisée Super Bois zinguée Ø8 (SARKING).",
  },
];

const accessoryProducts = [
  {
    title: "Tyvek Mastic AirGuard®",
    brand: "DUPONT",
    description:
      "Mastic adhésif pour la réalisation de joints étanches à l\u2019air dans les systèmes d\u2019isolation. Assure la continuité de la barrière d\u2019étanchéité à l\u2019air autour des pénétrations et raccords.",
    specs: ["Étanchéité à l\u2019air", "Joints durables", "Compatible Tyvek"],
    link: "https://www.dupontdenemours.fr/products/mastic-airguard.html",
  },
  {
    title: "Bande adhésive DuPont Tyvek FlexWrap NF",
    brand: "DUPONT",
    description:
      "Bande adhésive flexible auto-adhésive pour le traitement étanche des raccords et pénétrations complexes. S\u2019adapte aux formes irrégulières pour une étanchéité parfaite.",
    specs: ["Auto-adhésive", "Flexible", "Raccords complexes", "Pénétrations"],
    link: "https://www.dupontdenemours.be/fr/products/dupont-tyvek-flexwrap-flashing-tape.html",
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
                Solutions d&apos;isolation performantes pour toiture et bâtiment.
                Systèmes SARKING FAYNOT, isolants URSA et accessoires DuPont
                Tyvek.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PILIER EASY-SARKLING / ITE ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mb-12 flex items-center gap-4 flex-wrap">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight">
                PILIER EASY-SARKLING / ITE — Isolation par l&apos;extérieur
              </h2>
              <span className="text-sm font-semibold text-slate-600">FAYNOT</span>
            </div>
          </Reveal>
          <Reveal>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-10 max-w-3xl">
              Le système breveté FAYNOT pour l&apos;isolation thermique de toiture
              par l&apos;extérieur. Performances élevées sans perte d&apos;espace
              intérieur.
            </p>
          </Reveal>

          <div className="space-y-6 mb-8">
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
                                <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center text-sm font-bold">
                                  {String(stepIdx + 1).padStart(2, "0")}
                                </span>
                                <span className="text-sm text-slate-700">{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    {product.link && (
                      <div className="flex-shrink-0">
                        <a
                          href={product.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm"
                        >
                          Fiche produit
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Kit cards */}
          <div className="grid sm:grid-cols-2 gap-6">
            {kitProducts.map((kit, i) => (
              <Reveal key={kit.title} delay={(i + 2) * 100}>
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

      {/* ── VIS ISOLANTS ETANCO ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-4 mb-8 flex-wrap">
              <Image
                src="/images/logos/etanco-logo.png"
                alt="Etanco"
                width={120}
                height={48}
                className="object-contain h-10 w-auto"
              />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight">
                Vis isolants Étanco
              </h2>
            </div>
          </Reveal>
          <p className="text-slate-600 font-medium mb-6">ETANCO</p>
          <Reveal>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8 max-w-3xl">
              Cheville monobloc polyamide renforcé fibre de verre pour la fixation
              des isolants en rénovation de toiture. Tête Ø50 mm, empreinte carrée
              6 mm. Pas de pré-perçage, aucune corrosion, aucun pont thermique.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            <Reveal delay={100}>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-primary mb-2">VIS SAPIN SK-RB 28/20×70</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Fixation isolants rénovation toiture. Applications : fixation
                  isolant sur étanchéité bitumineuse, 2 couches isolant, pare-pluie
                  façade, bandes périphériques.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-primary mb-2">VIS SAPIN SK-RB 28/40×90</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Même principe pour épaisseurs plus importantes. Applications :
                  fixation isolant sur étanchéité bitumineuse, 2 couches isolant,
                  pare-pluie façade, bandes périphériques.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── ANCRAGE PHOTOVOLTAÏQUE TOITURE PLATE (ELEVATE) ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-4 mb-6 flex-wrap">
              <Image
                src="/images/logos/elevate-logo.png"
                alt="Holcim Elevate"
                width={120}
                height={48}
                className="object-contain h-10 w-auto"
              />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight">
                Ancrage photovoltaïque toiture plate
              </h2>
            </div>
          </Reveal>
          <p className="text-slate-600 font-medium mb-4">ELEVATE</p>
          <Reveal>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 max-w-3xl">
              Système pour toiture terrasse photovoltaïque : membrane pare-vapeur +
              isolation + étanchéité, fixation traversante. Solution complète pour
              l&apos;intégration du photovoltaïque sur toitures plates.
            </p>
          </Reveal>
          <Reveal>
            <a
              href="https://www.holcimelevate.com/benelux-fr/etancheite-de-toitures/applications/toitures-systeme-photovoltaique"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm"
            >
              Voir l&apos;application toitures système photovoltaïque
              <ExternalLink className="w-4 h-4" />
            </a>
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
                  URSA — Isolation haute performance
                </h2>
                <p className="text-slate-600 font-medium mb-2">URSA, marque du groupe Etex</p>
                <div className="bg-primary/5 border-l-4 border-accent rounded-r-xl px-6 py-5">
                  <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                    Chez Comarden à Naninne et Bertrix, découvrez les solutions
                    d&apos;isolation URSA, leader européen du groupe Etex, pour des
                    bâtiments plus performants. Grâce à ce partenariat stratégique,
                    Comarden et URSA offrent performance énergétique, durabilité et
                    finitions de qualité, avec un service rapide et des produits sur
                    mesure.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── DUPONT TYVEK ACCESSORIES ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4">
                Accessoires d&apos;étanchéité à l&apos;air
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Produits DuPont Tyvek pour garantir la continuité de
                l&apos;étanchéité à l&apos;air de vos systèmes d&apos;isolation.
              </p>
            </div>
          </Reveal>

          <div className="space-y-6">
            {accessoryProducts.map((product, i) => (
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

                      <div className="flex flex-wrap gap-2">
                        {product.specs.map((spec) => (
                          <span
                            key={spec}
                            className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/5 text-primary border border-primary/10"
                          >
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex-shrink-0">
                      <a
                        href={product.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm"
                      >
                        Fiche produit
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
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

import type { Metadata } from "next";
import Image from "next/image";
import { ExternalLink } from "lucide-react";
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
    link: "https://www.faynot.com/isolation-thermique-exterieur/ite-couverture/piliers-et-accessoires.html",
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
    link: "https://www.faynot.com/isolation-thermique-exterieur/ite-couverture/piliers-et-accessoires.html",
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
                Isolation — Piliers ITE, systèmes FAYNOT &amp; solutions URSA
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
                Isolation de toiture par l&apos;extérieur avec les piliers FAYNOT EASY-SARKLING. Systèmes ITE brevetés, vis sarking et solutions URSA à Bertrix et Naninne.
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
              Cheville monobloc à visser en polyamide renforcé fibre de verre pour fixation d&apos;isolants en rénovation de toiture. Tête large Ø50 mm avec empreinte carrée 6 mm pour parfaite tenue.
            </p>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6">
            <Reveal delay={100}>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-primary mb-2">Vis SAPIN SK-RB 28/20×70 — Fixation d&apos;isolants (ETANCO)</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  Applications : fixation isolant sur étanchéité bitumineuse en rénovation / fixation deux couches d&apos;isolants ensemble / fixation isolants rigides sur rigides (Rockbardage, Cladisol) / fixation pare-pluie façade / fixation bandes périphériques.
                </p>
                <p className="text-xs text-slate-600">Avantages : pas de pré-perçage / installation simple embout carré 6 mm / aucune corrosion (polyamide) / aucun pont thermique / excellente tenue mécanique tête large Ø50 mm.</p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200">
                <h3 className="text-lg font-bold text-primary mb-2">Vis SAPIN SK-RB 28/40×90 — Fixation d&apos;isolants (ETANCO)</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Même description, longueur différente (40×90 au lieu de 20×70). Applications : fixation isolant sur étanchéité bitumineuse, deux couches isolant, pare-pluie façade, bandes périphériques.
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
                Ancrage Photovoltaïque Toiture Plate — Système ELEVATE
              </h2>
            </div>
          </Reveal>
          <p className="text-slate-600 font-medium mb-4">ELEVATE</p>
          <Reveal>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-4 max-w-3xl">
              Système de toiture terrasse photovoltaïque durable. Membrane pare-vapeur + couche isolation + membrane d&apos;étanchéité sur laquelle sont installés les panneaux solaires. Étanchéité parfaite autour des points de fixation traversante pour imperméabilité totale du système.
            </p>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-6 max-w-3xl">
              Enjeu : si la membrane de toiture est endommagée, les panneaux solaires doivent être retirés — d&apos;où l&apos;importance de composants de haute qualité dès la conception.
            </p>
          </Reveal>
          <Reveal>
            <a
              href="https://www.holcimelevate.com/benelux-fr/etancheite-de-toitures/applications/toitures-système-photovoltaïque"
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

import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import CTACompact from "@/components/sections/CTA";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Isolation - Comarden",
  description:
    "Solutions d\u2019isolation pour toiture et bâtiment : EASY-SARKING FAYNOT, URSA, DuPont Tyvek. Disponible chez Comarden en Belgique.",
};

const mainProducts = [
  {
    title: "EASY-SARKING — Pilier ITE H120",
    brand: "FAYNOT",
    description:
      "Système breveté d\u2019isolation de toiture par l\u2019extérieur (SARKING). Préserve l\u2019espace intérieur habitable et élimine les ponts thermiques pour une performance énergétique optimale.",
    specs: [
      "R = 5,7 m².K/W",
      "200 mm d\u2019isolant total",
      "\u03BB35",
      "Système breveté",
      "Zéro pont thermique",
      "ITE couverture",
    ],
    link: "https://www.faynot.com/isolation-thermique-exterieur/ite-couverture/piliers-et-accessoires.html",
  },
  {
    title: "EASY-SARKING — Pilier ITE H80",
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
      "Kit complet comprenant les piliers H120 et les vis SARKING adaptées pour une installation rapide et conforme du système d\u2019isolation par l\u2019extérieur.",
  },
  {
    title: "Kit H80 + Vis SARKING",
    brand: "FAYNOT",
    description:
      "Kit complet comprenant les piliers H80 et les vis SARKING adaptées. Solution prête à poser pour l\u2019ITE couverture.",
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

      {/* ── EASY-SARKING PRODUCTS ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4">
                EASY-SARKING — Isolation par l&apos;extérieur
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Le système breveté FAYNOT pour l&apos;isolation thermique de toiture
                par l&apos;extérieur. Performances élevées sans perte d&apos;espace
                intérieur.
              </p>
            </div>
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

      {/* ── URSA ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-6">
                URSA — Isolation haute performance
              </h2>
              <div className="bg-primary/5 border-l-4 border-accent rounded-r-xl px-6 py-5">
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
                  Chez Comarden à Naninne et Bertrix, découvrez les solutions
                  d&apos;isolation URSA, leader européen du groupe Etex, pour des
                  bâtiments plus performants et respectueux de
                  l&apos;environnement. URSA propose des panneaux isolants,
                  toitures isolées et solutions acoustiques, adaptés aux projets
                  résidentiels, industriels et commerciaux en Belgique et au
                  BENELUX.
                </p>
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

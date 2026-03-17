import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingCart, ExternalLink } from "lucide-react";
import CTACompact from "@/components/sections/CTA";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Visserie & Fixations - Comarden",
  description:
    "Vis, fixations et accessoires pour toiture, bardage et isolation. FAYNOT, ETANCO. Disponible chez Comarden en Belgique.",
};

const ralColors = [
  "1015", "2001", "5008", "6011", "7006", "7015",
  "7016", "7022", "7037", "8012", "8014", "9002",
  "9005", "9006", "9007", "9010",
];

const products = [
  {
    title: "Vis tête rivet autoperceuse — P1 Ø6,3×18mm",
    brand: "FAYNOT",
    description:
      "Vis autoforeuses P1 Ø6,3×18mm pour fixation de tôles et accessoires de bardage. Solution rapide et fiable pour les professionnels de la couverture et du bardage.",
    specs: ["Acier inox A2", "Zingué", "TK12", "Vendu par 100 pièces"],
    ral: true,
    shopSlug: "vis-tete-rivet-p1-faynot",
  },
  {
    title: "Vis tête fraisée Super Bois zinguée Ø8",
    brand: "FAYNOT",
    description:
      "Vis spécialement conçue pour les systèmes SARKING et l\u2019isolation de toiture par l\u2019extérieur (ITE). Fixation performante dans le bois pour une tenue optimale de l\u2019isolant.",
    specs: ["SARKING / ITE couverture", "Tête fraisée", "Zinguée", "Ø8"],
    shopSlug: "vis-super-bois-sarking-faynot",
  },
  {
    title: "Cheville MARCOVIS FM-X3/PA + Vis TF/Zn",
    brand: "ETANCO",
    description:
      "Cheville universelle haute performance pour des fixations fiables dans de multiples supports. Idéale pour les applications de façade, charpente et gros œuvre.",
    specs: [
      "Fixation façade",
      "Charpente",
      "Béton",
      "Brique",
      "Parpaing",
      "Haute performance",
    ],
    shopSlug: "marcovis-fm-x3-etanco",
  },
  {
    title: "Dispositif anti-faune / anti-pigeons",
    brand: "Accessoire toiture",
    description:
      "Pointes en acier inoxydable sur base polycarbonate pour la protection des toitures, corniches, façades et panneaux solaires contre les nuisibles.",
    specs: [
      "Acier inoxydable",
      "Base polycarbonate",
      "64 pointes/ml",
      "Modules 50 cm",
    ],
  },
  {
    title: "Grille anti-rongeur GAR",
    brand: "Simpson Strong-Tie",
    description:
      "Grille de protection pour bardage ventilé contre les rongeurs et insectes. Solution discrète et durable pour préserver l\u2019intégrité de vos façades ventilées.",
    specs: ["Acier S250GD", "Finition ZPRO", "Rouleaux de 25 m"],
    shopSlug: "grille-anti-rongeur-gar-simpson",
  },
];

export default function VisseriePage() {
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
                  Fixations &amp; accessoires
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                Visserie &amp; Fixations
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
                Vis, chevilles et accessoires de fixation pour toiture, bardage et
                isolation. Des marques de référence : FAYNOT, ETANCO, Simpson
                Strong-Tie.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4">
                Notre gamme de fixations
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Des solutions de fixation professionnelles pour chaque application :
                couverture, bardage, isolation et protection.
              </p>
            </div>
          </Reveal>

          <div className="space-y-6">
            {products.map((product, i) => (
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

                      {product.ral && (
                        <div>
                          <p className="text-sm font-semibold text-slate-700 mb-2">
                            Coloris RAL disponibles :
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {ralColors.map((ral) => (
                              <span
                                key={ral}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-mono font-medium bg-slate-100 text-slate-600 border border-slate-200"
                              >
                                {ral}
                              </span>
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

      {/* ── VIS SAPIN SK-RB — ETANCO ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mb-10">
              <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">ETANCO</p>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4">
                Vis Sapin SK-RB — Fixation d&apos;isolants
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Cheville monobloc à visser en polyamide renforcé fibre de verre. Tête large Ø50 mm,
                empreinte carrée 6 mm. Pas de pré-perçage, aucune corrosion, aucun pont thermique.
              </p>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { ref: "SK-RB 28/20×70", usage: "1 couche isolant 20 mm" },
              { ref: "SK-RB 28/40×90", usage: "Isolant 40 mm" },
              { ref: "SK-RB 28/60×110", usage: "Isolant 60 mm" },
              { ref: "SK-RB 28/120×175", usage: "Isolant 120 mm" },
            ].map((vis, i) => (
              <Reveal key={vis.ref} delay={i * 80}>
                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition-shadow h-full">
                  <span className="inline-flex w-fit px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent bg-accent/10 rounded mb-3">
                    ETANCO
                  </span>
                  <h3 className="font-bold text-primary text-base mb-2">{vis.ref}</h3>
                  <p className="text-xs text-slate-600">Tête Ø50 mm — {vis.usage}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={400}>
            <div className="mt-6">
              <a
                href="https://www.etanco.fr"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm"
              >
                Voir sur etanco.fr
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTACompact />
    </div>
  );
}

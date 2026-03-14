import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import CTACompact from "@/components/sections/CTA";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "EPDM & Étanchéité - Comarden",
  description:
    "Membranes EPDM d\u2019étanchéité pour toitures plates : Elevate RubberGard, Sopraguard Stick. Solutions professionnelles disponibles chez Comarden en Belgique.",
};

const products = [
  {
    title: "Elevate RubberGard EPDM SA",
    brand: "ELEVATE (Holcim)",
    description:
      "Membrane EPDM auto-adhésive haute performance grâce à la technologie Secure Bond. Installation possible jusqu\u2019à -7\u00A0°C, sans flamme ni colle. Durée de vie supérieure à 50\u00A0ans avec une résistance exceptionnelle aux UV et à l\u2019ozone.",
    specs: [
      "Auto-adhésive",
      "Secure Bond Technology",
      "Pose jusqu\u2019à -7\u00A0°C",
      "Durée de vie > 50 ans",
      "Résistant UV / ozone",
    ],
    link: "https://www.holcimelevate.com/benelux-fr/etancheite-de-toitures/epdm/rubbergard-epdm-sa",
  },
  {
    title: "Sopraguard Stick — Membrane EPDM auto-adhésive",
    brand: "SOPREMA",
    description:
      "Membrane EPDM auto-adhésive en rouleaux de 30\u00A0m, épaisseur 1,14\u00A0mm. Solution performante et rapide à mettre en œuvre pour l\u2019étanchéité des toitures plates résidentielles et commerciales.",
    specs: [
      "Auto-adhésive",
      "Rouleaux 30 m",
      "Épaisseur 1,14 mm",
      "Toitures plates",
    ],
    link: "https://sopraguard.com/en/products/sopraguard-stick",
  },
  {
    title: "Ancrage Photovoltaïque Toiture Plate",
    brand: "ELEVATE (Holcim)",
    description:
      "Solution d\u2019étanchéité spécialement conçue pour les toitures plates équipées de panneaux solaires. Garantit l\u2019intégrité de la membrane lors de l\u2019installation et de l\u2019exploitation des systèmes photovoltaïques.",
    specs: [
      "Compatible panneaux solaires",
      "Étanchéité garantie",
      "Toitures plates",
    ],
    link: "https://www.holcimelevate.com/benelux-fr/etancheite-de-toitures/applications/toitures-syst\u00E8me-photovolta\u00EFque",
  },
];

export default function EpdmPage() {
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
                  Étanchéité toiture
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                EPDM &amp; Étanchéité
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
                Membranes EPDM haute performance pour l&apos;étanchéité de vos
                toitures plates. Solutions Elevate et SOPREMA disponibles chez
                Comarden.
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
                Nos solutions EPDM
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Des membranes d&apos;étanchéité de référence pour des toitures
                plates durables, fiables et faciles à mettre en œuvre.
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

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Shield, Award, Leaf, Users, ShoppingCart } from "lucide-react";
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
    shopSlug: "rubbergard-epdm-sa-elevate",
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
    shopSlug: "sopraguard-stick-epdm",
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
    shopSlug: "ancrage-photovoltaique-elevate",
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

      {/* ── ELEVATE ── */}
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
                  Les systèmes de toitures EPDM de Holcim Building Envelope assurent une solution durable et fiable pour les applications de toitures commerciales, industrielles et résidentielles.
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
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/60 mb-4">Industriel / Commercial</h3>
                <div className="space-y-4">
                  {[
                    { name: "RubberGard EPDM", description: "Membrane haute performance pour toitures plates commerciales et industrielles." },
                    { name: "RubberGard EPDM SA", description: "Version auto-adhésive pour une pose simplifiée et rapide." },
                  ].map((product) => (
                    <div key={product.name} className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/15 hover:bg-white/15 transition-colors">
                      <h4 className="font-semibold text-lg mb-1">{product.name}</h4>
                      <p className="text-sm text-white/70">{product.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/60 mb-4">Résidentiel</h3>
                <div className="space-y-4">
                  {[
                    { name: "RubberCover EPDM", description: "Solution EPDM dédiée aux toitures plates résidentielles." },
                    { name: "RubberGutter EPDM SA", description: "Membrane spécialement conçue pour les chéneaux et gouttières." },
                  ].map((product) => (
                    <div key={product.name} className="bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/15 hover:bg-white/15 transition-colors">
                      <h4 className="font-semibold text-lg mb-1">{product.name}</h4>
                      <p className="text-sm text-white/70">{product.description}</p>
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
                Bénéficiez des garanties solides d&apos;un des plus grands groupes mondiaux&nbsp;: <strong className="text-white">HOLCIM</strong>.
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
                  Comarden partenaire officiel SOPREMA. Comarden distribue en Belgique la gamme complète SOPREMA, référence mondiale en étanchéité, isolation et toiture plate.
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
            {[
              { icon: Award, title: "Qualité professionnelle reconnue", description: "Des produits certifiés et éprouvés, plébiscités par les professionnels du bâtiment à travers le monde." },
              { icon: Shield, title: "Gamme complète pour les couvreurs", description: "Étanchéité, isolation, toiture plate : une réponse à chaque besoin technique de vos chantiers." },
              { icon: Leaf, title: "Performance énergétique & durabilité", description: "Des solutions qui contribuent à l\u2019efficacité thermique et à la longévité des bâtiments." },
              { icon: Users, title: "Expertise et proximité Comarden", description: "Un accompagnement technique personnalisé et un stock disponible en Belgique." },
            ].map((arg, i) => {
              const Icon = arg.icon;
              return (
                <Reveal key={arg.title} delay={i * 100}>
                  <div className="bg-white rounded-2xl p-6 h-full shadow-sm hover:shadow-md transition-shadow">
                    <div className="w-10 h-10 rounded-xl bg-[#003366]/10 flex items-center justify-center mb-4">
                      <Icon className="w-5 h-5 text-[#003366]" />
                    </div>
                    <h3 className="font-semibold text-[#003366] text-lg mb-2">{arg.title}</h3>
                    <p className="text-sm text-slate-500 leading-relaxed">{arg.description}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTACompact />
    </div>
  );
}

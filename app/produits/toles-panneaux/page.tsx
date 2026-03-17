import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import CTACompact from "@/components/sections/CTA";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Tôles acier et couvertures industrielles - Comarden",
  description:
    "Tôles sèches, panneaux isolants, revêtements métalliques et fibrociment. ISOPAN, JORISIDE, Lattonedil, REX Panels. Naninne & Bertrix.",
};

const stockItems = [
  "Tôles sèches pour toiture ou bardage",
  "Tôles sèches avec feutre anti-condensation",
  "Panneaux isolants 4 cm",
  "Panneaux isolants 4 cm avec finition intérieure (showrooms)",
  "Tôle profilée simple (1000-100-10)",
];

const seoBullets = [
  "Gamme complète et disponible immédiatement",
  "Qualité certifiée et durabilité",
  "Découpe sur mesure et accessoires personnalisés",
  "Marques de confiance : ISOPAN, JORISIDE, Lattonedil, REX Panels",
];

const brands = [
  { name: "ISOPAN", logo: null },
  { name: "JORISIDE", logo: "/images/logos/joriside-logo.png" },
  { name: "Lattonedil", logo: null },
  { name: "REX Panels", logo: null },
];

export default function TolesPanneauxPage() {
  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative py-16 sm:py-20 lg:py-28 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a2f4a] via-primary to-[#2B4162]" />
          <div
            className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(245,192,0,0.4) 0%, transparent 70%)",
              top: "10%",
              right: "-10%",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <span className="text-accent font-medium tracking-wide uppercase text-xs sm:text-sm mb-6 inline-block">
                Tôles & panneaux
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                Tôles acier et couvertures industrielles chez Comarden — Naninne & Bertrix
              </h1>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                Revêtements métalliques, panneaux sandwich et fibrociment pour toitures industrielles et agricoles.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Stock disponible */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight mb-4">
              Stock disponible à Naninne et Bertrix
            </h2>
            <p className="text-slate-600 mb-6">
              Dimensions principales en stock : 1000-250-(10-38-40)
            </p>
            <ul className="space-y-2">
              {stockItems.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Toitures industrielles */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight mb-4">
              Toitures industrielles et agricoles en acier ou fibrociment
            </h2>
            <p className="text-slate-600 mb-6">
              COMARDEN est importateur BENELUX des produits ISOPAN et distribue également JORISIDE, Lattonedil et REX Panels.
            </p>
            <ul className="space-y-2 text-slate-700 mb-4">
              <li>• Revêtements métalliques : 3 modèles de tôles sèches en plusieurs couleurs + 2 types panneaux sandwich</li>
              <li>• Plaques en fibrociment : incombustibles, résistantes humidité, bâtiments industriels et agricoles</li>
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Découpe sur mesure */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight mb-4">
              Découpe sur mesure et accessoires façonnés
            </h2>
            <p className="text-slate-600">
              Nos bancs de coupe à Naninne et Bertrix réalisent sur mesure tôles et panneaux adaptés à vos dimensions. Accessoires de finition sur mesure dans une dizaine de couleurs. Accès gratuit à l&apos;atelier pour personnalisation.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SEO bullets */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <ul className="grid sm:grid-cols-2 gap-4">
              {seoBullets.map((bullet, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700">{bullet}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Marques */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-xl sm:text-2xl font-bold text-primary tracking-tight mb-8">
              Marques de confiance
            </h2>
            <div className="flex flex-wrap items-center gap-6 sm:gap-10">
              {brands.map((b) => (
                <div key={b.name} className="flex items-center gap-3">
                  {b.logo ? (
                    <div className="relative h-10 w-24">
                      <Image src={b.logo} alt="" fill className="object-contain" />
                    </div>
                  ) : null}
                  <span className="font-semibold text-primary">{b.name}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STACBOND — Découpe & CLIPS&GO 2.0 ── */}
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

      <CTACompact />
    </div>
  );
}

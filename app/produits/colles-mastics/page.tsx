import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, ArrowRight } from "lucide-react";
import CTACompact from "@/components/sections/CTA";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Colles & Mastics - Comarden",
  description:
    "Colles de contact STRATOGRIP multi-matériaux, mastics et bandes TYVEK DUPONT. Haute performance pour professionnels. Naninne & Bertrix.",
};

const stratogripProducts = [
  {
    title: "STRATOGRIP S110 – Colle de contact Multi-Matériaux (22L)",
    brand: "STRATO GRIP",
    logo: "/images/logos/strato-grip-logo.png",
    description:
      "Colle industrielle haute performance pour HPL, aluminium, MDF, panneaux, contreplaqué. Résistance chaleur jusqu'à 100°C, séchage 1-2 minutes.",
    specs: [
      "Couleur : incolore ou rouge",
      "Format : 22L",
      "Temps ouvert : 40 min",
      "Rendement : 22L → 200m²",
      "Application : 15–27°C",
      "Stockage : 18 mois",
    ],
    notRecommended:
      "Non recommandé : vinyles plastifiés, plastiques flexibles, polystyrène EPS/XPS, PE, PP",
    conseil:
      "Les colles STRATOGRIP : si vous n'en utilisez pas aujourd'hui, vous ne pourrez plus vous en passer demain !",
    link: "https://stratogrip.com/wp-content/uploads/2025/09/Fiche-Technique-STRATOGRIP-S110.pdf",
  },
  {
    title: "STRATOGRIP S163 – Colle polyvalente haute adhérence (22L)",
    brand: "STRATO GRIP",
    logo: "/images/logos/strato-grip-logo.png",
    description:
      "Ultra high-tack pour bâtiment et isolation, sans chlore, évaporation rapide. Compatible : bois, MDF, plastiques rigides, métaux, XPS/EPS, matériaux minéraux ou alu.",
    specs: [
      "Résistance température : 80°C",
      "Format : 22L",
      "Tack initial très élevé",
    ],
    notRecommended: "Non recommandé : vinyles plastifiés",
    link: "https://stratogrip.com/product/s163/",
  },
  {
    title: "STRATOGRIP M300 – Colle mousse et tissu (22L)",
    brand: "STRATO GRIP",
    logo: "/images/logos/strato-grip-logo.png",
    description:
      "Spécialement pour cuir, tissus, mousses, revêtements décoratifs (sellerie, tapisserie). Résistance température : 110°C. Séchage : 1-2 min. Format : 22L.",
    specs: [
      "Compatible : mousse synthétique, panneaux MDF, contreplaqué, miroirs, plastiques compatibles",
    ],
    notRecommended: "Non recommandé : vinyles plastifiés, EPS/XPS, PE, PP, monochrome",
  },
  {
    title: "Pistolet d'application professionnel STRATOGRIP",
    brand: "STRATO GRIP",
    logo: "/images/logos/strato-grip-logo.png",
    description:
      "Jet réglable 2–25 cm selon buse. Pression jusqu'à 17 bars. Ergonomique, léger, pas de nettoyage nécessaire. Compatible avec toutes bonbonnes STRATOGRIP.",
    link: "https://stratogrip.com/product/pistolet-dapplication-professionnel/",
  },
  {
    title: "Raccord flexible caoutchouc 4m STRATOGRIP",
    brand: "STRATO GRIP",
    logo: "/images/logos/strato-grip-logo.png",
    description:
      "Ultra souple pour chantiers, ateliers, zones difficiles d'accès. Longueur 4m, caoutchouc haute qualité, léger et ergonomique.",
    link: "https://stratogrip.com/product/raccord-flexible/",
  },
];

const tyvekProducts = [
  {
    title: "Mastic AirGuard® (TYVEK DUPONT)",
    brand: "TYVEK DUPONT",
    logo: null,
    description:
      "Mastic adhésif pour liaison étanche à l'air des joints et connexions structurelles. Connexion pare-vapeur sur béton, plâtre, pierre, plaques de plâtre, bois.",
    specs: [
      "Application par cartouche",
      "Installable à -5°C",
      "GEV-Emicode faibles COV",
    ],
    link: "https://www.dupontdenemours.fr/products/mastic-airguard.html",
  },
  {
    title: "Bande adhésive DuPont™ Tyvek® FlexWrap™ NF",
    brand: "TYVEK DUPONT",
    logo: null,
    description:
      "Bande auto-adhésive flexible pour étanchéité air/eau autour portes, fenêtres, cheminées. 50% plus rapide que bandes standard, résiste UV, compatible toutes membranes.",
    link: "https://www.dupontdenemours.be/fr/products/dupont-tyvek-flexwrap-flashing-tape.html",
  },
];

function ProductCard({
  title,
  brand,
  logo,
  description,
  specs = [],
  notRecommended,
  conseil,
  link,
}: {
  title: string;
  brand: string;
  logo: string | null;
  description: string;
  specs?: string[];
  notRecommended?: string;
  conseil?: string;
  link?: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            {logo && (
              <div className="relative h-8 w-24 flex-shrink-0">
                <Image
                  src={logo}
                  alt=""
                  fill
                  className="object-contain object-left"
                />
              </div>
            )}
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              {brand}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3">
            {title}
          </h3>
          <p className="text-base text-slate-600 leading-relaxed mb-4">
            {description}
          </p>

          {specs.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-3">
              {specs.map((spec) => (
                <span
                  key={spec}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/5 text-primary border border-primary/10"
                >
                  {spec}
                </span>
              ))}
            </div>
          )}

          {notRecommended && (
            <p className="text-sm text-slate-500 italic mb-2">{notRecommended}</p>
          )}
          {conseil && (
            <div className="bg-accent/10 border-l-4 border-accent rounded-r-xl px-4 py-2 mt-2">
              <p className="text-sm font-medium text-slate-700">
                Conseil Comarden : {conseil}
              </p>
            </div>
          )}
        </div>

        {link && (
          <div className="flex-shrink-0">
            <a
              href={link}
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
  );
}

export default function CollesMasticsPage() {
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
                  Colles & mastics
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                Colles &amp; Mastics
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
                Colles de contact STRATO GRIP multi-matériaux et solutions
                d&apos;étanchéité à l&apos;air TYVEK DUPONT. Haute performance
                pour professionnels du bâtiment.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── STRATO GRIP ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-4 mb-12">
              <div className="relative h-10 w-28">
                <Image
                  src="/images/logos/strato-grip-logo.png"
                  alt=""
                  fill
                  className="object-contain object-left"
                />
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight">
                STRATO GRIP — Colles de contact
              </h2>
            </div>
          </Reveal>

          <div className="space-y-6">
            {stratogripProducts.map((product, i) => (
              <Reveal key={product.title} delay={i * 80}>
                <ProductCard
                  title={product.title}
                  brand={product.brand}
                  logo={product.logo}
                  description={product.description}
                  specs={product.specs}
                  notRecommended={product.notRecommended}
                  conseil={product.conseil}
                  link={product.link}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TYVEK DUPONT ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4">
                TYVEK DUPONT — Étanchéité à l&apos;air
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Mastics et bandes adhésives pour une étanchéité à l&apos;air
                performante sur vos chantiers.
              </p>
            </div>
          </Reveal>

          <div className="space-y-6">
            {tyvekProducts.map((product, i) => (
              <Reveal key={product.title} delay={i * 80}>
                <ProductCard
                  title={product.title}
                  brand={product.brand}
                  logo={product.logo}
                  description={product.description}
                  specs={product.specs}
                  link={product.link}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Formations STRATOGRIP ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-primary/5 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl bg-primary text-white p-8 sm:p-10">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2">
                  Découvrir les formations STRATOGRIP
                </h2>
                <p className="text-white/85 text-sm sm:text-base max-w-xl">
                  Formez-vous aux nouvelles colles multi-matériaux et bonnes
                  pratiques d&apos;application avec nos formations dédiées.
                </p>
              </div>
              <Link
                href="/formations"
                className="inline-flex items-center gap-2 bg-accent text-primary font-semibold px-6 py-3 rounded-full hover:bg-accent/90 transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm whitespace-nowrap"
              >
                Voir les formations
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <CTACompact />
    </div>
  );
}

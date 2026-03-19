import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingCart } from "lucide-react";
import CTACompact from "@/components/sections/CTA";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Colles & Mastics - Comarden",
  description:
    "Découvrez les colles de contact STRATOGRIP et mastics TYVEK disponibles chez Comarden à Bertrix et Naninne. Solutions haute performance pour bardage, isolation et étanchéité en Belgique.",
};

const stratogripProducts = [
  {
    title: "STRATOGRIP S110 — Colle de contact Multi-Matériaux 22L",
    brand: "STRATO GRIP",
    logo: "/images/logos/strato-grip-logo.png",
    body:
      "Colle industrielle haute performance pour HPL, aluminium, MDF, panneaux de particules, contreplaqué. Adhésion instantanée, résistance chaleur jusqu'à 100°C, séchage ultra-rapide.",
    avantages: [
      "Adhésion instantanée forte ténacité",
      "Résistant aux hautes températures (100°C)",
      "Haut pouvoir couvrant",
      "Ultra polyvalent",
      "Double encollage pour collage permanent",
    ],
    specs: [
      "Couleur : incolore ou rouge",
      "Format : 22L",
      "Temps séchage : 1-2 min",
      "Temps ouvert : 40 min",
      "Rendement : 22L → 200m²",
      "Température application : 15-27°C",
      "Stockage : 18 mois",
    ],
    notRecommended:
      "Non recommandé : vinyles plastifiés, plastiques flexibles, polystyrène EPS/XPS, PE, PP",
    conseil:
      "Les colles STRATOGRIP : si vous n'en utilisez pas aujourd'hui, vous ne pourrez plus vous en passer demain !",
    shopSlug: "stratogrip-s110-22l",
  },
  {
    title: "STRATOGRIP S163 — Colle polyvalente haute adhérence (22L)",
    brand: "STRATO GRIP",
    logo: "/images/logos/strato-grip-logo.png",
    body:
      "Ultra high-tack pour bâtiment et isolation, sans chlore, évaporation rapide. Compatible bois, MDF, plastiques rigides, métaux, XPS/EPS, matériaux minéraux ou alu.",
    avantages: [
      "Adhésion instantanée",
      "Long temps ouvert",
      "Haut pouvoir couvrant",
      "Tack initial élevé",
      "Sans chlore, respectueuse de l'environnement",
    ],
    specs: [
      "Couleur : incolore",
      "Format : 22L",
      "Séchage : 1-2 min",
      "Résistance temp : 80°C",
      "Pulvérisation : toile d'araignée",
    ],
    notRecommended: "Non recommandé : vinyles plastifiés",
    shopSlug: "stratogrip-s163-22l",
  },
  {
    title: "STRATOGRIP M300 — Colle mousse et tissu (22L)",
    brand: "STRATO GRIP",
    logo: "/images/logos/strato-grip-logo.png",
    body:
      "Colle industrielle haute performance pour cuir, tissus, mousses et revêtements décoratifs. Domaine sellerie, tapisserie et ameublement.",
    avantages: [
      "Adhésion instantanée",
      "Résistance chaleur 110°C",
      "Séchage rapide 1-2 min",
      "Système pulvérisation \"toile d'araignée\" économique",
    ],
    compatibilite:
      "Compatible : mousse synthétique, panneaux MDF, contreplaqué, aggloméré, miroirs, plastiques compatibles",
    notRecommended:
      "Non recommandé : vinyles plastifiés, EPS/XPS, PE, PP, stratifiés teintés monochrome",
    specs: ["Couleur : incolore ou rouge", "Format : 22L", "Temp résistance : 110°C"],
    shopSlug: "stratogrip-m300-22l",
  },
  {
    title: "Pistolet d'application professionnel STRATOGRIP",
    brand: "STRATO GRIP",
    logo: "/images/logos/strato-grip-logo.png",
    body:
      "Conçu pour précision, confort et efficacité lors de l'application des colles Stratogrip.",
    avantages: [
      "Jet réglable de 2 à 25 cm selon buse",
      "Pression jusqu'à 17 bars",
      "Ergonomique et léger",
      "Pas de nettoyage nécessaire",
      "Compatible toutes bonbonnes STRATOGRIP",
    ],
    applications:
      "Applications : travaux collage industriel / bois et panneaux / fabrication mobilier / chantiers précision et rapidité",
    shopSlug: "pistolet-stratogrip",
  },
  {
    title: "Raccord flexible caoutchouc 4m STRATOGRIP",
    brand: "STRATO GRIP",
    logo: "/images/logos/strato-grip-logo.png",
    body:
      "Tuyau professionnel ultra souple pour applications collage, pulvérisation ou fluides.",
    specs: [
      "Longueur 4m",
      "Caoutchouc haute qualité",
      "Ultra flexible",
      "Léger et ergonomique",
    ],
    shopSlug: "raccord-flexible-stratogrip",
  },
];

const tyvekProducts = [
  {
    title: "Mastic AirGuard® — Liaison étanche à l'air (TYVEK DUPONT)",
    brand: "TYVEK DUPONT",
    logo: null,
    body:
      "Mastic adhésif pour liaison élastique permanente et étanche à l'air des joints et connexions structurelles. Connexion des pare-vapeur à des surfaces telles que la pierre.",
    avantages: [
      "Application par cartouche",
      "Installation facile",
      "Recommandé pour couches pare-vapeur AirGuard",
      "Très faibles émissions COV (GEV-Emicode)",
      "Excellente adhérence",
      "Installable à -5°C",
    ],
    supports: "Supports : béton, plâtre, pierre, plaques de plâtre, bois",
    shopSlug: "mastic-airguard-tyvek",
  },
  {
    title: "Bande adhésive DuPont™ Tyvek® FlexWrap™ NF",
    brand: "TYVEK DUPONT",
    logo: null,
    body:
      "Bande auto-adhésive flexible haute performance pour joint étanche à l'air et à l'eau autour des portes, fenêtres, cheminées, entrées de tuyaux, bouches d'air.",
    avantages: [
      "50% plus rapide que bandes standard",
      "Aucune fixation supplémentaire",
      "Résiste UV",
      "Compatible membranes de construction",
      "Bonnes performances températures extrêmes",
    ],
    usage: "Usage : intérieur et extérieur pour améliorer efficacité énergétique",
    shopSlug: "bande-tyvek-flexwrap-nf",
  },
];

function ProductCard({
  title,
  brand,
  logo,
  body,
  avantages,
  specs = [],
  compatibilite,
  notRecommended,
  conseil,
  applications,
  supports,
  usage,
  shopSlug,
}: {
  title: string;
  brand: string;
  logo: string | null;
  body: string;
  avantages?: string[];
  specs?: string[];
  compatibilite?: string;
  notRecommended?: string;
  conseil?: string;
  applications?: string;
  supports?: string;
  usage?: string;
  shopSlug?: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            {logo && (
              <div className="relative h-8 w-24 flex-shrink-0">
                <Image src={logo} alt="" fill className="object-contain object-left" />
              </div>
            )}
            <span className="text-sm font-bold uppercase tracking-widest text-primary">
              {brand}
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3">{title}</h3>
          <p className="text-base text-slate-600 leading-relaxed mb-4">{body}</p>

          {avantages && avantages.length > 0 && (
            <ul className="list-disc list-inside text-sm text-slate-600 space-y-1 mb-3">
              {avantages.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          )}
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
          {compatibilite && (
            <p className="text-sm text-slate-600 mb-2">{compatibilite}</p>
          )}
          {applications && (
            <p className="text-sm text-slate-600 mb-2">{applications}</p>
          )}
          {supports && <p className="text-sm text-slate-600 mb-2">{supports}</p>}
          {usage && <p className="text-sm text-slate-600 mb-2">{usage}</p>}
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
        {shopSlug && (
          <div className="flex-shrink-0">
            <Link
              href={`/shop/produit/${shopSlug}`}
              className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full hover:bg-primary/90 transition-all duration-300 hover:scale-105 hover:shadow-lg text-sm"
            >
              Voir dans le magasin
              <ShoppingCart className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CollesMasticsPage() {
  return (
    <div className="pt-20">
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
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Reveal>
              <div>
                <span className="text-accent font-medium tracking-wide uppercase text-xs sm:text-sm mb-6 inline-block">
                  Colles &amp; mastics
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
                  Colles &amp; Mastics — Solutions d&apos;adhésion pour professionnels
                </h1>
                <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
                  Colles de contact STRATO GRIP et mastics TYVEK DUPONT disponibles à Bertrix et Naninne. Haute performance pour bardage, isolation et étanchéité.
                </p>
              </div>
            </Reveal>
            <Reveal delay={200}>
              <div className="hidden lg:block">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10">
                  <Image
                    src="/images/placeholder/colles/colle1.jpg"
                    alt="Colles et mastics professionnels"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

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
                  body={product.body}
                  avantages={product.avantages}
                  specs={product.specs}
                  compatibilite={product.compatibilite}
                  notRecommended={product.notRecommended}
                  conseil={product.conseil}
                  applications={product.applications}
                  shopSlug={product.shopSlug}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4">
                TYVEK DUPONT — Étanchéité à l&apos;air
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Mastics et bandes adhésives pour une étanchéité à l&apos;air performante sur vos chantiers.
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
                  body={product.body}
                  avantages={product.avantages}
                  supports={product.supports}
                  usage={product.usage}
                  shopSlug={product.shopSlug}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUITS COMPLÉMENTAIRES ── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4">
                Préparation &amp; Entretien toiture
              </h2>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                Produits de préparation, séchage et traitement pour garantir la longévité de vos toitures.
              </p>
            </div>
          </Reveal>
          <div className="space-y-6">
            <Reveal>
              <ProductCard
                title="Poudre asséchante EXPRESS (1 kg × 6)"
                brand="EXPRESS"
                logo={null}
                body="Absorbe l'eau de pluie sur toitures plates avant travaux d'étanchéité. Permet une intervention rapide même par temps humide."
                specs={["Réf. 848", "6 × 1 kg", "Toitures plates"]}
                shopSlug="poudre-assechante-express"
              />
            </Reveal>
            <Reveal delay={80}>
              <ProductCard
                title="Rouleau de séchage toiture plate"
                brand="IMPORT ALLEMAGNE"
                logo={null}
                body="Rouleau en mousse haute absorption pour le séchage rapide des toitures plates. Largeur 60 cm, longueur 130 cm, fabrication allemande."
                specs={["60 × 130 cm", "Mousse haute absorption", "Fabrication allemande"]}
                shopSlug="rouleau-sechage-toiture"
              />
            </Reveal>
            <Reveal delay={160}>
              <ProductCard
                title="ALGIMOUSS PRO (5L) — Traitement toiture / façade"
                brand="ALGIMOUSS"
                logo={null}
                body="Élimine algues, lichens et moisissures sur toitures et façades. Sans chlore, sans rinçage, double biocide pour une efficacité longue durée."
                avantages={[
                  "Sans chlore",
                  "Sans rinçage",
                  "Double biocide",
                  "Application pulvérisateur basse pression",
                ]}
                specs={["Format : 5L", "Toiture & façade"]}
                shopSlug="algimouss-pro-5l"
              />
            </Reveal>
            <Reveal delay={240}>
              <ProductCard
                title="ALGIFUGE BOIS (5L) — Hydrofuge bois"
                brand="ALGIMOUSS"
                logo={null}
                body="Hydrofuge bois en phase aqueuse sans silicone. Protège contre les UV et le gel, retarde le grisaillement naturel du bois."
                avantages={[
                  "Phase aqueuse sans silicone",
                  "Protection UV et gel",
                  "Retarde le grisaillement",
                ]}
                specs={["Format : 5L", "Bois extérieur"]}
                shopSlug="algifuge-bois-5l"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-primary/5 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 rounded-2xl bg-primary text-white p-8 sm:p-10">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2">
                  Découvrir les formations STRATOGRIP
                </h2>
                <p className="text-white/85 text-sm sm:text-base max-w-xl">
                  Formez-vous aux nouvelles colles multi-matériaux et bonnes pratiques d&apos;application avec nos formations dédiées.
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

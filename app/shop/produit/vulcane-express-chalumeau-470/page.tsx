import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  Flame,
  Wrench,
  Snowflake,
  Thermometer,
  Zap,
  ShieldCheck,
  Lock,
  RefreshCcw,
  Package,
} from "lucide-react";
import { getProductBySlug } from "@/lib/shop/queries";
import { site } from "@/lib/site";
import ProductGallery from "@/components/shop/ProductGallery";
import Reveal from "@/components/ui/Reveal";
import BuyNowButton from "@/components/shop/BuyNowButton";
import RelatedProducts from "@/components/shop/RelatedProducts";

// EXPRESS brand palette (lib/brands/config.ts) - accents only, content stays light.
const EX_PRIMARY = "#E30613";
const EX_DARK = "#1A1A1A";

export const metadata: Metadata = {
  title: "Vulcane Express - Chalumeau Pro (Kit complet) Réf. 470 | Comarden",
  description:
    "Chalumeau professionnel Vulcane Express (Réf. 470) : 2400 °C, flamme turbo enveloppante, allumage piezo, 400 g. Kit complet avec lance plombier 4722, cartouche Propylène 2400 et pied stabilisateur. Distribué par Comarden.",
};

const APPLICATIONS = [
  { icon: Flame, label: "Brasage cuivre" },
  { icon: Wrench, label: "Plombier" },
  { icon: Thermometer, label: "Chauffagiste" },
  { icon: Snowflake, label: "Frigoriste" },
  { icon: Zap, label: "Allumage piezo" },
];

const KIT = [
  "1 chalumeau Vulcane Express",
  "1 lance turbo 4722 Plombier (rouge)",
  "1 cartouche Propylène Réf. 2400",
  "1 pied stabilisateur amovible",
  "Notice, en boîte carton",
];

// Values from the fiche technique 4714-4722-4728-4735-4750 (DTP13-E, indice J).
const LANCES = [
  { ref: "4714", slug: "lance-vulcane-4714-frigoriste", role: "Frigoriste", color: "Jaune", swatch: "#FFD800", tubes: "Ø 10 à 16 mm", debit: "168 g/h", puissance: "2,3 kW" },
  { ref: "4722", slug: "lance-vulcane-4722-plombier", role: "Plombier", color: "Rouge", swatch: "#E30613", tubes: "Ø 16 à 22 mm", debit: "214 g/h", puissance: "2,9 kW" },
  { ref: "4728", slug: "lance-vulcane-4728-chauffagiste", role: "Chauffagiste", color: "Vert", swatch: "#159A3E", tubes: "Ø 22 à 28 mm", debit: "272 g/h", puissance: "3,7 kW" },
  { ref: "4735", slug: "lance-vulcane-4735", role: "Grande puissance", color: "Cyan", swatch: "#00A7CE", tubes: "Ø 28 à 35 mm", debit: "407 g/h", puissance: "5,5 kW" },
  { ref: "4750", slug: "lance-vulcane-4750-air-chaud", role: "Air chaud (gaines, PVC)", color: "Noir", swatch: "#1A1A1A", tubes: "Gaines et PVC Ø 50 mm", debit: "204 g/h", puissance: "2,7 kW" },
];

const SECURITE = [
  "Blocage de la gâchette en position stockage",
  "Commande lance 3 positions : montage/démontage, verrouillage, fonctionnement",
  "Matériaux haute qualité résistants à l'oxydation (laiton, inox, Zamak)",
];

function parseSpec(s: string): { label: string; value: string } {
  const i = s.indexOf(" : ");
  if (i === -1) return { label: s, value: "" };
  return { label: s.slice(0, i), value: s.slice(i + 3) };
}

export default async function VulcaneExpressChalumeau470Page() {
  const product = await getProductBySlug("vulcane-express-chalumeau-470");
  if (!product) notFound();

  const specs = (product.specs ?? []).map(parseSpec);
  const avantages = product.avantages ?? [];

  return (
    <div className="pt-20 bg-white">
      {/* Breadcrumb */}
      <section className="py-4 bg-neutral/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Accueil</Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">Magasin</Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/marques/express" className="text-muted-foreground hover:text-primary transition-colors">EXPRESS</Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{product.title}</span>
          </nav>
        </div>
      </section>

      {/* Hero */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <Reveal>
              <ProductGallery images={product.images} alt={product.title} accent={EX_PRIMARY} />
            </Reveal>

            <Reveal delay={100}>
              <div>
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white mb-4"
                  style={{ backgroundColor: EX_PRIMARY }}
                >
                  EXPRESS depuis 1905
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-3">
                  {product.title}
                </h1>
                <p className="text-base sm:text-lg font-semibold mb-5" style={{ color: EX_PRIMARY }}>
                  Le chalumeau professionnel de référence - Réf. 470
                </p>
                {product.description && (
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    {product.description}
                  </p>
                )}

                {/* Application icons */}
                <div className="flex flex-wrap gap-4 mb-8">
                  {APPLICATIONS.map((a) => (
                    <div key={a.label} className="flex flex-col items-center gap-1.5 w-20 text-center">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: `${EX_PRIMARY}12` }}
                      >
                        <a.icon className="w-6 h-6" style={{ color: EX_PRIMARY }} strokeWidth={2} />
                      </div>
                      <span className="text-[11px] leading-tight text-muted-foreground">{a.label}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <BuyNowButton product={product} redirectTo="/marques/express" color={EX_PRIMARY} />
                  <Link
                    href={`/contact?sujet=Devis%20${encodeURIComponent(product.title)}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full font-semibold px-6 py-3.5 text-sm border transition-colors"
                    style={{ borderColor: EX_PRIMARY, color: EX_DARK }}
                  >
                    Demander un devis
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={`tel:${site.phone.primary}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full font-semibold px-6 py-3.5 text-sm border transition-colors"
                    style={{ borderColor: EX_PRIMARY, color: EX_DARK }}
                  >
                    <Phone className="w-4 h-4" />
                    {site.phone.display}
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Utilisation */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">Utilisation</h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Le Vulcane Express est conçu pour le brasage des tubes cuivre en plomberie sanitaire,
              chauffage et froid/climatisation, ainsi que pour le travail des gaines thermorétractables
              et du PVC avec la lance air chaud. Sa flamme turbo enveloppante répartit la chaleur autour
              du tube pour un brasage rapide et régulier, jusqu&apos;au dernier gramme de gaz de la cartouche
              Propylène Réf. 2400. La gâchette 2 modes (continu / intermittent) et l&apos;utilisation
              multi-positions avec retournement immédiat en font un outil à la carte, au sol grâce au
              pied stabilisateur amovible ou à la main grâce à ses 400 g seulement.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Avantages */}
      {avantages.length > 0 && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8">Avantages</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-4">
              {avantages.map((a, i) => (
                <Reveal key={a} delay={i * 50}>
                  <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-4 ring-1 ring-black/5 h-full">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: EX_PRIMARY }} />
                    <span className="text-sm sm:text-base text-slate-700 leading-relaxed">{a}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Spécifications techniques */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: `${EX_PRIMARY}08` }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <span className="h-7 w-1.5 rounded-full" style={{ backgroundColor: EX_PRIMARY }} />
              <h2 className="text-2xl sm:text-3xl font-bold text-primary">Spécifications techniques</h2>
            </div>
          </Reveal>
          <Reveal>
            <div className="bg-white rounded-2xl ring-1 ring-black/5 overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {specs.map((s, i) => (
                    <tr key={s.label} className={i % 2 === 1 ? "bg-slate-50/60" : ""}>
                      <td className="py-3 px-4 sm:px-6 text-slate-600 align-top w-1/2">{s.label}</td>
                      <td className="py-3 px-4 sm:px-6 font-semibold text-primary align-top">{s.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Kit livré avec */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <Package className="w-7 h-7" style={{ color: EX_PRIMARY }} />
              <h2 className="text-2xl sm:text-3xl font-bold text-primary">Kit livré avec</h2>
            </div>
          </Reveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {KIT.map((item, i) => (
              <Reveal key={item} delay={i * 60}>
                <div className="h-full flex items-start gap-3 rounded-2xl p-5 ring-1 ring-black/5 bg-slate-50">
                  <span
                    className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white text-xs font-bold"
                    style={{ backgroundColor: EX_PRIMARY }}
                  >
                    {i + 1}
                  </span>
                  <span className="text-sm font-medium text-slate-700 leading-relaxed">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lances compatibles */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Lances compatibles</h2>
            <p className="text-sm text-muted-foreground mb-8">
              5 lances interchangeables pour couvrir tous les usages (valeurs selon NF EN 521, à 1,4 bar / 20 psi).
            </p>
          </Reveal>
          <Reveal>
            <div className="overflow-x-auto rounded-2xl ring-1 ring-black/5 bg-white">
              <table className="w-full text-sm min-w-[720px]">
                <thead>
                  <tr className="text-white" style={{ backgroundColor: EX_PRIMARY }}>
                    <th className="text-left py-3 px-4 font-semibold">Réf.</th>
                    <th className="text-left py-3 px-4 font-semibold">Usage</th>
                    <th className="text-left py-3 px-4 font-semibold">Repère</th>
                    <th className="text-left py-3 px-4 font-semibold">Tubes / application</th>
                    <th className="text-left py-3 px-4 font-semibold">Débit gaz</th>
                    <th className="text-left py-3 px-4 font-semibold">Puissance</th>
                    <th className="py-3 px-4" />
                  </tr>
                </thead>
                <tbody>
                  {LANCES.map((l, i) => (
                    <tr key={l.ref} className={i % 2 === 1 ? "bg-slate-50" : "bg-white"}>
                      <td className="py-3 px-4 font-mono text-xs font-bold text-primary">{l.ref}</td>
                      <td className="py-3 px-4 font-medium text-primary">{l.role}</td>
                      <td className="py-3 px-4">
                        <span className="inline-flex items-center gap-2 text-slate-600">
                          <span className="h-3.5 w-3.5 rounded-full ring-1 ring-black/10" style={{ backgroundColor: l.swatch }} />
                          {l.color}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600">{l.tubes}</td>
                      <td className="py-3 px-4 text-slate-600">{l.debit}</td>
                      <td className="py-3 px-4 text-slate-600">{l.puissance}</td>
                      <td className="py-3 px-4 text-right">
                        <Link
                          href={`/shop/produit/${l.slug}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold transition-colors hover:underline"
                          style={{ color: EX_PRIMARY }}
                        >
                          Voir
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
          <Reveal delay={80}>
            <p className="mt-4 text-sm text-slate-600">
              Accessoire :{" "}
              <Link
                href="/shop/produit/tuyau-extension-vulcane-4770"
                className="font-semibold hover:underline"
                style={{ color: EX_PRIMARY }}
              >
                Tuyau d&apos;extension Réf. 4770
              </Link>{" "}
              - compatible avec toutes les lances.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Sécurité + Auto-maintenance callouts */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-6">
            <Reveal>
              <div
                className="h-full rounded-2xl p-6 sm:p-8 text-white"
                style={{ backgroundColor: EX_DARK }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: EX_PRIMARY }}>
                    <Lock className="w-5 h-5 text-white" />
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold">Sécurité renforcée</h2>
                </div>
                <ul className="space-y-3">
                  {SECURITE.map((s) => (
                    <li key={s} className="flex items-start gap-3 text-sm text-white/85 leading-relaxed">
                      <ShieldCheck className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: EX_PRIMARY }} />
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div
                className="h-full rounded-2xl p-6 sm:p-8 ring-1"
                style={{ borderColor: EX_PRIMARY, boxShadow: `inset 4px 0 0 ${EX_PRIMARY}`, backgroundColor: `${EX_PRIMARY}06` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: `${EX_PRIMARY}14` }}>
                    <RefreshCcw className="w-5 h-5" style={{ color: EX_PRIMARY }} />
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-primary">Auto-maintenance brevetée</h2>
                </div>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  Le piezo et l&apos;injecteur se changent sans outil, directement sur le chantier. Chaque
                  lance dispose de son injecteur associé (Réf. 47014, 47022, 47028, 47035, 47050), et la
                  gâchette + piezo (Réf. 4701) comme le pied stabilisateur (Réf. 4702) sont disponibles en
                  pièces détachées : votre chalumeau reste opérationnel pendant des années.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Related products */}
      <RelatedProducts
        brand={product.brand}
        categoryId={product.category_id}
        excludeSlug={product.slug}
        accent={EX_PRIMARY}
      />

      {/* CTA banner */}
      <section className="py-14 sm:py-20" style={{ backgroundColor: EX_PRIMARY }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3">
              Distribué par Comarden - En stock à Bertrix et Naninne
            </h2>
            <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto mb-8 leading-relaxed">
              Notre équipe vous conseille sur le chalumeau, les lances et les consommables de brasage
              adaptés à votre métier.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white font-semibold px-8 py-3.5 text-base transition-transform duration-300 hover:scale-105"
                style={{ color: EX_PRIMARY }}
              >
                Nous contacter
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`tel:${site.phone.primary}`}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 text-white font-semibold px-8 py-3.5 text-base border border-white/25 hover:bg-white/20 transition-colors"
              >
                <Phone className="w-5 h-5" />
                {site.phone.display}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

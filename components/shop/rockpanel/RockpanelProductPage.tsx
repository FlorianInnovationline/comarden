import Link from "next/link";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Phone, CheckCircle2, Ruler, Hammer, PaintBucket, Wrench, Info } from "lucide-react";
import type { Product } from "@/types/shop";
import { site } from "@/lib/site";
import ProductGallery from "@/components/shop/ProductGallery";
import Reveal from "@/components/ui/Reveal";
import BuyNowButton from "@/components/shop/BuyNowButton";
import RelatedProducts from "@/components/shop/RelatedProducts";

// ROCKPANEL palette (lib/brands/config.ts) - accents only; content stays light.
const RP_PRIMARY = "#14294C"; // ROCKWOOL navy
const RP_DARK = "#0B1B33";
const RP_ACCENT = "#C8102E"; // ROCKWOOL red

/** RAL colours stocked by Comarden (hex from the brief). */
const RAL: Record<string, { name: string; hex: string; light?: boolean }> = {
  "7004": { name: "Gris signalisation", hex: "#9C9C9C", light: true },
  "7016": { name: "Gris anthracite", hex: "#293133" },
  "7021": { name: "Gris noir", hex: "#23282B" },
  "7039": { name: "Gris quartz", hex: "#6C6960" },
  "9005": { name: "Noir foncé", hex: "#0E0E10" },
  "9010": { name: "Blanc pur", hex: "#F7F9EF", light: true },
};
const RAL_ORDER = ["7004", "7016", "7021", "7039", "9005", "9010"];

export interface RockpanelApplication {
  icon: string;
  label: string;
}

export interface RockpanelContent {
  tagline: string;
  applications: RockpanelApplication[];
  utilisation: string;
  /** "ral" = RAL swatch grid, "woods" = décors bois message, "none" = skip */
  colorMode: "ral" | "woods" | "none";
  /** Show the Primer (paintable) card alongside the RAL swatches (Lines2 S) */
  primer?: boolean;
  /** Format cards, e.g. ["3050 x 1200 mm"] */
  formats: string[];
  /** Prominent "sur commande" callout (Woods) */
  surCommande?: boolean;
}

function parseSpec(s: string): { label: string; value: string } {
  const i = s.indexOf(" : ");
  if (i === -1) return { label: s, value: "" };
  return { label: s.slice(0, i), value: s.slice(i + 3) };
}

const FIXATIONS = [
  {
    icon: Hammer,
    title: "Ossature bois",
    text: "Clous INOX 27 mm (boîte de 200).",
    href: "/shop/produit/clous-inox-27mm-rockpanel",
  },
  {
    icon: Wrench,
    title: "Ossature métallique",
    text: "Vis INOX 35 mm teintées (boîte de 200).",
    href: "/shop/produit/vis-inox-35mm-rockpanel",
  },
  {
    icon: PaintBucket,
    title: "Finition des chants",
    text: "Peinture chants & retouches 500 ml.",
    href: "/shop/produit/peinture-chants-retouches-rockpanel",
  },
];

export default function RockpanelProductPage({
  product,
  content,
}: {
  product: Product;
  content: RockpanelContent;
}) {
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
            <Link href="/marques/rockpanel" className="text-muted-foreground hover:text-primary transition-colors">Rockpanel</Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">Façade</span>
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
              <ProductGallery images={product.images} alt={product.title} accent={RP_PRIMARY} />
            </Reveal>

            <Reveal delay={100}>
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white"
                    style={{ backgroundColor: RP_PRIMARY }}
                  >
                    ROCKPANEL®
                  </span>
                  {content.surCommande && (
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white"
                      style={{ backgroundColor: RP_ACCENT }}
                    >
                      Sur commande
                    </span>
                  )}
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-3">
                  {product.title}
                </h1>
                <p className="text-base sm:text-lg font-semibold mb-5" style={{ color: RP_ACCENT }}>
                  {content.tagline}
                </p>
                {product.description && (
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    {product.description}
                  </p>
                )}

                {content.applications.length > 0 && (
                  <div className="flex flex-wrap gap-4 mb-8">
                    {content.applications.map((a) => {
                      const Icon = ((Icons[a.icon as keyof typeof Icons] as unknown) as LucideIcon) || Icons.Square;
                      return (
                        <div key={a.label} className="flex flex-col items-center gap-1.5 w-20 text-center">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${RP_PRIMARY}12` }}
                          >
                            <Icon className="w-6 h-6" style={{ color: RP_PRIMARY }} strokeWidth={2} />
                          </div>
                          <span className="text-[11px] leading-tight text-muted-foreground">{a.label}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <BuyNowButton product={product} redirectTo="/marques/rockpanel" color={RP_PRIMARY} />
                  <Link
                    href={`/contact?sujet=Devis%20${encodeURIComponent(product.title)}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full font-semibold px-6 py-3.5 text-sm border transition-colors"
                    style={{ borderColor: RP_PRIMARY, color: RP_DARK }}
                  >
                    Demander un devis
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={`tel:${site.phone.primary}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full font-semibold px-6 py-3.5 text-sm border transition-colors"
                    style={{ borderColor: RP_PRIMARY, color: RP_DARK }}
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
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">{content.utilisation}</p>
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
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: RP_ACCENT }} />
                    <span className="text-sm sm:text-base text-slate-700 leading-relaxed">{a}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Spécifications techniques */}
      {specs.length > 0 && (
        <section className="py-12 sm:py-16" style={{ backgroundColor: `${RP_PRIMARY}08` }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <span className="h-7 w-1.5 rounded-full" style={{ backgroundColor: RP_ACCENT }} />
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
      )}

      {/* Coloris disponibles */}
      {content.colorMode === "ral" && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Coloris disponibles</h2>
              <p className="text-sm text-muted-foreground mb-8">
                Coloris les plus demandés, en stock à Namur et Bertrix.
              </p>
            </Reveal>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {RAL_ORDER.map((code, i) => (
                <Reveal key={code} delay={i * 50}>
                  <div className="text-center">
                    <div
                      className="aspect-square rounded-2xl ring-1 ring-black/10 shadow-sm"
                      style={{ backgroundColor: RAL[code].hex }}
                    />
                    <p className="mt-3 text-sm font-bold text-primary">RAL {code}</p>
                    <p className="text-xs text-muted-foreground">{RAL[code].name}</p>
                  </div>
                </Reveal>
              ))}
              {content.primer && (
                <Reveal delay={RAL_ORDER.length * 50}>
                  <div className="text-center">
                    <div
                      className="aspect-square rounded-2xl ring-1 ring-black/10 shadow-sm flex items-center justify-center bg-[repeating-linear-gradient(45deg,#EDEDED_0,#EDEDED_8px,#F7F7F7_8px,#F7F7F7_16px)]"
                    >
                      <span className="text-[11px] font-bold uppercase tracking-wide text-slate-500">À peindre</span>
                    </div>
                    <p className="mt-3 text-sm font-bold text-primary">Primer</p>
                    <p className="text-xs text-muted-foreground">Base à peindre (RAL/NCS au choix)</p>
                  </div>
                </Reveal>
              )}
            </div>
            <Reveal>
              <p className="mt-6 text-sm text-muted-foreground">
                Autres coloris ROCKPANEL® (RAL, NCS, Metallics, Chameleon, Stones, Woods) disponibles sur commande.
              </p>
            </Reveal>
          </div>
        </section>
      )}

      {content.colorMode === "woods" && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="rounded-3xl p-8 sm:p-10 ring-1 ring-black/5" style={{ backgroundColor: `${RP_PRIMARY}08` }}>
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3">Une large sélection de décors bois</h2>
                <p className="text-base text-slate-600 leading-relaxed mb-6">
                  La gamme ROCKPANEL® Woods reproduit fidèlement de nombreuses essences et teintes de bois naturel.
                  Le catalogue complet des décors est disponible sur demande.
                </p>
                <Link
                  href="/contact?sujet=Catalogue%20ROCKPANEL%20Woods"
                  className="inline-flex items-center gap-2 rounded-full font-semibold px-6 py-3 text-sm text-white transition-transform hover:scale-105"
                  style={{ backgroundColor: RP_ACCENT }}
                >
                  Nous consulter pour le catalogue complet
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Formats disponibles */}
      {content.formats.length > 0 && (
        <section className="py-12 sm:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8">Formats disponibles</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
              {content.formats.map((f, i) => (
                <Reveal key={f} delay={i * 60}>
                  <div className="flex items-center gap-4 bg-white rounded-2xl p-6 ring-1 ring-black/5">
                    <span
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${RP_PRIMARY}12` }}
                    >
                      <Ruler className="w-6 h-6" style={{ color: RP_PRIMARY }} />
                    </span>
                    <span className="text-lg font-bold text-primary">{f}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fixations recommandées */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Fixations recommandées</h2>
            <p className="text-sm text-muted-foreground mb-8">Accessoires de pose ROCKPANEL® disponibles chez Comarden.</p>
          </Reveal>
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
            {FIXATIONS.map((f, i) => (
              <Reveal key={f.href} delay={i * 60}>
                <Link
                  href={f.href}
                  className="group h-full flex flex-col rounded-2xl p-6 ring-1 ring-black/5 bg-slate-50 hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-xl mb-4"
                    style={{ backgroundColor: `${RP_ACCENT}12` }}
                  >
                    <f.icon className="w-5 h-5" style={{ color: RP_ACCENT }} />
                  </span>
                  <h3 className="text-base font-bold text-primary mb-1">{f.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">{f.text}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: RP_ACCENT }}>
                    Voir le produit
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Sur commande callout (Woods) */}
      {content.surCommande && (
        <section className="py-4 sm:py-6 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div
                className="rounded-2xl p-5 sm:p-6 flex items-start gap-4 text-white"
                style={{ backgroundColor: RP_ACCENT }}
              >
                <Info className="w-6 h-6 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold mb-1">Produit disponible uniquement sur commande</p>
                  <p className="text-sm text-white/90 leading-relaxed">
                    {product.warning ?? "Délai à confirmer avec Comarden."}{" "}
                    Contactez-nous au{" "}
                    <a href={`tel:${site.phone.primary}`} className="underline font-semibold">
                      {site.phone.display}
                    </a>{" "}
                    pour le délai et le choix du décor.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Related products */}
      <RelatedProducts
        brand={product.brand}
        categoryId={product.category_id}
        excludeSlug={product.slug}
        accent={RP_PRIMARY}
      />

      {/* CTA banner */}
      <section className="py-14 sm:py-20" style={{ backgroundColor: RP_DARK }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <Reveal>
            <span
              className="inline-block h-1 w-14 rounded-full mb-6"
              style={{ backgroundColor: RP_ACCENT }}
            />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3">
              Distribué par Comarden - Stock à Namur et Bertrix
            </h2>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              Coloris en stock, découpe et conseil de pose : notre équipe vous accompagne sur tous
              vos projets de bardage ventilé ROCKPANEL® en Wallonie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white font-semibold px-8 py-3.5 text-base transition-transform duration-300 hover:scale-105"
                style={{ color: RP_DARK }}
              >
                Nous contacter
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href={`tel:${site.phone.primary}`}
                className="inline-flex items-center justify-center gap-2 rounded-full text-white font-semibold px-8 py-3.5 text-base border border-white/25 hover:bg-white/10 transition-colors"
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

import Link from "next/link";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Phone, CheckCircle2, Check, Layers, Building2 } from "lucide-react";
import type { Product } from "@/types/shop";
import { site } from "@/lib/site";
import { formatPrice } from "@/lib/shop/utils";
import ProductGallery from "@/components/shop/ProductGallery";
import Reveal from "@/components/ui/Reveal";
import BuyNowButton from "@/components/shop/BuyNowButton";
import RelatedProducts from "@/components/shop/RelatedProducts";

// STRATO GRIP palette (lib/brands/config.ts) - orange identity.
const SG_PRIMARY = "#FF6B00";
const SG_DARK = "#221F20";
const SG_ACCENT = "#E85A00";

export interface StratoGripContent {
  tagline: string;
  /** Small note next to the price (e.g. "pour ± 350 m² de surface") */
  priceNote?: string;
  /** Hero "at a glance" application icons */
  applications?: { icon: string; label: string }[];
  /** Editorial concept block */
  concept?: { heading: string; paragraphs: string[] };
  /** Compatible insulation panels (checklist) */
  panels?: string[];
  /** Compatible supports (checklist) */
  supports?: string[];
  /** Rich avantages cards (title + text). If omitted, the DB avantages render as a plain checklist. */
  avantagesCards?: { title: string; text: string }[];
  /** "Applications" recommended-for list */
  applicationsList?: string[];
}

function parseSpec(s: string): { label: string; value: string } {
  const i = s.indexOf(" : ");
  if (i === -1) return { label: s, value: "" };
  return { label: s.slice(0, i), value: s.slice(i + 3) };
}

/** Price block: handles quote (0), plain price, and discounted price. */
function PriceBlock({ product, note }: { product: Product; note?: string }) {
  const pct = product.discount_percent ?? 0;
  const hasDiscount = pct > 0 && product.price_cents > 0;
  const finalCents = hasDiscount
    ? Math.round(product.price_cents * (1 - pct / 100))
    : product.price_cents;

  if (product.price_cents <= 0) {
    return <div className="text-2xl font-bold" style={{ color: SG_DARK }}>Sur devis</div>;
  }

  return (
    <div>
      <div className="flex items-center gap-3 flex-wrap">
        <span className="text-3xl font-extrabold" style={{ color: SG_DARK }}>
          {formatPrice(finalCents, product.currency)}
        </span>
        {hasDiscount && (
          <>
            <span className="text-lg text-muted-foreground line-through">
              {formatPrice(product.price_cents, product.currency)}
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold text-white bg-red-600">
              -{pct}%
            </span>
          </>
        )}
      </div>
      {note && <p className="text-sm text-muted-foreground mt-1">{note}</p>}
    </div>
  );
}

export default function StratoGripProductPage({
  product,
  content,
}: {
  product: Product;
  content: StratoGripContent;
}) {
  const specs = (product.specs ?? []).map(parseSpec);
  const avantages = product.avantages ?? [];
  const showChecklistAvantages = !content.avantagesCards && avantages.length > 0;

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
            <Link href="/marques/strato-grip" className="text-muted-foreground hover:text-primary transition-colors">Strato Grip</Link>
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
              <ProductGallery images={product.images} alt={product.title} accent={SG_PRIMARY} />
            </Reveal>

            <Reveal delay={100}>
              <div>
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                  style={{ backgroundColor: SG_PRIMARY, color: SG_DARK }}
                >
                  STRATO GRIP
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-3">
                  {product.title}
                </h1>
                <p className="text-base sm:text-lg font-semibold mb-5" style={{ color: SG_ACCENT }}>
                  {content.tagline}
                </p>

                <div className="mb-6">
                  <PriceBlock product={product} note={content.priceNote} />
                </div>

                {product.description && (
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    {product.description}
                  </p>
                )}

                {content.applications && content.applications.length > 0 && (
                  <div className="flex flex-wrap gap-4 mb-8">
                    {content.applications.map((a) => {
                      const Icon = ((Icons[a.icon as keyof typeof Icons] as unknown) as LucideIcon) || Icons.Square;
                      return (
                        <div key={a.label} className="flex flex-col items-center gap-1.5 w-20 text-center">
                          <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${SG_PRIMARY}1F` }}>
                            <Icon className="w-6 h-6" style={{ color: SG_ACCENT }} strokeWidth={2} />
                          </div>
                          <span className="text-[11px] leading-tight text-muted-foreground">{a.label}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <BuyNowButton product={product} redirectTo="/marques/strato-grip" color={SG_PRIMARY} />
                  <Link
                    href={`/contact?sujet=Devis%20${encodeURIComponent(product.title)}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full font-semibold px-6 py-3.5 text-sm border transition-colors"
                    style={{ borderColor: SG_ACCENT, color: SG_DARK }}
                  >
                    Demander un devis
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={`tel:${site.phone.primary}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full font-semibold px-6 py-3.5 text-sm border transition-colors"
                    style={{ borderColor: SG_ACCENT, color: SG_DARK }}
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

      {/* Concept (rich) */}
      {content.concept && (
        <section className="py-12 sm:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-5">{content.concept.heading}</h2>
              <div className="space-y-4">
                {content.concept.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="text-base sm:text-lg text-slate-600 leading-relaxed">{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Panels + supports (rich) */}
      {(content.panels || content.supports) && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
              {content.panels && (
                <Reveal>
                  <div className="h-full rounded-2xl p-6 sm:p-8 ring-1 ring-black/5 bg-slate-50">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: `${SG_PRIMARY}1F` }}>
                        <Layers className="w-5 h-5" style={{ color: SG_ACCENT }} />
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-primary">Isolants compatibles</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {content.panels.map((p) => (
                        <li key={p} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: SG_ACCENT }} strokeWidth={3} />
                          <span className="text-sm sm:text-base text-slate-700">{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}
              {content.supports && (
                <Reveal delay={100}>
                  <div className="h-full rounded-2xl p-6 sm:p-8 ring-1 ring-black/5 bg-slate-50">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl" style={{ backgroundColor: `${SG_PRIMARY}1F` }}>
                        <Building2 className="w-5 h-5" style={{ color: SG_ACCENT }} />
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-primary">Supports compatibles</h3>
                    </div>
                    <ul className="space-y-2.5">
                      {content.supports.map((s) => (
                        <li key={s} className="flex items-start gap-2.5">
                          <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: SG_ACCENT }} strokeWidth={3} />
                          <span className="text-sm sm:text-base text-slate-700">{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Avantages - rich cards OR plain checklist */}
      {content.avantagesCards && content.avantagesCards.length > 0 && (
        <section className="py-12 sm:py-16" style={{ backgroundColor: `${SG_PRIMARY}0A` }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8">Les avantages de la STRATOGRIP T300</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {content.avantagesCards.map((a, i) => (
                <Reveal key={a.title} delay={i * 60}>
                  <div className="h-full bg-white rounded-2xl ring-1 ring-black/5 p-6 shadow-sm">
                    <h3 className="text-base font-bold text-primary mb-2">{a.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{a.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {showChecklistAvantages && (
        <section className="py-12 sm:py-16" style={{ backgroundColor: `${SG_PRIMARY}0A` }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8">Avantages</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-4">
              {avantages.map((a, i) => (
                <Reveal key={a} delay={i * 50}>
                  <div className="flex items-start gap-3 bg-white rounded-xl p-4 ring-1 ring-black/5 h-full">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: SG_ACCENT }} />
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
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <span className="h-7 w-1.5 rounded-full" style={{ backgroundColor: SG_PRIMARY }} />
                <h2 className="text-2xl sm:text-3xl font-bold text-primary">Caractéristiques techniques</h2>
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
            {product.warning && (
              <Reveal>
                <p className="mt-4 text-xs text-muted-foreground italic leading-relaxed">{product.warning}</p>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* Applications recommended-for list (rich) */}
      {content.applicationsList && content.applicationsList.length > 0 && (
        <section className="py-12 sm:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8">Applications</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-3">
              {content.applicationsList.map((a, i) => (
                <Reveal key={a} delay={i * 40}>
                  <div className="flex items-start gap-3 bg-white rounded-xl p-4 ring-1 ring-black/5">
                    <Check className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: SG_ACCENT }} strokeWidth={3} />
                    <span className="text-sm sm:text-base text-slate-700 leading-relaxed">{a}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related products */}
      <RelatedProducts
        brand={product.brand}
        categoryId={product.category_id}
        excludeSlug={product.slug}
        accent={SG_PRIMARY}
      />

      {/* CTA banner */}
      <section className="py-14 sm:py-20" style={{ backgroundColor: SG_DARK }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <Reveal>
            <span className="inline-block h-1 w-14 rounded-full mb-6" style={{ backgroundColor: SG_PRIMARY }} />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3">
              STRATOGRIP chez Comarden
            </h2>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              Colle T300 en canister de 22 L, pistolet, raccord et rallonge : nos équipes vous conseillent
              sur le choix des produits adaptés à votre projet de toiture plate. Prix, disponibilité et
              conseil technique dans nos points de vente de Bertrix et Naninne.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white font-semibold px-8 py-3.5 text-base transition-transform duration-300 hover:scale-105"
                style={{ color: SG_DARK }}
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

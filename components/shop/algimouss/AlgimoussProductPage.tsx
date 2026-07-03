import Link from "next/link";
import { ArrowRight, Phone, CheckCircle2, Check, AlertTriangle, Layers } from "lucide-react";
import type { Product } from "@/types/shop";
import { site } from "@/lib/site";
import ProductGallery from "@/components/shop/ProductGallery";
import Reveal from "@/components/ui/Reveal";
import BuyNowButton from "@/components/shop/BuyNowButton";
import RelatedProducts from "@/components/shop/RelatedProducts";

// Algimouss palette - green identity used as accent; page stays light.
const ALG_PRIMARY = "#0E7A66";
const ALG_DARK = "#0A4A3C";
const ALG_ACCENT = "#8CC63F";

export interface AlgimoussSupport {
  label: string;
  value: string;
}

export interface AlgimoussProductContent {
  /** Breadcrumb leaf label (e.g. "Traitement", "Nettoyage", "Protection") */
  breadcrumb: string;
  tagline: string;
  /** Long intro (falls back to product.description) */
  intro?: string;
  /** Hero "at a glance" bullets */
  caracteristiques: string[];
  /** Compatible supports (Toitures / Murs & façades ...) */
  supports?: AlgimoussSupport[];
  /** "Ne jamais appliquer sur ..." warning */
  supportsWarning?: string;
  /** Numbered application steps */
  modeEmploi: string[];
  /** Recommendation bullet list */
  recommandations?: string[];
  docUrl?: string;
  docLabel?: string;
}

function parseSpec(s: string): { label: string; value: string } {
  const i = s.indexOf(" : ");
  if (i === -1) return { label: s, value: "" };
  return { label: s.slice(0, i), value: s.slice(i + 3) };
}

export default function AlgimoussProductPage({
  product,
  content,
}: {
  product: Product;
  content: AlgimoussProductContent;
}) {
  const specs = (product.specs ?? []).map(parseSpec);
  const avantages = product.avantages ?? [];
  const intro = content.intro ?? product.description;

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
            <Link href="/marques/algimouss" className="text-muted-foreground hover:text-primary transition-colors">Algimouss</Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">{content.breadcrumb}</span>
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
              <ProductGallery images={product.images} alt={product.title} accent={ALG_PRIMARY} />
            </Reveal>

            <Reveal delay={100}>
              <div>
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white mb-4"
                  style={{ backgroundColor: ALG_PRIMARY }}
                >
                  Algimouss
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-3">
                  {product.title}
                </h1>
                <p className="text-base sm:text-lg font-semibold mb-5" style={{ color: ALG_PRIMARY }}>
                  {content.tagline}
                </p>
                {intro && (
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    {intro}
                  </p>
                )}

                {content.caracteristiques.length > 0 && (
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
                    {content.caracteristiques.map((c) => (
                      <li key={c} className="flex items-start gap-2.5">
                        <span
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: ALG_PRIMARY }}
                        >
                          <Check className="h-3 w-3 text-white" strokeWidth={3} />
                        </span>
                        <span className="text-sm font-medium text-slate-700 leading-snug">{c}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <BuyNowButton product={product} redirectTo="/marques/algimouss" color={ALG_PRIMARY} />
                  <Link
                    href={`/contact?sujet=Devis%20${encodeURIComponent(product.title)}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full font-semibold px-6 py-3.5 text-sm border transition-colors"
                    style={{ borderColor: ALG_PRIMARY, color: ALG_DARK }}
                  >
                    Demander un devis
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={`tel:${site.phone.primary}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full font-semibold px-6 py-3.5 text-sm border transition-colors"
                    style={{ borderColor: ALG_PRIMARY, color: ALG_DARK }}
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

      {/* Avantages */}
      {avantages.length > 0 && (
        <section className="py-12 sm:py-16" style={{ backgroundColor: `${ALG_ACCENT}1A` }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8">Avantages</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-4">
              {avantages.map((a, i) => (
                <Reveal key={a} delay={i * 50}>
                  <div className="flex items-start gap-3 bg-white rounded-xl p-4 ring-1 ring-black/5 h-full">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: ALG_PRIMARY }} />
                    <span className="text-sm sm:text-base text-slate-700 leading-relaxed">{a}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Supports compatibles */}
      {content.supports && content.supports.length > 0 && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <span className="h-7 w-1.5 rounded-full" style={{ backgroundColor: ALG_ACCENT }} />
                <h2 className="text-2xl sm:text-3xl font-bold text-primary">Supports compatibles</h2>
              </div>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-4">
              {content.supports.map((s, i) => (
                <Reveal key={s.label} delay={i * 60}>
                  <div className="h-full bg-slate-50 rounded-2xl p-5 ring-1 ring-black/5">
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="w-4 h-4" style={{ color: ALG_PRIMARY }} />
                      <h3 className="text-sm font-bold uppercase tracking-wide" style={{ color: ALG_DARK }}>{s.label}</h3>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{s.value}</p>
                  </div>
                </Reveal>
              ))}
            </div>
            {content.supportsWarning && (
              <Reveal>
                <div className="mt-5 flex items-start gap-3 rounded-2xl p-4 sm:p-5 bg-amber-50 ring-1 ring-amber-200">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-600" />
                  <p className="text-sm text-amber-900 leading-relaxed font-medium">{content.supportsWarning}</p>
                </div>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* Caractéristiques techniques */}
      {specs.length > 0 && (
        <section className="py-12 sm:py-16" style={{ backgroundColor: `${ALG_PRIMARY}0A` }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <span className="h-7 w-1.5 rounded-full" style={{ backgroundColor: ALG_PRIMARY }} />
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
          </div>
        </section>
      )}

      {/* Mode d'emploi */}
      {content.modeEmploi.length > 0 && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8">Mode d&apos;emploi</h2>
            </Reveal>
            <ol className="space-y-3">
              {content.modeEmploi.map((step, i) => (
                <Reveal key={step.slice(0, 32)} delay={i * 50}>
                  <li className="flex items-start gap-4 bg-slate-50 rounded-2xl p-4 sm:p-5 ring-1 ring-black/5">
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white text-sm font-bold"
                      style={{ backgroundColor: ALG_PRIMARY }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm sm:text-base text-slate-700 leading-relaxed pt-1">{step}</span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* Recommandations */}
      {content.recommandations && content.recommandations.length > 0 && (
        <section className="py-12 sm:py-16" style={{ backgroundColor: `${ALG_ACCENT}14` }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">Recommandations</h2>
            </Reveal>
            <Reveal>
              <ul className="space-y-2.5 bg-white rounded-2xl p-6 ring-1 ring-black/5">
                {content.recommandations.map((r) => (
                  <li key={r.slice(0, 32)} className="flex items-start gap-3 text-sm sm:text-base text-slate-700 leading-relaxed">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: ALG_ACCENT }} />
                    {r}
                  </li>
                ))}
              </ul>
            </Reveal>
            {content.docUrl && (
              <Reveal>
                <a
                  href={content.docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 rounded-full font-semibold px-6 py-3 text-sm border transition-colors hover:bg-white"
                  style={{ borderColor: ALG_PRIMARY, color: ALG_DARK }}
                >
                  {content.docLabel ?? "En savoir plus"}
                  <ArrowRight className="w-4 h-4" style={{ color: ALG_PRIMARY }} />
                </a>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* Related products */}
      <RelatedProducts
        brand={product.brand}
        categoryId={product.category_id}
        excludeSlug={product.slug}
        accent={ALG_PRIMARY}
      />

      {/* CTA banner */}
      <section className="py-14 sm:py-20" style={{ backgroundColor: ALG_PRIMARY }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3">
              Un conseil pour votre traitement ?
            </h2>
            <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto mb-8 leading-relaxed">
              Comarden distribue la gamme Algimouss. Notre équipe vous guide dans le choix du
              nettoyage, du traitement et de la protection adaptés à vos supports.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white font-semibold px-8 py-3.5 text-base transition-transform duration-300 hover:scale-105"
                style={{ color: ALG_PRIMARY }}
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

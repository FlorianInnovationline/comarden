import Link from "next/link";
import { ArrowRight, Phone, CheckCircle2, Package } from "lucide-react";
import type { Product } from "@/types/shop";
import { site } from "@/lib/site";
import ProductGallery from "@/components/shop/ProductGallery";
import Reveal from "@/components/ui/Reveal";
import BuyNowButton from "@/components/shop/BuyNowButton";
import RelatedProducts from "@/components/shop/RelatedProducts";

// SOPREMA palette - navy accents on a white/light page so spec tables read cleanly.
const SOPREMA_PRIMARY = "#003366";
const SOPREMA_ACCENT = "#0083CA";

function parseSpec(s: string): { label: string; value: string } {
  const i = s.indexOf(" : ");
  if (i === -1) return { label: s, value: "" };
  return { label: s.slice(0, i), value: s.slice(i + 3) };
}

/**
 * Rich, SOPREMA-branded product page. Fully driven by the DB product
 * (title, description, specs, avantages, variants, images) - no per-product
 * hardcoding, so it scales to every SOPREMA product.
 */
export default function SopremaProductPage({ product }: { product: Product }) {
  const specs = (product.specs ?? []).map(parseSpec);
  const avantages = product.avantages ?? [];
  const variants = product.variants ?? [];

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
            <Link href="/marques/soprema" className="text-muted-foreground hover:text-primary transition-colors">SOPREMA</Link>
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
              <ProductGallery images={product.images} alt={product.title} accent={SOPREMA_ACCENT} />
            </Reveal>
            <Reveal delay={100}>
              <div>
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white mb-4"
                  style={{ backgroundColor: SOPREMA_PRIMARY }}
                >
                  SOPREMA
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-4">
                  {product.title}
                </h1>
                {product.description && (
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6">
                    {product.description}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-3">
                  <BuyNowButton product={product} redirectTo="/marques/soprema" color={SOPREMA_PRIMARY} />
                  <Link
                    href={`/contact?sujet=Devis%20${encodeURIComponent(product.title)}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full font-semibold px-6 py-3.5 text-sm border transition-colors"
                    style={{ borderColor: SOPREMA_ACCENT, color: SOPREMA_PRIMARY }}
                  >
                    Demander un devis
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={`tel:${site.phone.primary}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full font-semibold px-6 py-3.5 text-sm border transition-colors"
                    style={{ borderColor: SOPREMA_ACCENT, color: SOPREMA_PRIMARY }}
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
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8">Avantages</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-4">
              {avantages.map((a, i) => (
                <Reveal key={a} delay={i * 50}>
                  <div className="flex items-start gap-3 bg-slate-50 rounded-xl p-4 ring-1 ring-black/5 h-full">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: SOPREMA_ACCENT }} />
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
        <section className="py-12 sm:py-16" style={{ backgroundColor: `${SOPREMA_PRIMARY}0D` }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <span className="h-7 w-1.5 rounded-full" style={{ backgroundColor: SOPREMA_ACCENT }} />
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

      {/* Formats / Conditionnement (from variants) */}
      {variants.length > 0 && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8">Formats & conditionnement</h2>
            </Reveal>
            <div className="grid gap-3">
              {variants.map((v, i) => (
                <Reveal key={v} delay={i * 30}>
                  <div className="flex items-start gap-3 rounded-xl ring-1 ring-black/5 bg-slate-50 px-4 py-3">
                    <Package className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: SOPREMA_ACCENT }} />
                    <span className="text-sm text-slate-700">{v}</span>
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
        accent={SOPREMA_ACCENT}
      />

      {/* CTA band */}
      <section className="py-14 sm:py-20" style={{ backgroundColor: SOPREMA_PRIMARY }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <Reveal>
            <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] mb-4" style={{ color: SOPREMA_ACCENT }}>
              Distribué par Comarden depuis 1977
            </p>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
              Besoin de conseils techniques ?
            </h2>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              Notre équipe vous accompagne dans le choix et la mise en œuvre de vos solutions SOPREMA,
              sur nos deux sites de Bertrix et Naninne.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white font-semibold px-8 py-3.5 text-base transition-transform duration-300 hover:scale-105"
                style={{ color: SOPREMA_PRIMARY }}
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
              <Link
                href="/marques/soprema"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white/10 text-white font-semibold px-8 py-3.5 text-base border border-white/25 hover:bg-white/20 transition-colors"
              >
                Univers SOPREMA
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

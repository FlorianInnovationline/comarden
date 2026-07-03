import Link from "next/link";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Phone, CheckCircle2, FileText, Check } from "lucide-react";
import type { Product } from "@/types/shop";
import { site } from "@/lib/site";
import ProductGallery from "@/components/shop/ProductGallery";
import Reveal from "@/components/ui/Reveal";
import BuyNowButton from "@/components/shop/BuyNowButton";
import RelatedProducts from "@/components/shop/RelatedProducts";

// DuPont Tyvek palette - red primary (brand config), blue for the Tyvek wordmark.
const TY_PRIMARY = "#DA291C";
const TY_DARK = "#1A1A1A";
const TY_BLUE = "#004B87";

export interface TyvekWhyPoint {
  icon: string;
  title: string;
  body: string;
}

export interface TyvekProductContent {
  /** Short line under the title */
  tagline: string;
  /** Long intro paragraph (falls back to product.description if omitted) */
  intro?: string;
  /** Quick "at a glance" bullet list shown in the hero */
  caracteristiques: string[];
  /** "Pourquoi choisir Tyvek" editorial block */
  whyEyebrow?: string;
  whyTitle: string;
  whyPoints: TyvekWhyPoint[];
  /** Optional installation / mise en oeuvre note */
  poseTitle?: string;
  pose?: string;
  /** Optional technical documentation link */
  docUrl?: string;
  docLabel?: string;
  /** Breadcrumb leaf label (e.g. "Écrans de sous-toiture") */
  breadcrumb: string;
}

function parseSpec(s: string): { label: string; value: string } {
  const i = s.indexOf(" : ");
  if (i === -1) return { label: s, value: "" };
  return { label: s.slice(0, i), value: s.slice(i + 3) };
}

export default function TyvekProductPage({
  product,
  content,
}: {
  product: Product;
  content: TyvekProductContent;
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
            <Link href="/marques/tyvek" className="text-muted-foreground hover:text-primary transition-colors">Tyvek®</Link>
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
              <ProductGallery images={product.images} alt={product.title} accent={TY_PRIMARY} />
            </Reveal>

            <Reveal delay={100}>
              <div>
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white mb-4"
                  style={{ backgroundColor: TY_PRIMARY }}
                >
                  DuPont™ Tyvek®
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-3">
                  {product.title}
                </h1>
                <p className="text-base sm:text-lg font-medium mb-5" style={{ color: TY_BLUE }}>
                  {content.tagline}
                </p>
                {intro && (
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    {intro}
                  </p>
                )}

                {/* Caractéristiques at a glance */}
                {content.caracteristiques.length > 0 && (
                  <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-8">
                    {content.caracteristiques.map((c) => (
                      <li key={c} className="flex items-start gap-2.5">
                        <span
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                          style={{ backgroundColor: TY_PRIMARY }}
                        >
                          <Check className="h-3 w-3 text-white" strokeWidth={3} />
                        </span>
                        <span className="text-sm font-medium text-slate-700 leading-snug">{c}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <BuyNowButton product={product} redirectTo="/marques/tyvek" color={TY_PRIMARY} />
                  <Link
                    href={`/contact?sujet=Devis%20${encodeURIComponent(product.title)}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full font-semibold px-6 py-3.5 text-sm border transition-colors"
                    style={{ borderColor: TY_PRIMARY, color: TY_DARK }}
                  >
                    Demander un devis
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={`tel:${site.phone.primary}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full font-semibold px-6 py-3.5 text-sm border transition-colors"
                    style={{ borderColor: TY_PRIMARY, color: TY_DARK }}
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
        <section className="py-12 sm:py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8">Avantages</h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-4">
              {avantages.map((a, i) => (
                <Reveal key={a} delay={i * 50}>
                  <div className="flex items-start gap-3 bg-white rounded-xl p-4 ring-1 ring-black/5 h-full">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: TY_PRIMARY }} />
                    <span className="text-sm sm:text-base text-slate-700 leading-relaxed">{a}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pourquoi choisir Tyvek */}
      {content.whyPoints.length > 0 && (
        <section className="py-12 sm:py-16" style={{ backgroundColor: `${TY_PRIMARY}0A` }}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              {content.whyEyebrow && (
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: TY_PRIMARY }}>
                  {content.whyEyebrow}
                </p>
              )}
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-10 max-w-3xl">
                {content.whyTitle}
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 gap-5 sm:gap-6">
              {content.whyPoints.map((pt, i) => {
                const Icon = ((Icons[pt.icon as keyof typeof Icons] as unknown) as LucideIcon) || Icons.Sparkles;
                return (
                  <Reveal key={pt.title} delay={i * 60}>
                    <div className="h-full bg-white rounded-2xl ring-1 ring-black/5 p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                          style={{ backgroundColor: `${TY_PRIMARY}14` }}
                        >
                          <Icon className="h-5 w-5" style={{ color: TY_PRIMARY }} strokeWidth={2} />
                        </span>
                        <div className="flex items-baseline gap-2">
                          <span className="text-sm font-extrabold tabular-nums" style={{ color: TY_PRIMARY }}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h3 className="text-base font-bold text-primary leading-snug">{pt.title}</h3>
                        </div>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed">{pt.body}</p>
                    </div>
                  </Reveal>
                );
              })}
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
                <span className="h-7 w-1.5 rounded-full" style={{ backgroundColor: TY_PRIMARY }} />
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

            {content.docUrl && (
              <Reveal>
                <a
                  href={content.docUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 rounded-full font-semibold px-6 py-3 text-sm border transition-colors hover:bg-slate-50"
                  style={{ borderColor: TY_PRIMARY, color: TY_DARK }}
                >
                  <FileText className="w-4 h-4" style={{ color: TY_PRIMARY }} />
                  {content.docLabel ?? "Documentation technique"}
                </a>
              </Reveal>
            )}
          </div>
        </section>
      )}

      {/* Pose / mise en oeuvre */}
      {content.pose && (
        <section className="py-12 sm:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
                {content.poseTitle ?? "Mise en œuvre"}
              </h2>
              <p className="text-base text-slate-600 leading-relaxed">{content.pose}</p>
            </Reveal>
          </div>
        </section>
      )}

      {/* Related products */}
      <RelatedProducts
        brand={product.brand}
        categoryId={product.category_id}
        excludeSlug={product.slug}
        accent={TY_PRIMARY}
      />

      {/* CTA banner */}
      <section className="py-14 sm:py-20" style={{ backgroundColor: TY_PRIMARY }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3">
              Besoin de conseils techniques ?
            </h2>
            <p className="text-base sm:text-lg text-white/85 max-w-2xl mx-auto mb-8 leading-relaxed">
              Comarden distribue les membranes DuPont™ Tyvek®. Notre équipe vous accompagne
              dans le choix et la mise en œuvre de vos écrans et pare-pluie.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white font-semibold px-8 py-3.5 text-base transition-transform duration-300 hover:scale-105"
                style={{ color: TY_PRIMARY }}
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

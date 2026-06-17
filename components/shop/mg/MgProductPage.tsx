import Link from "next/link";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Phone, CheckCircle2, Info } from "lucide-react";
import type { Product } from "@/types/shop";
import { site } from "@/lib/site";
import ProductGallery from "@/components/shop/ProductGallery";
import Reveal from "@/components/ui/Reveal";

// MG Bouw palette — used as ACCENT only; page background stays white/light.
const MG_PRIMARY = "#003D7A";
const MG_ACCENT = "#0066CC";

export interface MgApplication {
  icon: string;
  label: string;
}

export interface MgConditRow {
  description: string;
  largeur: string;
  longueur: string;
  code: string;
  ean: string;
  quantite: string;
  poids?: string;
}

export interface MgAssocProduct {
  name: string;
  brand: string;
  dims: string;
  ean: string;
  qty: string;
}

export interface MgCallout {
  title: string;
  body: string;
}

export interface MgProductContent {
  tagline: string;
  applications: MgApplication[];
  utilisation: string;
  /** Optional highlight inside the specs section (e.g. Active XTR "double fonction") */
  specsCallout?: MgCallout;
  conditionnement: MgConditRow[];
  /** Whether the conditionnement table shows a Poids column */
  showPoids?: boolean;
  modeEmploi: string;
  /** Optional callout under mode d'emploi (e.g. Polytex slope overlaps) */
  modeEmploiCallout?: { title: string; lines: string[] };
  associes: MgAssocProduct[];
}

function parseSpec(s: string): { label: string; value: string } {
  const i = s.indexOf(" : ");
  if (i === -1) return { label: s, value: "" };
  return { label: s.slice(0, i), value: s.slice(i + 3) };
}

export default function MgProductPage({
  product,
  content,
}: {
  product: Product;
  content: MgProductContent;
}) {
  const specs = (product.specs ?? []).map(parseSpec);
  const avantages = product.avantages ?? [];

  return (
    <div className="pt-20 bg-white">
      {/* 2. Breadcrumb */}
      <section className="py-4 bg-neutral/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Accueil</Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">Magasin</Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground">Films techniques</span>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">{product.title}</span>
          </nav>
        </div>
      </section>

      {/* 3. Hero */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            <Reveal>
              <ProductGallery images={product.images} alt={product.title} accent={MG_ACCENT} />
            </Reveal>

            <Reveal delay={100}>
              <div>
                <span
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white mb-4"
                  style={{ backgroundColor: MG_PRIMARY }}
                >
                  MG BOUW
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-3">
                  {product.title}
                </h1>
                <p className="text-base sm:text-lg font-medium mb-5" style={{ color: MG_ACCENT }}>
                  {content.tagline}
                </p>
                {product.description && (
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    {product.description}
                  </p>
                )}

                {/* Application icons */}
                {content.applications.length > 0 && (
                  <div className="flex flex-wrap gap-4 mb-8">
                    {content.applications.map((a) => {
                      const Icon = ((Icons[a.icon as keyof typeof Icons] as unknown) as LucideIcon) || Icons.Square;
                      return (
                        <div key={a.label} className="flex flex-col items-center gap-1.5 w-20 text-center">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center"
                            style={{ backgroundColor: `${MG_ACCENT}14` }}
                          >
                            <Icon className="w-6 h-6" style={{ color: MG_PRIMARY }} strokeWidth={2} />
                          </div>
                          <span className="text-[11px] leading-tight text-muted-foreground">{a.label}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/contact?sujet=Devis%20${encodeURIComponent(product.title)}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full text-white font-semibold px-7 py-3.5 text-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg"
                    style={{ backgroundColor: MG_PRIMARY }}
                  >
                    Demander un devis
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={`tel:${site.phone.primary}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full font-semibold px-6 py-3.5 text-sm border transition-colors"
                    style={{ borderColor: MG_ACCENT, color: MG_PRIMARY }}
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

      {/* 4. Utilisation */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">Utilisation</h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">{content.utilisation}</p>
          </Reveal>
        </div>
      </section>

      {/* 5. Avantages */}
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
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: MG_ACCENT }} />
                    <span className="text-sm sm:text-base text-slate-700 leading-relaxed">{a}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Spécifications techniques */}
      <section className="py-12 sm:py-16" style={{ backgroundColor: `${MG_PRIMARY}0D` }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <span className="h-7 w-1.5 rounded-full" style={{ backgroundColor: MG_ACCENT }} />
              <h2 className="text-2xl sm:text-3xl font-bold text-primary">Spécifications techniques</h2>
            </div>
          </Reveal>

          {content.specsCallout && (
            <Reveal>
              <div
                className="rounded-2xl p-5 sm:p-6 mb-6 text-white flex items-start gap-3"
                style={{ backgroundColor: MG_PRIMARY }}
              >
                <Info className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold mb-1">{content.specsCallout.title}</p>
                  <p className="text-sm text-white/85 leading-relaxed">{content.specsCallout.body}</p>
                </div>
              </div>
            </Reveal>
          )}

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

      {/* 7. Conditionnement */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8">Conditionnement disponible</h2>
          </Reveal>
          <Reveal>
            <div className="overflow-x-auto rounded-2xl ring-1 ring-black/5">
              <table className="w-full text-sm min-w-[680px]">
                <thead>
                  <tr className="text-white" style={{ backgroundColor: MG_PRIMARY }}>
                    <th className="text-left py-3 px-4 font-semibold">Description</th>
                    <th className="text-left py-3 px-4 font-semibold">Largeur</th>
                    <th className="text-left py-3 px-4 font-semibold">Longueur</th>
                    <th className="text-left py-3 px-4 font-semibold">Code article</th>
                    <th className="text-left py-3 px-4 font-semibold">Code EAN</th>
                    <th className="text-left py-3 px-4 font-semibold">Quantité</th>
                    {content.showPoids !== false && <th className="text-left py-3 px-4 font-semibold">Poids</th>}
                  </tr>
                </thead>
                <tbody>
                  {content.conditionnement.map((r, i) => (
                    <tr key={r.code} className={i % 2 === 1 ? "bg-slate-50" : "bg-white"}>
                      <td className="py-3 px-4 font-medium text-primary">{r.description}</td>
                      <td className="py-3 px-4 text-slate-600">{r.largeur}</td>
                      <td className="py-3 px-4 text-slate-600">{r.longueur}</td>
                      <td className="py-3 px-4 font-mono text-xs text-slate-600">{r.code}</td>
                      <td className="py-3 px-4 font-mono text-xs text-slate-600">{r.ean}</td>
                      <td className="py-3 px-4 text-slate-600">{r.quantite}</td>
                      {content.showPoids !== false && <td className="py-3 px-4 text-slate-600">{r.poids}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 8. Mode d'emploi */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-4">Mode d&apos;emploi</h2>
            <p className="text-base text-slate-600 leading-relaxed">{content.modeEmploi}</p>
          </Reveal>

          {content.modeEmploiCallout && (
            <Reveal delay={80}>
              <div
                className="mt-6 rounded-2xl p-5 sm:p-6 bg-white ring-1"
                style={{ borderColor: MG_ACCENT, boxShadow: `inset 4px 0 0 ${MG_ACCENT}` }}
              >
                <p className="font-bold text-primary mb-3">{content.modeEmploiCallout.title}</p>
                <ul className="space-y-1.5">
                  {content.modeEmploiCallout.lines.map((l) => (
                    <li key={l} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: MG_ACCENT }} />
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* 9. Produits associés */}
      {content.associes.length > 0 && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">Produits associés</h2>
              <p className="text-sm text-muted-foreground mb-8">Suggestions de produits complémentaires (information).</p>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {content.associes.map((p, i) => (
                <Reveal key={`${p.name}-${p.ean}`} delay={i * 50}>
                  <div className="h-full bg-white rounded-2xl ring-1 ring-black/5 p-5 hover:shadow-md transition-shadow">
                    <span
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white mb-3"
                      style={{ backgroundColor: MG_ACCENT }}
                    >
                      {p.brand}
                    </span>
                    <h3 className="text-sm font-bold text-primary mb-3 leading-snug">{p.name}</h3>
                    <dl className="space-y-1 text-xs text-slate-600">
                      <div className="flex justify-between gap-2">
                        <dt className="text-slate-400">Dimensions</dt>
                        <dd className="text-right">{p.dims}</dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt className="text-slate-400">Code EAN</dt>
                        <dd className="font-mono text-right">{p.ean}</dd>
                      </div>
                      <div className="flex justify-between gap-2">
                        <dt className="text-slate-400">Quantité</dt>
                        <dd className="text-right">{p.qty}</dd>
                      </div>
                    </dl>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 10. CTA banner */}
      <section className="py-14 sm:py-20" style={{ backgroundColor: MG_PRIMARY }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3">
              Besoin de conseils techniques ?
            </h2>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              Comarden distribue MG Bouw depuis plusieurs années. Notre équipe vous accompagne
              dans le choix et la mise en œuvre de vos films techniques.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white font-semibold px-8 py-3.5 text-base transition-transform duration-300 hover:scale-105"
                style={{ color: MG_PRIMARY }}
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

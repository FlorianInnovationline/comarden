import Link from "next/link";
import {
  ArrowRight,
  Phone,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Scale,
  Droplets,
  ShieldCheck,
  Filter,
  Disc,
  Shirt,
  Package,
  Hand,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Product } from "@/types/shop";
import { site } from "@/lib/site";
import ProductGallery from "@/components/shop/ProductGallery";
import Reveal from "@/components/ui/Reveal";
import BuyNowButton from "@/components/shop/BuyNowButton";

// AMIANTE safety palette - serious/danger tone (brief design notes).
const AM_CHARCOAL = "#1D1D1B";
const AM_RED = "#E30613";

/** Registry of the EPI products for cross-linking. */
const EPI: Record<string, { label: string; role: string; icon: LucideIcon }> = {
  "amiseal-fix-11": { label: "AMISEAL-FIX 11", role: "Fixateur de fibres", icon: Droplets },
  "demi-masque-bls-4000-next": { label: "Demi-masque BLS 4000 NEXT", role: "Protection respiratoire", icon: ShieldCheck },
  "filtres-bls-202-p3r": { label: "Filtres BLS 202 P3 R", role: "Filtres P3 (paire)", icon: Filter },
  "couvercle-filtre-bls-200-p3": { label: "Couvercle filtre BLS 200 P3", role: "Maintien du préfiltre", icon: Disc },
  "combinaison-sms-cat3-type5-6": { label: "Combinaison SMS Cat. III Type 5/6", role: "Combinaison jetable", icon: Shirt },
  "big-bag-ok-90-1500kg": { label: "Big Bag OK SWL 1500 kg", role: "Déchets amiante", icon: Package },
  "gants-oxxa-nitri-tech-14-690": { label: "Gants OXXA Nitri-Tech 14-690", role: "Protection des mains", icon: Hand },
};

export interface AmianteContent {
  tagline: string;
  utilisation: string;
  pointsAttention: string[];
  /** slugs of EPI products to cross-link */
  epi: string[];
}

function parseSpec(s: string): { label: string; value: string } {
  const i = s.indexOf(" : ");
  if (i === -1) return { label: s, value: "" };
  return { label: s.slice(0, i), value: s.slice(i + 3) };
}

export default function AmianteProductPage({
  product,
  content,
}: {
  product: Product;
  content: AmianteContent;
}) {
  const specs = (product.specs ?? []).map(parseSpec);
  const avantages = product.avantages ?? [];

  return (
    <div className="pt-20 bg-white">
      {/* 1. Safety banner - sticky under the header, impossible to miss */}
      <div
        className="sticky top-20 z-40 text-white"
        style={{ backgroundColor: AM_RED }}
        role="alert"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-start sm:items-center gap-3">
          <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5 sm:mt-0" />
          <p className="text-xs sm:text-sm font-semibold leading-snug">
            ATTENTION AMIANTE - Le port des EPI complets (masque P3, combinaison Cat III, gants) est
            OBLIGATOIRE. Respect strict de la réglementation amiante en vigueur. Consulter un
            professionnel agréé avant intervention.
          </p>
        </div>
      </div>

      {/* 2. Breadcrumb */}
      <section className="py-4 bg-neutral/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex flex-wrap items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">Accueil</Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/marques/danger-amiante" className="text-muted-foreground hover:text-primary transition-colors">Amiante</Link>
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
              <ProductGallery images={product.images} alt={product.title} accent={AM_RED} />
            </Reveal>

            <Reveal delay={100}>
              <div>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-white mb-4"
                  style={{ backgroundColor: AM_CHARCOAL }}
                >
                  <AlertTriangle className="w-3.5 h-3.5" style={{ color: AM_RED }} />
                  Amiante
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-3">
                  {product.title}
                </h1>
                <p className="text-base sm:text-lg font-semibold mb-5" style={{ color: AM_RED }}>
                  {content.tagline}
                </p>
                {product.description && (
                  <p className="text-base text-muted-foreground leading-relaxed mb-6">
                    {product.description}
                  </p>
                )}

                <div className="flex flex-col sm:flex-row gap-3">
                  <BuyNowButton product={product} redirectTo="/marques/danger-amiante" color={AM_CHARCOAL} />
                  <Link
                    href={`/contact?sujet=Devis%20${encodeURIComponent(product.title)}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full font-semibold px-6 py-3.5 text-sm border transition-colors"
                    style={{ borderColor: AM_CHARCOAL, color: AM_CHARCOAL }}
                  >
                    Demander un devis
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a
                    href={`tel:${site.phone.primary}`}
                    className="inline-flex items-center justify-center gap-2 rounded-full font-semibold px-6 py-3.5 text-sm border transition-colors"
                    style={{ borderColor: AM_CHARCOAL, color: AM_CHARCOAL }}
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
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: AM_CHARCOAL }} />
                    <span className="text-sm sm:text-base text-slate-700 leading-relaxed">{a}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 6. Spécifications techniques */}
      {specs.length > 0 && (
        <section className="py-12 sm:py-16 bg-slate-50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="flex items-center gap-3 mb-8">
                <span className="h-7 w-1.5 rounded-full" style={{ backgroundColor: AM_CHARCOAL }} />
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

      {/* 7. Points d'attention - RED callout, impossible to miss */}
      {content.pointsAttention.length > 0 && (
        <section className="py-12 sm:py-16 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div
                className="rounded-2xl p-6 sm:p-8"
                style={{
                  backgroundColor: "#FEF2F2",
                  borderLeft: `6px solid ${AM_RED}`,
                }}
              >
                <div className="flex items-center gap-3 mb-5">
                  <AlertTriangle className="w-7 h-7" style={{ color: AM_RED }} />
                  <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: AM_RED }}>
                    Points d&apos;attention
                  </h2>
                </div>
                <ul className="space-y-3">
                  {content.pointsAttention.map((p) => (
                    <li key={p} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: AM_RED }} />
                      <span className="text-sm sm:text-base text-slate-800 leading-relaxed">{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* 8. EPI compatibles / recommandés */}
      {content.epi.length > 0 && (
        <section className="py-12 sm:py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-2">EPI compatibles et recommandés</h2>
              <p className="text-sm text-muted-foreground mb-8">
                Ces équipements se complètent : ne jamais intervenir sur l&apos;amiante sans la protection complète.
              </p>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {content.epi.map((slug, i) => {
                const e = EPI[slug];
                if (!e) return null;
                const Icon = e.icon;
                return (
                  <Reveal key={slug} delay={i * 60}>
                    <Link
                      href={`/shop/produit/${slug}`}
                      className="group h-full flex flex-col rounded-2xl p-6 ring-1 ring-black/5 bg-white hover:shadow-md hover:-translate-y-0.5 transition-all"
                    >
                      <span
                        className="flex h-11 w-11 items-center justify-center rounded-xl mb-4"
                        style={{ backgroundColor: `${AM_RED}12` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: AM_RED }} />
                      </span>
                      <h3 className="text-base font-bold text-primary mb-1 leading-snug">{e.label}</h3>
                      <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">{e.role}</p>
                      <span className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: AM_RED }}>
                        Voir le produit
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </Link>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* 9. Réglementation & sécurité */}
      <section className="py-10 sm:py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="rounded-2xl bg-slate-100 ring-1 ring-black/5 p-6 sm:p-8 flex items-start gap-4">
              <Scale className="w-6 h-6 flex-shrink-0 mt-0.5 text-slate-500" />
              <div>
                <h2 className="text-lg font-bold text-primary mb-2">Réglementation &amp; sécurité</h2>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Les travaux sur matériaux contenant de l&apos;amiante doivent être réalisés dans le strict
                  respect des législations locales en vigueur. Ce produit ne remplace pas une analyse
                  amiante, un inventaire ou une procédure officielle de désamiantage. Contactez un
                  professionnel agréé pour toute intervention.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 10. CTA banner */}
      <section className="py-14 sm:py-20" style={{ backgroundColor: AM_CHARCOAL }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <Reveal>
            <span className="inline-block h-1 w-14 rounded-full mb-6" style={{ backgroundColor: AM_RED }} />
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-3">
              Une toiture amiantée à remplacer ? Comarden accompagne les professionnels.
            </h2>
            <p className="text-base sm:text-lg text-white/80 max-w-2xl mx-auto mb-8 leading-relaxed">
              EPI, fixateur, conditionnement des déchets et matériaux de remplacement : nous fournissons
              les couvreurs et entrepreneurs en Wallonie, à Bruxelles et au Luxembourg.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white font-semibold px-8 py-3.5 text-base transition-transform duration-300 hover:scale-105"
                style={{ color: AM_CHARCOAL }}
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
            <div className="mt-6">
              <Link href="/toiture-amiante-remplacement" className="inline-flex items-center gap-1 text-sm font-semibold text-white/80 hover:text-white underline">
                Voir la solution complète toiture amiante
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

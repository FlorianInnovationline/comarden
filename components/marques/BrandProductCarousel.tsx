import type { BrandConfig } from "@/lib/brands/config";
import type { Product } from "@/types/shop";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { resolveProductImageSrc } from "@/lib/shop/productImages";
import { site } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import CardAddToCart from "@/components/shop/CardAddToCart";

interface Props {
  brand: BrandConfig;
  products: Product[];
}

/**
 * "Nos produits <brand>" - horizontal product carousel from Supabase.
 *   - productBrand === null -> catalogue "à venir"
 *   - 0 matching products    -> "disponibles sur demande" CTA
 *   - >0 products            -> scroll-snap carousel with add-to-cart cards
 */
export default function BrandProductCarousel({ brand, products }: Props) {
  return (
    <section id="produits" className="bg-[var(--brand-bg)] py-16 sm:py-20 lg:py-24 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--brand-dark)] tracking-tight text-center mb-12">
            {brand.productsTitle}
          </h2>
        </Reveal>

        {brand.productBrand === null ? (
          <Reveal>
            <Placeholder
              title="Catalogue à venir"
              text={`Les produits ${brand.name} arrivent bientôt chez Comarden. Contactez-nous pour le catalogue et la disponibilité.`}
            />
          </Reveal>
        ) : products.length === 0 ? (
          <Reveal>
            <Placeholder
              title="Produits disponibles sur demande"
              text="Contactez-nous : notre équipe vous renseigne sur la gamme et les disponibilités."
            />
          </Reveal>
        ) : (
          <Reveal>
            <div className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:thin]">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="group snap-start shrink-0 w-[260px] sm:w-[280px] bg-white rounded-2xl ring-1 ring-black/5 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  <Link href={`/shop/produit/${p.slug}`} className="block">
                    <div className="relative aspect-square bg-neutral/10 overflow-hidden">
                      <Image
                        src={resolveProductImageSrc(p.images?.[0])}
                        alt={p.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="280px"
                      />
                    </div>
                  </Link>
                  <div className="p-5 flex flex-col flex-1">
                    {p.brand && (
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--brand-accent)] mb-1.5">
                        {p.brand}
                      </span>
                    )}
                    <Link href={`/shop/produit/${p.slug}`}>
                      <h3 className="text-sm font-bold text-[var(--brand-dark)] leading-snug mb-2 line-clamp-2 hover:underline">
                        {p.title}
                      </h3>
                    </Link>
                    {p.description && (
                      <p className="text-xs text-[var(--brand-dark)]/65 leading-relaxed line-clamp-2 mb-4">
                        {p.description}
                      </p>
                    )}
                    <div className="mt-auto space-y-2.5">
                      <Link
                        href={`/shop/produit/${p.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--brand-dark)] group-hover:text-[var(--brand-accent)] transition-colors"
                      >
                        Voir le produit
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </Link>
                      <CardAddToCart product={p} color={brand.colors.accent} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function Placeholder({ title, text }: { title: string; text: string }) {
  return (
    <div className="max-w-2xl mx-auto text-center rounded-3xl bg-white ring-1 ring-black/5 p-10 sm:p-14 shadow-sm">
      <h3 className="text-xl sm:text-2xl font-bold text-[var(--brand-dark)] mb-3">{title}</h3>
      <p className="text-sm sm:text-base text-[var(--brand-dark)]/70 leading-relaxed mb-8">{text}</p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-dark)] text-white font-semibold px-6 py-3 text-sm transition-transform duration-300 hover:scale-105"
        >
          Nous contacter
          <ArrowRight className="w-4 h-4" />
        </Link>
        <a
          href={`tel:${site.phone.primary}`}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--brand-primary)] text-[var(--brand-on-primary)] font-semibold px-6 py-3 text-sm transition-transform duration-300 hover:scale-105"
        >
          <Phone className="w-4 h-4" />
          {site.phone.display}
        </a>
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getProducts } from "@/lib/shop/queries";
import { resolveProductImageSrc } from "@/lib/shop/productImages";
import CardAddToCart from "./CardAddToCart";
import Reveal from "@/components/ui/Reveal";

/**
 * "Produits associés" carousel shown at the bottom of every product page.
 * Prefers products of the same brand; falls back to the same category.
 */
export default async function RelatedProducts({
  brand,
  categoryId,
  excludeSlug,
  accent = "#002D59",
  title = "Vous aimerez aussi",
}: {
  brand?: string | null;
  categoryId?: string | null;
  excludeSlug: string;
  accent?: string;
  title?: string;
}) {
  const all = await getProducts({ active: true });
  const v = (brand ?? "").trim().toLowerCase();

  let related = brand
    ? all.filter((p) => p.slug !== excludeSlug && (p.brand ?? "").trim().toLowerCase() === v)
    : [];

  if (related.length < 2 && categoryId) {
    const byCat = all.filter((p) => p.slug !== excludeSlug && p.category_id === categoryId);
    const seen = new Set(related.map((p) => p.slug));
    for (const p of byCat) if (!seen.has(p.slug)) related.push(p);
  }

  related = related.slice(0, 8);
  if (related.length === 0) return null;

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8">{title}</h2>
        </Reveal>
        <div className="flex gap-5 overflow-x-auto pb-4 snap-x -mx-4 px-4 sm:mx-0 sm:px-0 [scrollbar-width:thin]">
          {related.map((p) => (
            <div
              key={p.id}
              className="group snap-start shrink-0 w-[240px] sm:w-[260px] bg-white rounded-2xl ring-1 ring-black/5 overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <Link href={`/shop/produit/${p.slug}`} className="block">
                <div className="relative aspect-square bg-neutral/10 overflow-hidden">
                  <Image
                    src={resolveProductImageSrc(p.images?.[0])}
                    alt={p.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="260px"
                  />
                </div>
              </Link>
              <div className="p-4 flex flex-col flex-1">
                {p.brand && (
                  <span className="text-[10px] font-bold uppercase tracking-widest mb-1.5" style={{ color: accent }}>
                    {p.brand}
                  </span>
                )}
                <Link href={`/shop/produit/${p.slug}`}>
                  <h3 className="text-sm font-bold text-primary leading-snug mb-2 line-clamp-2 hover:underline">
                    {p.title}
                  </h3>
                </Link>
                {p.description && (
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mb-3">{p.description}</p>
                )}
                <div className="mt-auto space-y-2">
                  <Link
                    href={`/shop/produit/${p.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-accent transition-colors"
                  >
                    Voir le produit
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                  <CardAddToCart product={p} color={accent} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

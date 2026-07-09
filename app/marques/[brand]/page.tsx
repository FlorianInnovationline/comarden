import type { Metadata } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { getBrand, BRAND_SLUGS } from "@/lib/brands/config";
import { getProducts } from "@/lib/shop/queries";
import type { Product } from "@/types/shop";
import BrandHero from "@/components/marques/BrandHero";
import BrandAbout from "@/components/marques/BrandAbout";
import BrandFeatures from "@/components/marques/BrandFeatures";
import BrandProductCarousel from "@/components/marques/BrandProductCarousel";
import BrandCTA from "@/components/marques/BrandCTA";
import BrandStory from "@/components/marques/BrandStory";
import BrandUseCases from "@/components/marques/BrandUseCases";
import BrandOrigin from "@/components/marques/BrandOrigin";
import BrandNotice from "@/components/marques/BrandNotice";

interface PageProps {
  params: Promise<{ brand: string }>;
}

export function generateStaticParams() {
  return BRAND_SLUGS.map((brand) => ({ brand }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { brand: slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return { title: "Marque introuvable - Comarden" };
  return {
    title: `${brand.name} - Comarden`,
    description: brand.heroPitch,
    // QR-only pages are noindex; info pages can opt in via `indexable`.
    robots: brand.indexable ? { index: true, follow: true } : { index: false, follow: false },
  };
}

/** Fetch products whose brand matches (case-insensitive, trimmed). */
async function fetchBrandProducts(productBrand: string | null): Promise<Product[]> {
  if (!productBrand) return [];
  const target = productBrand.trim().toLowerCase();
  const all = await getProducts({ active: true });
  return all.filter((p) => (p.brand ?? "").trim().toLowerCase() === target);
}

export default async function BrandPage({ params }: PageProps) {
  const { brand: slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();

  const products = await fetchBrandProducts(brand.productBrand);

  const brandVars = {
    "--brand-primary": brand.colors.primary,
    "--brand-dark": brand.colors.dark,
    "--brand-accent": brand.colors.accent,
    "--brand-bg": brand.colors.bg,
    "--brand-on-primary": brand.colors.onPrimary,
  } as CSSProperties;

  return (
    <div style={brandVars} className="bg-[var(--brand-bg)]">
      <BrandHero brand={brand} />
      <BrandAbout brand={brand} />
      <BrandFeatures brand={brand} />
      <BrandProductCarousel brand={brand} products={products} />
      {brand.origin && <BrandOrigin brand={brand} />}
      {brand.story && <BrandStory brand={brand} />}
      {brand.useCases && <BrandUseCases brand={brand} />}
      {brand.notice && <BrandNotice brand={brand} />}
      <BrandCTA brand={brand} />
    </div>
  );
}

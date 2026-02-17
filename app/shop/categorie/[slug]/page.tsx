import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCategoryBySlug, getProducts } from "@/lib/shop/queries";
import ProductCard from "@/components/shop/ProductCard";
import Reveal from "@/components/ui/Reveal";
import FiltersBar from "@/components/shop/FiltersBar";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ search?: string; min?: string; max?: string; inStock?: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Catégorie non trouvée - Comarden",
    };
  }

  return {
    title: `${category.name} - Comarden`,
    description: category.description || `Découvrez nos produits ${category.name}`,
  };
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { search, min, max, inStock } = await searchParams;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  let products = await getProducts({
    categoryId: category.id,
    active: true,
    search: search || undefined,
  });

  // Apply filters
  if (min) {
    const minCents = parseInt(min) * 100;
    products = products.filter((p) => p.price_cents >= minCents);
  }
  if (max) {
    const maxCents = parseInt(max) * 100;
    products = products.filter((p) => p.price_cents <= maxCents);
  }
  if (inStock === 'true') {
    products = products.filter((p) => p.stock > 0);
  }

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <section className="py-4 bg-neutral/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <a href="/" className="text-muted-foreground hover:text-primary transition-colors">
              Accueil
            </a>
            <span className="text-muted-foreground">/</span>
            <a href="/shop" className="text-muted-foreground hover:text-primary transition-colors">
              Magasin
            </a>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{category.name}</span>
          </nav>
        </div>
      </section>

      {/* Category Header */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-base sm:text-lg text-muted-foreground max-w-3xl">
                {category.description}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {/* Filters & Products */}
      <section className="py-8 sm:py-12 bg-gradient-to-b from-white to-neutral/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FiltersBar category={category} />

          {products.length === 0 ? (
            <Reveal>
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">
                  Aucun produit trouvé dans cette catégorie.
                </p>
              </div>
            </Reveal>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mt-8">
              {products.map((product, index) => (
                <Reveal key={product.id} delay={index * 50}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

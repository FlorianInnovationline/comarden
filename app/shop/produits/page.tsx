import type { Metadata } from "next";
import Link from "next/link";
import { getCategories, getProducts } from "@/lib/shop/queries";
import ProductCard from "@/components/shop/ProductCard";
import Reveal from "@/components/ui/Reveal";
import AllProductsFilters from "@/components/shop/AllProductsFilters";

export const metadata: Metadata = {
  title: "Tous les produits - Comarden",
  description: "Parcourez et filtrez l'ensemble de notre gamme de matériaux de construction.",
};

interface PageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    min?: string;
    max?: string;
    inStock?: string;
    sort?: string;
  }>;
}

export default async function AllProductsPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const [categories, allProducts] = await Promise.all([
    getCategories(),
    getProducts({ active: true, search: sp.search || undefined }),
  ]);

  let products = allProducts;

  if (sp.category) {
    products = products.filter((p) => p.category_id === sp.category);
  }
  if (sp.min) {
    const minCents = parseInt(sp.min) * 100;
    products = products.filter((p) => p.price_cents >= minCents);
  }
  if (sp.max) {
    const maxCents = parseInt(sp.max) * 100;
    products = products.filter((p) => p.price_cents <= maxCents);
  }
  if (sp.inStock === "true") {
    products = products.filter((p) => p.stock > 0);
  }

  if (sp.sort === "price-asc") {
    products.sort((a, b) => a.price_cents - b.price_cents);
  } else if (sp.sort === "price-desc") {
    products.sort((a, b) => b.price_cents - a.price_cents);
  } else if (sp.sort === "name") {
    products.sort((a, b) => a.title.localeCompare(b.title, "fr"));
  }

  const activeFilterCount = [sp.search, sp.category, sp.min, sp.max, sp.inStock].filter(Boolean).length;

  return (
    <div className="pt-20">
      {/* Breadcrumb */}
      <section className="py-4 bg-neutral/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
              Accueil
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/shop" className="text-muted-foreground hover:text-primary transition-colors">
              Magasin
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground font-medium">Tous les produits</span>
          </nav>
        </div>
      </section>

      {/* Header */}
      <section className="py-8 sm:py-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2">
              Tous les produits
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground">
              {products.length} produit{products.length !== 1 ? "s" : ""} trouvé{products.length !== 1 ? "s" : ""}
              {activeFilterCount > 0 && (
                <span className="ml-2 text-accent font-medium">
                  ({activeFilterCount} filtre{activeFilterCount > 1 ? "s" : ""} actif{activeFilterCount > 1 ? "s" : ""})
                </span>
              )}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Filters + Products */}
      <section className="py-8 sm:py-12 bg-gradient-to-b from-white to-neutral/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AllProductsFilters categories={categories} />

          {products.length === 0 ? (
            <Reveal>
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground mb-4">
                  Aucun produit ne correspond à vos critères.
                </p>
                <Link
                  href="/shop/produits"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                >
                  Réinitialiser les filtres
                </Link>
              </div>
            </Reveal>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mt-6">
              {products.map((product, index) => (
                <Reveal key={product.id} delay={Math.min(index * 40, 400)}>
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

import type { Metadata } from "next";
import Link from "next/link";
import { Search, ShoppingBag, ArrowRight } from "lucide-react";
import { getCategories, getProducts } from "@/lib/shop/queries";
import CategoryCard from "@/components/shop/CategoryCard";
import ProductCard from "@/components/shop/ProductCard";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Magasin en ligne - Comarden",
  description: "Découvrez notre gamme complète de matériaux de construction en ligne.",
};

export default async function ShopPage() {
  const [categories, allProducts] = await Promise.all([
    getCategories(),
    getProducts({ active: true }),
  ]);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary via-primary to-[#1a2f4a] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6">
                Magasin en ligne Comarden
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Commandez vos matériaux de construction en ligne. Livraison rapide en Wallonie.
              </p>

              {/* Search Bar — redirects to /shop/produits */}
              <div className="max-w-2xl mx-auto">
                <form action="/shop/produits" method="get" className="relative">
                  <input
                    type="text"
                    name="search"
                    placeholder="Rechercher un produit..."
                    className="w-full px-4 py-3 sm:py-4 pl-12 pr-32 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
                  />
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-accent text-primary rounded-lg font-semibold hover:bg-accent/90 transition-all duration-300 hover:scale-105"
                  >
                    Rechercher
                  </button>
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Notice Banner */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Reveal>
          <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 text-center flex items-center justify-center gap-3">
            <ShoppingBag className="w-5 h-5 text-accent flex-shrink-0" />
            <p className="text-sm sm:text-base text-primary font-medium">
              Boutique en ligne — Sélection initiale de produits disponibles. Notre gamme s&apos;enrichira dans les prochains mois.
            </p>
          </div>
        </Reveal>
      </div>

      {/* Categories Section */}
      <section className="py-10 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-8 sm:mb-10">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary tracking-tight mb-3">
                Nos catégories
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
                Parcourez nos produits par catégorie
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
            {categories.map((category, index) => {
              const count = allProducts.filter((p) => p.category_id === category.id).length;
              return (
                <Reveal key={category.id} delay={index * 100}>
                  <CategoryCard category={category} productCount={count} />
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Products */}
      <section className="py-10 sm:py-12 lg:py-16 bg-gradient-to-b from-white to-neutral/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="flex items-center justify-between mb-8 sm:mb-10">
              <div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary tracking-tight mb-2">
                  Tous nos produits
                </h2>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {allProducts.length} produit{allProducts.length > 1 ? 's' : ''} disponible{allProducts.length > 1 ? 's' : ''}
                </p>
              </div>
              <Link
                href="/shop/produits"
                className="hidden sm:inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors"
              >
                Filtrer &amp; rechercher
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {allProducts.map((product, index) => (
              <Reveal key={product.id} delay={Math.min(index * 40, 400)}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>

          {/* Mobile link */}
          <div className="mt-8 text-center sm:hidden">
            <Link
              href="/shop/produits"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors"
            >
              Filtrer &amp; rechercher
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-10 sm:py-12 lg:py-16 bg-primary text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Reveal>
            <ShoppingBag className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 text-accent" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
              Besoin d&apos;un devis professionnel ?
            </h2>
            <p className="text-base sm:text-lg text-white/80 mb-6 sm:mb-8 max-w-2xl mx-auto">
              Pour les commandes importantes ou les projets sur mesure, contactez-nous directement.
            </p>
            <Button
              asChild
              href="/contact?sujet=Devis"
              size="lg"
              className="bg-accent text-primary hover:bg-accent/90 h-12 sm:h-14 px-6 sm:px-8 text-sm sm:text-base font-semibold rounded-full"
            >
              Demander un devis
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
            </Button>
          </Reveal>
        </div>
      </section>
    </div>
  );
}

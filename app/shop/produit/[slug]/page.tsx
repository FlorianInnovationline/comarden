import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShoppingCart, Package, Truck, CheckCircle } from "lucide-react";
import { getProductBySlug, getProducts } from "@/lib/shop/queries";
import { formatPrice, getStockStatus } from "@/lib/shop/utils";
import ProductCard from "@/components/shop/ProductCard";
import AddToCartButton from "@/components/shop/AddToCartButton";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produit non trouvé - Comarden",
    };
  }

  return {
    title: `${product.title} - Comarden`,
    description: product.description || `Découvrez ${product.title} sur Comarden`,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const stockStatus = getStockStatus(product.stock);
  const relatedProducts = await getProducts({
    categoryId: product.category_id,
    active: true,
  });
  const filteredRelated = relatedProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const images = product.images && product.images.length > 0 
    ? product.images 
    : ['/images/placeholder-product.jpg'];

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
            {product.category && (
              <>
                <span className="text-muted-foreground">/</span>
                <Link
                  href={`/shop/categorie/${product.category.slug}`}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {product.category.name}
                </Link>
              </>
            )}
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground">{product.title}</span>
          </nav>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-8 sm:py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Images */}
            <Reveal>
              <div className="space-y-4">
                <div className="relative aspect-square bg-neutral/20 rounded-2xl overflow-hidden">
                  <Image
                    src={images[0]}
                    alt={product.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                {images.length > 1 && (
                  <div className="grid grid-cols-4 gap-4">
                    {images.slice(1, 5).map((img, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-square bg-neutral/20 rounded-lg overflow-hidden cursor-pointer hover:ring-2 ring-accent transition-all"
                      >
                        <Image
                          src={img}
                          alt={`${product.title} - Vue ${idx + 2}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 25vw, 12.5vw"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Reveal>

            {/* Product Info */}
            <Reveal delay={100}>
              <div className="space-y-6">
                {product.category && (
                  <div>
                    <Link
                      href={`/shop/categorie/${product.category.slug}`}
                      className="text-sm text-accent font-semibold uppercase tracking-wide hover:underline"
                    >
                      {product.category.name}
                    </Link>
                  </div>
                )}

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight">
                  {product.title}
                </h1>

                {product.description && (
                  <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                    {product.description}
                  </p>
                )}

                {/* Price & Stock */}
                <div className="flex items-baseline gap-4 py-4 border-y border-border">
                  <div className="text-4xl sm:text-5xl font-bold text-primary">
                    {formatPrice(product.price_cents, product.currency)}
                  </div>
                  <div className={`text-sm font-semibold ${stockStatus.color}`}>
                    {stockStatus.label}
                  </div>
                </div>

                {/* SKU & Stock Info */}
                <div className="space-y-2">
                  {product.sku && (
                    <div className="text-sm text-muted-foreground">
                      Référence: <span className="font-mono">{product.sku}</span>
                    </div>
                  )}
                  {product.stock > 0 && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Package className="w-4 h-4" />
                      {product.stock} unité{product.stock > 1 ? 's' : ''} disponible{product.stock > 1 ? 's' : ''}
                    </div>
                  )}
                </div>

                {/* Add to Cart */}
                <div className="pt-4">
                  <AddToCartButton product={product} disabled={!stockStatus.available} />
                </div>

                {/* Quick Info */}
                <div className="grid sm:grid-cols-2 gap-4 pt-6 border-t border-border">
                  <div className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">Livraison rapide</div>
                      <div className="text-xs text-muted-foreground">24-48h en Wallonie</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">Qualité garantie</div>
                      <div className="text-xs text-muted-foreground">Matériaux professionnels</div>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="pt-4">
                  <Button
                    asChild
                    href={`/contact?sujet=Devis%20${encodeURIComponent(product.title)}`}
                    variant="outline"
                    className="w-full border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    Demander un devis personnalisé
                  </Button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Product Details Tabs */}
      {product.description && (
        <section className="py-8 sm:py-12 bg-neutral/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div className="max-w-3xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-6">
                  Description
                </h2>
                <div className="prose prose-sm sm:prose-base max-w-none text-muted-foreground">
                  <p className="leading-relaxed whitespace-pre-line">{product.description}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {/* Related Products */}
      {filteredRelated.length > 0 && (
        <section className="py-8 sm:py-12 lg:py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-8">
                Produits similaires
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
              {filteredRelated.map((relatedProduct, index) => (
                <Reveal key={relatedProduct.id} delay={index * 80}>
                  <ProductCard product={relatedProduct} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

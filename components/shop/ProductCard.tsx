"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Package } from "lucide-react";
import type { Product } from "@/types/shop";
import { formatPrice, getStockStatus } from "@/lib/shop/utils";
import { useCart } from "@/lib/shop/cart";
import { resolveProductImageSrc } from "@/lib/shop/productImages";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const stockStatus = getStockStatus(product.stock);
  const imageUrl = resolveProductImageSrc(product.images?.[0]);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <Link href={`/shop/produit/${product.slug}`}>
      <div className="group relative bg-white rounded-2xl border border-border/50 hover:border-accent/50 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 h-full flex flex-col">
        {/* Image */}
        <div className="relative aspect-square bg-neutral/20 overflow-hidden">
          <Image
            src={imageUrl}
            alt={product.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Stock badge */}
          <div className="absolute top-3 right-3">
            <div
              className={`px-2 py-1 rounded-lg text-xs font-semibold backdrop-blur-sm ${
                stockStatus.available
                  ? 'bg-green-500/90 text-white'
                  : 'bg-red-500/90 text-white'
              }`}
            >
              {stockStatus.label}
            </div>
          </div>
          {/* Quick add button */}
          <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={handleAddToCart}
              disabled={!stockStatus.available}
              className="w-10 h-10 rounded-full bg-accent text-primary flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Ajouter au panier"
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5 flex flex-col flex-1">
          <div className="mb-2">
            {product.category && (
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                {product.category.name}
              </span>
            )}
          </div>
          <h3 className="text-base sm:text-lg font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300 line-clamp-2">
            {product.title}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground mb-4 flex-grow line-clamp-2">
            {product.description}
          </p>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-border/50">
            <div>
              <div className="text-lg sm:text-xl font-bold text-primary">
                {formatPrice(product.price_cents, product.currency)}
              </div>
              {product.stock > 0 && (
                <div className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  <Package className="w-3 h-3" />
                  {product.stock} disponibles
                </div>
              )}
            </div>
            <button
              onClick={handleAddToCart}
              disabled={!stockStatus.available}
              className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed text-sm font-semibold"
            >
              Ajouter
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

"use client";

import { X, ExternalLink, ShoppingCart, Heart, Share2, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { CatalogProduct } from '@/types/catalog';
import { formatPrice } from '@/lib/shop/utils';
import Button from '@/components/ui/Button';

interface QuickViewModalProps {
  product: CatalogProduct;
  onClose: () => void;
  onAddToCart: (product: CatalogProduct) => void;
}

export default function QuickViewModal({
  product,
  onClose,
  onAddToCart,
}: QuickViewModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const hasPromo = product.promoPrice && product.promoPrice < product.price;
  const discountPercent = hasPromo ? Math.round(((product.price - product.promoPrice!) / product.price) * 100) : 0;
  const productUrl = product.productUrl || `/shop/produit/${product.urlSlug}`;

  const handleAddToCart = () => {
    onAddToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Premium Header */}
        <div className="sticky top-0 bg-gradient-to-r from-white via-white to-neutral/20 backdrop-blur-xl border-b border-border/50 p-4 sm:p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            {product.brand && (
              <>
                <div className="w-px h-6 bg-border" />
                <span className="text-sm font-semibold text-muted-foreground">{product.brand}</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              className="p-2 rounded-xl hover:bg-neutral/50 transition-colors"
              aria-label="Partager"
            >
              <Share2 className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
              className="p-2 rounded-xl hover:bg-neutral/50 transition-colors"
              aria-label="Favoris"
            >
              <Heart className="w-5 h-5 text-muted-foreground" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl hover:bg-neutral/50 transition-colors"
              aria-label="Fermer"
            >
              <X className="w-5 h-5 text-primary" />
            </button>
          </div>
        </div>

        <div className="p-6 sm:p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-br from-neutral/30 to-neutral/10 shadow-xl">
                {product.images[currentImageIndex] && (
                  <Image
                    src={product.images[currentImageIndex]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                )}
                {hasPromo && (
                  <div className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-bold rounded-full shadow-lg flex items-center gap-2">
                    <span>-{discountPercent}%</span>
                  </div>
                )}
              </div>
              
              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {product.images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? 'border-accent shadow-lg scale-105'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 25vw, 12.5vw"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl sm:text-4xl font-black text-primary mb-3 leading-tight">
                  {product.name}
                </h2>
                {product.descriptionShort && (
                  <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
                    {product.descriptionShort}
                  </p>
                )}
              </div>

              {/* Price Section */}
              <div className="p-6 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent rounded-2xl border border-accent/20">
                <div className="flex items-baseline gap-4">
                  {hasPromo ? (
                    <>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Prix promotionnel</div>
                        <div className="text-4xl sm:text-5xl font-black text-accent">
                          {formatPrice(Math.round(product.promoPrice! * 100), product.currency)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground mb-1">Prix original</div>
                        <div className="text-2xl text-muted-foreground line-through">
                          {formatPrice(Math.round(product.price * 100), product.currency)}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Prix</div>
                      <div className="text-4xl sm:text-5xl font-black text-primary">
                        {formatPrice(Math.round(product.price * 100), product.currency)}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Stock Info */}
              {product.stock !== undefined && (
                <div className="flex items-center gap-2 text-sm">
                  <div className={`w-2 h-2 rounded-full ${product.stock > 0 ? 'bg-green-500' : 'bg-red-500'}`} />
                  <span className="text-muted-foreground">
                    {product.stock > 0 ? `${product.stock} disponibles` : 'Épuisé'}
                  </span>
                </div>
              )}

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-neutral/50 text-primary text-xs font-medium rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button
                  onClick={handleAddToCart}
                  disabled={addedToCart || (product.stock !== undefined && product.stock === 0)}
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-primary to-primary/90 text-white hover:from-primary/90 hover:to-primary/80 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Ajouté !
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Ajouter au panier
                    </>
                  )}
                </Button>
                <Button
                  asChild
                  href={productUrl}
                  size="lg"
                  variant="outline"
                  className="flex-1 border-2 hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Voir sur le site
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

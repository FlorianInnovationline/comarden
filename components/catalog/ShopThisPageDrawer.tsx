"use client";

import { X, ExternalLink, ShoppingCart, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import type { CatalogProduct } from '@/types/catalog';
import { formatPrice } from '@/lib/shop/utils';
import Button from '@/components/ui/Button';
import { useCart } from '@/lib/shop/cart';

interface ShopThisPageDrawerProps {
  open: boolean;
  onClose: () => void;
  products: CatalogProduct[];
  token: string;
}

export default function ShopThisPageDrawer({
  open,
  onClose,
  products,
  token,
}: ShopThisPageDrawerProps) {
  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  if (!open) return null;

  const handleAddToCart = (product: CatalogProduct) => {
    const shopProduct = {
      id: product.id,
      title: product.name,
      slug: product.urlSlug,
      description: product.descriptionShort,
      price_cents: Math.round(product.price * 100),
      currency: product.currency,
      stock: product.stock || 0,
      is_active: true,
      images: product.images,
      tags: product.tags,
      created_at: product.lastUpdated,
      updated_at: product.lastUpdated,
    };
    addToCart(shopProduct, 1);
    setAddedItems(new Set([...addedItems, product.id]));
    setTimeout(() => {
      setAddedItems(new Set([...addedItems].filter(id => id !== product.id)));
    }, 2000);
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Premium Drawer */}
      <div
        className={`fixed right-0 top-0 bottom-0 w-full sm:w-96 lg:w-[420px] bg-white/95 backdrop-blur-xl z-50 shadow-2xl transform transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Premium Header */}
          <div className="p-4 sm:p-6 border-b border-border/50 bg-gradient-to-r from-white via-white to-neutral/20 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-primary">Acheter cette page</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {products.length} produit{products.length > 1 ? 's' : ''} disponible{products.length > 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl hover:bg-neutral/50 transition-colors"
                aria-label="Fermer"
              >
                <X className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>

          {/* Products List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 custom-scrollbar">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <p className="text-muted-foreground font-medium">Aucun produit sur cette page</p>
              </div>
            ) : (
              <div className="space-y-4">
                {products.map((product) => {
                  const hasPromo = product.promoPrice && product.promoPrice < product.price;
                  const productUrl = product.productUrl || `/shop/produit/${product.urlSlug}`;
                  const isAdded = addedItems.has(product.id);

                  return (
                    <div
                      key={product.id}
                      className="group border border-border/50 rounded-2xl p-4 hover:shadow-xl hover:border-accent/30 transition-all duration-300 bg-white"
                    >
                      <div className="flex gap-4">
                        {/* Image */}
                        {product.images[0] && (
                          <Link
                            href={productUrl}
                            className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl bg-gradient-to-br from-neutral/30 to-neutral/10 overflow-hidden flex-shrink-0 shadow-md group-hover:shadow-lg transition-all"
                          >
                            <Image
                              src={product.images[0]}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                              sizes="96px"
                            />
                            {hasPromo && (
                              <div className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                                <span className="text-[8px] font-bold text-white">%</span>
                              </div>
                            )}
                          </Link>
                        )}

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={productUrl}
                            className="block mb-2 group/link"
                          >
                            <h3 className="font-bold text-primary hover:text-accent transition-colors line-clamp-2 text-sm sm:text-base leading-tight">
                              {product.name}
                            </h3>
                            {product.brand && (
                              <p className="text-xs text-muted-foreground mt-0.5">{product.brand}</p>
                            )}
                          </Link>
                          
                          <div className="mb-3">
                            {hasPromo ? (
                              <div className="flex items-center gap-2">
                                <span className="text-accent font-black text-base sm:text-lg">
                                  {formatPrice(Math.round(product.promoPrice! * 100), product.currency)}
                                </span>
                                <span className="text-muted-foreground text-xs line-through">
                                  {formatPrice(Math.round(product.price * 100), product.currency)}
                                </span>
                              </div>
                            ) : (
                              <span className="text-primary font-black text-base sm:text-lg">
                                {formatPrice(Math.round(product.price * 100), product.currency)}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex gap-2">
                            <Button
                              onClick={() => handleAddToCart(product)}
                              size="sm"
                              disabled={isAdded}
                              className="flex-1 bg-gradient-to-r from-primary to-primary/90 text-white hover:from-primary/90 hover:to-primary/80 text-xs sm:text-sm"
                            >
                              {isAdded ? (
                                <>
                                  <Check className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                  Ajouté
                                </>
                              ) : (
                                <>
                                  <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                  Ajouter
                                </>
                              )}
                            </Button>
                            <Button
                              asChild
                              href={productUrl}
                              size="sm"
                              variant="outline"
                              className="px-3 border-2 hover:bg-primary hover:text-white"
                            >
                              <ExternalLink className="w-3 h-3 sm:w-4 sm:h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

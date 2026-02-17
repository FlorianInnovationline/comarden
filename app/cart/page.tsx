"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/shop/cart";
import { formatPrice } from "@/lib/shop/utils";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function CartPage() {
  const router = useRouter();
  const { items, updateQuantity, removeFromCart, getTotal, clearCart } = useCart();
  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="pt-20 min-h-screen bg-gradient-to-b from-white to-neutral/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <Reveal>
            <div className="text-center">
              <ShoppingBag className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-6 text-muted-foreground" />
              <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-4">
                Votre panier est vide
              </h1>
              <p className="text-base text-muted-foreground mb-8">
                Ajoutez des produits à votre panier pour continuer.
              </p>
              <Button asChild href="/shop" size="lg" className="bg-primary text-white">
                Parcourir le magasin
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-white to-neutral/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <Reveal>
          <h1 className="text-3xl sm:text-4xl font-bold text-primary mb-8">
            Panier
          </h1>
        </Reveal>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => {
              const imageUrl = item.product.images?.[0] || '/images/placeholder-product.jpg';
              
              return (
                <Reveal key={item.product_id} delay={index * 50}>
                  <div className="bg-white rounded-2xl border border-border/50 p-4 sm:p-6 hover:shadow-lg transition-all duration-300">
                    <div className="flex gap-4 sm:gap-6">
                      {/* Image */}
                      <Link
                        href={`/shop/produit/${item.product.slug}`}
                        className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg bg-neutral/20 overflow-hidden flex-shrink-0"
                      >
                        <Image
                          src={imageUrl}
                          alt={item.product.title}
                          fill
                          className="object-cover"
                          sizes="96px"
                        />
                      </Link>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/shop/produit/${item.product.slug}`}
                          className="block mb-2"
                        >
                          <h3 className="text-base sm:text-lg font-bold text-primary hover:text-accent transition-colors line-clamp-2">
                            {item.product.title}
                          </h3>
                        </Link>
                        <div className="text-sm sm:text-base font-bold text-primary mb-4">
                          {formatPrice(item.product.price_cents, item.product.currency)}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 border border-border rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.product_id, item.qty - 1)}
                              className="p-2 hover:bg-neutral/50 transition-colors"
                              aria-label="Diminuer la quantité"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-4 py-2 text-sm font-semibold min-w-[3rem] text-center">
                              {item.qty}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product_id, item.qty + 1)}
                              className="p-2 hover:bg-neutral/50 transition-colors"
                              aria-label="Augmenter la quantité"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="text-right">
                            <div className="text-sm sm:text-base font-bold text-primary">
                              {formatPrice(item.product.price_cents * item.qty, item.product.currency)}
                            </div>
                            <button
                              onClick={() => removeFromCart(item.product_id)}
                              className="mt-2 text-xs text-destructive hover:underline flex items-center gap-1"
                            >
                              <Trash2 className="w-3 h-3" />
                              Retirer
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}

            {/* Clear Cart */}
            <div className="pt-4">
              <button
                onClick={clearCart}
                className="text-sm text-destructive hover:underline"
              >
                Vider le panier
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Reveal delay={200}>
              <div className="bg-white rounded-2xl border border-border/50 p-6 sticky top-24">
                <h2 className="text-xl font-bold text-primary mb-6">Résumé de commande</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sous-total</span>
                    <span className="font-semibold">{formatPrice(total, 'EUR')}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Livraison</span>
                    <span className="font-semibold">À calculer</span>
                  </div>
                  <div className="border-t border-border pt-4 flex justify-between">
                    <span className="font-bold text-primary">Total</span>
                    <span className="text-2xl font-bold text-primary">
                      {formatPrice(total, 'EUR')}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => router.push('/checkout')}
                  size="lg"
                  className="w-full bg-primary text-white hover:bg-primary/90 mb-4"
                >
                  Passer la commande
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                <Link
                  href="/shop"
                  className="block text-center text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Continuer les achats
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  );
}

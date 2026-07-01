"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { X, Minus, Plus, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "@/lib/shop/cart";
import { formatPrice } from "@/lib/shop/utils";
import { resolveProductImageSrc } from "@/lib/shop/productImages";

/**
 * Slide-out cart drawer (right side, ~1/3 width). Opens when a product is added
 * to the cart. From here the user can jump to the full /cart page or /checkout.
 */
export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQuantity, removeFromCart, getTotal, getItemCount } =
    useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const total = getTotal();
  const count = getItemCount();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/40 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-label="Panier"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-primary">
              Panier{count > 0 ? ` (${count})` : ""}
            </h2>
          </div>
          <button
            onClick={closeCart}
            aria-label="Fermer le panier"
            className="p-2 rounded-lg text-muted-foreground hover:bg-neutral/50 hover:text-primary transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-4 py-16">
              <div className="w-16 h-16 rounded-full bg-neutral/30 flex items-center justify-center">
                <ShoppingCart className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Votre panier est vide.</p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent transition-colors"
              >
                Parcourir le magasin
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.product_id} className="flex gap-3">
                  <Link
                    href={`/shop/produit/${item.product.slug}`}
                    onClick={closeCart}
                    className="relative w-20 h-20 flex-shrink-0 rounded-xl overflow-hidden bg-neutral/20 ring-1 ring-black/5"
                  >
                    <Image
                      src={resolveProductImageSrc(item.product.images?.[0])}
                      alt={item.product.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </Link>
                  <div className="flex-1 min-w-0">
                    {item.product.brand && (
                      <p className="text-[10px] font-bold uppercase tracking-widest text-accent">
                        {item.product.brand}
                      </p>
                    )}
                    <Link
                      href={`/shop/produit/${item.product.slug}`}
                      onClick={closeCart}
                      className="block text-sm font-semibold text-primary leading-snug line-clamp-2 hover:underline"
                    >
                      {item.product.title}
                    </Link>
                    <div className="mt-2 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-lg border border-border">
                        <button
                          onClick={() => updateQuantity(item.product_id, item.qty - 1)}
                          aria-label="Diminuer"
                          className="p-1.5 text-muted-foreground hover:text-primary"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-3 text-sm font-semibold text-primary tabular-nums">{item.qty}</span>
                        <button
                          onClick={() => updateQuantity(item.product_id, item.qty + 1)}
                          aria-label="Augmenter"
                          className="p-1.5 text-muted-foreground hover:text-primary"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product_id)}
                        aria-label="Retirer"
                        className="p-1.5 text-muted-foreground hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-border px-5 py-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Total</span>
              <span className="text-lg font-bold text-primary">
                {total > 0 ? formatPrice(total, "EUR") : "Sur devis"}
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/cart"
                onClick={closeCart}
                className="inline-flex items-center justify-center gap-1.5 rounded-full border border-primary text-primary font-semibold px-4 py-3 text-sm hover:bg-primary/5 transition-colors"
              >
                Voir le panier
              </Link>
              <Link
                href="/checkout"
                onClick={closeCart}
                className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary text-white font-semibold px-4 py-3 text-sm hover:bg-primary/90 transition-colors"
              >
                Commander
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <button
              onClick={closeCart}
              className="w-full text-center text-xs font-medium text-muted-foreground hover:text-primary transition-colors pt-1"
            >
              Continuer mes achats
            </button>
          </div>
        )}
      </aside>
    </>
  );
}

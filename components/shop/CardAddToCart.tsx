"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/lib/shop/cart";
import type { Product } from "@/types/shop";

/**
 * Compact "add to cart" button for product cards. Stops propagation so it works
 * even when the card is wrapped in a link. `color` themes the button per brand.
 */
export default function CardAddToCart({
  product,
  color = "#002D59",
}: {
  product: Product;
  color?: string;
}) {
  const { addToCart, openCart } = useCart();
  const [added, setAdded] = useState(false);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    openCart();
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full inline-flex items-center justify-center gap-1.5 rounded-full text-white text-xs font-semibold px-4 py-2.5 transition-transform duration-200 hover:scale-[1.03]"
      style={{ backgroundColor: added ? "#16a34a" : color }}
    >
      {added ? (
        <>
          <Check className="w-3.5 h-3.5" />
          Ajouté
        </>
      ) : (
        <>
          <ShoppingCart className="w-3.5 h-3.5" />
          Ajouter au panier
        </>
      )}
    </button>
  );
}

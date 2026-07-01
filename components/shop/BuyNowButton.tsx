"use client";

import { useRouter } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/shop/cart";
import type { Product } from "@/types/shop";

/**
 * "Acheter" button: adds the product to the cart, then routes the user to the
 * given destination (typically the product's brand page, where they can keep
 * shopping / checkout).
 */
export default function BuyNowButton({
  product,
  redirectTo,
  color = "#002D59",
  label = "Acheter",
}: {
  product: Product;
  redirectTo: string;
  color?: string;
  label?: string;
}) {
  const { addToCart } = useCart();
  const router = useRouter();

  const onClick = () => {
    addToCart(product, 1);
    router.push(redirectTo);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 rounded-full text-white font-semibold px-7 py-3.5 text-sm transition-transform duration-300 hover:scale-105 hover:shadow-lg"
      style={{ backgroundColor: color }}
    >
      <ShoppingCart className="w-4 h-4" />
      {label}
    </button>
  );
}

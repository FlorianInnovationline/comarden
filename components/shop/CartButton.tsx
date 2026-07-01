"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/shop/cart";

/**
 * Header cart icon with item-count badge. Links to /cart.
 * Count is only shown after mount to avoid hydration mismatch (cart lives in
 * localStorage).
 */
export default function CartButton({ className = "" }: { className?: string }) {
  const { getItemCount } = useCart();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const count = mounted ? getItemCount() : 0;

  return (
    <Link
      href="/cart"
      aria-label={`Panier${count > 0 ? ` (${count})` : ""}`}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-full transition-colors ${className}`}
    >
      <ShoppingCart className="w-5 h-5" />
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-primary text-[11px] font-bold flex items-center justify-center">
          {count}
        </span>
      )}
    </Link>
  );
}

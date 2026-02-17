"use client";

import { CartProvider } from "@/lib/shop/cart";

export function Providers({ children }: { children: React.ReactNode }) {
  return <CartProvider>{children}</CartProvider>;
}

"use client";

import { CartProvider } from "@/lib/shop/cart";
import CartDrawer from "@/components/shop/CartDrawer";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}

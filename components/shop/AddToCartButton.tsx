"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/lib/shop/cart";
import type { Product } from "@/types/shop";
import Button from "@/components/ui/Button";

interface AddToCartButtonProps {
  product: Product;
  disabled?: boolean;
  className?: string;
}

export default function AddToCartButton({
  product,
  disabled = false,
  className = "",
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <Button
      onClick={handleAdd}
      disabled={disabled || added}
      size="lg"
      className={`w-full bg-primary text-white hover:bg-primary/90 transition-all duration-300 hover:scale-105 disabled:hover:scale-100 ${className}`}
    >
      {added ? (
        <>
          <Check className="w-5 h-5 mr-2" />
          Ajouté au panier
        </>
      ) : (
        <>
          <ShoppingCart className="w-5 h-5 mr-2" />
          Ajouter au panier
        </>
      )}
    </Button>
  );
}

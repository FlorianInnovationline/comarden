"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  X,
  Wrench,
  Tag,
  CheckCircle,
  Layers,
  Send,
} from "lucide-react";
import { RentalProduct, formatRentalPrice } from "@/lib/rental/data";

interface ProductDetailModalProps {
  product: RentalProduct | null;
  onClose: () => void;
  onRequest: (product: RentalProduct) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onRequest,
}: ProductDetailModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (product) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!product) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleRequest = () => {
    onClose();
    setTimeout(() => onRequest(product), 150);
  };

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-scale flex flex-col">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/40 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1">
          {/* Image header */}
          <div className="relative aspect-[16/9] bg-neutral/30">
            <Image
              src={
                product.image ||
                "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&h=450&fit=crop"
              }
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
                  <Wrench className="w-3 h-3" />
                  {product.category}
                </span>
                {product.ref && (
                  <span className="px-2.5 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                    Réf : {product.ref}
                  </span>
                )}
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                {product.name}
              </h2>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 md:p-8 space-y-6">
            {/* Description */}
            <div>
              <p className="text-base text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-primary mb-3">
                  <CheckCircle className="w-4 h-4 text-accent" />
                  Caractéristiques
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((f, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2 p-3 bg-neutral/30 rounded-xl"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-1.5 flex-shrink-0" />
                      <span className="text-sm text-primary">{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Applications */}
            {product.applications && product.applications.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-primary mb-3">
                  <Tag className="w-4 h-4 text-accent" />
                  Applications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.applications.map((a, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-primary/5 border border-primary/10 text-sm text-primary rounded-lg"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Variants */}
            {product.variants && product.variants.length > 0 && (
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-primary mb-3">
                  <Layers className="w-4 h-4 text-accent" />
                  Variantes disponibles
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.variants.map((v, i) => (
                    <span
                      key={i}
                      className="px-4 py-2 bg-accent/10 border border-accent/20 text-sm font-semibold text-primary rounded-xl"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sticky footer */}
        <div className="border-t border-border/50 bg-white px-6 md:px-8 py-4 flex items-center justify-between gap-4">
          <div>
            <p className="text-3xl font-bold text-primary leading-none">
              {(product.priceCents / 100).toFixed(
                product.priceCents % 100 === 0 ? 0 : 2
              )}
              <span className="text-lg font-semibold">€</span>
            </p>
            <p className="text-sm text-muted-foreground mt-0.5">
              HTVA /{" "}
              {product.priceUnit === "jour"
                ? "jour"
                : product.priceUnit === "heure"
                ? "heure"
                : "an"}
            </p>
          </div>
          <button
            onClick={handleRequest}
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent hover:bg-accent/90 text-primary font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
          >
            <Send className="w-4 h-4" />
            Demander la location
          </button>
        </div>
      </div>
    </div>
  );
}

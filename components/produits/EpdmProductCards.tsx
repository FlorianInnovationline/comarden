"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, X, ExternalLink } from "lucide-react";

interface Product {
  title: string;
  brand: string;
  description: string;
  specs: string[];
  shopSlug: string;
}

export default function EpdmProductCards({
  products,
}: {
  products: Product[];
}) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const activeProduct = products.find((p) => p.shopSlug === activeSlug);

  return (
    <>
      <div className="space-y-6">
        {products.map((product) => (
          <button
            key={product.title}
            type="button"
            onClick={() => setActiveSlug(product.shopSlug)}
            className="w-full text-left bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200 hover:shadow-lg hover:border-accent/30 transition-all duration-300 group cursor-pointer"
          >
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">
                  {product.brand}
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors">
                  {product.title}
                </h3>
                <p className="text-base text-slate-600 leading-relaxed mb-4">
                  {product.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {product.specs.map((spec) => (
                    <span
                      key={spec}
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/5 text-primary border border-primary/10"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-full group-hover:bg-accent group-hover:text-primary transition-all duration-300 text-sm">
                  Voir dans le magasin
                  <ShoppingCart className="w-4 h-4" />
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Product Modal */}
      {activeProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
          onClick={() => setActiveSlug(null)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-scale"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActiveSlug(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/10 hover:bg-black/20 transition-colors"
            >
              <X className="w-5 h-5 text-primary" />
            </button>

            <div className="bg-gradient-to-r from-primary to-primary/90 px-6 py-8 sm:px-8 sm:py-10 text-white">
              <p className="text-xs font-bold uppercase tracking-widest text-accent mb-2">
                {activeProduct.brand}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                {activeProduct.title}
              </h2>
              <p className="text-base text-white/80 leading-relaxed">
                {activeProduct.description}
              </p>
            </div>

            <div className="px-6 py-6 sm:px-8 space-y-5">
              <div>
                <h3 className="text-sm font-bold text-primary mb-3">
                  Spécifications
                </h3>
                <div className="flex flex-wrap gap-2">
                  {activeProduct.specs.map((spec) => (
                    <span
                      key={spec}
                      className="px-3 py-1.5 bg-primary/5 border border-primary/10 text-sm text-primary rounded-lg font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-border/30 flex flex-col sm:flex-row gap-3">
                <Link
                  href={`/shop/produit/${activeProduct.shopSlug}`}
                  className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-primary font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:shadow-lg text-sm flex-1"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Voir dans le magasin
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center gap-2 border-2 border-primary/20 text-primary font-semibold px-6 py-3 rounded-xl hover:bg-primary/5 transition-all duration-300 text-sm flex-1"
                >
                  <ExternalLink className="w-4 h-4" />
                  Demander un devis
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

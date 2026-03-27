"use client";

import Image from "next/image";
import { RentalProduct, formatRentalPrice } from "@/lib/rental/data";
import { Wrench, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface RentalCardProps {
  product: RentalProduct;
  onRequest: (product: RentalProduct) => void;
}

export default function RentalCard({ product, onRequest }: RentalCardProps) {
  const [expanded, setExpanded] = useState(false);

  const hasDetails =
    (product.features && product.features.length > 0) ||
    (product.applications && product.applications.length > 0);

  return (
    <div className="group bg-white rounded-2xl border border-border/40 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col">
      {/* Image */}
      <div className="relative aspect-[4/3] bg-neutral/30 overflow-hidden">
        <Image
          src={product.image || "https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400&h=400&fit=crop"}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/90 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
            <Wrench className="w-3 h-3" />
            {product.category}
          </span>
        </div>
        {product.variants && product.variants.length > 0 && (
          <div className="absolute top-3 right-3">
            <span className="px-2.5 py-1 bg-accent/90 backdrop-blur-sm text-primary text-xs font-bold rounded-full">
              {product.variants.length} variantes
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-base font-bold text-primary leading-snug mb-1.5 group-hover:text-accent transition-colors duration-300">
          {product.name}
        </h3>
        {product.ref && (
          <p className="text-xs text-muted-foreground mb-2">
            Réf : {product.ref}
          </p>
        )}
        <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-3">
          {product.description}
        </p>

        {hasDetails && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1 text-xs font-semibold text-primary/70 hover:text-primary mb-3 transition-colors"
          >
            {expanded ? "Masquer les détails" : "Voir les détails"}
            {expanded ? (
              <ChevronUp className="w-3.5 h-3.5" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" />
            )}
          </button>
        )}

        {expanded && (
          <div className="space-y-3 mb-3 animate-fade-in">
            {product.features && product.features.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-primary mb-1">
                  Caractéristiques :
                </p>
                <ul className="text-xs text-muted-foreground space-y-0.5">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-accent mt-0.5">•</span>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {product.applications && product.applications.length > 0 && (
              <div>
                <p className="text-xs font-semibold text-primary mb-1">
                  Applications :
                </p>
                <div className="flex flex-wrap gap-1">
                  {product.applications.map((a, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 bg-neutral/50 text-xs text-muted-foreground rounded-md"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {product.variants && product.variants.length > 0 && (
          <div className="mb-3">
            <p className="text-xs font-semibold text-primary mb-1">
              Variantes disponibles :
            </p>
            <div className="flex flex-wrap gap-1.5">
              {product.variants.map((v, i) => (
                <span
                  key={i}
                  className="px-2 py-0.5 bg-primary/5 border border-primary/10 text-xs text-primary font-medium rounded-md"
                >
                  {v}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Price + CTA */}
        <div className="mt-auto pt-4 border-t border-border/30">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-2xl font-bold text-primary leading-none">
                {(product.priceCents / 100).toFixed(
                  product.priceCents % 100 === 0 ? 0 : 2
                )}
                <span className="text-base font-semibold">€</span>
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                HTVA /{" "}
                {product.priceUnit === "jour"
                  ? "jour"
                  : product.priceUnit === "heure"
                  ? "heure"
                  : "an"}
              </p>
            </div>
            <button
              onClick={() => onRequest(product)}
              className="px-4 py-2.5 bg-accent hover:bg-accent/90 text-primary text-sm font-bold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 whitespace-nowrap"
            >
              Demander la location
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

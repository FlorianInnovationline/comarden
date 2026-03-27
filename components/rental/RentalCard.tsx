"use client";

import Image from "next/image";
import { RentalProduct } from "@/lib/rental/data";
import { Wrench, Eye } from "lucide-react";

interface RentalCardProps {
  product: RentalProduct;
  onRequest: (product: RentalProduct) => void;
  onView: (product: RentalProduct) => void;
}

export default function RentalCard({ product, onRequest, onView }: RentalCardProps) {
  return (
    <div className="group bg-white rounded-2xl border border-border/40 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col">
      {/* Image — clickable */}
      <button
        type="button"
        onClick={() => onView(product)}
        className="relative aspect-[4/3] bg-neutral/30 overflow-hidden cursor-pointer text-left"
      >
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
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-colors duration-300 flex items-center justify-center">
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm text-primary text-sm font-bold rounded-xl shadow-lg">
            <Eye className="w-4 h-4" />
            Voir le détail
          </span>
        </div>
      </button>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <button
          type="button"
          onClick={() => onView(product)}
          className="text-left"
        >
          <h3 className="text-base font-bold text-primary leading-snug mb-1.5 group-hover:text-accent transition-colors duration-300">
            {product.name}
          </h3>
        </button>
        {product.ref && (
          <p className="text-xs text-muted-foreground mb-2">
            Réf : {product.ref}
          </p>
        )}
        <p className="text-sm text-muted-foreground leading-relaxed mb-3 line-clamp-2">
          {product.description}
        </p>

        {product.features && product.features.length > 0 && (
          <div className="mb-3">
            <ul className="text-xs text-muted-foreground space-y-0.5">
              {product.features.slice(0, 3).map((f, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-accent mt-0.5">•</span>
                  <span className="line-clamp-1">{f}</span>
                </li>
              ))}
              {product.features.length > 3 && (
                <li className="text-xs text-primary/60 font-medium pl-3">
                  +{product.features.length - 3} autres...
                </li>
              )}
            </ul>
          </div>
        )}

        {product.variants && product.variants.length > 0 && (
          <div className="mb-3">
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

        {/* Price + CTAs */}
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
              onClick={(e) => {
                e.stopPropagation();
                onRequest(product);
              }}
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

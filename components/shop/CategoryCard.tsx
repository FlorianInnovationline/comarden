"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Category } from "@/types/shop";

interface CategoryCardProps {
  category: Category;
  productCount?: number;
}

export default function CategoryCard({ category, productCount }: CategoryCardProps) {
  const imageUrl = category.image_url || '/images/placeholder-category.jpg';

  return (
    <Link href={`/shop/categorie/${category.slug}`}>
      <div className="group relative bg-white rounded-2xl border border-border/50 hover:border-accent/50 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 h-full flex flex-col">
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
          <Image
            src={imageUrl}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 flex flex-col flex-1">
          <h3 className="text-xl sm:text-2xl font-bold text-primary mb-2 group-hover:text-accent transition-colors duration-300">
            {category.name}
          </h3>
          {category.description && (
            <p className="text-sm text-muted-foreground mb-4 flex-grow line-clamp-2">
              {category.description}
            </p>
          )}
          {productCount !== undefined && (
            <div className="text-xs text-muted-foreground mb-4">
              {productCount} produit{productCount > 1 ? 's' : ''}
            </div>
          )}
          <span className="inline-flex items-center text-sm font-semibold text-primary group-hover:text-accent transition-all duration-300 mt-auto">
            Voir les produits
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
          </span>
        </div>
      </div>
    </Link>
  );
}

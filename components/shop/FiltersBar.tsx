"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SlidersHorizontal, X } from "lucide-react";
import type { Category } from "@/types/shop";
import Button from "@/components/ui/Button";

interface FiltersBarProps {
  category: Category;
}

export default function FiltersBar({ category }: FiltersBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const min = searchParams.get('min') || '';
  const max = searchParams.get('max') || '';
  const inStock = searchParams.get('inStock') === 'true';

  const applyFilters = (newFilters: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });

    router.push(`/shop/categorie/${category.slug}?${params.toString()}`);
  };

  return (
    <div className="mb-6">
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-lg hover:border-accent transition-colors sm:hidden"
      >
        <SlidersHorizontal className="w-4 h-4" />
        <span className="text-sm font-semibold">Filtres</span>
      </button>

      <div
        className={`${
          showFilters ? 'block' : 'hidden'
        } sm:block bg-white rounded-xl border border-border p-4 sm:p-6`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-primary">Filtres</h3>
          <button
            onClick={() => setShowFilters(false)}
            className="sm:hidden text-muted-foreground hover:text-primary"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          {/* Price Range */}
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Prix minimum (€)
            </label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={min}
              onChange={(e) => applyFilters({ min: e.target.value || null })}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Prix maximum (€)
            </label>
            <input
              type="number"
              min="0"
              placeholder="1000"
              value={max}
              onChange={(e) => applyFilters({ max: e.target.value || null })}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-primary mb-2">
              Disponibilité
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) =>
                  applyFilters({ inStock: e.target.checked ? 'true' : null })
                }
                className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
              />
              <span className="text-sm text-muted-foreground">En stock uniquement</span>
            </label>
          </div>
        </div>

        {(min || max || inStock) && (
          <div className="mt-4 pt-4 border-t border-border">
            <Button
              onClick={() => {
                applyFilters({ min: null, max: null, inStock: null });
              }}
              variant="outline"
              size="sm"
              className="text-xs"
            >
              Réinitialiser les filtres
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import type { Category } from "@/types/shop";

interface AllProductsFiltersProps {
  categories: Category[];
}

export default function AllProductsFilters({ categories }: AllProductsFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const min = searchParams.get("min") || "";
  const max = searchParams.get("max") || "";
  const inStock = searchParams.get("inStock") === "true";
  const sort = searchParams.get("sort") || "";

  const update = (changes: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(changes).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    router.push(`/shop/produits?${params.toString()}`);
  };

  const clearAll = () => router.push("/shop/produits");

  const hasFilters = search || category || min || max || inStock || sort;

  return (
    <div className="space-y-4">
      {/* Search + toggle row */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Rechercher un produit..."
            defaultValue={search}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                update({ search: (e.target as HTMLInputElement).value || null });
              }
            }}
            className="w-full pl-10 pr-4 py-2.5 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent text-sm"
          />
        </div>

        {/* Category select */}
        <select
          value={category}
          onChange={(e) => update({ category: e.target.value || null })}
          className="px-3 py-2.5 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent text-sm min-w-[180px]"
        >
          <option value="">Toutes les catégories</option>
          {categories.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={(e) => update({ sort: e.target.value || null })}
          className="px-3 py-2.5 border border-border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-accent text-sm min-w-[160px]"
        >
          <option value="">Tri par défaut</option>
          <option value="name">Nom A → Z</option>
          <option value="price-asc">Prix croissant</option>
          <option value="price-desc">Prix décroissant</option>
        </select>

        {/* Filters toggle (mobile) */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="sm:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-border rounded-lg hover:border-accent transition-colors"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span className="text-sm font-semibold">Plus de filtres</span>
        </button>
      </div>

      {/* Extended filters */}
      <div
        className={`${
          showFilters ? "block" : "hidden"
        } sm:block bg-white rounded-xl border border-border p-4 sm:p-5`}
      >
        <div className="flex items-center justify-between mb-4 sm:hidden">
          <h3 className="text-sm font-bold text-primary">Filtres avancés</h3>
          <button onClick={() => setShowFilters(false)} className="text-muted-foreground hover:text-primary">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold text-primary mb-1.5">
              Prix minimum (€)
            </label>
            <input
              type="number"
              min="0"
              placeholder="0"
              value={min}
              onChange={(e) => update({ min: e.target.value || null })}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-primary mb-1.5">
              Prix maximum (€)
            </label>
            <input
              type="number"
              min="0"
              placeholder="1000"
              value={max}
              onChange={(e) => update({ max: e.target.value || null })}
              className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            />
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => update({ inStock: e.target.checked ? "true" : null })}
                className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
              />
              <span className="text-sm text-muted-foreground">En stock uniquement</span>
            </label>
          </div>
        </div>

        {hasFilters && (
          <div className="mt-4 pt-3 border-t border-border">
            <button
              onClick={clearAll}
              className="text-xs font-semibold text-accent hover:underline"
            >
              Réinitialiser tous les filtres
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

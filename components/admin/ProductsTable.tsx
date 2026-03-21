"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Edit, Trash2, Eye, Search } from "lucide-react";
import type { Product, Category } from "@/types/shop";
import { formatPrice } from "@/lib/shop/utils";
import { resolveProductImageSrc } from "@/lib/shop/productImages";
import Button from "@/components/ui/Button";

interface ProductsTableProps {
  products: Product[];
  categories: Category[];
}

export default function ProductsTable({ products, categories }: ProductsTableProps) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === "all" || product.category_id === categoryFilter;
    const matchesActive =
      activeFilter === "all" ||
      (activeFilter === "active" && product.is_active) ||
      (activeFilter === "inactive" && !product.is_active);

    return matchesSearch && matchesCategory && matchesActive;
  });

  return (
    <div className="bg-white rounded-2xl border border-border/50 overflow-hidden">
      {/* Filters */}
      <div className="p-4 sm:p-6 border-b border-border">
        <div className="grid sm:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Rechercher..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="all">Toutes les catégories</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          <select
            value={activeFilter}
            onChange={(e) => setActiveFilter(e.target.value)}
            className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="all">Tous les statuts</option>
            <option value="active">Actifs</option>
            <option value="inactive">Inactifs</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-neutral/30">
            <tr>
              <th className="text-left py-3 px-4 sm:px-6 text-sm font-semibold text-primary">
                Produit
              </th>
              <th className="text-left py-3 px-4 sm:px-6 text-sm font-semibold text-primary">
                Catégorie
              </th>
              <th className="text-left py-3 px-4 sm:px-6 text-sm font-semibold text-primary">
                Prix
              </th>
              <th className="text-left py-3 px-4 sm:px-6 text-sm font-semibold text-primary">
                Stock
              </th>
              <th className="text-left py-3 px-4 sm:px-6 text-sm font-semibold text-primary">
                Statut
              </th>
              <th className="text-right py-3 px-4 sm:px-6 text-sm font-semibold text-primary">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-12 text-center text-muted-foreground">
                  Aucun produit trouvé
                </td>
              </tr>
            ) : (
              filteredProducts.map((product) => {
                const imageUrl = resolveProductImageSrc(product.images?.[0]);
                return (
                  <tr
                    key={product.id}
                    className="border-b border-border/50 hover:bg-neutral/20 transition-colors"
                  >
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg bg-neutral/20 overflow-hidden flex-shrink-0">
                          <Image
                            src={imageUrl}
                            alt={product.title}
                            fill
                            className="object-cover"
                            sizes="48px"
                          />
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-primary truncate">
                            {product.title}
                          </div>
                          {product.sku && (
                            <div className="text-xs text-muted-foreground font-mono">
                              {product.sku}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-sm text-muted-foreground">
                      {product.category?.name || "-"}
                    </td>
                    <td className="py-4 px-4 sm:px-6 font-semibold text-primary">
                      {formatPrice(product.price_cents, product.currency)}
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-sm">
                      <span
                        className={
                          product.stock === 0
                            ? "text-red-600 font-semibold"
                            : product.stock < 10
                            ? "text-orange-600 font-semibold"
                            : "text-green-600 font-semibold"
                        }
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6">
                      <span
                        className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                          product.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {product.is_active ? "Actif" : "Inactif"}
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/shop/produit/${product.slug}`}
                          target="_blank"
                          className="p-2 text-muted-foreground hover:text-primary transition-colors"
                          aria-label="Voir le produit"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          href={`/admin/products/${product.id}`}
                          className="p-2 text-muted-foreground hover:text-primary transition-colors"
                          aria-label="Modifier le produit"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          className="p-2 text-muted-foreground hover:text-red-600 transition-colors"
                          aria-label="Supprimer le produit"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="p-4 sm:p-6 border-t border-border text-sm text-muted-foreground">
        {filteredProducts.length} produit{filteredProducts.length > 1 ? "s" : ""} affiché
        {filteredProducts.length !== products.length &&
          ` sur ${products.length}`}
      </div>
    </div>
  );
}

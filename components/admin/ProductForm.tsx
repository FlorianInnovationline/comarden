"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { slugify } from "@/lib/shop/utils";
import type { Product, Category } from "@/types/shop";
import Button from "@/components/ui/Button";

interface ProductFormProps {
  product?: Product;
  categories: Category[];
}

export default function ProductForm({ product, categories }: ProductFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: product?.title || "",
    slug: product?.slug || "",
    description: product?.description || "",
    price_cents: product ? product.price_cents / 100 : 0,
    currency: product?.currency || "EUR",
    sku: product?.sku || "",
    stock: product?.stock || 0,
    is_active: product?.is_active ?? true,
    category_id: product?.category_id || "",
    images: product?.images?.join("\n") || "",
    tags: product?.tags?.join(", ") || "",
  });

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: formData.slug || slugify(title),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const images = formData.images
        .split("\n")
        .map((url) => url.trim())
        .filter((url) => url.length > 0);

      const tags = formData.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      const payload = {
        ...formData,
        price_cents: Math.round(formData.price_cents * 100),
        images,
        tags: tags.length > 0 ? tags : null,
        category_id: formData.category_id || null,
      };

      // In a real app, this would be a server action
      const url = product
        ? `/api/products/${product.id}`
        : "/api/products";
      const method = product ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        router.push("/admin/products");
        router.refresh();
      } else {
        alert("Erreur lors de l'enregistrement");
      }
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Erreur lors de l'enregistrement");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-border/50 p-6 sm:p-8 space-y-6">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <section>
            <h2 className="text-xl font-bold text-primary mb-4">Informations de base</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Titre *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
          </section>

          {/* Pricing & Inventory */}
          <section>
            <h2 className="text-xl font-bold text-primary mb-4">Prix et stock</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Prix (€) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  required
                  value={formData.price_cents}
                  onChange={(e) => setFormData({ ...formData, price_cents: parseFloat(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Stock *
                </label>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Référence (SKU)
                </label>
                <input
                  type="text"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Catégorie
                </label>
                <select
                  value={formData.category_id}
                  onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                >
                  <option value="">Aucune catégorie</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </section>

          {/* Images & Tags */}
          <section>
            <h2 className="text-xl font-bold text-primary mb-4">Images et tags</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  URLs des images (une par ligne)
                </label>
                <textarea
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  rows={4}
                  placeholder="/images/products/product-1.jpg&#10;/images/products/product-2.jpg"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Tags (séparés par des virgules)
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="toiture, isolation, professionnel"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-neutral/20 rounded-xl p-6 space-y-4 sticky top-24">
            <div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 rounded border-border text-accent focus:ring-accent"
                />
                <span className="text-sm font-semibold text-primary">Produit actif</span>
              </label>
            </div>
            <div className="pt-4 border-t border-border space-y-3">
              <Button
                type="submit"
                disabled={isSubmitting}
                size="lg"
                className="w-full bg-primary text-white"
              >
                {isSubmitting ? "Enregistrement..." : product ? "Mettre à jour" : "Créer le produit"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="w-full"
              >
                Annuler
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

"use client";

import { useState, useRef } from "react";
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
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
    brand: product?.brand || "",
    specs: product?.specs?.join("\n") || "",
    avantages: product?.avantages?.join("\n") || "",
    lien_produit: product?.lien_produit || "",
    warning: product?.warning || "",
    variants: product?.variants?.join("\n") || "",
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

      const specs = formData.specs
        .split("\n")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
      const avantages = formData.avantages
        .split("\n")
        .map((a) => a.trim())
        .filter((a) => a.length > 0);
      const variants = formData.variants
        .split("\n")
        .map((v) => v.trim())
        .filter((v) => v.length > 0);

      const payload = {
        ...formData,
        price_cents: Math.round(formData.price_cents * 100),
        images,
        tags: tags.length > 0 ? tags : null,
        category_id: formData.category_id || null,
        brand: formData.brand || null,
        specs: specs.length > 0 ? specs : null,
        avantages: avantages.length > 0 ? avantages : null,
        lien_produit: formData.lien_produit || null,
        warning: formData.warning || null,
        variants: variants.length > 0 ? variants : null,
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

  /** Slug used for uploads: existing product slug, or draft slug from the form */
  const uploadSlug = (product?.slug || formData.slug || "").trim();

  const appendImageUrl = (url: string) => {
    setFormData((prev) => {
      const lines = prev.images
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean);
      if (lines.includes(url)) return prev;
      const next = [...lines, url].join("\n");
      return { ...prev, images: next };
    });
  };

  const handleImageFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    if (!uploadSlug) {
      alert("Définissez d'abord le slug du produit (champ « Slug (URL) ») avant d'uploader des images.");
      return;
    }

    setIsUploading(true);
    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fd = new FormData();
        fd.set("slug", uploadSlug);
        fd.set("file", file);

        const res = await fetch("/api/admin/products/upload", {
          method: "POST",
          body: fd,
          credentials: "same-origin",
        });

        const data = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
        if (!res.ok) {
          alert(data.error || `Échec upload : ${file.name}`);
          continue;
        }
        if (data.url) appendImageUrl(data.url);
      }
    } catch (e) {
      console.error(e);
      alert("Erreur réseau lors de l'upload");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
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
                <p className="text-xs text-muted-foreground mb-2">
                  Dossier sur le serveur :{" "}
                  <code className="rounded bg-neutral/30 px-1 py-0.5">
                    public/images/products/{uploadSlug || "…votre-slug…"}
                  </code>
                </p>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    multiple
                    className="hidden"
                    onChange={(e) => void handleImageFiles(e.target.files)}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    disabled={isUploading || !uploadSlug}
                    onClick={() => fileInputRef.current?.click()}
                    className="text-sm"
                  >
                    {isUploading ? "Upload en cours…" : "Uploader des images"}
                  </Button>
                  {!uploadSlug && (
                    <span className="text-xs text-amber-700">
                      Renseignez le slug pour activer l&apos;upload.
                    </span>
                  )}
                </div>
                <textarea
                  value={formData.images}
                  onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                  rows={4}
                  placeholder={`/images/products/${uploadSlug || "mon-produit"}/main-1234567890.jpg`}
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

          {/* Custom Product Fields */}
          <section>
            <h2 className="text-xl font-bold text-primary mb-4">Informations produit</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Marque</label>
                <input
                  type="text"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  placeholder="FAYNOT, ETANCO, STRATOGRIP..."
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Caractéristiques techniques (une par ligne)</label>
                <textarea
                  value={formData.specs}
                  onChange={(e) => setFormData({ ...formData, specs: e.target.value })}
                  rows={4}
                  placeholder="R thermique : 5,7 m².K/W&#10;Matériau : acier galvanisé Z275"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Avantages (un par ligne)</label>
                <textarea
                  value={formData.avantages}
                  onChange={(e) => setFormData({ ...formData, avantages: e.target.value })}
                  rows={4}
                  placeholder="Aucun pont thermique&#10;Système breveté et calculé"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Variantes (une par ligne)</label>
                <textarea
                  value={formData.variants}
                  onChange={(e) => setFormData({ ...formData, variants: e.target.value })}
                  rows={3}
                  placeholder="RAL 9005&#10;RAL 7016"
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Lien fiche produit (URL)</label>
                <input
                  type="url"
                  value={formData.lien_produit}
                  onChange={(e) => setFormData({ ...formData, lien_produit: e.target.value })}
                  placeholder="https://www.faynot.com/..."
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Avertissement</label>
                <input
                  type="text"
                  value={formData.warning}
                  onChange={(e) => setFormData({ ...formData, warning: e.target.value })}
                  placeholder="Non recommandé : vinyles plastifiés, PE, PP..."
                  className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
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

"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import {
  Plus,
  Search,
  RefreshCw,
  Package,
  Pencil,
  Trash2,
  X,
  Save,
  Wrench,
  Euro,
  Tag,
  Layers,
  Image as ImageIcon,
  Upload,
} from "lucide-react";
import { RENTAL_PRODUCTS, RENTAL_CATEGORIES } from "@/lib/rental/data";
import type { RentalProduct, PriceUnit } from "@/lib/rental/data";

type CatalogProduct = RentalProduct & { isSeed: boolean };

type FormProduct = {
  id?: string;
  name: string;
  ref: string;
  category: string;
  description: string;
  features: string;
  applications: string;
  variants: string;
  priceCents: string;
  priceUnit: PriceUnit;
  image: string;
};

const emptyForm: FormProduct = {
  name: "",
  ref: "",
  category: "",
  description: "",
  features: "",
  applications: "",
  variants: "",
  priceCents: "",
  priceUnit: "jour",
  image: "",
};

function productToForm(p: RentalProduct): FormProduct {
  return {
    id: p.id,
    name: p.name,
    ref: p.ref || "",
    category: p.category,
    description: p.description,
    features: p.features?.join("\n") || "",
    applications: p.applications?.join("\n") || "",
    variants: p.variants?.join("\n") || "",
    priceCents: String(p.priceCents),
    priceUnit: p.priceUnit,
    image: p.image || "",
  };
}

function buildJsonPayload(form: FormProduct) {
  return {
    name: form.name,
    ref: form.ref || null,
    category: form.category,
    description: form.description,
    features: form.features.split("\n").map((s) => s.trim()).filter(Boolean),
    applications: form.applications.split("\n").map((s) => s.trim()).filter(Boolean),
    variants: form.variants.split("\n").map((s) => s.trim()).filter(Boolean),
    priceCents: Number(form.priceCents),
    priceUnit: form.priceUnit,
    image: form.image.trim() || null,
  };
}

export default function RentalProductsTab() {
  const [catalogProducts, setCatalogProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormProduct>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [viewSeed, setViewSeed] = useState(true);
  const [pendingImageFile, setPendingImageFile] = useState<File | null>(null);
  const [uploadHint, setUploadHint] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fetchCatalog = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/rentals/catalog");
      if (res.ok) {
        const data = await res.json();
        setCatalogProducts(data.products || []);
      }
    } catch (err) {
      console.error("Failed to fetch rental catalog:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCatalog();
  }, [fetchCatalog]);

  const allProducts = catalogProducts.filter((p) => {
    if (!viewSeed && p.isSeed) return false;
    return true;
  });

  const filtered = allProducts.filter((p) => {
    if (!search.trim()) return true;
    const q = search.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  });

  const openEditForm = (product: CatalogProduct) => {
    setPendingImageFile(null);
    setUploadHint(null);
    setForm(productToForm(product));
    setShowForm(true);
  };

  const openNewForm = () => {
    setPendingImageFile(null);
    setUploadHint(null);
    setForm(emptyForm);
    setShowForm(true);
  };

  const tryUploadImage = async (productId: string, file: File): Promise<string | null> => {
    const fd = new FormData();
    fd.append("file", file);
    fd.append("productId", productId);
    const up = await fetch("/api/admin/rentals/upload", { method: "POST", body: fd });
    if (up.status === 501) {
      setUploadHint(
        "Upload disque indisponible sur Vercel : placez le fichier dans public/images/rental/" +
          productId +
          "/ puis indiquez l’URL ci-dessous, ou déployez depuis un environnement avec disque inscriptible."
      );
      return null;
    }
    if (!up.ok) {
      const err = await up.json().catch(() => ({}));
      setUploadHint(typeof err.error === "string" ? err.error : "Échec de l’upload");
      return null;
    }
    const data = await up.json();
    setUploadHint(null);
    return data.url as string;
  };

  const handleSave = async () => {
    if (!form.name || !form.category || !form.description || !form.priceCents) return;
    setSaving(true);
    setUploadHint(null);

    const basePayload = buildJsonPayload(form);

    try {
      if (form.id) {
        let imageUrl = form.image.trim() || null;
        if (pendingImageFile) {
          const url = await tryUploadImage(form.id, pendingImageFile);
          if (url) imageUrl = url;
        }
        const res = await fetch("/api/rentals/products", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: form.id,
            ...basePayload,
            image: imageUrl,
          }),
        });
        if (res.ok) {
          setShowForm(false);
          setForm(emptyForm);
          setPendingImageFile(null);
          if (fileInputRef.current) fileInputRef.current.value = "";
          fetchCatalog();
        }
      } else {
        const res = await fetch("/api/rentals/products", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...basePayload,
            image: pendingImageFile ? null : basePayload.image,
          }),
        });
        if (!res.ok) return;
        const data = await res.json();
        const newId = data.product?.id as string | undefined;
        if (newId && pendingImageFile) {
          const url = await tryUploadImage(newId, pendingImageFile);
          if (url) {
            await fetch("/api/rentals/products", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                id: newId,
                ...basePayload,
                image: url,
              }),
            });
          }
        }
        setShowForm(false);
        setForm(emptyForm);
        setPendingImageFile(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
        fetchCatalog();
      }
    } catch (err) {
      console.error("Failed to save product:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Supprimer ce produit de location ?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/rentals/products?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchCatalog();
    } catch (err) {
      console.error("Failed to delete product:", err);
    } finally {
      setDeleting(null);
    }
  };

  const customOnly = catalogProducts.filter((p) => !p.isSeed);
  const allCategories = [
    ...(RENTAL_CATEGORIES as unknown as string[]).slice(1),
    ...customOnly
      .map((p) => p.category)
      .filter((c) => !(RENTAL_CATEGORIES as readonly string[]).includes(c)),
  ];
  const uniqueCategories = [...new Set(allCategories)];

  return (
    <>
      {/* Toolbar */}
      <div className="bg-white rounded-2xl border border-border/30 shadow-sm mb-6 p-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-3 items-center flex-1 w-full sm:w-auto">
            <div className="relative flex-1 sm:max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
              />
            </div>
            <button
              onClick={fetchCatalog}
              className="p-2.5 border border-border rounded-xl text-muted-foreground hover:text-primary hover:bg-neutral/50 transition-all"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
          <div className="flex gap-3 items-center">
            <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
              <input
                type="checkbox"
                checked={viewSeed}
                onChange={(e) => setViewSeed(e.target.checked)}
                className="rounded border-border text-accent focus:ring-accent/50"
              />
              Afficher produits par défaut
            </label>
            <button
              onClick={openNewForm}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-accent hover:bg-accent/90 text-primary text-sm font-bold rounded-xl transition-all duration-300 hover:shadow-lg"
            >
              <Plus className="w-4 h-4" />
              Ajouter un produit
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-2xl border border-border/30 shadow-sm p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center">
              <Package className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Produits par défaut</span>
          </div>
          <p className="text-3xl font-bold text-primary">{RENTAL_PRODUCTS.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-border/30 shadow-sm p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center">
              <Plus className="w-4 h-4 text-primary" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Produits ajoutés</span>
          </div>
          <p className="text-3xl font-bold text-primary">{customOnly.length}</p>
        </div>
        <div className="bg-white rounded-2xl border border-border/30 shadow-sm p-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              <Tag className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Catégories</span>
          </div>
          <p className="text-3xl font-bold text-primary">{uniqueCategories.length}</p>
        </div>
      </div>

      {/* Product table */}
      <div className="bg-white rounded-2xl border border-border/30 shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-16">
            <RefreshCw className="w-8 h-8 text-muted-foreground animate-spin mx-auto mb-4" />
            <p className="text-muted-foreground">Chargement...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral/20 flex items-center justify-center">
              <Package className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-lg font-semibold text-primary mb-1">Aucun produit</p>
            <p className="text-sm text-muted-foreground mb-4">
              {search ? "Aucun résultat pour cette recherche" : "Ajoutez votre premier produit de location"}
            </p>
            {!search && (
              <button
                onClick={openNewForm}
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent text-primary text-sm font-bold rounded-xl hover:bg-accent/90 transition-all"
              >
                <Plus className="w-4 h-4" />
                Ajouter un produit
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/50 bg-neutral/10">
                  <th className="text-left py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Produit</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Catégorie</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Prix</th>
                  <th className="text-left py-4 px-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                  <th className="text-right py-4 px-6 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                {filtered.map((product, i) => (
                  <tr
                    key={product.id}
                    className="hover:bg-neutral/30 transition-all duration-200 group animate-fade-in-up"
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-neutral/30 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {product.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={product.image} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <Wrench className="w-4 h-4 text-muted-foreground" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-primary truncate max-w-[250px]">{product.name}</p>
                          {product.ref && <p className="text-xs text-muted-foreground">Réf : {product.ref}</p>}
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 bg-primary/5 text-xs font-medium text-primary rounded-full">{product.category}</span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="text-sm font-bold text-primary">
                        {(product.priceCents / 100).toFixed(product.priceCents % 100 === 0 ? 0 : 2)}€
                      </span>
                      <span className="text-xs text-muted-foreground ml-1">
                        /{product.priceUnit === "jour" ? "jour" : product.priceUnit === "heure" ? "h" : "an"}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      {product.isSeed ? (
                        <span className="px-2.5 py-1 bg-neutral/40 text-xs font-medium text-muted-foreground rounded-full">Par défaut</span>
                      ) : (
                        <span className="px-2.5 py-1 bg-accent/10 text-xs font-semibold text-accent rounded-full border border-accent/20">Personnalisé</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditForm(product)}
                          className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-neutral/50 transition-all"
                          title="Modifier"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        {!product.isSeed && (
                          <button
                            type="button"
                            onClick={() => handleDelete(product.id)}
                            disabled={deleting === product.id}
                            className="p-2 rounded-lg text-muted-foreground hover:text-red-600 hover:bg-red-50 transition-all disabled:opacity-50"
                            title="Supprimer"
                          >
                            <Trash2 className={`w-4 h-4 ${deleting === product.id ? "animate-spin" : ""}`} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit form modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden animate-fade-in-scale flex flex-col">
            <div className="px-6 py-5 bg-gradient-to-r from-primary to-primary/90 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">
                  {form.id ? "Modifier le produit" : "Ajouter un produit"}
                </h2>
                <p className="text-sm text-white/70">
                  {form.id ? "Mettez à jour les informations et l’image" : "Créez un nouveau produit de location"}
                </p>
              </div>
              <button
                type="button"
                onClick={() => { setShowForm(false); setForm(emptyForm); setPendingImageFile(null); setUploadHint(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                className="p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="flex items-center gap-1.5 text-sm font-semibold text-primary mb-1.5">
                    <Package className="w-3.5 h-3.5" />
                    Nom du produit <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                    placeholder="Cloueur PASLODE IM90Xi"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-semibold text-primary mb-1.5">
                    <Tag className="w-3.5 h-3.5" />
                    Référence
                  </label>
                  <input
                    type="text"
                    value={form.ref}
                    onChange={(e) => setForm({ ...form, ref: e.target.value })}
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                    placeholder="LOCIM90B"
                  />
                </div>
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-sm font-semibold text-primary mb-1.5">
                  <Wrench className="w-3.5 h-3.5" />
                  Catégorie <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    value={uniqueCategories.includes(form.category) ? form.category : ""}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="flex-1 px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all bg-white"
                  >
                    <option value="">Choisir une catégorie</option>
                    {uniqueCategories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                  <input
                    type="text"
                    value={uniqueCategories.includes(form.category) ? "" : form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="flex-1 px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                    placeholder="Ou nouvelle catégorie..."
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-primary mb-1.5 block">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none"
                  placeholder="Description du produit..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="flex items-center gap-1.5 text-sm font-semibold text-primary mb-1.5">
                    <Euro className="w-3.5 h-3.5" />
                    Prix (centimes) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={form.priceCents}
                    onChange={(e) => setForm({ ...form, priceCents: e.target.value })}
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                    placeholder="2500 (= 25€)"
                  />
                  {form.priceCents && (
                    <p className="text-xs text-muted-foreground mt-1">
                      = {(Number(form.priceCents) / 100).toFixed(2)}€
                    </p>
                  )}
                </div>
                <div>
                  <label className="text-sm font-semibold text-primary mb-1.5 block">
                    Unité de tarification <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={form.priceUnit}
                    onChange={(e) => setForm({ ...form, priceUnit: e.target.value as PriceUnit })}
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all bg-white"
                  >
                    <option value="jour">Par jour</option>
                    <option value="heure">Par heure</option>
                    <option value="an">Par an</option>
                  </select>
                </div>
              </div>

              <div className="rounded-xl border border-border/60 bg-neutral/10 p-4 space-y-3">
                <label className="flex items-center gap-1.5 text-sm font-semibold text-primary">
                  <ImageIcon className="w-3.5 h-3.5" />
                  Image du produit
                </label>
                <p className="text-xs text-muted-foreground">
                  Enregistrez le produit pour pouvoir envoyer un fichier (produits du catalogue ou ajoutés). Même chemin que le Magasin : dossier <code className="text-primary/90">public/images/rental/&lt;id&gt;/</code>.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/png,image/webp,image/gif"
                    className="hidden"
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      setPendingImageFile(f ?? null);
                      setUploadHint(null);
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center gap-2 px-4 py-2 border border-border rounded-xl text-sm font-semibold text-primary hover:bg-white transition-all"
                  >
                    <Upload className="w-4 h-4" />
                    {pendingImageFile ? pendingImageFile.name : "Choisir une image"}
                  </button>
                  {pendingImageFile && (
                    <button
                      type="button"
                      className="text-xs text-muted-foreground hover:text-primary underline"
                      onClick={() => {
                        setPendingImageFile(null);
                        if (fileInputRef.current) fileInputRef.current.value = "";
                      }}
                    >
                      Retirer le fichier
                    </button>
                  )}
                </div>
                <div>
                  <label className="text-xs font-medium text-muted-foreground mb-1 block">Ou URL (chemin public, ex. /images/rental/loc-01/photo.jpg)</label>
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all"
                    placeholder="/images/rental/..."
                  />
                </div>
                {form.image && !pendingImageFile && (
                  <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-border bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={form.image} alt="Aperçu" className="w-full h-full object-cover" />
                  </div>
                )}
                {uploadHint && (
                  <p className="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-2">{uploadHint}</p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-sm font-semibold text-primary mb-1.5">
                  <Layers className="w-3.5 h-3.5" />
                  Caractéristiques <span className="text-xs text-muted-foreground font-normal">(une par ligne)</span>
                </label>
                <textarea
                  value={form.features}
                  onChange={(e) => setForm({ ...form, features: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none font-mono"
                  placeholder={"Batterie longue durée\nErgonomie parfaite\nMultifonctionnel"}
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-primary mb-1.5 block">
                  Applications <span className="text-xs text-muted-foreground font-normal">(une par ligne)</span>
                </label>
                <textarea
                  value={form.applications}
                  onChange={(e) => setForm({ ...form, applications: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none font-mono"
                  placeholder={"Liteaux\nCharpente bois\nBardage"}
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-primary mb-1.5 block">
                  Variantes <span className="text-xs text-muted-foreground font-normal">(une par ligne)</span>
                </label>
                <textarea
                  value={form.variants}
                  onChange={(e) => setForm({ ...form, variants: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all resize-none font-mono"
                  placeholder={"20 cm\n22 cm"}
                />
              </div>
            </div>

            <div className="border-t border-border/50 bg-neutral/10 px-6 py-4 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => { setShowForm(false); setForm(emptyForm); setPendingImageFile(null); setUploadHint(null); if (fileInputRef.current) fileInputRef.current.value = ""; }}
                className="px-5 py-2.5 border border-border rounded-xl text-sm font-semibold text-muted-foreground hover:text-primary hover:bg-white transition-all"
              >
                Annuler
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={saving || !form.name || !form.category || !form.description || !form.priceCents}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent/90 text-primary text-sm font-bold rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {saving ? "Enregistrement..." : form.id ? "Mettre à jour" : "Créer le produit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

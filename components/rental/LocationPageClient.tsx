"use client";

import { useState, useMemo } from "react";
import {
  Wrench,
  Search,
  Phone,
  MapPin,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { RentalProduct } from "@/lib/rental/data";
import { site } from "@/lib/site";
import RentalCard from "./RentalCard";
import RentalModal from "./RentalModal";

interface Props {
  products: RentalProduct[];
  categories: string[];
}

export default function LocationPageClient({ products, categories }: Props) {
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<RentalProduct | null>(
    null
  );

  const filtered = useMemo(() => {
    let list = products;
    if (activeCategory !== "Tous") {
      list = list.filter((p) => p.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [products, activeCategory, search]);

  const categoryCountMap = useMemo(() => {
    const map: Record<string, number> = { Tous: products.length };
    for (const p of products) {
      map[p.category] = (map[p.category] || 0) + 1;
    }
    return map;
  }, [products]);

  return (
    <>
      {/* Hero */}
      <section className="relative bg-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 md:pt-40 md:pb-24">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/20 rounded-full mb-6">
              <Wrench className="w-4 h-4 text-accent" />
              <span className="text-sm font-semibold text-accent">
                Service location
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Location de{" "}
              <span className="text-accent">matériel professionnel</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed mb-8 max-w-2xl">
              Louez du matériel de qualité professionnelle pour vos chantiers.
              Cloueurs, machines à ardoises, outillage spécialisé, transport et
              levage — tout ce qu&apos;il vous faut, entretenu et prêt à
              l&apos;emploi.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#catalogue"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary font-bold rounded-xl hover:bg-accent/90 transition-all duration-300 hover:shadow-lg hover:shadow-accent/20"
              >
                Voir le catalogue
                <ArrowRight className="w-4 h-4" />
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                <Phone className="w-4 h-4" />
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Info bar */}
      <section className="bg-white border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                <Wrench className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-primary">
                  Matériel professionnel
                </p>
                <p className="text-xs text-muted-foreground">
                  Entretenu et vérifié avant chaque location
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-primary">
                  Réservation simple
                </p>
                <p className="text-xs text-muted-foreground">
                  Faites votre demande en ligne, on vous rappelle
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-bold text-primary">
                  2 dépôts en Wallonie
                </p>
                <p className="text-xs text-muted-foreground">
                  Bertrix &amp; Naninne — retrait sur place
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalogue */}
      <section id="catalogue" className="bg-neutral/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
          {/* Search + Filters */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-primary">
                  Notre catalogue
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {filtered.length} produit{filtered.length !== 1 ? "s" : ""}{" "}
                  disponible{filtered.length !== 1 ? "s" : ""}
                </p>
              </div>
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Rechercher un produit..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all bg-white"
                />
              </div>
            </div>

            {/* Category pills */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const isActive = cat === activeCategory;
                const count = categoryCountMap[cat] || 0;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      isActive
                        ? "bg-primary text-white shadow-md shadow-primary/20"
                        : "bg-white text-muted-foreground border border-border hover:border-primary/30 hover:text-primary"
                    }`}
                  >
                    {cat}
                    <span
                      className={`text-xs ${
                        isActive ? "text-white/70" : "text-muted-foreground/60"
                      }`}
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Product grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral/40 flex items-center justify-center">
                <Search className="w-7 h-7 text-muted-foreground" />
              </div>
              <p className="text-lg font-semibold text-primary mb-1">
                Aucun résultat
              </p>
              <p className="text-sm text-muted-foreground">
                Essayez un autre terme de recherche ou catégorie.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <RentalCard
                  key={product.id}
                  product={product}
                  onRequest={setSelectedProduct}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Besoin d&apos;un renseignement ?
            </h2>
            <p className="text-white/80 mb-8">
              Contactez nos équipes à Bertrix ou Naninne pour toute question sur
              la disponibilité, les tarifs ou les conditions de location.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {site.locations.map((loc) => (
                <a
                  key={loc.name}
                  href={`tel:${loc.phone.replace(/\s/g, "")}`}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl transition-all duration-300"
                >
                  <Phone className="w-4 h-4" />
                  {loc.name} : {loc.phone}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <RentalModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}

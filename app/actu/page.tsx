"use client";

import { useState, useMemo } from "react";
import { newsPosts } from "@/lib/news";
import Reveal from "@/components/ui/Reveal";
import FilterPills from "@/components/actu/FilterPills";
import NewsGrid from "@/components/actu/NewsGrid";
import Pagination from "@/components/actu/Pagination";
import CTACompact from "@/components/sections/CTA";

const ITEMS_PER_PAGE = 6;

export default function ActuPage() {
  const [selectedCategory, setSelectedCategory] = useState("Tous");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter news by category
  const filteredNews = useMemo(() => {
    const filtered =
      selectedCategory === "Tous"
        ? [...newsPosts]
        : newsPosts.filter((post) => post.category === selectedCategory);

    // Sort by date (newest first)
    return filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [selectedCategory]);

  // Paginate results
  const paginatedNews = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredNews.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredNews, currentPage]);

  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);

  // Reset to page 1 when category changes
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="pt-20">
      {/* Page Hero */}
      <section className="py-12 lg:py-16 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                Actualités
              </h1>
              <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
                Les dernières nouvelles et actualités de Comarden : produits,
                formations, événements et informations importantes.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Filter Pills */}
      <section className="py-8 bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <FilterPills
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
            />
          </Reveal>
        </div>
      </section>

      {/* News Grid */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsGrid articles={paginatedNews} />

          {/* Pagination */}
          {totalPages > 1 && (
            <Reveal delay={200}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </Reveal>
          )}
        </div>
      </section>

      {/* CTA */}
      <CTACompact />
    </div>
  );
}

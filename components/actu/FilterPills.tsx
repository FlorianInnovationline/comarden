"use client";

import { categories } from "@/lib/news";

interface FilterPillsProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

export default function FilterPills({
  selectedCategory,
  onCategoryChange,
}: FilterPillsProps) {
  return (
    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-5 py-2.5 text-sm font-medium rounded-full transition-all duration-200 ${
            selectedCategory === category
              ? "bg-primary text-white shadow-md shadow-primary/20"
              : "bg-neutral text-foreground hover:bg-neutral-dark border border-border hover:border-primary/30"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

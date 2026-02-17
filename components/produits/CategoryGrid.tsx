"use client";

import { productCategories } from "@/lib/products";
import CategoryCard from "./CategoryCard";
import Reveal from "@/components/ui/Reveal";

export default function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-5 xl:gap-6">
      {productCategories.map((category, index) => (
        <Reveal key={category.slug} delay={index * 80}>
          <CategoryCard
            slug={category.slug}
            title={category.title}
            description={category.description}
            iconName={category.iconName}
            index={index}
          />
        </Reveal>
      ))}
    </div>
  );
}

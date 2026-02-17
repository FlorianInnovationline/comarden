"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { productCategories } from "@/lib/products";
import Reveal from "@/components/ui/Reveal";
import * as Icons from "lucide-react";
import { useState } from "react";

// Icon mapping
const iconMap: Record<string, keyof typeof Icons> = {
  Home: "Home",
  TreePine: "TreePine",
  Layers: "Layers",
  Leaf: "Leaf",
  Box: "Box",
  Droplets: "Droplets",
};

// Gradient colors for each card
const gradientColors = [
  "from-blue-500/10 via-primary/5 to-accent/10",
  "from-accent/10 via-blue-500/5 to-primary/10",
  "from-primary/10 via-accent/5 to-blue-500/10",
  "from-blue-500/10 via-accent/5 to-primary/10",
  "from-accent/10 via-primary/5 to-blue-500/10",
  "from-primary/10 via-blue-500/5 to-accent/10",
];

export default function OfferGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-neutral/30 via-white to-neutral/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(12,41,82,0.03),transparent_50%)]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-3">
              Notre offre
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Une gamme complète de produits pour vos projets
            </p>
          </div>
        </Reveal>

        {/* Single row container - square cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 lg:gap-4">
          {productCategories.map((category, index) => {
            const IconComponent = Icons[iconMap[category.iconName] || "Package"] as React.ComponentType<{ className?: string }>;
            const gradient = gradientColors[index % gradientColors.length];
            
            return (
              <Reveal key={category.slug} delay={index * 60}>
                <Link
                  href={`/produits/${category.slug}`}
                  className="group block w-full"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="relative aspect-square bg-white rounded-xl border border-border/50 overflow-hidden transition-all duration-500 hover:shadow-xl hover:shadow-primary/10 hover:-translate-y-1 hover:scale-[1.02]">
                    {/* Gradient background overlay */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    {/* Content */}
                    <div className="relative p-3 sm:p-4 lg:p-4 h-full flex flex-col justify-between">
                      {/* Top section - Icon */}
                      <div className="flex-shrink-0">
                        <div className="inline-flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-lg bg-primary/5 group-hover:bg-accent/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 mb-2 sm:mb-3">
                          {IconComponent && (
                            <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-primary group-hover:text-accent transition-colors duration-500" />
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-sm sm:text-base lg:text-base font-bold text-primary mb-1.5 sm:mb-2 group-hover:text-accent transition-colors duration-300 leading-tight line-clamp-2">
                          {category.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[10px] sm:text-xs text-muted-foreground leading-relaxed line-clamp-2 sm:line-clamp-3">
                          {category.description}
                        </p>
                      </div>

                      {/* Bottom section - CTA */}
                      <div className="flex items-center gap-1 text-primary font-semibold text-[10px] sm:text-xs group-hover:text-accent transition-colors duration-300 mt-auto pt-2 flex-shrink-0">
                        <span>Découvrir</span>
                        <ArrowRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </div>

                      {/* Hover accent line */}
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                    </div>

                    {/* Shine effect on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}

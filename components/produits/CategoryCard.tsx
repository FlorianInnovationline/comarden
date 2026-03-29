"use client";

import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";
import * as Icons from "lucide-react";
import Card from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface CategoryCardProps {
  slug: string;
  title: string;
  description: string;
  iconName: string;
  index?: number;
}

export default function CategoryCard({
  slug,
  title,
  description,
  iconName,
  index = 0,
}: CategoryCardProps) {
  const IconComponent =
    (Icons[iconName as keyof typeof Icons] as LucideIcon) || Icons.Package;
  const [isHovered, setIsHovered] = useState(false);

  // Safety check: ensure slug is defined
  if (!slug) {
    console.error("CategoryCard: slug is undefined", { slug, title });
    return null;
  }

  const href = `/produits/${slug}`;

  return (
    <Link href={href} className="block h-full">
      <Card className="h-full group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 relative overflow-hidden border border-border/50 hover:border-accent/50 bg-white">
        <div className="relative z-10 flex items-start gap-4 p-4 sm:p-5">
          <div 
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:from-accent/20 group-hover:to-accent/10"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <IconComponent 
              className={cn(
                "w-5 h-5 sm:w-5.5 sm:h-5.5 text-primary transition-colors duration-300",
                isHovered && "text-accent"
              )} 
              strokeWidth={2}
            />
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-base font-bold text-primary mb-1 group-hover:text-accent transition-colors duration-300 leading-tight">
              {title}
            </h3>
            
            <p className="text-xs sm:text-[13px] text-muted-foreground leading-relaxed line-clamp-2">
              {description}
            </p>
            
            <span className="inline-flex items-center text-xs font-semibold text-primary group-hover:text-accent mt-2 transition-all duration-300">
              Découvrir
              <ArrowRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
      </Card>
    </Link>
  );
}

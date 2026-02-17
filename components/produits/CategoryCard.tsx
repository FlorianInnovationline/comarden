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
      <Card className="h-full group hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 relative overflow-hidden border border-border/50 hover:border-accent/50 bg-white/90 backdrop-blur-sm">
        {/* Animated background gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        {/* Decorative corner element */}
        <div className="absolute top-0 right-0 w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-accent/20 to-accent/10 rounded-bl-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 transform group-hover:scale-110" />
        
        <div className="relative z-10 flex flex-col h-full p-4 sm:p-5 lg:p-6">
          <div className="mb-4 sm:mb-5 relative">
            <div 
              className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center transition-all duration-500 group-hover:bg-gradient-to-br group-hover:from-accent/30 group-hover:to-accent/20 group-hover:scale-110 group-hover:rotate-6 shadow-lg group-hover:shadow-xl group-hover:shadow-accent/30"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <IconComponent 
                className={cn(
                  "w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-primary transition-all duration-500",
                  isHovered && "text-accent scale-110"
                )} 
                strokeWidth={2}
              />
            </div>
            {/* Floating particles effect */}
            <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping" />
            <div className="absolute top-0.5 -left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 animate-ping" style={{ animationDelay: '0.2s' }} />
          </div>
          
          <h3 className="text-base sm:text-lg lg:text-xl xl:text-2xl font-bold text-primary mb-2 sm:mb-3 group-hover:text-accent transition-colors duration-300 leading-tight line-clamp-2">
            {title}
          </h3>
          
          <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-5 flex-grow leading-relaxed group-hover:text-foreground transition-colors duration-300 line-clamp-3">
            {description}
          </p>
          
          <span className="inline-flex items-center text-xs sm:text-sm font-semibold text-primary group-hover:text-accent mt-auto transition-all duration-300 group">
            <span className="mr-1.5 sm:mr-2">Découvrir</span>
            <div className="relative">
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-2 transition-transform duration-300" />
              {/* Trail effect */}
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 absolute left-0 opacity-0 group-hover:opacity-30 group-hover:-translate-x-2 transition-all duration-300" />
            </div>
          </span>
        </div>
        
        {/* Bottom accent line with animation */}
        <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-accent via-accent/80 to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
        
        {/* Shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none" />
      </Card>
    </Link>
  );
}

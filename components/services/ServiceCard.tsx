"use client";

import Link from "next/link";
import { ArrowRight, type LucideIcon, Star } from "lucide-react";
import { useState } from "react";
import Card from "@/components/ui/Card";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  features: string[];
  href: string;
}

export default function ServiceCard({
  icon: Icon,
  title,
  description,
  features,
  href,
}: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card variant="minimal" className="h-full p-8 lg:p-10 hover:shadow-xl transition-all duration-300 group border-0 relative overflow-hidden hover:-translate-y-2 bg-white rounded-none">
      {/* Animated background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      {/* Decorative corner element */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-accent/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110" />
      
      <div className="relative z-10">
        <div 
          className="w-14 h-14 rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center mb-6 transition-all duration-300 group-hover:bg-accent/20 group-hover:scale-110 group-hover:rotate-6 shadow-lg group-hover:shadow-xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Icon 
            className={`w-7 h-7 text-accent transition-all duration-300 ${isHovered ? "scale-110 animate-pulse" : ""}`} 
            strokeWidth={1.5} 
          />
        </div>
        
        {/* Floating particle effect */}
        <div className="absolute top-4 right-4 w-3 h-3 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" />
        <div className="absolute top-6 right-6 w-2 h-2 bg-accent/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-ping" style={{ animationDelay: '0.2s' }} />
        
        <h3 className="text-2xl lg:text-3xl font-bold text-primary mb-4 group-hover:text-accent transition-colors duration-300 leading-tight">
          {title}
        </h3>
        
        <p className="text-base text-foreground/70 leading-relaxed mb-6 group-hover:text-foreground transition-colors duration-300">
          {description}
        </p>
        
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <li 
              key={index} 
              className="flex items-start gap-3 text-sm text-foreground/60 group-hover:text-foreground transition-colors duration-300"
              style={{ transitionDelay: `${index * 50}ms` }}
            >
              <span className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-300 group-hover:animate-pulse" />
              <span className="leading-relaxed">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Link
          href={href}
          className="inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:text-accent transition-all duration-300 group/link relative"
        >
          <span className="relative z-10 flex items-center">
            En savoir plus
            <div className="relative ml-2">
              <ArrowRight className="w-5 h-5 group-hover/link:translate-x-2 transition-transform duration-300" />
              {/* Trail effect */}
              <ArrowRight className="w-5 h-5 absolute left-0 opacity-0 group-hover/link:opacity-30 group-hover/link:-translate-x-2 transition-all duration-300" />
            </div>
          </span>
        </Link>
        
        {/* Decorative star */}
        <Star className="absolute bottom-4 right-4 w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
      </div>
      
      {/* Bottom accent line - only on hover */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </Card>
  );
}

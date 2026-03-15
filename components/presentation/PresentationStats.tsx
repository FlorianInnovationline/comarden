"use client";

import { useEffect, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import {
  Calendar,
  MapPin,
  Home,
  Truck,
  Users,
  Package,
  type LucideIcon,
} from "lucide-react";

interface StatCard {
  icon: LucideIcon;
  value: string;
  label: string;
  description: string;
  color: string;
}

const stats: StatCard[] = [
  {
    icon: Calendar,
    value: "47+",
    label: "Années d'expérience",
    description: "Depuis 1977",
    color: "from-accent/20 to-accent/10",
  },
  {
    icon: MapPin,
    value: "2",
    label: "Sites en Wallonie",
    description: "Bertrix & Naninne",
    color: "from-primary/20 to-primary/10",
  },
  {
    icon: Home,
    value: "100%",
    label: "Couverture toiture",
    description: "Plates & inclinées",
    color: "from-accent/20 to-accent/10",
  },
  {
    icon: Truck,
    value: "24-48h",
    label: "Délai de livraison",
    description: "Camion-grue",
    color: "from-primary/20 to-primary/10",
  },
  {
    icon: Users,
    value: "2500+",
    label: "Clients professionnels",
    description: "Fidèles partenaires",
    color: "from-accent/20 to-accent/10",
  },
  {
    icon: Package,
    value: "5000+",
    label: "Références en stock",
    description: "Disponibilité immédiate",
    color: "from-primary/20 to-primary/10",
  },
];

export default function PresentationStats() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="py-8 sm:py-10 lg:py-20 bg-gradient-to-b from-white via-neutral/30 to-white relative overflow-hidden">
      {/* Subtle animated background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          {/* Mobile/Tablet Header - Keep current */}
          <div className="text-center mb-6 sm:mb-8 lg:hidden">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-primary tracking-tight mb-2">
              Comarden en chiffres
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
              Des résultats concrets qui témoignent de notre engagement envers les professionnels du bâtiment.
            </p>
          </div>
          
          {/* Desktop Header - Clean, minimal */}
          <div className="hidden lg:block text-center mb-16">
            <h2 className="text-3xl font-bold text-primary tracking-tight mb-3">
              Comarden en chiffres
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Des résultats concrets qui témoignent de notre engagement
            </p>
          </div>
        </Reveal>

        {/* Mobile/Tablet Grid - Keep current compact version */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:hidden gap-3 sm:gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            
            return (
              <Reveal key={stat.label} delay={index * 50}>
                <div
                  className={`group cursor-pointer relative bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-5 border border-border/50 hover:border-primary transition-all duration-200 hover:bg-[#1B3A6B] hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-2 ${
                    isVisible ? "animate-zoom-in" : ""
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-3 sm:mb-4 flex justify-center">
                    <div className="relative">
                      <div className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent/20 to-accent/10 rounded-xl flex items-center justify-center transition-all duration-200 group-hover:scale-110 group-hover:rotate-3 group-hover:bg-white/20">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent transition-colors duration-200 group-hover:text-white" strokeWidth={2} />
                      </div>
                    </div>
                  </div>

                  <div className="mb-2 text-center">
                    <div className="text-2xl sm:text-3xl font-bold text-primary leading-none transition-colors duration-200 group-hover:text-white group-hover:scale-110 inline-block">
                      {stat.value}
                    </div>
                  </div>

                  <div className="mb-1 text-center">
                    <div className="text-[10px] sm:text-xs font-semibold text-primary leading-tight line-clamp-2 transition-colors duration-200 group-hover:text-white">
                      {stat.label}
                    </div>
                  </div>

                  <div className="hidden sm:block text-center">
                    <div className="text-[9px] text-muted-foreground leading-tight opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:text-white/70">
                      {stat.description}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Desktop Grid - Clean, minimal, 3 columns */}
        <div className="hidden lg:grid grid-cols-3 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            
            return (
              <Reveal key={stat.label} delay={index * 100}>
                <div className="group cursor-pointer bg-white rounded-lg p-8 border border-slate-200 hover:border-primary transition-all duration-200 hover:shadow-lg hover:bg-[#1B3A6B] hover:-translate-y-1">
                  <div className="mb-6 flex justify-center">
                    <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center transition-colors duration-200 group-hover:bg-white/20">
                      <Icon className="w-8 h-8 text-accent transition-colors duration-200 group-hover:text-white" strokeWidth={2} />
                    </div>
                  </div>

                  <div className="mb-3 text-center">
                    <div className="text-5xl font-bold text-primary leading-none transition-colors duration-200 group-hover:text-white">
                      {stat.value}
                    </div>
                  </div>

                  <div className="mb-2 text-center">
                    <div className="text-sm font-semibold text-primary transition-colors duration-200 group-hover:text-white">
                      {stat.label}
                    </div>
                  </div>

                  <div className="text-center">
                    <div className="text-xs text-muted-foreground transition-colors duration-200 group-hover:text-white/70">
                      {stat.description}
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Optional: Add a subtle separator line */}
        <div className="mt-8 sm:mt-10 lg:mt-16 flex items-center justify-center">
          <div className="h-px w-24 bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}

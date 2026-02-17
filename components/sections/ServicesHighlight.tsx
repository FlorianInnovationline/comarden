"use client";

import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { services } from "@/lib/services";
import Reveal from "@/components/ui/Reveal";
import { useState } from "react";

export default function ServicesHighlight() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgb(12,41,82) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-3">
              Nos services
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Des services sur mesure pour accompagner vos projets
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            const isHovered = hoveredIndex === index;
            
            return (
              <Reveal key={service.href} delay={index * 100}>
                <Link
                  href={service.href}
                  className="group block h-full"
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                >
                  <div className="relative h-full bg-gradient-to-br from-white to-neutral/30 rounded-xl border-2 border-border/50 overflow-hidden transition-all duration-500 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1">
                    {/* Content */}
                    <div className="relative p-5 sm:p-6 lg:p-6 h-full flex flex-col">
                      {/* Icon and Title Row */}
                      <div className="flex items-start gap-3 sm:gap-4 mb-4">
                        <div className={`flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
                          isHovered 
                            ? 'bg-accent text-white scale-110 rotate-6' 
                            : 'bg-primary/10 text-primary'
                        }`}>
                          <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-500" />
                        </div>
                        <div className="flex-grow">
                          <h3 className="text-lg sm:text-xl lg:text-xl font-bold text-primary mb-1 group-hover:text-accent transition-colors duration-300 leading-tight">
                            {service.title}
                          </h3>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-sm sm:text-base text-muted-foreground mb-4 leading-relaxed">
                        {service.description}
                      </p>

                      {/* Features List */}
                      <div className="flex-grow mb-4">
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li 
                              key={idx}
                              className="flex items-center gap-2.5 text-xs sm:text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                            >
                              <div className={`flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center transition-all duration-300 ${
                                isHovered
                                  ? 'bg-accent text-white scale-110'
                                  : 'bg-primary/10 text-primary'
                              }`}>
                                <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                              </div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA */}
                      <div className="flex items-center justify-between pt-3 border-t border-border/50 group-hover:border-accent/50 transition-colors duration-300">
                        <span className="text-sm sm:text-base text-primary font-semibold group-hover:text-accent transition-colors duration-300">
                          En savoir plus
                        </span>
                        <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all duration-500 ${
                          isHovered
                            ? 'bg-accent text-white translate-x-0'
                            : 'bg-primary/10 text-primary -translate-x-2 group-hover:translate-x-0'
                        }`}>
                          <ArrowRight className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
                        </div>
                      </div>

                      {/* Corner accent on hover */}
                      <div className={`absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-transparent transition-all duration-500 rounded-bl-full`} />
                    </div>

                    {/* Animated border glow */}
                    <div className={`absolute inset-0 rounded-xl border-2 border-accent/0 group-hover:border-accent/30 transition-all duration-500 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

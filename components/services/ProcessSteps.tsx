"use client";

import { ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const steps = [
  {
    number: "01",
    title: "Besoin",
    description: "Vous nous contactez avec vos besoins et contraintes de chantier.",
  },
  {
    number: "02",
    title: "Sélection",
    description: "Nous identifions ensemble les matériaux adaptés à votre projet.",
  },
  {
    number: "03",
    title: "Façonnage",
    description: "Vos matériaux sont préparés et façonnés selon vos spécifications.",
  },
  {
    number: "04",
    title: "Livraison",
    description: "Livraison sur chantier avec manutention sécurisée si nécessaire.",
  },
];

export default function ProcessSteps() {
  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-white to-neutral/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-2xl mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-accent tracking-wide uppercase">
                Notre processus
              </p>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight">
              De votre besoin à la livraison
            </h2>
          </div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <Reveal key={step.number} delay={index * 150}>
              <div className="relative group">
                {/* Connecting line */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-border/50 via-accent/30 to-border/50 -translate-x-6 transition-all duration-300 group-hover:from-accent/50 group-hover:via-accent group-hover:to-accent/50" />
                )}
                <div className="relative">
                  <p className="text-6xl font-light text-accent/20 mb-4 group-hover:text-accent/40 transition-colors duration-300">
                    {step.number}
                  </p>
                  <h3 className="text-xl lg:text-2xl font-bold text-primary mb-3 group-hover:text-accent transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    {step.description}
                  </p>
                </div>
                {/* Hover indicator */}
                <div className="absolute top-0 left-0 w-1 h-full bg-accent transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

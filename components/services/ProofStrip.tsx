"use client";

import { Clock, Shield, Users } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const proofs = [
  {
    icon: Clock,
    text: "Délais maîtrisés",
  },
  {
    icon: Shield,
    text: "Manipulation sécurisée",
  },
  {
    icon: Users,
    text: "Conseils d'experts",
  },
];

export default function ProofStrip() {
  return (
    <section className="py-16 bg-gradient-to-r from-neutral/30 via-primary/5 to-neutral/30 border-y-2 border-border/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 lg:gap-24">
            {proofs.map((proof, index) => {
              const Icon = proof.icon;
              return (
                <div 
                  key={proof.text} 
                  className="group flex items-center gap-4 p-4 rounded-xl hover:bg-white/50 transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-default"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <div className="w-12 h-12 rounded-full bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg group-hover:shadow-xl">
                    <Icon className="w-6 h-6 text-accent group-hover:animate-pulse transition-all duration-300" strokeWidth={1.5} />
                  </div>
                  <span className="text-sm lg:text-base font-semibold text-foreground/70 group-hover:text-primary transition-colors duration-300">
                    {proof.text}
                  </span>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

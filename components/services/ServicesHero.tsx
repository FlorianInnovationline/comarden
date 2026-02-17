"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Scissors, Truck, Ruler, ShieldCheck } from "lucide-react";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

const serviceHighlights = [
  { icon: Scissors, title: "Façonnage", desc: "Zinc, acier, EPDM", delay: 0 },
  { icon: Truck, title: "Livraison", desc: "Camion-grue", delay: 0.1 },
  { icon: Ruler, title: "Sur mesure", desc: "Découpe précise", delay: 0.2 },
  { icon: ShieldCheck, title: "Expertise", desc: "Conseil technique", delay: 0.3 },
];

export default function ServicesHero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-primary pt-20 pb-20 lg:pt-28 lg:pb-28">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a2f4a] via-primary to-[#2B4162]" />
        {/* Animated gradient orbs */}
        <div 
          className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
          style={{
            background: "radial-gradient(circle, rgba(218,165,32,0.4) 0%, transparent 70%)",
            top: "10%",
            right: "-10%",
            animation: "pulse-slow 8s ease-in-out infinite",
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-15"
          style={{
            background: "radial-gradient(circle, rgba(218,165,32,0.3) 0%, transparent 70%)",
            bottom: "0%",
            left: "-5%",
            animation: "pulse-slow 10s ease-in-out infinite reverse",
          }}
        />
        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left content */}
          <Reveal>
            <div className="inline-flex items-center gap-3 mb-6">
              <span className="flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-accent opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
              </span>
              <span className="text-accent font-medium tracking-wide uppercase text-sm">
                Services sur mesure
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6">
              Des services pensés pour{" "}
              <span className="relative inline-block">
                <span className="relative z-10">gagner du temps</span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-accent/30 -skew-x-3" />
              </span>{" "}
              sur chantier
            </h1>

            <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-xl mb-8">
              Façonnage sur mesure, livraison camion-grue, préparation soignée et conseil technique. Tout ce qu'il faut
              pour des chantiers efficaces.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                href="/contact"
                size="lg"
                variant="secondary"
                className="group/btn h-14 px-8 text-base font-semibold rounded-full shadow-lg shadow-accent/25 hover:shadow-xl hover:shadow-accent/30 transition-all duration-300 hover:scale-105 relative overflow-hidden"
              >
                <span className="relative z-10 flex items-center">
                  Demander un devis
                  <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" />
                </span>
                {/* Button hover effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
              </Button>
              <Button
                asChild
                href="#services"
                variant="outline"
                size="lg"
                className="group/btn border-white/30 text-white bg-transparent hover:bg-white/10 hover:border-white/40 h-14 px-8 text-base font-medium rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                Découvrir nos services
              </Button>
            </div>
          </Reveal>

          {/* Right side - Service highlights */}
          <div className="grid grid-cols-2 gap-4">
            {serviceHighlights.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={index * 100}>
                  <div className="group relative p-6 lg:p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 hover:border-accent/30 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-accent/20 overflow-hidden">
                    {/* Animated background on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                        <Icon className="w-7 h-7 text-accent group-hover:animate-pulse transition-all duration-300" />
                      </div>
                      <h3 className="text-lg lg:text-xl font-bold text-white mb-2 group-hover:text-accent transition-colors duration-300">{item.title}</h3>
                      <p className="text-sm text-white/70 group-hover:text-white/90 transition-colors duration-300 leading-relaxed">{item.desc}</p>
                    </div>
                    
                    {/* Decorative sparkle */}
                    <div className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-ping" />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 60V30C240 10 480 0 720 0C960 0 1200 10 1440 30V60H0Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

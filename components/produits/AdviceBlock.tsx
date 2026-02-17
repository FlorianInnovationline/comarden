"use client";

import { MessageCircle, Users, CheckCircle, Star } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const benefits = [
  {
    icon: MessageCircle,
    title: "Conseils personnalisés",
    description: "Notre équipe vous guide dans le choix des matériaux adaptés à votre projet.",
  },
  {
    icon: Users,
    title: "Expertise reconnue",
    description: "Plus de 45 ans d'expérience au service des professionnels.",
  },
  {
    icon: CheckCircle,
    title: "Accompagnement complet",
    description: "De la sélection à la livraison, nous vous accompagnons à chaque étape.",
  },
];

export default function AdviceBlock() {
  return (
    <section className="py-10 sm:py-12 lg:py-16 xl:py-20 bg-gradient-to-b from-neutral/20 via-primary/5 to-white relative overflow-hidden">
      {/* Animated background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 left-0 w-64 h-64 sm:w-80 sm:h-80 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-8 sm:mb-10 lg:mb-12">
            <div className="inline-flex items-center justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-14 lg:w-14 lg:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center shadow-lg">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-7 lg:w-7 lg:h-7 text-accent" />
              </div>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary tracking-tight">
                Besoin de conseils ?
              </h2>
            </div>
            <p className="text-xs sm:text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
              Notre équipe d'experts est à votre disposition pour vous guider dans
              le choix des matériaux adaptés à votre projet.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-8 sm:mb-10 lg:mb-12">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Reveal key={benefit.title} delay={index * 100}>
                <Card className="text-center p-5 sm:p-6 lg:p-8 hover:shadow-xl transition-all duration-500 group border border-border/50 hover:border-accent/30 relative overflow-hidden bg-white/90 backdrop-blur-sm hover:-translate-y-2">
                  {/* Animated background */}
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-accent/10 to-accent/5 group-hover:from-accent/20 group-hover:to-accent/10 flex items-center justify-center mx-auto mb-4 sm:mb-5 transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 shadow-lg group-hover:shadow-xl group-hover:shadow-accent/30">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-accent transition-all duration-500 group-hover:scale-110" strokeWidth={2} />
                    </div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-primary mb-2 sm:mb-3 group-hover:text-accent transition-colors duration-300">
                      {benefit.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                      {benefit.description}
                    </p>
                  </div>
                  
                  {/* Decorative star */}
                  <Star className="absolute top-3 right-3 w-4 h-4 sm:w-5 sm:h-5 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
                </Card>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={300}>
          <div className="text-center">
            <Button 
              asChild 
              href="/contact" 
              size="lg"
              className="group/btn bg-primary text-white hover:bg-primary/90 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden h-11 sm:h-12 px-6 sm:px-8 text-sm sm:text-base"
            >
              <span className="relative z-10 flex items-center">
                Nous contacter
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover/btn:translate-x-2 transition-transform duration-300" />
              </span>
              {/* Button hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

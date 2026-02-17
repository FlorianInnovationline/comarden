"use client";

import Link from "next/link";
import { Briefcase, ArrowRight, Users, Star } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Reveal from "@/components/ui/Reveal";

export default function JobsTeaser() {
  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-white to-primary/5 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/10 rounded-full blur-3xl" />
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Card className="p-8 lg:p-10 bg-gradient-to-br from-primary/5 via-primary/3 to-accent/5 border-2 border-primary/20 hover:border-accent/40 transition-all duration-300 hover:shadow-xl group overflow-hidden relative">
            {/* Animated background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 lg:gap-8">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl bg-accent/20 group-hover:bg-accent/30 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-6 shadow-lg group-hover:shadow-xl">
                    <Briefcase className="w-8 h-8 text-accent group-hover:animate-pulse transition-all duration-300" />
                  </div>
                  <Star className="absolute -top-2 -right-2 w-6 h-6 text-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                      Nos Jobs
                    </h2>
                    <Users className="w-5 h-5 text-accent opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-10px] group-hover:translate-x-0" />
                  </div>
                  <p className="text-base text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    Rejoignez l'équipe Comarden ! Découvrez nos offres d'emploi et
                    opportunités de carrière dans le secteur des matériaux de
                    construction.
                  </p>
                </div>

                <div className="flex-shrink-0 w-full md:w-auto">
                  <Button
                    asChild
                    href="/carriere"
                    size="lg"
                    className="w-full md:w-auto bg-primary text-white hover:bg-primary/90 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group/btn relative overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center">
                      Voir les offres
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-2 transition-transform duration-300" />
                    </span>
                    {/* Button hover effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

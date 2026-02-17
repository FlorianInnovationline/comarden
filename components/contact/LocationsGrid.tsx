"use client";

import { MapPin } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import LocationCard from "./LocationCard";
import LocationsMap from "./LocationsMap";
import { site } from "@/lib/site";

export default function LocationsGrid() {
  return (
    <section className="py-16 lg:py-24 bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight">
                Nos implantations
              </h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Retrouvez-nous dans nos deux dépôts en Wallonie
            </p>
          </div>
        </Reveal>

        {/* Map Section */}
        <div className="mb-12 lg:mb-16">
          <Reveal delay={100}>
            <LocationsMap />
          </Reveal>
        </div>

        {/* Location Cards */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10 max-w-5xl mx-auto">
          {site.locations.map((location, index) => (
            <Reveal key={location.name} delay={index * 150}>
              <LocationCard location={location} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

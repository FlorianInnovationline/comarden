"use client";

import { MapPin, Phone, Printer, Building2, ExternalLink } from "lucide-react";
import Card from "@/components/ui/Card";
import type { Location } from "@/lib/site";
import { useState } from "react";

interface LocationCardProps {
  location: Location;
}

export default function LocationCard({ location }: LocationCardProps) {
  const phoneClean = location.phone.replace(/\s|\(|\)/g, "");
  const [hoveredField, setHoveredField] = useState<string | null>(null);

  return (
    <Card className="group h-full p-8 lg:p-10 hover:shadow-xl transition-all duration-300 hover:border-accent/30 relative overflow-hidden">
      {/* Decorative gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl lg:text-3xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
            {location.name}
          </h3>
          <div className="w-12 h-12 rounded-full bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
            <MapPin className="w-6 h-6 text-accent group-hover:rotate-[-15deg] transition-transform duration-300" />
          </div>
        </div>

        <div className="space-y-6">
          {/* Address */}
          <div 
            className="flex items-start gap-4 transition-all duration-200 hover:translate-x-1"
            onMouseEnter={() => setHoveredField("address")}
            onMouseLeave={() => setHoveredField(null)}
          >
            <div className={`w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
              hoveredField === "address" ? "bg-accent/20 scale-110 rotate-3" : ""
            }`}>
              <MapPin className={`w-5 h-5 text-accent transition-transform duration-300 ${
                hoveredField === "address" ? "scale-110" : ""
              }`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                Adresse
              </p>
              <p className="text-base text-foreground leading-relaxed group-hover:text-primary transition-colors duration-300">
                {location.address}
                <br />
                <span className="font-medium">{location.postalCode}</span>
              </p>
            </div>
          </div>

          {/* Phone */}
          <div 
            className="flex items-start gap-4 transition-all duration-200 hover:translate-x-1"
            onMouseEnter={() => setHoveredField("phone")}
            onMouseLeave={() => setHoveredField(null)}
          >
            <div className={`w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
              hoveredField === "phone" ? "bg-accent/20 scale-110 rotate-3" : ""
            }`}>
              <Phone className={`w-5 h-5 text-accent transition-transform duration-300 ${
                hoveredField === "phone" ? "scale-110 animate-pulse" : ""
              }`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                Téléphone
              </p>
              <a
                href={`tel:${phoneClean}`}
                className="inline-flex items-center gap-2 text-base text-foreground hover:text-accent transition-all duration-300 font-semibold group/link"
              >
                {location.phone}
                <ExternalLink className="w-4 h-4 opacity-0 group-hover/link:opacity-100 transition-opacity duration-300 transform group-hover/link:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Fax */}
          <div 
            className="flex items-start gap-4 transition-all duration-200 hover:translate-x-1"
            onMouseEnter={() => setHoveredField("fax")}
            onMouseLeave={() => setHoveredField(null)}
          >
            <div className={`w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
              hoveredField === "fax" ? "bg-accent/20 scale-110 rotate-3" : ""
            }`}>
              <Printer className={`w-5 h-5 text-accent transition-transform duration-300 ${
                hoveredField === "fax" ? "scale-110" : ""
              }`} />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                Fax
              </p>
              <p className="text-base text-foreground group-hover:text-primary transition-colors duration-300">
                {location.fax}
              </p>
            </div>
          </div>

          {/* VAT (if available) */}
          {location.vat && (
            <div 
              className="flex items-start gap-4 transition-all duration-200 hover:translate-x-1"
              onMouseEnter={() => setHoveredField("vat")}
              onMouseLeave={() => setHoveredField(null)}
            >
              <div className={`w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                hoveredField === "vat" ? "bg-accent/20 scale-110 rotate-3" : ""
              }`}>
                <Building2 className={`w-5 h-5 text-accent transition-transform duration-300 ${
                  hoveredField === "vat" ? "scale-110" : ""
                }`} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-muted-foreground mb-2 uppercase tracking-wide">
                  TVA
                </p>
                <p className="text-base text-foreground font-mono group-hover:text-primary transition-colors duration-300 tracking-wide">
                  {location.vat}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
}

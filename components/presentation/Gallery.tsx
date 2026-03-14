"use client";

import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import Image from "next/image";
import Link from "next/link";
import { PLACEHOLDER_BUILDING_IMAGE } from "@/lib/site";
import { ArrowRight } from "lucide-react";

export default function Gallery() {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="py-16 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column - Image with Overlays */}
          <Reveal>
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-accent/10">
              {!imageError && (
                <Image
                  src={PLACEHOLDER_BUILDING_IMAGE}
                  alt="Bâtiment Comarden"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  onError={() => setImageError(true)}
                />
              )}
              {/* Fallback gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/20 flex items-center justify-center ${imageError ? 'z-10' : '-z-10'}`}>
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg className="w-12 h-12 text-primary/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <p className="text-primary/60 font-semibold">Comarden</p>
                </div>
              </div>
              
              {/* Yellow Overlay Card - Bottom Left */}
              <div className="absolute bottom-6 left-6 bg-accent rounded-lg p-4 sm:p-6 shadow-lg">
                <div className="text-4xl sm:text-5xl font-bold text-primary mb-1">
                  1977
                </div>
                <div className="text-sm sm:text-base font-medium text-primary/80">
                  Année de fondation
                </div>
              </div>

              {/* White Overlay Card - Bottom Right */}
              <div className="absolute bottom-6 right-6 bg-white rounded-lg p-4 sm:p-6 shadow-lg max-w-[200px]">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Tagline
                </div>
                <div className="text-base sm:text-lg font-bold text-primary leading-tight">
                  &quot;Vous couvre&quot;
                  <br />
                  depuis 1977&quot;
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right Column - Text Content */}
          <Reveal delay={100}>
            <div className="space-y-6">
              {/* Eyebrow */}
              <div className="text-sm font-semibold text-accent uppercase tracking-wider">
                Notre Histoire
              </div>

              {/* Main Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight">
                Une entreprise familiale, une expertise reconnue
              </h2>

              {/* Paragraphs */}
              <div className="space-y-4 text-muted-foreground leading-relaxed">
                <p>
                  Fondée en 1977 par Serge Fernandez et Robert Golinvaux à
                  Bertrix, Comarden a débuté avec l&apos;importation
                  d&apos;ardoises naturelles espagnoles pour le Benelux.
                </p>
                <p>
                  Au fil des décennies, l&apos;entreprise s&apos;est diversifiée
                  : stockage de tôles profilées en acier, création d&apos;un
                  atelier de façonnage métallique, puis expansion vers Naninne à
                  la fin des années 90 sous l&apos;impulsion d&apos;Olivier,
                  fils des fondateurs.
                </p>
                <p>
                  Aujourd&apos;hui, Comarden est un fournisseur complet en
                  matériaux de toiture, isolation et charpente, servant les
                  professionnels de toute la Wallonie et Bruxelles avec une
                  flotte de camions-grues.
                </p>
              </div>

              {/* CTA Link */}
              <Link
                href="/presentation"
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-accent transition-colors group mt-6"
              >
                Rencontrer notre équipe
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

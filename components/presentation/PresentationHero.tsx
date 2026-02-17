"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

export default function PresentationHero() {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="py-16 lg:py-28 bg-primary text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Text Content */}
          <Reveal>
            <div className="max-w-3xl">
              <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-4">
                Depuis 1977
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Notre histoire
              </h1>
              <p className="text-lg sm:text-xl text-white/80 leading-relaxed">
                Fondée en 1977 à Bertrix, Comarden est devenue un acteur majeur de la
                distribution de matériaux de construction en Wallonie. De l'ardoise naturelle
                à nos débuts jusqu'à notre expertise actuelle, découvrez notre parcours.
              </p>
            </div>
          </Reveal>

          {/* Boss Photo - Bottom Right, Subtle and Professional */}
          <Reveal delay={100}>
            <div className="absolute right-12 sm:right-16 lg:right-20 bottom-0 lg:bottom-2 transform translate-y-8 lg:translate-y-12">
              <div className="relative w-40 sm:w-44 lg:w-52">
                {!imageError ? (
                  <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg border-2 border-white/10">
                    <Image
                      src="/images/presentation/boss.jpg"
                      alt="Dirigeant de Comarden"
                      fill
                      className="object-cover object-top"
                      style={{ objectPosition: 'center 20%' }}
                      sizes="(max-width: 640px) 160px, (max-width: 1024px) 176px, 208px"
                      onError={() => setImageError(true)}
                    />
                  </div>
                ) : (
                  <div className="relative aspect-square rounded-lg overflow-hidden shadow-lg bg-white/5 border-2 border-white/10 flex items-center justify-center">
                    <svg
                      className="w-8 h-8 text-white/20"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

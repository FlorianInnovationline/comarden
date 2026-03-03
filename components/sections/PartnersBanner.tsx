"use client";

import Image from "next/image";

const PARTNERS: { name: string; logo?: string }[] = [
  { name: "ELEVATE", logo: "elevate-logo.png" },
  { name: "SOPREMA", logo: "soprema-logo.png" },
  { name: "TYVEK (Dupont)" },
  { name: "Floratoit" },
  { name: "STACBOND", logo: "stacbond-logo.png" },
  { name: "Velux", logo: "velux-logo.png" },
  { name: "Faynot" },
  { name: "Steico", logo: "steico-logo.png" },
  { name: "Wienerberger", logo: "wienenberger-logo.png" },
  { name: "URSA", logo: "ursa-by-etex-logo.png" },
  { name: "TERREAL", logo: "terreal-logo.png" },
  { name: "La Bania", logo: "la-bana-logo.png" },
  { name: "Cedral", logo: "cedral-logo.png" },
  { name: "Derbigum", logo: "derbigum-logo.png" },
  { name: "Unilin", logo: "unilin-logo.png" },
];

export default function PartnersBanner() {
  const duplicatedPartners = [...PARTNERS, ...PARTNERS];

  return (
    <section className="py-3 lg:py-4 overflow-hidden border-y border-slate-100/60">
      <div className="w-full">
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none" />

          <div className="flex animate-scroll-slow gap-12 lg:gap-16 xl:gap-20 px-8 items-center">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center h-8 lg:h-10"
              >
                {partner.logo ? (
                  <Image
                    src={`/images/logos/${partner.logo}`}
                    alt={partner.name}
                    width={120}
                    height={40}
                    className="h-8 w-auto object-contain object-center lg:h-10 opacity-80 hover:opacity-100 transition-opacity duration-300"
                  />
                ) : (
                  <span className="text-base lg:text-lg xl:text-xl font-bold text-slate-500 hover:text-primary transition-colors duration-300 whitespace-nowrap tracking-tight">
                    {partner.name}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

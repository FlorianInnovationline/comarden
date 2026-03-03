"use client";

import Image from "next/image";

const LOGOS = [
  "ardoisieres-de-fonsagrada-logo.png",
  "cedral-logo.png",
  "derbigum-logo.png",
  "dimos-logo.png",
  "elevate-logo.png",
  "etanco-logo.png",
  "industrial-distribution-logo.png",
  "joriside-logo.png",
  "la-bana-logo.png",
  "soprema-logo.png",
  "stackbond-logo.png",
  "steico-logo.png",
  "strato-grip-logo.png",
  "terreal-logo.png",
  "unilin-logo.png",
  "ursa-by-etex-logo.png",
  "velux-logo.png",
  "wienenberger-logo.png",
  "skylux-logo.png",
];

function logoAlt(filename: string): string {
  return filename.replace(/-logo\.png$/, "").replace(/-/g, " ");
}

export default function PartnersBanner() {
  const duplicated = [...LOGOS, ...LOGOS];

  return (
    <section className="py-4 lg:py-5 overflow-hidden border-y border-slate-100/80 bg-slate-50/30">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 lg:w-28 bg-gradient-to-r from-slate-50/30 via-slate-50/30 to-transparent z-10 pointer-events-none" />
        <div className="flex animate-scroll-slow gap-14 lg:gap-20 xl:gap-24 px-6 lg:px-10 items-center min-h-[3rem] lg:min-h-[3.5rem]">
          {duplicated.map((logo, index) => (
            <div
              key={`${logo}-${index}`}
              className="flex-shrink-0 flex items-center justify-center h-7 lg:h-9"
            >
              <Image
                src={`/images/logos/${logo}`}
                alt={logoAlt(logo)}
                width={140}
                height={48}
                className="h-7 w-auto max-w-[120px] lg:h-9 lg:max-w-[140px] object-contain object-center opacity-70 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-20 lg:w-28 bg-gradient-to-l from-slate-50/30 via-slate-50/30 to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}

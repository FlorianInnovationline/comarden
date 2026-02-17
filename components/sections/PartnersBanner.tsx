"use client";

export default function PartnersBanner() {
  const partners = [
    "ELEVATE",
    "SOPREMA",
    "TYVEK (Dupont)",
    "Floratoit",
    "Stactbond",
    "Velux",
    "Faynot",
    "Steico",
    "Wienerbergher",
    "URSA",
    "TERREAL",
    "Sold John",
    "Europizarras",
    "La Bania",
  ];

  // Duplicate partners for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-3 lg:py-4 overflow-hidden border-y border-slate-100/60">
      <div className="w-full">
        {/* Scrolling container */}
        <div className="relative">
          {/* Gradient fade on left */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none" />
          
          {/* Scrolling logos - NO BOXES, just clean text */}
          <div className="flex animate-scroll-slow gap-12 lg:gap-16 xl:gap-20 px-8">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner}-${index}`}
                className="flex-shrink-0 flex items-center justify-center"
              >
                <span className="text-base lg:text-lg xl:text-xl font-bold text-slate-500 hover:text-primary transition-colors duration-300 whitespace-nowrap tracking-tight">
                  {partner}
                </span>
              </div>
            ))}
          </div>

          {/* Gradient fade on right */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none" />
        </div>
      </div>
    </section>
  );
}

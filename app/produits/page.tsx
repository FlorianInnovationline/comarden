import type { Metadata } from "next";
import CategoryGrid from "@/components/produits/CategoryGrid";
import AdviceBlock from "@/components/produits/AdviceBlock";
import BrandPartners from "@/components/produits/BrandPartners";
import PartnersBanner from "@/components/sections/PartnersBanner";
import CTACompact from "@/components/sections/CTA";
import Reveal from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Produits - Comarden",
  description: "Découvrez notre gamme complète de matériaux de construction.",
};

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default function ProduitsPage() {
  return (
    <div className="pt-20">
      {/* Page Hero */}
      <section className="relative py-12 sm:py-16 lg:py-20 xl:py-28 bg-primary text-white overflow-hidden">
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a2f4a] via-primary to-[#2B4162]" />
          {/* Animated gradient orbs */}
          <div 
            className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(245,192,0,0.4) 0%, transparent 70%)",
              top: "10%",
              right: "-10%",
              animation: "pulse-slow 8s ease-in-out infinite",
            }}
          />
          <div 
            className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-15"
            style={{
              background: "radial-gradient(circle, rgba(245,192,0,0.3) 0%, transparent 70%)",
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

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <span className="flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                  <span className="animate-ping absolute inline-flex h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-accent"></span>
                </span>
                <span className="text-accent font-medium tracking-wide uppercase text-xs sm:text-sm">
                  Matériaux de qualité
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight">
                Nos produits
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
                Une gamme complète de matériaux de construction pour tous vos
                projets de toiture, charpente, isolation et façades.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-8 sm:py-12 lg:py-16 xl:py-20 bg-gradient-to-b from-white via-neutral/20 to-white relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-6 sm:mb-8 lg:mb-12">
              <div className="inline-flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center shadow-lg">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary tracking-tight">
                  Nos catégories de produits
                </h2>
              </div>
              <p className="text-xs sm:text-sm lg:text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed px-2">
                Découvrez notre sélection de matériaux de qualité pour tous vos besoins
              </p>
            </div>
          </Reveal>
          <CategoryGrid />
        </div>
      </section>

      <PartnersBanner />

      <BrandPartners />

      <AdviceBlock />

      <CTACompact />
    </div>
  );
}

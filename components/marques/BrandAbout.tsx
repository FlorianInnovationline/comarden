import type { BrandConfig } from "@/lib/brands/config";
import Reveal from "@/components/ui/Reveal";
import BrandLogo from "./BrandLogo";

/**
 * "Qui est <brand>" - full-width identity section with the brand logo on top.
 */
export default function BrandAbout({ brand }: { brand: BrandConfig }) {
  return (
    <section className="bg-[var(--brand-bg)] py-16 sm:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="mb-6" style={{ color: "var(--brand-dark)" }}>
            <BrandLogo
              name={brand.name}
              logo={brand.logo}
              imgClassName="h-16 sm:h-20 lg:h-24 w-auto object-contain"
              textClassName="text-3xl sm:text-4xl font-extrabold tracking-tight"
            />
          </div>
          <div className="flex items-center gap-3 mb-5">
            <span className="h-1.5 w-10 rounded-full bg-[var(--brand-primary)]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[var(--brand-accent)]">
              La marque
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--brand-dark)] tracking-tight mb-6">
            {brand.aboutTitle}
          </h2>
          <p className="text-base sm:text-lg text-[var(--brand-dark)]/75 leading-relaxed">
            {brand.aboutText}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

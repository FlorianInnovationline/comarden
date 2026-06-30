import type { BrandConfig } from "@/lib/brands/config";
import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

/**
 * "Qui est <brand>" - 2-column identity section. Uses a real photo when
 * `aboutImage` is set, otherwise a branded decorative panel (never a broken img).
 */
export default function BrandAbout({ brand }: { brand: BrandConfig }) {
  return (
    <section className="bg-[var(--brand-bg)] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <Reveal>
            <div>
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
            </div>
          </Reveal>

          <Reveal delay={120}>
            {brand.aboutImage ? (
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5">
                <Image
                  src={brand.aboutImage}
                  alt={brand.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div
                className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl ring-1 ring-black/5 flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, var(--brand-primary) 0%, var(--brand-accent) 100%)",
                }}
              >
                <span className="text-[var(--brand-on-primary)] text-5xl sm:text-6xl font-extrabold tracking-tight opacity-90 px-6 text-center">
                  {brand.name}
                </span>
                <div
                  className="absolute -bottom-10 -right-10 w-48 h-48 rounded-full opacity-30"
                  style={{ background: "var(--brand-dark)" }}
                />
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

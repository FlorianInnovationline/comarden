import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { allBrands } from "@/lib/brands/config";
import BrandLogo from "@/components/marques/BrandLogo";
import Reveal from "@/components/ui/Reveal";

/**
 * "Nos marques" — brand logo strip on /shop. Each card links to the brand's
 * dedicated /marques/<slug> page. Logos fall back to a branded wordmark.
 */
export default function ShopBrandsSection() {
  const brands = allBrands();

  return (
    <section className="py-10 sm:py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary tracking-tight mb-3">
              Nos marques
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto">
              Découvrez les grandes marques que nous distribuons — cliquez pour explorer chaque univers.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {brands.map((b, i) => (
            <Reveal key={b.slug} delay={i * 60}>
              <Link href={`/marques/${b.slug}`} className="group block" aria-label={b.name}>
                <div
                  className="relative h-24 sm:h-28 rounded-2xl bg-white ring-1 ring-border/60 flex items-center justify-center p-4 overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ color: b.colors.dark }}
                >
                  <BrandLogo
                    name={b.name}
                    logo={b.logo}
                    imgClassName="max-h-12 w-auto object-contain"
                    textClassName="text-base sm:text-lg font-extrabold tracking-tight text-center leading-tight"
                  />
                  <span
                    className="absolute bottom-0 left-0 right-0 h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"
                    style={{ backgroundColor: b.colors.primary }}
                  />
                </div>
                <p className="mt-2 flex items-center justify-center gap-1 text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                  Découvrir
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

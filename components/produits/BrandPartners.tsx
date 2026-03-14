import Image from "next/image";
import Reveal from "@/components/ui/Reveal";

const brands = [
  {
    name: "URSA",
    logo: "/images/logos/ursa-by-etex-logo.png",
    description: "Isolation thermique et phonique pour murs, toitures et sols",
  },
  {
    name: "SOPREMA",
    logo: "/images/logos/soprema-logo.png",
    description:
      "Membranes d&apos;étanchéité, ALSAN FLASHING et produits pour toitures plates et inclinées",
  },
  {
    name: "FAYNOT",
    logo: null,
    description:
      "Systèmes brevetés de piliers et fixations pour isolation par l&apos;extérieur",
  },
  {
    name: "FLORATOIT",
    logo: null,
    description:
      "Toitures végétalisées pour confort et performance énergétique",
  },
  {
    name: "WIENENBERGER",
    logo: "/images/logos/wienenberger-logo.png",
    description: "Tuiles et briques pour constructions solides et durables",
  },
  {
    name: "TERREAL",
    logo: "/images/logos/terreal-logo.png",
    description:
      "Produits et accessoires pour revêtements de toitures",
  },
  {
    name: "ETANCO",
    logo: "/images/logos/etanco-logo.png",
    description:
      "Fixations, attaches et solutions de raccordement pour toitures et structures",
  },
  {
    name: "STACBOND",
    logo: "/images/logos/stackbond-logo.png",
    description: "Panneaux composites pour façades et bardages innovants",
  },
  {
    name: "STEICO",
    logo: "/images/logos/steico-logo.png",
    description: "Isolation écologique en bois et panneaux structurels",
  },
  {
    name: "DERBIGUM",
    logo: "/images/logos/derbigum-logo.png",
    description:
      "Membranes bitumineuses pour étanchéité de toitures plates et terrasses",
  },
  {
    name: "ELEVATE",
    logo: "/images/logos/elevate-logo.png",
    description: "Systèmes d&apos;étanchéité EPDM haute performance",
  },
  {
    name: "CEDRAL",
    logo: "/images/logos/cedral-logo.png",
    description:
      "Bardages en fibre-ciment pour façades durables et esthétiques",
  },
  {
    name: "JORISIDE",
    logo: "/images/logos/joriside-logo.png",
    description:
      "Solutions de ventilation et finitions pour toitures et murs",
  },
  {
    name: "STRATO GRIP",
    logo: "/images/logos/strato-grip-logo.png",
    description: "Colles de contact multi-matériaux haute performance",
  },
  {
    name: "TYVEK DUPONT",
    logo: null,
    description: "Membranes et mastics pour étanchéité à l'air",
  },
] as const;

export default function BrandPartners() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-white via-neutral/20 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary tracking-tight mb-4">
              Nos marques partenaires pour des projets de qualité
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Chez Comarden, nous travaillons avec des marques européennes et
              internationales reconnues pour leur fiabilité, durabilité et
              performance&nbsp;:
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {brands.map((brand, index) => (
            <Reveal key={brand.name} delay={index * 50}>
              <div className="bg-white border border-border rounded-xl p-4 sm:p-5 flex flex-col items-center text-center h-full shadow-sm hover:shadow-md transition-shadow">
                <div className="h-10 flex items-center justify-center mb-3">
                  {brand.logo ? (
                    <Image
                      src={brand.logo}
                      alt={`Logo ${brand.name}`}
                      width={120}
                      height={40}
                      className="h-10 w-auto object-contain"
                    />
                  ) : (
                    <span className="text-lg font-bold text-primary/60">
                      {brand.name}
                    </span>
                  )}
                </div>
                <p className="font-bold text-sm sm:text-base text-primary">
                  {brand.name}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
                  {brand.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

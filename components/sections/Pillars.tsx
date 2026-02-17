import { Package, Scissors, Truck, ArrowRight } from "lucide-react";
import Link from "next/link";

const pillars = [
  {
    icon: Package,
    title: "Produits",
    description:
      "Toiture, charpente bois, isolation, toitures vertes, tôles, panneaux sandwich pour toitures et façades.",
    href: "/produits",
  },
  {
    icon: Scissors,
    title: "Façonnage",
    description: "Découpe et pliage zinc/acier, découpe bois sur mesure, EPDM à la coupe. Un service précis et rapide.",
    href: "/services/faconnage",
  },
  {
    icon: Truck,
    title: "Transport",
    description:
      "Livraison avec camion-grue sur tous vos chantiers en Wallonie. Manipulation sécurisée de vos matériaux.",
    href: "/services/transport",
  },
]

export default function Pillars() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">Une approche globale</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Des produits de qualité, un façonnage précis et une livraison soignée
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar) => (
            <Link
              key={pillar.title}
              href={pillar.href}
              className="group relative bg-secondary/50 p-8 lg:p-10 rounded-sm hover:bg-secondary transition-all duration-300"
            >
              <div className="w-12 h-12 bg-primary rounded-sm flex items-center justify-center mb-6">
                <pillar.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{pillar.title}</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">{pillar.description}</p>
              <span className="inline-flex items-center text-sm font-medium text-primary group-hover:gap-3 gap-2 transition-all">
                En savoir plus
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Check } from "lucide-react";

const benefits = [
  { title: "Stock permanent", description: "Large gamme disponible immédiatement." },
  { title: "Rapport qualité-prix", description: "Des matériaux de qualité au meilleur prix." },
  { title: "Produits sélectionnés", description: "Fournisseurs et marques rigoureusement choisis." },
  { title: "Expertise livraison", description: "Chauffeurs formés à la manipulation." },
  { title: "Préparation soignée", description: "Chaque commande préparée avec soin." },
  { title: "Équipe de spécialistes", description: "Conseils d'experts pour vos projets." },
  { title: "Façonnage sur mesure", description: "Découpe et pliage selon vos plans." },
  { title: "Solidité financière", description: "Un partenaire stable et fiable." },
];

export default function Benefits() {
  return (
    <section className="py-20 lg:py-28 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-6 text-balance">
              Pourquoi choisir Comarden ?
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              Depuis 1977, nous accompagnons les professionnels de la construction en Belgique francophone avec des
              matériaux de qualité et un service irréprochable.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex gap-3 p-4 bg-white/5 rounded-sm">
                <div className="flex-shrink-0 w-6 h-6 bg-accent rounded-full flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-white mb-0.5">{benefit.title}</h3>
                  <p className="text-sm text-white/70">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

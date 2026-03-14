import Reveal from "@/components/ui/Reveal";

const sections = [
  {
    id: "intro",
    heading: "h2" as const,
    title: "Spécialiste des ardoises naturelles et matériaux de toiture en Belgique",
    content:
      "Depuis plus de 45 ans, Comarden accompagne les professionnels de la toiture et de la couverture en Belgique et dans le Benelux. Spécialisée à l\u2019origine dans l\u2019importation d\u2019ardoises naturelles d\u2019Espagne, l\u2019entreprise s\u2019est progressivement imposée comme un fournisseur complet de matériaux de toiture pour couvreurs, ardoisiers et négociants.",
    year: null,
    bg: "bg-white",
  },
  {
    id: "1977",
    heading: "h2" as const,
    title: "1977 : Création de Comarden à Bertrix",
    content:
      "Le 13 mai 1977, Serge Fernandez et Robert Golinvaux fondent Comarden à Bertrix, en province de Luxembourg. L\u2019entreprise se spécialise immédiatement dans l\u2019importation et la distribution d\u2019ardoises naturelles espagnoles destinées au marché du Benelux. À cette époque, Comarden devient la deuxième entreprise belge à proposer des ardoises naturelles provenant d\u2019Espagne, un matériau reconnu pour sa durabilité, sa qualité et sa longévité pouvant atteindre plus de 100 ans sur les toitures.",
    year: "1977",
    bg: "bg-slate-50",
  },
  {
    id: "fournisseur",
    heading: "h3" as const,
    title: "Un fournisseur de référence pour les couvreurs et professionnels de la toiture",
    content:
      "Dès ses débuts, Comarden se positionne comme un partenaire privilégié des couvreurs, ardoisiers et négociants en matériaux de construction. La gamme de produits s\u2019étend rapidement à :",
    year: null,
    bg: "bg-white",
    products: [
      "Tuiles en terre cuite pour toiture",
      "Produits de zinguerie et évacuation des eaux",
      "Accessoires de couverture et de fixation",
      "Solutions complètes pour toitures inclinées",
    ],
  },
  {
    id: "1980s",
    heading: "h2" as const,
    title: "Fin des années 80 : Développement des tôles profilées et de l\u2019acier pour toiture",
    content:
      "À la fin des années 1980, Comarden identifie le potentiel des tôles profilées en acier pour toitures agricoles et industrielles. L\u2019entreprise constitue un stock important et met en place un banc de coupe pour l\u2019acier, un atelier de façonnage et des solutions sur mesure. Comarden élargit ensuite son offre avec des panneaux sandwich métalliques pour bâtiments industriels, agricoles et commerciaux.",
    year: "1988",
    bg: "bg-slate-50",
  },
  {
    id: "1990s",
    heading: "h2" as const,
    title: "Fin des années 90 : Ouverture du site de Naninne près de Namur",
    content:
      "À la fin des années 1990, le site de Naninne, situé dans le zoning industriel près de Namur, voit le jour. Cette implantation permet de se rapprocher des professionnels de la toiture en région namuroise, d\u2019améliorer la logistique et de développer davantage les solutions pour toitures plates.",
    year: "1998",
    bg: "bg-white",
  },
  {
    id: "aujourdhui",
    heading: "h2" as const,
    title: "Aujourd\u2019hui : Comarden, une référence en Wallonie et à Bruxelles",
    content:
      "Aujourd\u2019hui, Comarden s\u2019impose comme une référence incontournable en Wallonie et à Bruxelles pour les professionnels de la toiture. Forte de plus de 45 ans d\u2019expérience, l\u2019entreprise accompagne au quotidien couvreurs, ardoisiers et entreprises du bâtiment grâce à un conseil technique pointu et des solutions adaptées à chaque chantier.",
    year: "2024",
    bg: "bg-slate-50",
  },
  {
    id: "formation",
    heading: "h3" as const,
    title: "Un centre de formation unique pour les professionnels",
    content:
      "Comarden dispose d\u2019un centre de formation dédié aux professionnels de la toiture, actif tout au long de l\u2019année. En plus des formations programmées, Comarden propose des formations sur mesure, organisées à la demande, adaptées aux besoins spécifiques des entreprises.",
    year: null,
    bg: "bg-white",
  },
  {
    id: "innovation",
    heading: "h3" as const,
    title: "L\u2019innovation au cœur de l\u2019ADN Comarden",
    content:
      "Pour conserver une longueur d\u2019avance sur le marché, Comarden travaille avec des marques reconnues et parfois distribuées en exclusivité. L\u2019entreprise s\u2019appuie sur un département recherche et développement qui analyse en permanence les nouvelles solutions techniques, les matériaux innovants et les évolutions du secteur.",
    year: null,
    bg: "bg-slate-50",
  },
] as const;

export default function HistoryContent() {
  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-12 lg:mb-16">
            <span className="text-sm font-semibold text-accent uppercase tracking-wider">
              Notre histoire
            </span>
            <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-primary tracking-tight">
              Plus de 45 ans d&apos;expertise en toiture
            </h2>
          </div>
        </Reveal>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-4 sm:left-6 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-0">
            {sections.map((section, index) => (
              <Reveal key={section.id} delay={index * 100}>
                <div className={`relative ${section.bg} py-10 sm:py-12 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8`}>
                  <div className="flex gap-6 sm:gap-8">
                    {/* Timeline marker */}
                    <div className="relative z-10 flex flex-col items-center flex-shrink-0 w-8 sm:w-12">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          section.year
                            ? "bg-accent border-accent"
                            : "bg-white border-accent/50"
                        }`}
                      />
                      {section.year && (
                        <span className="mt-2 text-xs sm:text-sm font-bold text-accent whitespace-nowrap">
                          {section.year}
                        </span>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      {section.heading === "h2" ? (
                        <h2 className="text-xl sm:text-2xl font-bold text-primary mb-3 leading-tight">
                          {section.title}
                        </h2>
                      ) : (
                        <h3 className="text-lg sm:text-xl font-semibold text-primary/80 mb-3 leading-tight">
                          {section.title}
                        </h3>
                      )}

                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {section.content}
                      </p>

                      {"products" in section && section.products && (
                        <div className="mt-4 grid sm:grid-cols-2 gap-3">
                          {section.products.map((product) => (
                            <div
                              key={product}
                              className="flex items-start gap-2.5 rounded-lg border border-border/60 bg-white p-3 text-sm text-primary/90"
                            >
                              <span className="mt-0.5 h-2 w-2 flex-shrink-0 rounded-full bg-accent" />
                              {product}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

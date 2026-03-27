import { Phone, Users, Package, Award, Clock, Shield } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const commitments = [
  {
    icon: Phone,
    title: "Réponse rapide",
    description: "Un expert au bout du fil pour répondre à toutes vos questions techniques.",
  },
  {
    icon: Users,
    title: "Accompagnement pro",
    description: "Nous vous tenons informés des nouveautés et évolutions réglementaires.",
  },
  {
    icon: Package,
    title: "Stock conséquent",
    description: "Plus de 5000 références disponibles pour répondre rapidement à vos besoins.",
  },
  {
    icon: Award,
    title: "Qualité sélectionnée",
    description: "Des gammes rigoureusement testées pour garantir performance et durabilité.",
  },
  {
    icon: Clock,
    title: "Délais respectés",
    description: "Nous nous engageons sur des délais réalistes et des prix transparents.",
  },
  {
    icon: Shield,
    title: "Partenaire fiable",
    description: "Une entreprise solide financièrement, à vos côtés sur le long terme.",
  },
];

export default function CommitmentsGrid() {
  return (
    <section className="py-14 md:py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <span className="inline-block text-sm font-semibold text-accent uppercase tracking-wider mb-4">
              Nos engagements
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Pourquoi choisir Comarden ?
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto">
              Des engagements concrets pour une collaboration sereine et efficace.
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {commitments.map((commitment, index) => {
            const Icon = commitment.icon;
            return (
              <Reveal key={commitment.title} delay={index * 100}>
                <div className="group p-5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-accent/30 transition-all duration-300 rounded-lg">
                  <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center mb-3 group-hover:bg-accent/30 transition-colors duration-300">
                    <Icon className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-white mb-1.5">
                    {commitment.title}
                  </h3>
                  <p className="text-xs text-white/60 leading-relaxed">
                    {commitment.description}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

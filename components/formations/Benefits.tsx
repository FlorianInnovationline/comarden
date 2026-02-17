import Reveal from "@/components/ui/Reveal";
import { Award, Users, Clock, CheckCircle2 } from "lucide-react";

const benefits = [
  {
    icon: Award,
    title: "Reconnues Constructiv",
    description: "Formations accréditées par l'organisme paritaire pour la formation dans la construction.",
  },
  {
    icon: Users,
    title: "Formateurs experts",
    description: "Formations dispensées par des professionnels certifiés et expérimentés.",
  },
  {
    icon: Clock,
    title: "Formations pratiques",
    description: "Approche pratique avec démonstrations, ateliers et études de cas réels.",
  },
  {
    icon: CheckCircle2,
    title: "Certification",
    description: "Attestation de formation délivrée à l'issue de chaque session.",
  },
];

export default function FormationsBenefits() {
  return (
    <section className="py-12 lg:py-16 bg-neutral/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight mb-3">
              Pourquoi choisir nos formations ?
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Des formations de qualité reconnues par les professionnels du secteur.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <Reveal key={benefit.title} delay={index * 100}>
                <div className="text-center p-6 bg-white rounded-sm border border-border hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-accent" />
                  </div>
                  <h3 className="text-base font-semibold text-primary mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {benefit.description}
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

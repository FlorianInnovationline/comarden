"use client";

import { MessageSquare, ClipboardList, Search, Wrench, Truck } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

const steps = [
  {
    number: "01",
    title: "Questions / Devis",
    description:
      "Vous nous contactez avec une question ou une demande technique. Notre équipe vous apporte des réponses claires et précises, pour résoudre vos soucis ou préparer un devis adapté à votre chantier.",
    icon: MessageSquare,
  },
  {
    number: "02",
    title: "Définition des besoins",
    description:
      "Grâce à nos conseils et propositions personnalisées, vous définissez vos besoins exacts et les contraintes de votre chantier. Chaque détail compte pour garantir un résultat parfait.",
    icon: ClipboardList,
  },
  {
    number: "03",
    title: "Sélection & alternatives",
    description:
      "Ensemble, nous identifions les matériaux les mieux adaptés à votre projet. Nous vous proposons également des alternatives techniques et tarifaires, tout en assurant la qualité optimale pour votre chantier.",
    icon: Search,
  },
  {
    number: "04",
    title: "Façonnage / Découpe / Préparation",
    description:
      "Vos matériaux sont façonnés, découpés et préparés avec soin. Vous pouvez venir les retirer dans l&apos;un de nos sites ou les recevoir directement sur votre chantier, selon votre convenance.",
    icon: Wrench,
  },
  {
    number: "05",
    title: "Livraison",
    description:
      "Nous livrons vos matériaux dans les délais convenus, avec une manutention sécurisée et un soin particulier à la dépose. Nous réfléchissons à l&apos;ordre d&apos;utilisation des matériaux pour vous faciliter le chantier. Rien n&apos;est laissé au hasard.",
    icon: Truck,
  },
];

export default function ClientJourney() {
  return (
    <section className="py-20 md:py-28 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary leading-tight mb-4">
              Votre parcours client chez Comarden
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              De votre première question à la livraison du matériel là où vous
              le souhaitez, nous vous accompagnons à chaque étape.
            </p>
          </div>
        </Reveal>

        <div className="relative max-w-3xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <Reveal key={step.number} delay={index * 150}>
                <div className="relative flex gap-6 md:gap-10 pb-12 last:pb-0">
                  {/* Timeline column */}
                  <div className="relative flex flex-col items-center">
                    <div className="w-14 h-14 rounded-full bg-white border-2 border-accent/30 flex items-center justify-center shadow-md z-10 shrink-0">
                      <Icon className="w-6 h-6 text-accent" strokeWidth={1.5} />
                    </div>
                    {!isLast && (
                      <div className="w-0.5 grow bg-accent/30 mt-2" />
                    )}
                  </div>

                  {/* Content card */}
                  <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-border/40 flex-1 group hover:shadow-md transition-shadow duration-300">
                    <span className="text-4xl font-light text-accent/25 leading-none">
                      {step.number}
                    </span>
                    <h3 className="text-xl md:text-2xl font-bold text-primary mt-2 mb-3 group-hover:text-accent transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

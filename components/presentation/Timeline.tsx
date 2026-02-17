import { timelineItems } from "@/lib/presentation";
import * as Icons from "lucide-react";
import { type LucideIcon } from "lucide-react";
import Reveal from "@/components/ui/Reveal";

export default function Timeline() {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight mb-3">
              Notre parcours
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Plus de 45 ans d'histoire et d'évolution
            </p>
          </div>
        </Reveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

          <div className="space-y-8">
            {timelineItems.map((item, index) => {
              const IconComponent =
                (Icons[item.icon as keyof typeof Icons] as LucideIcon) || Icons.Circle;

              return (
                <Reveal key={item.year} delay={index * 150}>
                  <div className="relative flex gap-6">
                    {/* Icon */}
                    <div className="hidden md:flex flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full items-center justify-center relative z-10">
                      <IconComponent className="w-6 h-6 text-accent" strokeWidth={1.5} />
                    </div>

                    {/* Content */}
                    <div className="flex-1 pb-6 md:pb-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-xl font-bold text-accent">{item.year}</span>
                        <h3 className="text-lg font-semibold text-primary">{item.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

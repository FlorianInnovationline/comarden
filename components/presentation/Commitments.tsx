import { commitments } from "@/lib/presentation";
import * as Icons from "lucide-react";
import { type LucideIcon } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Card from "@/components/ui/Card";

export default function Commitments() {
  return (
    <section className="py-16 lg:py-24 bg-neutral/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight mb-4">
              Nos engagements
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Les valeurs qui guident notre action au quotidien
            </p>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {commitments.map((commitment, index) => {
            const IconComponent =
              (Icons[commitment.icon as keyof typeof Icons] as LucideIcon) || Icons.Star;

            return (
              <Reveal key={commitment.title} delay={index * 100}>
                <Card className="text-center h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <div className="w-14 h-14 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <IconComponent className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-2">
                    {commitment.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {commitment.description}
                  </p>
                </Card>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

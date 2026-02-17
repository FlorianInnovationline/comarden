import { stats } from "@/lib/stats";
import Reveal from "@/components/ui/Reveal";
import Card from "@/components/ui/Card";

export default function FactsFigures() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary tracking-tight mb-4">
              En quelques chiffres
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Une expertise reconnue au service de vos projets
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 100}>
              <Card variant="minimal" className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <div className="text-sm font-semibold text-foreground mb-1">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground">
                  {stat.description}
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

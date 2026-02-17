import Reveal from "@/components/ui/Reveal";
import TrainingCard from "./TrainingCard";
import { trainings } from "@/lib/formations";

export default function TrainingsList() {
  return (
    <section className="py-12 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-primary tracking-tight mb-3">
              Nos formations
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Formations pratiques reconnues par Constructiv pour les professionnels du bâtiment.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trainings.map((training, index) => (
            <Reveal key={training.id} delay={index * 100}>
              <TrainingCard training={training} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

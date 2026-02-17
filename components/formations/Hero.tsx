import Reveal from "@/components/ui/Reveal";

export default function FormationsHero() {
  return (
    <section className="py-12 lg:py-16 bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-accent font-semibold text-sm tracking-widest uppercase mb-4">
              Constructiv accrédité
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              Formations professionnelles
            </h1>
            <p className="text-lg text-white/80 max-w-2xl leading-relaxed">
              Développez vos compétences avec nos formations pratiques reconnues
              par Constructiv. Formation dispensée par des experts certifiés.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

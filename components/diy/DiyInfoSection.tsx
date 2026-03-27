"use client";

import { CheckCircle2, Users, Wrench, Package, Truck, Phone, FileText } from "lucide-react";

export default function DiyInfoSection() {
  const services = [
    {
      icon: Wrench,
      title: "Conseil technique personnalisé",
      description: "Nos experts vous accompagnent dans vos choix de matériaux et techniques pour garantir la réussite de votre projet.",
    },
    {
      icon: Package,
      title: "Matériaux professionnels",
      description: "Accès à notre large gamme de produits de qualité professionnelle, disponibles en stock ou sur commande.",
    },
    {
      icon: Truck,
      title: "Livraison adaptée",
      description: "Livraison avec camion-grue pour les gros volumes et accès difficiles, partout en Wallonie.",
    },
    {
      icon: FileText,
      title: "Liste d'achat personnalisée",
      description: "Nous établissons une liste complète des matériaux nécessaires selon les spécificités de votre projet.",
    },
  ];

  const professionalServices = [
    {
      icon: Users,
      title: "Pose complète",
      description: "Nos professionnels réalisent l'ensemble des travaux de A à Z, avec garantie et assurance décennale.",
    },
    {
      icon: Wrench,
      title: "Aide partielle",
      description: "Intervention ciblée sur les parties techniques complexes ou nécessitant un savoir-faire spécifique.",
    },
    {
      icon: Phone,
      title: "Visite & conseils sur place",
      description: "Diagnostic gratuit de votre projet avec recommandations personnalisées et devis détaillé.",
    },
  ];

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-white via-slate-50/30 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main heading */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Comment nous vous aidons
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            Que vous réalisiez vous-même ou que vous fassiez appel à nos professionnels, Comarden vous accompagne à chaque étape.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* DIY Support Section */}
          <div>
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="p-3 bg-accent/10 rounded-xl">
                  <Package className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-primary">
                  Pour les projets DIY
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Vous préférez réaliser vous-même ? Nous vous fournissons les matériaux, les conseils et le support technique nécessaires.
              </p>
            </div>

            <div className="space-y-4">
              {services.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={index}
                    className="group p-5 bg-white rounded-xl border-2 border-slate-200 hover:border-accent/50 hover:shadow-lg transition-all duration-300 animate-fadeIn"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                        <IconComponent className="w-5 h-5 text-accent" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-primary mb-1.5">
                          {service.title}
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Professional Services Section */}
          <div>
            <div className="mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-primary">
                  Services professionnels
                </h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Comarden vous connecte avec les meilleurs professionnels de votre région, sélectionnés pour leurs compétences, leur sérieux et leur fiabilité.
              </p>
            </div>

            <div className="space-y-4">
              {professionalServices.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={index}
                    className="group p-5 bg-white rounded-xl border-2 border-slate-200 hover:border-primary/50 hover:shadow-lg transition-all duration-300 animate-fadeIn"
                    style={{ animationDelay: `${(index + 4) * 0.1}s` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-primary mb-1.5">
                          {service.title}
                        </h4>
                        <p className="text-sm text-slate-600 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 lg:mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center p-8 bg-gradient-to-br from-primary/5 via-accent/5 to-primary/5 rounded-2xl border-2 border-primary/10">
            <div className="text-left sm:text-center">
              <h4 className="text-xl font-bold text-primary mb-2">
                Prêt à démarrer votre projet ?
              </h4>
              <p className="text-slate-600 text-sm sm:text-base">
                Configurez votre projet ci-dessus ou contactez-nous directement
              </p>
            </div>
            <a
              href="tel:061412706"
              className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/20 whitespace-nowrap"
            >
              <Phone className="w-4 h-4 inline mr-2" />
              061 41 27 06
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

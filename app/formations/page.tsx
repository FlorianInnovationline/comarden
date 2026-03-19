"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Award, Clock, CalendarDays, MapPin, ArrowRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Card from "@/components/ui/Card";
import RegistrationCard, { type RegistrationData } from "@/components/formations/RegistrationCard";
import FormationList from "@/components/formations/FormationList";
import DayTimeline from "@/components/formations/DayTimeline";
import SummaryPanel from "@/components/formations/SummaryPanel";
import { FORMATION_MODULES, type FormationModule } from "@/lib/formations";
import { calculateSchedule, type DaySchedule } from "@/lib/dayBuilder";

export default function FormationsPage() {
  const [registrationData, setRegistrationData] = useState<RegistrationData | null>(null);
  const [selectedModules, setSelectedModules] = useState<FormationModule[]>([]);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [schedule, setSchedule] = useState<DaySchedule>({
    placedModules: [],
    remainingHours: 7,
    morningHoursUsed: 0,
    afternoonHoursUsed: 0,
  });

  const handleRegistration = (data: RegistrationData) => {
    setRegistrationData(data);
  };

  const handleAddModule = (module: FormationModule) => {
    const newSelected = [...selectedModules, module];
    setSelectedModules(newSelected);
    const newSchedule = calculateSchedule(newSelected);
    setSchedule(newSchedule);
  };

  const handleRemoveModule = (moduleId: string) => {
    const newSelected = selectedModules.filter((m) => m.id !== moduleId);
    setSelectedModules(newSelected);
    const newSchedule = calculateSchedule(newSelected);
    setSchedule(newSchedule);
  };

  const handleReset = () => {
    setSelectedModules([]);
    setSchedule({
      placedModules: [],
      remainingHours: 7,
      morningHoursUsed: 0,
      afternoonHoursUsed: 0,
    });
  };

  const handleSubmit = () => {
    if (selectedModules.length === 0 || !registrationData) return;

    const payload = {
      user: registrationData,
      selectedModules: selectedModules.map((m) => ({
        id: m.id,
        title: m.title,
        durationHours: m.durationHours,
      })),
      totalHours: 7 - schedule.remainingHours,
      remainingHours: schedule.remainingHours,
      schedule: schedule.placedModules.map((pm) => ({
        moduleId: pm.module.id,
        moduleTitle: pm.module.title,
        startHour: pm.startHour,
        endHour: pm.endHour,
      })),
      createdAtISO: new Date().toISOString(),
    };

    console.log("Formation Day Builder - Payload:", payload);
    setIsConfirmed(true);
  };

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[500px] flex items-center py-12 sm:py-16 lg:py-20 xl:py-28 bg-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920&q=80')" }} />
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(10, 25, 60, 0.78)" }} />
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#1a2f4a]/60 via-primary/40 to-[#2B4162]/60" />
          <div
            className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(245,192,0,0.4) 0%, transparent 70%)",
              top: "10%",
              right: "-10%",
              animation: "pulse-slow 8s ease-in-out infinite",
            }}
          />
          <div
            className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-15"
            style={{
              background: "radial-gradient(circle, rgba(245,192,0,0.3) 0%, transparent 70%)",
              bottom: "0%",
              left: "-5%",
              animation: "pulse-slow 10s ease-in-out infinite reverse",
            }}
          />
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <Reveal>
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/20 flex items-center justify-center">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
                </div>
                <span className="text-accent font-medium tracking-wide uppercase text-xs sm:text-sm">
                  Centre agréé Constructiv
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6 leading-tight">
                Centre de formation
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto">
                Découvrez nos dates de formations programmées. Et parce que chaque entreprise a des besoins spécifiques, nous vous offrons également la possibilité unique d&apos;organiser des <span className="font-semibold text-white">formations à la demande</span>&nbsp;: des journées personnalisées, centrées sur les thématiques qui vous intéressent réellement.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Main Content */}
      {isConfirmed ? (
        /* Confirmation State */
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <Card className="p-8 lg:p-12 max-w-2xl mx-auto text-center">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 className="w-10 h-10 text-green-600" />
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold text-primary mb-4">
                  Demande enregistrée
                </h2>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">
                  Merci. Notre équipe vous contactera sous 24h pour confirmer la disponibilité et
                  finaliser l&apos;inscription.
                </p>
                <p className="text-sm text-muted-foreground">
                  Vous recevrez un email de confirmation à{" "}
                  <span className="font-semibold text-primary">{registrationData?.email}</span>
                </p>
              </Card>
            </Reveal>
          </div>
        </section>
      ) : !registrationData ? (
        /* Registration Step with Formations Preview */
        <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-neutral/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              <div id="inscription">
                <RegistrationCard onSubmit={handleRegistration} />
              </div>
            </Reveal>

            {/* Agenda des formations à venir */}
            <Reveal delay={200}>
              <div className="mt-16 lg:mt-20">
                <h2 className="text-2xl lg:text-3xl font-bold text-primary tracking-tight mb-6">
                  Agenda des formations à venir
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      title: "Journée UNIQUE ARDOISES",
                      date: "Jeudi 26 mars 2026",
                      lieu: "MOREPIRE, Bertrix",
                      horaire: "16h30 – fin",
                      brands: "ATG Ardoises, VERTUOZA, STRATO GRIP, TYVEK",
                    },
                    {
                      title: "JEUDIREDI ETEX Cedral & Equitone",
                      date: "Jeudi 26 mars 2026",
                      lieu: "Naninne + Bertrix",
                      horaire: "15h – 19h",
                    },
                    {
                      title: "PETIT DÉJEUNER SOLID JOHN",
                      date: "Vendredi 22 mai 2026",
                      lieu: "Bertrix",
                      horaire: "7h15 – 11h",
                    },
                    {
                      title: "Journée UNIQUE SOPREMA",
                      date: "Jeudi 28 mai 2026",
                      lieu: "Infos à venir",
                      horaire: "",
                    },
                    {
                      title: "Journée EPDM ELEVATE + Toiture végétale",
                      date: "Jeudi 4 juin 2026",
                      lieu: "Namur",
                      horaire: "",
                    },
                  ].map((evt) => (
                    <Reveal key={evt.title}>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-white rounded-xl border border-slate-200 p-4 sm:p-5 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                            <CalendarDays className="w-5 h-5 text-accent" />
                          </div>
                          <div className="sm:w-40">
                            <p className="text-sm font-semibold text-primary">{evt.date}</p>
                            {evt.horaire && <p className="text-xs text-slate-500">{evt.horaire}</p>}
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-bold text-primary">{evt.title}</h4>
                          <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                            <MapPin className="w-3 h-3" />
                            {evt.lieu}
                          </div>
                          {evt.brands && (
                            <p className="text-[10px] text-primary/50 font-medium mt-1">{evt.brands}</p>
                          )}
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-end">
                          <Link
                            href="#inscription"
                            className="inline-flex items-center justify-center rounded-full bg-accent text-primary font-semibold px-4 py-2 text-xs sm:text-sm hover:bg-accent/90 transition-colors"
                          >
                            Je m&apos;inscris
                          </Link>
                          <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-full border border-primary/20 text-primary font-semibold px-4 py-2 text-xs sm:text-sm hover:bg-primary/5 transition-colors"
                          >
                            Formulaire
                          </Link>
                        </div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Formations Preview Section */}
            <Reveal delay={300}>
              <div className="mt-16 lg:mt-20">
                <h2 className="text-2xl lg:text-3xl font-bold text-primary tracking-tight mb-3 text-center">
                  Construisez votre journée de formation à la carte
                </h2>

                <div className="mb-12 bg-accent/10 border-l-4 border-accent rounded-r-xl px-6 py-5 max-w-3xl mx-auto">
                  <p className="text-base text-primary/90 leading-relaxed">
                    Découvrez nos dates de formations programmées. Et parce que chaque entreprise a des besoins spécifiques, nous vous offrons également la possibilité unique d&apos;organiser des{" "}
                    <span className="font-semibold text-primary">formations à la demande</span>&nbsp;: des journées personnalisées, centrées sur les thématiques qui vous intéressent réellement.
                  </p>
                </div>

                <h2 className="text-2xl lg:text-3xl font-bold text-primary tracking-tight mb-6">
                  Catalogue des formations
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {FORMATION_MODULES.map((module, index) => (
                    <Reveal key={module.id} delay={index * 50}>
                      <Card variant="minimal" className="p-6 hover:shadow-xl transition-all duration-300 group border-0 hover:border-2 hover:border-accent/20 relative overflow-hidden h-full bg-white rounded-xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-xl" />
                        <div className="absolute top-0 right-0 w-16 h-16 bg-accent/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110" />

                        <div className="relative z-10 flex flex-col h-full">
                          <div className="flex-1">
                            <div className="flex items-start gap-3 mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2 flex-wrap">
                                  <h3 className="text-lg font-bold text-primary group-hover:text-accent transition-colors duration-300">
                                    {module.title}
                                  </h3>
                                  {module.tag && (
                                    <span className="px-2 py-0.5 text-xs font-medium text-foreground/60 bg-muted rounded-full flex-shrink-0">
                                      {module.tag}
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {module.description}
                                </p>
                              </div>
                            </div>
                          </div>

                          {module.brandName && module.brandLogo && (
                            <div className="mt-2">
                              <Image
                                src={module.brandLogo}
                                alt={module.brandName}
                                width={80}
                                height={24}
                                className="h-5 w-auto object-contain opacity-50 grayscale"
                              />
                            </div>
                          )}
                          {module.brandName && !module.brandLogo && (
                            <span className="text-[10px] font-bold text-primary/50 mt-2 block">{module.brandName}</span>
                          )}

                          <div className="flex items-center justify-between pt-4 mt-auto border-t border-border">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-accent/20 bg-accent/10 group-hover:bg-accent/20 text-sm font-semibold text-accent transition-colors duration-300">
                              <Clock className="w-4 h-4" />
                              {module.durationHours}h
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Reveal>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      ) : (
        /* Day Builder UI */
        <section className="py-8 sm:py-12 lg:py-16 xl:py-24 bg-gradient-to-b from-white to-neutral/20 overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Reveal>
              {/* Timeline - Full width above */}
              <div className="mb-6 sm:mb-8 lg:mb-12">
                <DayTimeline
                  placedModules={schedule.placedModules}
                  onRemoveModule={handleRemoveModule}
                />
              </div>

              {/* Formations List + Summary - Side by side, same height */}
              <div className="grid lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-12 lg:items-start">
                {/* Left: Available Formations */}
                <div className="flex flex-col min-w-0">
                  <FormationList
                    modules={FORMATION_MODULES}
                    selectedModules={selectedModules}
                    onAdd={handleAddModule}
                    onRemove={handleRemoveModule}
                  />
                </div>

                {/* Right: Summary Panel */}
                <div className="flex flex-col min-w-0">
                  <SummaryPanel
                    schedule={schedule}
                    selectedModules={selectedModules}
                    onRemove={handleRemoveModule}
                    onReset={handleReset}
                    onSubmit={handleSubmit}
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      )}
    </div>
  );
}

"use client";

import { useState, useCallback, useMemo, useRef } from "react";
import Image from "next/image";
import {
  CalendarDays,
  MapPin,
  Clock,
  Camera,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Sparkles,
  TrendingUp,
  Users,
  Wrench,
  UtensilsCrossed,
  Coffee,
  Tag,
  ArrowDown,
  History,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import CTACompact from "@/components/sections/CTA";
import YouTubeEmbed from "@/components/media/YouTubeEmbed";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface EventData {
  id: string;
  title: string;
  dates: { label: string; year: number; month: number; day: number }[];
  lieu?: string;
  horaires?: string;
  programme?: string[];
  contenu?: string[];
  logos: { src?: string; alt: string }[];
  cloture?: string;
  extra?: string;
  photos?: string[];
}

const EVENTS: EventData[] = [
  {
    id: "journee-ardoises",
    title: "Journée UNIQUE ARDOISES",
    dates: [{ label: "Jeudi 26 mars 2026", year: 2026, month: 2, day: 26 }],
    lieu: "MOREPIRE, Bertrix",
    horaires: "Accueil 16h30 – Début 17h30",
    programme: ["ATG Ardoises", "VERTUOZA", "STRATO GRIP", "TYVEK"],
    logos: [
      { src: "/images/logos/strato-grip-logo.png", alt: "Strato Grip" },
      { alt: "TYVEK" },
    ],
    cloture: "Apéritif + repas du mineur",
    photos: [
      "/images/Jobs/EventArdoises/1.jpg",
      "/images/Jobs/EventArdoises/2.jpg",
      "/images/Jobs/EventArdoises/3.JPG",
      "/images/Jobs/EventArdoises/4.JPG",
      "/images/Jobs/EventArdoises/5.jpg",
      "/images/Jobs/EventArdoises/6.JPG",
      "/images/Jobs/EventArdoises/7.JPG",
      "/images/Jobs/EventArdoises/8.JPG",
      "/images/Jobs/EventArdoises/9.JPG",
      "/images/Jobs/EventArdoises/10.jpg",
      "/images/Jobs/EventArdoises/11.JPG",
      "/images/Jobs/EventArdoises/12.JPG",
      "/images/Jobs/EventArdoises/13.JPG",
    ],
  },
  {
    id: "jeudiredi-etex",
    title: "JEUDIREDI ETEX – Cedral & Equitone",
    dates: [
      { label: "Jeudi 16 avril 2026 (Naninne)", year: 2026, month: 3, day: 16 },
      { label: "Jeudi 21 mai 2026 (Bertrix)", year: 2026, month: 4, day: 21 },
    ],
    horaires: "Apd 15h",
    contenu: [
      "Conseils techniques Cedral & Equitone",
      "Actions commerciales exclusives",
      "Bar + foodtruck",
    ],
    logos: [{ src: "/images/logos/cedral-logo.png", alt: "Cedral" }],
  },
  {
    id: "petit-dejeuner-solid-john",
    title: "PETIT DÉJEUNER SOLID JOHN",
    dates: [{ label: "Vendredi 22 mai 2026", year: 2026, month: 4, day: 22 }],
    lieu: "Bertrix",
    horaires: "7h15 – 11h00",
    contenu: [
      "Présentation SOLID JOHN (bétonplex & polymères)",
      "Nespresso",
      "Démos technico",
    ],
    logos: [{ src: "/images/logos/solid-john-logo.png", alt: "Solid John" }],
  },
  {
    id: "journee-soprema",
    title: "Journée UNIQUE SOPREMA",
    dates: [{ label: "Jeudi 28 mai 2026", year: 2026, month: 4, day: 28 }],
    contenu: [
      "Gamme SOPREMA & PAVATEX",
      "Conditions CASH-BACK",
      "Infos à venir",
    ],
    logos: [{ src: "/images/logos/soprema-logo.png", alt: "Soprema" }],
  },
  {
    id: "journee-epdm-elevate",
    title: "Journée EPDM ELEVATE + Toiture végétale",
    dates: [{ label: "Jeudi 4 juin 2026", year: 2026, month: 5, day: 4 }],
    lieu: "Chantier à Namur",
    programme: [
      "Gamme ELEVATE EPDM SA",
      "Toiture végétale",
      "Conseils techniques",
      "CASH-BACK",
    ],
    logos: [{ src: "/images/logos/elevate-logo.png", alt: "Elevate" }],
  },
];

function isEventPast(event: EventData): boolean {
  const now = new Date();
  now.setHours(23, 59, 59, 999);
  const latestDate = event.dates.reduce((latest, d) => {
    const date = new Date(d.year, d.month, d.day);
    return date > latest ? date : latest;
  }, new Date(0));
  return latestDate < now;
}

const UPCOMING_EVENTS = EVENTS.filter((e) => !isEventPast(e));
const PAST_EVENTS = EVENTS.filter((e) => isEventPast(e));

const ALL_EVENT_DATES = EVENTS.flatMap((e) =>
  e.dates.map((d) => ({ key: `${d.year}-${d.month}-${d.day}`, eventId: e.id }))
);

const MONTH_NAMES = [
  "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
  "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre",
];

const DAY_LABELS = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];

const VALUE_BULLETS = [
  { icon: Sparkles, label: "Produits innovants" },
  { icon: TrendingUp, label: "Actions commerciales" },
  { icon: Users, label: "Rencontres pro" },
  { icon: Wrench, label: "Conseils techniques" },
] as const;

/* ------------------------------------------------------------------ */
/*  Calendar                                                           */
/* ------------------------------------------------------------------ */

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function firstDayOfWeek(year: number, month: number) {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

function EventCalendar({ onDayClick }: { onDayClick: (ids: string[]) => void }) {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(2);

  const prev = () => { if (month === 0) { setMonth(11); setYear((y) => y - 1); } else setMonth((m) => m - 1); };
  const next = () => { if (month === 11) { setMonth(0); setYear((y) => y + 1); } else setMonth((m) => m + 1); };

  const totalDays = daysInMonth(year, month);
  const startOffset = firstDayOfWeek(year, month);

  const eventMap = useMemo(() => {
    const m = new Map<string, string[]>();
    ALL_EVENT_DATES.forEach(({ key, eventId }) => {
      const arr = m.get(key) ?? [];
      arr.push(eventId);
      m.set(key, arr);
    });
    return m;
  }, []);

  const cells: (number | null)[] = [];
  for (let i = 0; i < startOffset; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 bg-[#0C2952] text-white">
        <button onClick={prev} aria-label="Mois précédent" className="p-1.5 rounded-lg hover:bg-white/10 transition">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-semibold text-lg tracking-wide">{MONTH_NAMES[month]} {year}</span>
        <button onClick={next} aria-label="Mois suivant" className="p-1.5 rounded-lg hover:bg-white/10 transition">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-7 text-center text-xs font-medium text-slate-400 pt-3 pb-1 px-3">
        {DAY_LABELS.map((d) => <span key={d}>{d}</span>)}
      </div>
      <div className="grid grid-cols-7 gap-1 px-3 pb-4">
        {cells.map((day, i) => {
          if (day === null) return <span key={`empty-${i}`} />;
          const key = `${year}-${month}-${day}`;
          const matched = eventMap.get(key);
          const isEvent = !!matched;
          return (
            <button
              key={key}
              onClick={() => isEvent && onDayClick(matched)}
              className={`relative flex items-center justify-center h-10 rounded-lg text-sm font-medium transition-all ${
                isEvent
                  ? "bg-[#FDD000] text-[#0C2952] font-bold cursor-pointer hover:scale-110 hover:shadow-md ring-2 ring-[#FDD000]/30"
                  : "text-slate-600 cursor-default"
              }`}
            >
              {day}
              {isEvent && <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0C2952]" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Event card (reusable for upcoming & past)                          */
/* ------------------------------------------------------------------ */

function EventCard({
  event,
  highlighted,
  cardRef,
  isPast,
}: {
  event: EventData;
  highlighted: boolean;
  cardRef: React.Ref<HTMLDivElement>;
  isPast?: boolean;
}) {
  const [photosOpen, setPhotosOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const items = event.programme ?? event.contenu ?? [];

  return (
    <Reveal>
      <div
        ref={cardRef}
        id={event.id}
        className={`rounded-2xl border-2 transition-all duration-500 bg-white overflow-hidden ${
          highlighted
            ? "border-[#FDD000] shadow-xl shadow-[#FDD000]/20 scale-[1.01]"
            : isPast
            ? "border-slate-200 shadow-sm opacity-90"
            : "border-slate-100 shadow-md hover:shadow-lg"
        }`}
      >
        <div className={`h-1.5 ${isPast ? "bg-gradient-to-r from-slate-400 to-slate-300" : "bg-gradient-to-r from-[#0C2952] to-[#FDD000]"}`} />

        <div className="p-5 sm:p-7">
          <div className="flex items-start justify-between gap-3 mb-3">
            <h3 className="text-lg sm:text-xl font-bold text-[#0C2952]">{event.title}</h3>
            {isPast && (
              <span className="flex-shrink-0 inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-500 text-xs font-semibold rounded-full">
                <History className="w-3 h-3" />
                Passé
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600 mb-4">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 text-[#FDD000]" />
              <span>{event.dates.map((d) => d.label).join(" + ")}</span>
            </div>
            {event.lieu && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#FDD000]" />
                <span>{event.lieu}</span>
              </div>
            )}
            {event.horaires && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#FDD000]" />
                <span>{event.horaires}</span>
              </div>
            )}
          </div>

          {items.length > 0 && (
            <ul className="space-y-1.5 mb-4">
              {items.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                  <Tag className="w-3.5 h-3.5 mt-0.5 text-[#0C2952]/60 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          )}

          {event.cloture && (
            <div className="flex items-center gap-2 text-sm text-[#0C2952] font-medium bg-[#FDD000]/10 rounded-lg px-3 py-2 mb-4">
              <UtensilsCrossed className="w-4 h-4 text-[#FDD000]" />
              Clôture : {event.cloture}
            </div>
          )}

          {event.extra && (
            <div className="flex items-center gap-2 text-sm text-[#0C2952] font-medium bg-[#FDD000]/10 rounded-lg px-3 py-2 mb-4">
              <Coffee className="w-4 h-4 text-[#FDD000]" />
              {event.extra}
            </div>
          )}

          {event.logos.length > 0 && (
            <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-100">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Partenaires</span>
              {event.logos.map((logo) =>
                logo.src ? (
                  <Image key={logo.alt} src={logo.src} alt={logo.alt} width={120} height={50} className="h-10 sm:h-12 w-auto object-contain" />
                ) : (
                  <span key={logo.alt} className="text-xs font-bold text-[#0C2952] bg-slate-100 rounded px-2 py-1">{logo.alt}</span>
                )
              )}
            </div>
          )}

          {/* Past events: expandable photos section */}
          {isPast && (
            <div className="mt-4 pt-4 border-t border-slate-100">
              <button
                onClick={() => setPhotosOpen(!photosOpen)}
                className="flex items-center gap-2 text-sm font-semibold text-[#0C2952] hover:text-[#FDD000] transition-colors"
              >
                <Camera className="w-4 h-4" />
                {photosOpen ? "Masquer les photos" : "Voir les photos"}
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${photosOpen ? "rotate-180" : ""}`} />
              </button>

              {photosOpen && (
                <div className="mt-4 animate-fade-in">
                  {event.photos && event.photos.length > 0 ? (
                    <>
                      <div className="relative">
                        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory">
                          {event.photos.map((photo, i) => (
                            <button
                              key={photo}
                              type="button"
                              onClick={() => setLightboxIndex(i)}
                              className="snap-start shrink-0 w-40 sm:w-44"
                              aria-label={`Ouvrir la photo ${i + 1}`}
                            >
                              <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                                <Image
                                  src={photo}
                                  alt={`${event.title} - photo ${i + 1}`}
                                  fill
                                  className="object-cover transition-transform duration-500 hover:scale-105"
                                  sizes="(max-width: 640px) 160px, 176px"
                                />
                              </div>
                            </button>
                          ))}
                        </div>
                        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white to-transparent" />
                        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white to-transparent" />
                      </div>

                      {lightboxIndex !== null && (
                        <div
                          className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
                          onClick={() => setLightboxIndex(null)}
                          role="dialog"
                          aria-modal="true"
                        >
                          <div
                            className="relative w-full max-w-5xl"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              type="button"
                              onClick={() => setLightboxIndex(null)}
                              className="absolute -top-12 right-0 text-white/80 hover:text-white transition-colors text-sm font-semibold"
                            >
                              Fermer
                            </button>

                            <div className="relative w-full aspect-[16/10] bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                              <Image
                                src={event.photos[lightboxIndex]}
                                alt={`${event.title} - photo ${lightboxIndex + 1}`}
                                fill
                                className="object-contain"
                                sizes="(max-width: 1024px) 100vw, 1024px"
                              />
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                              <button
                                type="button"
                                onClick={() =>
                                  setLightboxIndex((i) =>
                                    i === null ? 0 : (i - 1 + event.photos!.length) % event.photos!.length
                                  )
                                }
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold transition"
                              >
                                <ChevronLeft className="w-4 h-4" />
                                Précédent
                              </button>
                              <div className="text-xs text-white/70">
                                {lightboxIndex + 1} / {event.photos.length}
                              </div>
                              <button
                                type="button"
                                onClick={() =>
                                  setLightboxIndex((i) =>
                                    i === null ? 0 : (i + 1) % event.photos!.length
                                  )
                                }
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-sm font-semibold transition"
                              >
                                Suivant
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl">
                      <Camera className="w-5 h-5 text-slate-400" />
                      <p className="text-sm text-slate-500">
                        Les photos de cet événement seront bientôt disponibles.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function EvenementsPage() {
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const cardRefs = useRef<Map<string, React.RefObject<HTMLDivElement>>>(new Map());
  const videoId = "on_vVQB49YA";

  const getRef = useCallback((id: string) => {
    if (!cardRefs.current.has(id)) {
      cardRefs.current.set(id, { current: null });
    }
    return cardRefs.current.get(id)!;
  }, []);

  const handleDayClick = useCallback((eventIds: string[]) => {
    const firstId = eventIds[0];
    setHighlightedId(firstId);
    const ref = cardRefs.current.get(firstId);
    if (ref?.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setTimeout(() => setHighlightedId(null), 2500);
  }, []);

  return (
    <div className="pt-20">
      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-[#0C2952] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,192,0,0.15),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
          <Reveal>
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-center">
              <div className="max-w-3xl">
                <div className="inline-flex items-center gap-2 bg-[#FDD000]/15 text-[#FDD000] text-xs font-semibold uppercase tracking-wider rounded-full px-4 py-1.5 mb-6">
                  <CalendarDays className="w-4 h-4" />
                  Événements 2026
                </div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-5">
                  Événements Comarden&nbsp;: dynamisme, rencontres et opportunités pour les professionnels
                </h1>
                <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-2xl mb-8">
                  Chez Comarden, le dynamisme et le relationnel font partie de notre ADN. Chaque événement est conçu pour être sympathique, instructif et rentable.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {VALUE_BULLETS.map(({ icon: Icon, label }) => (
                    <div key={label} className="flex flex-col items-center gap-2 bg-white/5 backdrop-blur rounded-xl px-3 py-4 border border-white/10">
                      <div className="w-10 h-10 rounded-full bg-[#FDD000]/20 flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[#FDD000]" />
                      </div>
                      <span className="text-xs sm:text-sm font-medium text-center">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Visual placeholder (YouTube) */}
              <div className="hidden lg:block">
                <YouTubeEmbed
                  videoId={videoId}
                  title="Vidéo — événements Comarden"
                  eyebrow="YouTube"
                  className="border-white/15"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CALENDAR ── */}
      <section className="py-14 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0C2952] mb-2">Calendrier des événements</h2>
              <p className="text-sm sm:text-base text-slate-500">
                Cliquez sur une date en surbrillance pour accéder à l&apos;événement.
              </p>
            </div>
          </Reveal>
          <Reveal delay={150}>
            <EventCalendar onDayClick={handleDayClick} />
          </Reveal>
          <Reveal delay={300}>
            <div className="flex justify-center mt-6">
              <span className="inline-flex items-center gap-2 text-xs text-slate-400">
                <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
                Détails ci-dessous
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── UPCOMING EVENTS ── */}
      {UPCOMING_EVENTS.length > 0 && (
        <section className="py-14 sm:py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <Reveal>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0C2952] text-center mb-2">
                Nos prochains événements
              </h2>
              <p className="text-sm text-slate-500 text-center">
                {UPCOMING_EVENTS.length} événement{UPCOMING_EVENTS.length > 1 ? "s" : ""} à venir
              </p>
            </Reveal>
            {UPCOMING_EVENTS.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                highlighted={highlightedId === event.id}
                cardRef={getRef(event.id)}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── PAST EVENTS (SOUVENIRS) ── */}
      {PAST_EVENTS.length > 0 && (
        <section className="py-14 sm:py-20 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <Reveal>
              <div className="text-center mb-2">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[#0C2952]/10 mb-4">
                  <History className="w-7 h-7 text-[#0C2952]" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-[#0C2952] mb-2">
                  Souvenirs des événements précédents
                </h2>
                <p className="text-sm sm:text-base text-slate-500">
                  Retrouvez les événements passés et leurs photos. Cliquez pour voir les souvenirs.
                </p>
              </div>
            </Reveal>
            {PAST_EVENTS.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                highlighted={highlightedId === event.id}
                cardRef={getRef(event.id)}
                isPast
              />
            ))}
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <CTACompact />
    </div>
  );
}

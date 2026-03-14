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
  Sparkles,
  TrendingUp,
  Users,
  Wrench,
  UtensilsCrossed,
  Coffee,
  Tag,
  ArrowDown,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import CTACompact from "@/components/sections/CTA";

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
  },
  {
    id: "jeudiredi-etex",
    title: "JEUDIREDI ETEX – Cedral & Equitone",
    dates: [
      { label: "Jeudi 26 mars 2026 (Naninne)", year: 2026, month: 2, day: 26 },
      { label: "Jeudi 26 mars 2026 (Bertrix)", year: 2026, month: 2, day: 26 },
    ],
    horaires: "15h00 – 19h00",
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
    logos: [],
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

const EVENT_DATES = EVENTS.flatMap((e) =>
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
/*  Calendar helpers                                                   */
/* ------------------------------------------------------------------ */

function daysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function firstDayOfWeek(year: number, month: number) {
  const d = new Date(year, month, 1).getDay();
  return d === 0 ? 6 : d - 1; // Monday = 0
}

/* ------------------------------------------------------------------ */
/*  Calendar component                                                 */
/* ------------------------------------------------------------------ */

function EventCalendar({
  onDayClick,
}: {
  onDayClick: (eventIds: string[]) => void;
}) {
  const [year, setYear] = useState(2026);
  const [month, setMonth] = useState(2); // March

  const prev = () => {
    if (month === 0) { setMonth(11); setYear((y) => y - 1); }
    else setMonth((m) => m - 1);
  };
  const next = () => {
    if (month === 11) { setMonth(0); setYear((y) => y + 1); }
    else setMonth((m) => m + 1);
  };

  const totalDays = daysInMonth(year, month);
  const startOffset = firstDayOfWeek(year, month);

  const eventMap = useMemo(() => {
    const m = new Map<string, string[]>();
    EVENT_DATES.forEach(({ key, eventId }) => {
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
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 bg-[#0C2952] text-white">
        <button
          onClick={prev}
          aria-label="Mois précédent"
          className="p-1.5 rounded-lg hover:bg-white/10 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <span className="font-semibold text-lg tracking-wide">
          {MONTH_NAMES[month]} {year}
        </span>
        <button
          onClick={next}
          aria-label="Mois suivant"
          className="p-1.5 rounded-lg hover:bg-white/10 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 text-center text-xs font-medium text-slate-400 pt-3 pb-1 px-3">
        {DAY_LABELS.map((d) => (
          <span key={d}>{d}</span>
        ))}
      </div>

      {/* Day cells */}
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
              className={`
                relative flex items-center justify-center h-10 rounded-lg text-sm font-medium transition-all
                ${
                  isEvent
                    ? "bg-[#F5C000] text-[#0C2952] font-bold cursor-pointer hover:scale-110 hover:shadow-md ring-2 ring-[#F5C000]/30"
                    : "text-slate-600 cursor-default"
                }
              `}
            >
              {day}
              {isEvent && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#0C2952]" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Event card                                                         */
/* ------------------------------------------------------------------ */

function EventCard({
  event,
  highlighted,
  cardRef,
}: {
  event: EventData;
  highlighted: boolean;
  cardRef: React.RefObject<HTMLDivElement | null>;
}) {
  const items = event.programme ?? event.contenu ?? [];

  return (
    <Reveal>
      <div
        ref={cardRef}
        id={event.id}
        className={`
          rounded-2xl border-2 transition-all duration-500 bg-white overflow-hidden
          ${highlighted ? "border-[#F5C000] shadow-xl shadow-[#F5C000]/20 scale-[1.01]" : "border-slate-100 shadow-md hover:shadow-lg"}
        `}
      >
        {/* Accent bar */}
        <div className="h-1.5 bg-gradient-to-r from-[#0C2952] to-[#F5C000]" />

        <div className="p-5 sm:p-7">
          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold text-[#0C2952] mb-3">
            {event.title}
          </h3>

          {/* Meta */}
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-600 mb-4">
            <div className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4 text-[#F5C000]" />
              <span>
                {event.dates.map((d) => d.label).join(" + ")}
              </span>
            </div>
            {event.lieu && (
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#F5C000]" />
                <span>{event.lieu}</span>
              </div>
            )}
            {event.horaires && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#F5C000]" />
                <span>{event.horaires}</span>
              </div>
            )}
          </div>

          {/* Programme / Contenu */}
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

          {/* Clôture */}
          {event.cloture && (
            <div className="flex items-center gap-2 text-sm text-[#0C2952] font-medium bg-[#F5C000]/10 rounded-lg px-3 py-2 mb-4">
              <UtensilsCrossed className="w-4 h-4 text-[#F5C000]" />
              Clôture : {event.cloture}
            </div>
          )}

          {/* Extra */}
          {event.extra && (
            <div className="flex items-center gap-2 text-sm text-[#0C2952] font-medium bg-[#F5C000]/10 rounded-lg px-3 py-2 mb-4">
              <Coffee className="w-4 h-4 text-[#F5C000]" />
              {event.extra}
            </div>
          )}

          {/* Logos */}
          {event.logos.length > 0 && (
            <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-slate-100">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Partenaires
              </span>
              {event.logos.map((logo) =>
                logo.src ? (
                  <Image
                    key={logo.alt}
                    src={logo.src}
                    alt={logo.alt}
                    width={80}
                    height={40}
                    className="h-8 w-auto object-contain"
                  />
                ) : (
                  <span
                    key={logo.alt}
                    className="text-xs font-bold text-[#0C2952] bg-slate-100 rounded px-2 py-1"
                  >
                    {logo.alt}
                  </span>
                )
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
  const cardRefs = useRef<Map<string, React.RefObject<HTMLDivElement | null>>>(new Map());

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
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-[#F5C000]/15 text-[#F5C000] text-xs font-semibold uppercase tracking-wider rounded-full px-4 py-1.5 mb-6">
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
                  <div
                    key={label}
                    className="flex flex-col items-center gap-2 bg-white/5 backdrop-blur rounded-xl px-3 py-4 border border-white/10"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#F5C000]/20 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#F5C000]" />
                    </div>
                    <span className="text-xs sm:text-sm font-medium text-center">{label}</span>
                  </div>
                ))}
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
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0C2952] mb-2">
                Calendrier des événements
              </h2>
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

      {/* ── EVENTS LIST ── */}
      <section className="py-14 sm:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <Reveal>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0C2952] text-center mb-2">
              Nos prochains événements
            </h2>
          </Reveal>

          {EVENTS.map((event) => (
            <EventCard
              key={event.id}
              event={event}
              highlighted={highlightedId === event.id}
              cardRef={getRef(event.id)}
            />
          ))}
        </div>
      </section>

      {/* ── SOUVENIRS ── */}
      <section className="py-14 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#0C2952] mb-2">
                Souvenirs des événements précédents
              </h2>
              <p className="text-sm sm:text-base text-slate-500">
                Après chaque événement, retrouvez ici les photos et moments forts.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="aspect-[4/3] rounded-xl bg-slate-200 flex flex-col items-center justify-center gap-2 border border-slate-100">
                  <Camera className="w-8 h-8 text-slate-400" />
                  <span className="text-xs font-medium text-slate-400">Photos à venir</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <CTACompact />
    </div>
  );
}

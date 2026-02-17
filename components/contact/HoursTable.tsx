"use client";

import { Clock, Calendar } from "lucide-react";
import Card from "@/components/ui/Card";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import { useState, useEffect } from "react";

export default function HoursTable() {
  const hours = site.locations[0]?.hours; // Both locations have same hours
  const [currentDay, setCurrentDay] = useState<string>("");

  useEffect(() => {
    const days = ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"];
    const today = new Date().getDay();
    setCurrentDay(days[today]);
  }, []);

  if (!hours) return null;

  const getDayClass = (dayName: string) => {
    const dayMap: Record<string, string> = {
      "Lundi – Vendredi": currentDay && ["lundi", "mardi", "mercredi", "jeudi", "vendredi"].includes(currentDay) ? "bg-accent/10 border-accent/30" : "",
      "Samedi": currentDay === "samedi" ? "bg-accent/10 border-accent/30" : "",
      "Dimanche": currentDay === "dimanche" ? "bg-accent/10 border-accent/30" : "",
    };
    return dayMap[dayName] || "";
  };

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-white to-neutral/20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <Card className="p-8 lg:p-10 hover:shadow-lg transition-all duration-300 group overflow-hidden relative">
            {/* Decorative background element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-xl bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <Clock className="w-7 h-7 text-accent group-hover:animate-pulse transition-all duration-300" />
                </div>
                <div>
                  <h2 className="text-2xl lg:text-3xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                    Horaires d'ouverture
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    Nous sommes ouverts du lundi au vendredi
                  </p>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b-2 border-border">
                      <th className="pb-4 pr-8 text-sm font-semibold text-foreground uppercase tracking-wider">
                        Jour
                      </th>
                      <th className="pb-4 text-sm font-semibold text-foreground uppercase tracking-wider">
                        Horaires
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-base">
                    <tr className={`border-b border-border/50 transition-all duration-300 hover:bg-accent/5 ${getDayClass("Lundi – Vendredi")}`}>
                      <td className="py-5 pr-8 text-muted-foreground font-medium">
                        Lundi – Vendredi
                      </td>
                      <td className="py-5 text-foreground font-semibold text-lg">
                        {hours.weekdays}
                      </td>
                    </tr>
                    <tr className={`border-b border-border/50 transition-all duration-300 hover:bg-accent/5 ${getDayClass("Samedi")}`}>
                      <td className="py-5 pr-8 text-muted-foreground font-medium">Samedi</td>
                      <td className="py-5 text-foreground font-semibold text-lg">
                        {hours.saturday}
                      </td>
                    </tr>
                    <tr className={`transition-all duration-300 hover:bg-accent/5 ${getDayClass("Dimanche")}`}>
                      <td className="py-5 pr-8 text-muted-foreground font-medium">Dimanche</td>
                      <td className="py-5 text-foreground font-semibold text-lg">
                        {hours.sunday}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {hours.note && (
                <div className="mt-8 pt-6 border-t-2 border-border/50 relative">
                  <div className="absolute top-0 left-0 w-12 h-0.5 bg-accent transition-all duration-300 group-hover:w-24" />
                  <p className="text-sm text-muted-foreground italic leading-relaxed flex items-start gap-2">
                    <Clock className="w-4 h-4 mt-0.5 text-accent flex-shrink-0" />
                    {hours.note}
                  </p>
                </div>
              )}
            </div>
          </Card>
        </Reveal>
      </div>
    </section>
  );
}

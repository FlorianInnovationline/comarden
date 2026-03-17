import Link from "next/link";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { site } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import Card from "@/components/ui/Card";

function BelgiumWatermark() {
  return (
    <svg
      viewBox="0 0 600 500"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full pointer-events-none"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <path
        fill="none"
        stroke="#CBD5E1"
        strokeWidth="1.5"
        opacity="0.5"
        d="M108,88 L120,82 L132,78 L148,72 L168,66 L180,62 L196,58 L210,56 L226,54 L240,52 L258,48 L276,46 L290,44 L306,42 L318,46 L328,52 L342,58 L352,68 L360,78 L368,86 L380,90 L392,88 L404,84 L416,82 L428,86 L436,94 L442,104 L448,116 L454,128 L460,136 L468,142 L478,148 L488,156 L494,168 L496,180 L492,192 L484,200 L476,210 L470,222 L468,236 L472,248 L478,260 L482,272 L478,284 L470,296 L460,306 L448,314 L434,318 L420,322 L406,328 L394,336 L386,346 L380,358 L372,368 L360,374 L348,376 L336,372 L324,366 L312,362 L298,364 L286,370 L274,378 L262,386 L248,390 L234,388 L222,382 L210,374 L198,370 L186,372 L174,378 L162,384 L150,386 L138,382 L128,374 L120,364 L116,352 L118,340 L122,328 L124,316 L120,304 L114,294 L106,286 L98,278 L92,268 L88,256 L86,244 L88,232 L92,220 L98,210 L106,200 L110,188 L112,176 L110,164 L106,152 L102,142 L100,130 L102,118 L106,106 L108,94 Z"
      />
      <circle cx="310" cy="260" r="5" fill="#FDD000" opacity="0.6" />
      <circle cx="250" cy="340" r="5" fill="#FDD000" opacity="0.6" />
      <text x="318" y="264" fontSize="10" fill="#0C2952" opacity="0.4" fontFamily="sans-serif" fontWeight="600">Naninne</text>
      <text x="258" y="344" fontSize="10" fill="#0C2952" opacity="0.4" fontFamily="sans-serif" fontWeight="600">Bertrix</text>
    </svg>
  );
}

export default function LocationsPreview() {
  return (
    <section className="relative pt-6 sm:pt-8 lg:pt-12 pb-12 sm:pb-16 lg:pb-20 xl:pb-28 bg-neutral/50">
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden z-0">
        <BelgiumWatermark />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal>
          <div className="text-center mb-10 sm:mb-12 lg:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary tracking-tight mb-3 sm:mb-4">
              Nos implantations
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground px-2">
              Deux sites pour mieux vous servir en Wallonie
            </p>
          </div>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
          {site.locations.map((location, index) => (
            <Reveal key={location.name} delay={index * 100}>
              <Card className="transition-all duration-300 hover:shadow-lg hover:scale-[1.02]">
                <h3 className="text-xl sm:text-2xl font-bold text-primary mb-4 sm:mb-6">
                  {location.name}
                </h3>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs sm:text-sm text-foreground">{location.address}</p>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        {location.postalCode}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                    <Link
                      href={`tel:+32${location.phone.replace(/\s/g, "")}`}
                      className="text-xs sm:text-sm text-foreground hover:text-primary transition-all duration-200 hover:translate-x-1 font-medium"
                    >
                      {location.phone}
                    </Link>
                  </div>
                  <div className="flex items-start gap-2 sm:gap-3">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div className="text-xs sm:text-sm text-muted-foreground">
                      <p>
                        Lun-Ven: {location.hours.weekdays} | Sam:{" "}
                        {location.hours.saturday}
                      </p>
                    </div>
                  </div>
                  <Link
                    href="#"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-primary hover:gap-3 transition-all group"
                  >
                    <Navigation className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    Itinéraire
                  </Link>
                </div>
              </Card>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

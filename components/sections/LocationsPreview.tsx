import Link from "next/link";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { site } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import Card from "@/components/ui/Card";

function BelgiumWatermark() {
  return (
    <svg
      viewBox="0 0 500 400"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full object-contain opacity-25 pointer-events-none"
      aria-hidden="true"
    >
      <path
        fill="#DDE3EA"
        d="M 60 180 L 80 140 L 100 110 L 140 80 L 190 60 L 250 45 L 310 50 L 360 65 L 400 85 L 430 115 L 445 150 L 440 185 L 420 215 L 390 240 L 355 265 L 310 285 L 265 300 L 220 305 L 175 295 L 135 275 L 100 250 L 75 220 Z"
      />
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

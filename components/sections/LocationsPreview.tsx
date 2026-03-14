import Link from "next/link";
import { MapPin, Phone, Clock, Navigation } from "lucide-react";
import { site } from "@/lib/site";
import Reveal from "@/components/ui/Reveal";
import Card from "@/components/ui/Card";

function BelgiumWatermark() {
  const latMin = 49.5;
  const latMax = 51.5;
  const lonMin = 2.5;
  const lonMax = 6.4;

  const toSvg = (lat: number, lon: number) => ({
    x: ((lon - lonMin) / (lonMax - lonMin)) * 100,
    y: ((latMax - lat) / (latMax - latMin)) * 100,
  });

  const bertrix = toSvg(49.86, 5.17);
  const naninne = toSvg(50.46, 4.84);

  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <svg
        viewBox="0 0 100 100"
        className="w-[500px] h-[500px] sm:w-[600px] sm:h-[600px] lg:w-[700px] lg:h-[700px] opacity-[0.04] text-primary"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <path
          d={[
            "M", toSvg(51.1,2.5).x, toSvg(51.1,2.5).y,
            "L", toSvg(51.5,3.4).x, toSvg(51.5,3.4).y,
            toSvg(51.3,3.8).x, toSvg(51.3,3.8).y,
            toSvg(51.4,4.2).x, toSvg(51.4,4.2).y,
            toSvg(51.5,4.3).x, toSvg(51.5,4.3).y,
            toSvg(51.2,4.4).x, toSvg(51.2,4.4).y,
            toSvg(50.8,4.1).x, toSvg(50.8,4.1).y,
            toSvg(50.5,4.0).x, toSvg(50.5,4.0).y,
            toSvg(50.3,3.6).x, toSvg(50.3,3.6).y,
            toSvg(50.1,3.1).x, toSvg(50.1,3.1).y,
            toSvg(49.9,3.4).x, toSvg(49.9,3.4).y,
            toSvg(49.6,4.0).x, toSvg(49.6,4.0).y,
            toSvg(49.5,4.4).x, toSvg(49.5,4.4).y,
            toSvg(49.5,5.0).x, toSvg(49.5,5.0).y,
            toSvg(49.5,5.5).x, toSvg(49.5,5.5).y,
            toSvg(49.7,5.7).x, toSvg(49.7,5.7).y,
            toSvg(49.6,6.1).x, toSvg(49.6,6.1).y,
            toSvg(49.9,6.4).x, toSvg(49.9,6.4).y,
            toSvg(50.1,6.2).x, toSvg(50.1,6.2).y,
            toSvg(50.2,5.9).x, toSvg(50.2,5.9).y,
            toSvg(50.4,6.0).x, toSvg(50.4,6.0).y,
            toSvg(50.5,5.8).x, toSvg(50.5,5.8).y,
            toSvg(50.8,5.7).x, toSvg(50.8,5.7).y,
            toSvg(50.8,5.6).x, toSvg(50.8,5.6).y,
            toSvg(51.1,5.0).x, toSvg(51.1,5.0).y,
            toSvg(51.3,4.2).x, toSvg(51.3,4.2).y,
            toSvg(51.4,3.4).x, toSvg(51.4,3.4).y,
            "Z",
          ].join(" ")}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="0.5"
        />
        <circle cx={bertrix.x} cy={bertrix.y} r="2.2" fill="#F5C000" opacity="1" />
        <circle cx={naninne.x} cy={naninne.y} r="2.2" fill="#F5C000" opacity="1" />
      </svg>
    </div>
  );
}

export default function LocationsPreview() {
  return (
    <section className="relative pt-6 sm:pt-8 lg:pt-12 pb-12 sm:pb-16 lg:pb-20 xl:pb-28 bg-neutral/50">
      <BelgiumWatermark />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

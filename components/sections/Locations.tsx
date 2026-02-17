import { MapPin, Phone, Clock } from "lucide-react";
import Link from "next/link";

const locations = [
  {
    name: "Bertrix",
    address: "Zone Industrielle de Bertrix",
    postalCode: "6880 Bertrix",
    phone: "061 23 04 56",
    hours: "Lun-Ven: 7h-17h | Sam: 8h-12h",
  },
  {
    name: "Naninne",
    address: "Chaussée de Marche 123",
    postalCode: "5100 Naninne",
    phone: "081 23 04 56",
    hours: "Lun-Ven: 7h-17h | Sam: 8h-12h",
  },
];

export default function Locations() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">Nos implantations</h2>
          <p className="mt-4 text-lg text-muted-foreground">Deux sites pour mieux vous servir en Wallonie</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {locations.map((location) => (
            <div key={location.name} className="bg-secondary/50 p-8 rounded-sm">
              <h3 className="text-2xl font-bold text-foreground mb-6">{location.name}</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-foreground">{location.address}</p>
                    <p className="text-muted-foreground">{location.postalCode}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                  <Link
                    href={`tel:+32${location.phone.replace(/\s/g, "")}`}
                    className="text-foreground hover:text-primary transition-colors font-medium"
                  >
                    {location.phone}
                  </Link>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-accent flex-shrink-0" />
                  <p className="text-muted-foreground">{location.hours}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

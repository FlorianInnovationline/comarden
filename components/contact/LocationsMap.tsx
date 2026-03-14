"use client";

import { useState, useEffect, useRef } from "react";
import { MapPin, Navigation, ExternalLink, Maximize2 } from "lucide-react";
import { site } from "@/lib/site";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default marker icons in Leaflet with Next.js
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

export default function LocationsMap() {
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersRef = useRef<L.Marker[]>([]);

  // Exact coordinates for both locations - these need to be verified
  const locations = [
    {
      name: site.locations[0]?.name || "Bertrix",
      address: `${site.locations[0]?.address}, ${site.locations[0]?.postalCode}`,
      lat: 49.856111, // Rue des Corettes, 47, 6880 Bertrix, Belgium
      lng: 5.252778,
      phone: site.locations[0]?.phone || "",
      googleMapsUrl: "https://www.google.com/maps?q=Rue+des+Corettes+47,+6880+Bertrix,+Belgium",
    },
    {
      name: site.locations[1]?.name || "Naninne",
      address: `${site.locations[1]?.address}, ${site.locations[1]?.postalCode}`,
      lat: 50.467500, // Rue des Pieds d'Alouette, 6, 5100 Namur, Belgium
      lng: 4.872222,
      phone: site.locations[1]?.phone || "",
      googleMapsUrl: "https://www.google.com/maps?q=Rue+des+Pieds+d%27Alouette+6,+5100+Namur,+Belgium",
    },
  ];

  // Calculate center point between both locations
  const centerLat = (locations[0].lat + locations[1].lat) / 2;
  const centerLng = (locations[0].lng + locations[1].lng) / 2;

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Initialize map
    const map = L.map(mapContainerRef.current, {
      center: [centerLat, centerLng],
      zoom: 9,
      scrollWheelZoom: true,
      zoomControl: true,
    });

    // Add OpenStreetMap tiles
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    // Create custom icons for each location
    const createCustomIcon = (color: string, name: string) => {
      return L.divIcon({
        className: "custom-marker",
        html: `
          <div style="
            position: relative;
            width: 40px;
            height: 40px;
          ">
            <div style="
              position: absolute;
              top: 0;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 0;
              border-left: 12px solid transparent;
              border-right: 12px solid transparent;
              border-top: 20px solid ${color};
              filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));
            "></div>
            <div style="
              position: absolute;
              top: 20px;
              left: 50%;
              transform: translateX(-50%);
              width: 24px;
              height: 24px;
              background: ${color};
              border-radius: 50% 50% 50% 0;
              transform: translateX(-50%) rotate(-45deg);
              border: 3px solid white;
              box-shadow: 0 2px 8px rgba(0,0,0,0.3);
            "></div>
          </div>
        `,
        iconSize: [40, 50],
        iconAnchor: [20, 50],
        popupAnchor: [0, -50],
      });
    };

    // Add markers for each location
    locations.forEach((location, index) => {
      const markerColor = index === 0 ? "#F5C000" : "#1e293b";
      
      const marker = L.marker([location.lat, location.lng], {
        icon: createCustomIcon(markerColor, location.name),
      }).addTo(map);

      // Create popup content
      const popupContent = `
        <div style="padding: 12px; min-width: 220px; font-family: system-ui, sans-serif;">
          <h3 style="font-weight: bold; margin-bottom: 8px; color: #1e293b; font-size: 16px;">
            ${location.name}
          </h3>
          <p style="margin: 4px 0; color: #64748b; font-size: 14px; line-height: 1.4;">
            ${location.address}
          </p>
          <a 
            href="tel:${location.phone.replace(/\s|\(|\)|\./g, "")}" 
            style="
              display: inline-flex;
              align-items: center;
              gap: 6px;
              margin-top: 8px;
              color: #F5C000;
              text-decoration: none;
              font-weight: 600;
              font-size: 14px;
            "
          >
            📞 ${location.phone}
          </a>
        </div>
      `;

      marker.bindPopup(popupContent);
      markersRef.current.push(marker);

      // Add click handler
      marker.on("click", () => {
        setSelectedLocation(location.name);
      });
    });

    // Fit map to show both markers with padding
    const group = new L.FeatureGroup(markersRef.current);
    map.fitBounds(group.getBounds().pad(0.2));

    mapRef.current = map;

    // Cleanup
    return () => {
      map.remove();
      mapRef.current = null;
      markersRef.current = [];
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full">
      {/* Map container */}
      <div 
        ref={mapContainerRef}
        className="relative w-full h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl border-2 border-slate-200/80 group bg-slate-100"
      >
        {/* Map will be rendered here by Leaflet */}
        
        {/* Map controls overlay */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 pointer-events-none z-[1000]">
          <a
            href={`https://www.openstreetmap.org/?mlat=${centerLat}&mlon=${centerLng}&zoom=9`}
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg border border-slate-200 hover:bg-white transition-all duration-300 hover:scale-105 flex items-center gap-2 text-xs font-semibold text-primary"
          >
            <Maximize2 className="w-4 h-4" />
            Ouvrir en grand
          </a>
        </div>
      </div>

      {/* Location selector buttons */}
      <div className="mt-6 flex flex-wrap justify-center gap-4">
        {locations.map((location, index) => (
          <button
            key={location.name}
            type="button"
            onClick={() => {
              setSelectedLocation(selectedLocation === location.name ? null : location.name);
              // Center map on selected location
              if (mapRef.current && selectedLocation !== location.name) {
                mapRef.current.setView([location.lat, location.lng], 12, {
                  animate: true,
                  duration: 0.5,
                });
              }
            }}
            className={`group flex items-center gap-3 px-6 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-primary/20 ${
              selectedLocation === location.name
                ? "bg-primary text-white border-primary shadow-xl scale-105"
                : "bg-white text-slate-700 border-slate-200 hover:border-primary/50 hover:shadow-lg hover:scale-[1.02]"
            }`}
          >
            <div className={`p-2 rounded-lg ${
              selectedLocation === location.name 
                ? "bg-white/20" 
                : index === 0 
                  ? "bg-accent/10" 
                  : "bg-primary/10"
            }`}>
              <MapPin
                className={`w-5 h-5 ${
                  selectedLocation === location.name 
                    ? "text-white" 
                    : index === 0 
                      ? "text-accent" 
                      : "text-primary"
                }`}
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-bold text-base">{location.name}</span>
              <span className={`text-xs ${
                selectedLocation === location.name ? "text-white/90" : "text-slate-500"
              }`}>
                {location.address}
              </span>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <a
                href={`tel:${location.phone.replace(/\s|\(|\)|\./g, "")}`}
                onClick={(e) => e.stopPropagation()}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  selectedLocation === location.name
                    ? "bg-white/20 hover:bg-white/30 text-white hover:scale-110"
                    : "bg-slate-100 hover:bg-accent/20 text-primary hover:scale-110"
                }`}
                aria-label={`Appeler ${location.name}`}
              >
                <Navigation className="w-4 h-4" />
              </a>
              <a
                href={location.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  selectedLocation === location.name
                    ? "bg-white/20 hover:bg-white/30 text-white hover:scale-110"
                    : "bg-slate-100 hover:bg-primary/20 text-primary hover:scale-110"
                }`}
                aria-label={`Ouvrir ${location.name} dans Google Maps`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

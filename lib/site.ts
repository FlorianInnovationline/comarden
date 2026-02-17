export interface Location {
  name: string;
  address: string;
  postalCode: string;
  phone: string;
  fax: string;
  vat: string;
  hours: {
    weekdays: string;
    saturday: string;
    sunday: string;
    note?: string;
  };
}

export const site = {
  name: "Comarden",
  tagline: "Matériaux de construction depuis 1977",
  founded: 1977,
  phone: {
    primary: "+3261412706",
    display: "061 41 27 06",
    bertrix: "+3261412706",
    naninne: "+3281401133",
  },
  email: "info@comarden.be",
  locations: [
    {
      name: "Bertrix",
      address: "Rue des Corettes, 47",
      postalCode: "6880 Bertrix",
      phone: "+32 (0)61 41 27 06",
      fax: "+32 (0)61 41 39 11",
      vat: "BE-0417.128.011",
      hours: {
        weekdays: "7:30–12:00 et 13:00–17:00",
        saturday: "Fermé",
        sunday: "Fermé",
        note: "En dehors de ces horaires sur rendez-vous.",
      },
    },
    {
      name: "Naninne",
      address: "Rue des Pieds d'Alouette, 6",
      postalCode: "5100 Namur",
      phone: "+32 (0)81 40 11 33",
      fax: "+32 (0)81 40 06 43",
      vat: "",
      hours: {
        weekdays: "7:30–12:00 et 13:00–17:00",
        saturday: "Fermé",
        sunday: "Fermé",
        note: "En dehors de ces horaires sur rendez-vous.",
      },
    },
  ] as Location[],
  nav: {
    produits: [
      { label: "Toiture", href: "/produits/toiture" },
      { label: "Charpente bois", href: "/produits/charpente" },
      { label: "Isolation", href: "/produits/isolation" },
      { label: "Toitures vertes", href: "/produits/toitures-vertes" },
      { label: "Tôles & Panneaux", href: "/produits/toles-panneaux" },
    ],
    services: [
      { label: "Façonnage", href: "/services/faconnage" },
      { label: "Transport", href: "/services/transport" },
      { label: "Conseil", href: "/services/conseil" },
    ],
  },
  social: {
    linkedin: "#",
    facebook: "#",
  },
  legal: {
    mentions: "/mentions-legales",
    confidentialite: "/confidentialite",
    cookies: "/cookies",
  },
};

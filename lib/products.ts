export interface ProductCategory {
  slug: string;
  title: string;
  description: string;
  iconName: string;
}

export const productCategories: ProductCategory[] = [
  { slug: "toiture", title: "Toiture", description: "Matériaux de couverture pour tous types de toitures", iconName: "Home" },
  { slug: "ardoises", title: "Ardoises", description: "Ardoises naturelles, CEDRAL et solutions de couverture", iconName: "Layers" },
  { slug: "charpente", title: "Charpente bois", description: "Bois de charpente et structures en bois", iconName: "TreePine" },
  { slug: "charpentes-prefabriquees", title: "Charpentes préfabriquées", description: "Charpentes préfabriquées sur mesure, prêtes à poser", iconName: "Building2" },
  { slug: "isolation", title: "Isolation", description: "Solutions d'isolation thermique et acoustique", iconName: "Layers" },
  { slug: "toitures-vertes", title: "Toitures vertes", description: "Systèmes de toitures végétalisées", iconName: "Leaf" },
  { slug: "toles-panneaux", title: "Tôles & Panneaux", description: "Tôles métalliques et panneaux sandwich pour toitures & façades", iconName: "Box" },
  { slug: "epdm", title: "EPDM & Étanchéité", description: "Membranes EPDM et solutions d'étanchéité", iconName: "Droplets" },
  { slug: "visserie", title: "Visserie", description: "Vis, fixations et accessoires pour toiture et bardage", iconName: "Wrench" },
  { slug: "colles-mastics", title: "Colles & Mastics", description: "Colles de contact STRATO GRIP, mastics TYVEK", iconName: "Paintbrush" },
];

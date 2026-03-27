export interface ProductCategory {
  slug: string;
  title: string;
  description: string;
  iconName: string;
}

export const productCategories: ProductCategory[] = [
  { slug: "toiture", title: "Toiture", description: "Matériaux de couverture pour tous types de toitures", iconName: "Home" },
  { slug: "ardoises", title: "Ardoises", description: "Ardoises naturelles, CEDRAL et solutions de couverture", iconName: "Layers" },
  { slug: "charpente", title: "Charpente", description: "Bois de charpente, structures et charpentes préfabriquées", iconName: "TreePine" },
  { slug: "isolation", title: "Isolation", description: "Solutions d'isolation thermique et acoustique", iconName: "Layers" },
  { slug: "toitures-vertes", title: "Toitures vertes", description: "Systèmes de toitures végétalisées", iconName: "Leaf" },
  { slug: "toles-panneaux", title: "Tôles & Panneaux", description: "Tôles métalliques et panneaux sandwich pour toitures & façades", iconName: "Box" },
  { slug: "epdm", title: "Toiture Plates", description: "Membranes EPDM et solutions d'étanchéité pour toitures plates", iconName: "Droplets" },
  { slug: "facade", title: "Façade", description: "Bardages, panneaux et solutions de revêtement de façade", iconName: "Building2" },
  { slug: "visserie", title: "Visserie", description: "Vis, fixations et accessoires pour toiture et bardage", iconName: "Wrench" },
  { slug: "colles-mastics", title: "Colles & Mastics", description: "Colles de contact STRATO GRIP, mastics TYVEK", iconName: "Paintbrush" },
];

export interface ProductCategory {
  slug: string;
  title: string;
  description: string;
  iconName: string;
}

export const productCategories: ProductCategory[] = [
  {
    slug: "toiture",
    title: "Toiture",
    description: "Matériaux de couverture pour tous types de toitures",
    iconName: "Home",
  },
  {
    slug: "charpente",
    title: "Charpente bois",
    description: "Bois de charpente et structures en bois",
    iconName: "TreePine",
  },
  {
    slug: "isolation",
    title: "Isolation",
    description: "Solutions d'isolation thermique et acoustique",
    iconName: "Layers",
  },
  {
    slug: "toitures-vertes",
    title: "Toitures vertes",
    description: "Systèmes de toitures végétalisées",
    iconName: "Leaf",
  },
  {
    slug: "toles-panneaux",
    title: "Tôles & Panneaux",
    description: "Tôles métalliques et panneaux sandwich pour toitures & façades",
    iconName: "Box",
  },
  {
    slug: "epdm",
    title: "EPDM & Étanchéité",
    description: "Membranes EPDM et solutions d'étanchéité",
    iconName: "Droplets",
  },
];

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
  {
    slug: "visserie",
    title: "Visserie",
    description: "Fixations, vis et chevilles pour tous vos projets",
    iconName: "Wrench",
  },
  {
    slug: "colles",
    title: "Colles",
    description: "Mastics et colles de construction professionnelles",
    iconName: "Paintbrush",
  },
  {
    slug: "charpentes-prefabriquees",
    title: "Charpentes préfabriquées",
    description: "Charpentes préfabriquées sur mesure, prêtes à poser",
    iconName: "Building2",
  },
];

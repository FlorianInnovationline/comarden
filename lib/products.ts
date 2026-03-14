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
    description: "Vis, fixations et accessoires de fixation pour tous vos chantiers",
    iconName: "Wrench",
  },
  {
    slug: "colles-mastics",
    title: "Colles & Mastics",
    description: "Colles de construction, mastics et produits d\u2019étanchéité d\u2019air",
    iconName: "Paintbrush",
  },
  {
    slug: "charpentes-prefabriquees",
    title: "Charpentes préfabriquées",
    description: "Charpentes préfabriquées sur mesure, prêtes à poser",
    iconName: "Building2",
  },
];

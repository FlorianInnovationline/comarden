export interface NewsPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category?: string;
  featured?: boolean;
  content?: string[]; // Array of paragraphs
}

export const categories = ["Tous", "Produits", "Formations", "Actualités"] as const;

export const newsPosts: NewsPost[] = [
  {
    slug: "impact-situation-iran-couts-materiaux",
    title: "Impact de la situation en Iran sur les coûts matériaux",
    excerpt:
      "La situation actuelle en Iran entraîne des conséquences sur les coûts de l'énergie, du transport et des matières premières. Nos conseils pour anticiper.",
    date: "2026-03-05",
    category: "Actualités",
    featured: true,
    content: [
      "La situation actuelle en Iran entraîne déjà des conséquences importantes sur les coûts de l'énergie, du transport et des matières premières. Conseils : anticipez vos devis, garantissez vos commandes dès que possible, indiquez clairement la validité de vos prix sur de courtes périodes, prévoyez des marges de sécurité.",
    ],
  },
  {
    slug: "renforcement-flotte-livraison-2026",
    title: "Comarden renforce sa flotte de livraison",
    excerpt:
      "3 nouveaux camions rejoignent la flotte Comarden. Grand merci à VOLVO Arnould pour ses conseils et son excellent service.",
    date: "2026-03-01",
    category: "Actualités",
    featured: true,
    content: [
      "Pour mieux répondre aux besoins de nos clients professionnels, Comarden renforce sa flotte de livraison avec 3 nouveaux camions, offrant encore plus de flexibilité, rapidité et qualité de service. Un grand merci à VOLVO Arnould pour ses conseils et son excellent service. Chez Comarden, venez une fois… vous comprendrez pourquoi nos clients reviennent !",
    ],
  },
  {
    slug: "nouvelle-gamme-cedral-alterna",
    title: "Gamme d'ardoises Cedral Alterna renouvelée",
    excerpt:
      "À partir de février 2026, la production Cedral Alterna est transférée en Allemagne. Attention : les anciennes et nouvelles ardoises ne peuvent PAS être mélangées.",
    date: "2026-02-10",
    category: "Produits",
    featured: true,
    content: [
      "Nous renouvelons la gamme d'ardoises Cedral Alterna. À partir de février 2026, la production sera transférée vers notre usine en Allemagne (Neubeckum).",
      "Les ardoises 60×30 gris foncé viennent déjà d'Allemagne.",
      "IMPORTANT : les anciennes ardoises Alterna de Kapelle-op-den-Bos et les nouvelles ardoises produites en Allemagne ne peuvent PAS être mélangées sur un même projet. Pensez à en informer vos clients !",
      "STACBOND — Comarden a investi dans une toute nouvelle machine panneauteuse pour vous offrir plus de service, de qualité et de flexibilité pour vos chantiers. Découpe STACBOND, pliage et façonnage.",
      "Si vous avez besoin de compléter un chantier ou prendre du stock pour l'après-vente, Comarden a conservé un stock limité de la gamme Cedral Alterna 2025. Contactez-nous pour connaître les quantités disponibles.",
    ],
  },
];

export function getNewsBySlug(slug: string): NewsPost | undefined {
  return newsPosts.find((post) => post.slug === slug);
}

export function getFeaturedNews(limit: number = 3): NewsPost[] {
  return newsPosts.filter((post) => post.featured).slice(0, limit);
}

export function getRelatedPosts(
  currentSlug: string,
  limit: number = 3
): NewsPost[] {
  const currentPost = getNewsBySlug(currentSlug);
  if (!currentPost) return [];

  return newsPosts
    .filter((post) => post.slug !== currentSlug)
    .sort((a, b) => {
      if (a.category === currentPost.category && b.category !== currentPost.category) return -1;
      if (b.category === currentPost.category && a.category !== currentPost.category) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, limit);
}

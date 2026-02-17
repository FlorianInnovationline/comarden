// Voice command parser - converts natural language to structured commands

import type { CatalogData, VoiceResponse, VoiceCommand } from '@/types/catalog';

export function parseVoiceCommand(text: string, catalogData: CatalogData): VoiceResponse {
  const lowerText = text.toLowerCase().trim();

  // SEARCH commands
  if (lowerText.startsWith('montre') || lowerText.startsWith('cherche') || lowerText.startsWith('trouve')) {
    const keywords = text.replace(/^(montre|cherche|trouve)\s+/i, '').trim();
    return {
      command: {
        type: 'SEARCH',
        payload: { keywords },
      },
      reply: `Recherche de "${keywords}"...`,
      suggestions: ['Promotions uniquement', 'Moins de 50€', 'Page suivante'],
    };
  }

  // FILTER commands
  if (lowerText.includes('promo') || lowerText.includes('réduction') || lowerText.includes('solde')) {
    return {
      command: {
        type: 'FILTER',
        payload: { promoOnly: true },
      },
      reply: 'Affichage des produits en promotion uniquement.',
      suggestions: ['Moins de 50€', 'Toutes les catégories', 'Page suivante'],
    };
  }

  if (lowerText.includes('moins de') || lowerText.includes('sous') || lowerText.includes('maximum')) {
    const priceMatch = lowerText.match(/(\d+)\s*€?/);
    const maxPrice = priceMatch ? parseInt(priceMatch[1]) : undefined;
    return {
      command: {
        type: 'FILTER',
        payload: { maxPrice },
      },
      reply: maxPrice ? `Affichage des produits sous ${maxPrice}€.` : 'Filtre de prix appliqué.',
      suggestions: ['Promotions uniquement', 'Page suivante'],
    };
  }

  if (lowerText.includes('plus de') || lowerText.includes('au moins') || lowerText.includes('minimum')) {
    const priceMatch = lowerText.match(/(\d+)\s*€?/);
    const minPrice = priceMatch ? parseInt(priceMatch[1]) : undefined;
    return {
      command: {
        type: 'FILTER',
        payload: { minPrice },
      },
      reply: minPrice ? `Affichage des produits à partir de ${minPrice}€.` : 'Filtre de prix appliqué.',
      suggestions: ['Moins de 100€', 'Page suivante'],
    };
  }

  // Category filter
  const categories = Array.from(new Set(catalogData.products.map(p => p.category).filter(Boolean)));
  for (const category of categories) {
    if (lowerText.includes(category!.toLowerCase())) {
      return {
        command: {
          type: 'FILTER',
          payload: { category: category! },
        },
        reply: `Affichage des produits de la catégorie ${category}.`,
        suggestions: ['Promotions uniquement', 'Toutes les catégories', 'Page suivante'],
      };
    }
  }

  // NAVIGATE commands
  if (lowerText.includes('page') || lowerText.includes('aller à')) {
    const pageMatch = lowerText.match(/(\d+)/);
    const pageNumber = pageMatch ? parseInt(pageMatch[1]) : undefined;
    if (pageNumber) {
      return {
        command: {
          type: 'NAVIGATE',
          payload: { pageNumber },
        },
        reply: `Navigation vers la page ${pageNumber}.`,
        suggestions: ['Page suivante', 'Page précédente'],
      };
    }
  }

  if (lowerText.includes('suivant') || lowerText.includes('après') || lowerText.includes('next')) {
    return {
      command: {
        type: 'NAVIGATE',
        payload: { pageNumber: -1 }, // Special value to indicate "next"
      },
      reply: 'Page suivante.',
      suggestions: ['Page précédente', 'Première page'],
    };
  }

  if (lowerText.includes('précédent') || lowerText.includes('avant') || lowerText.includes('previous')) {
    return {
      command: {
        type: 'NAVIGATE',
        payload: { pageNumber: -2 }, // Special value to indicate "previous"
      },
      reply: 'Page précédente.',
      suggestions: ['Page suivante', 'Dernière page'],
    };
  }

  // OPEN_PRODUCT commands
  if (lowerText.includes('ouvre') || lowerText.includes('affiche') || lowerText.includes('montre')) {
    const indexMatch = lowerText.match(/(premier|deuxième|troisième|1er|2e|3e|1|2|3)/);
    if (indexMatch) {
      const indexMap: Record<string, number> = {
        'premier': 0, '1er': 0, '1': 0,
        'deuxième': 1, '2e': 1, '2': 1,
        'troisième': 2, '3e': 2, '3': 2,
      };
      const resultIndex = indexMap[indexMatch[1].toLowerCase()] ?? 0;
      return {
        command: {
          type: 'OPEN_PRODUCT',
          payload: { resultIndex },
        },
        reply: `Ouverture du produit ${resultIndex + 1}.`,
        suggestions: ['Ajouter au panier', 'Voir sur le site'],
      };
    }
  }

  // Default: treat as search
  return {
    command: {
      type: 'SEARCH',
      payload: { keywords: text },
    },
    reply: `Recherche de "${text}".`,
    suggestions: ['Promotions uniquement', 'Moins de 50€', 'Page suivante'],
  };
}

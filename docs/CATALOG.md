# Catalogue Reader - Documentation

## Vue d'ensemble

Le Catalogue Reader est une application de lecture de catalogue magazine intégrée au site Comarden. Il offre une expérience premium de navigation dans les catalogues produits avec support mobile (pages individuelles) et desktop (double page).

## Accès

### Accès public (lecture)
- URL: `/catalog-secret?t=TOKEN`
- Le token est requis. Sans token valide, la route retourne une 404 (comme si elle n'existait pas).
- Token par défaut: `catalog-secret-2024` (configurable via `CATALOG_TOKEN`)
- **Note:** Le catalogue n'apparaît pas dans la navigation du site principal. Il est accessible uniquement via l'URL directe avec token.

### Accès admin
- URL: `/admin/catalog`
- Accessible depuis le tableau de bord admin principal (après connexion via `/admin/login`)
- Utilise l'authentification admin existante (pas de token séparé)

## Configuration

### Variables d'environnement

Ajoutez dans `.env.local`:

```env
CATALOG_TOKEN=catalog-secret-2024
CATALOG_ADMIN_TOKEN=admin-secret-2024
```

## Structure des données

### Produits (`/data/catalog/products.json`)

```typescript
{
  id: string;
  sku: string; // Unique
  name: string;
  brand?: string;
  category?: string;
  tags: string[];
  descriptionShort?: string;
  price: number; // En euros
  promoPrice?: number;
  currency: string;
  images: string[];
  stock?: number;
  urlSlug: string; // URL du produit sur le site principal
  lastUpdated: string;
}
```

### Éditions (`/data/catalog/editions.json`)

```typescript
{
  id: string;
  title: string;
  status: 'draft' | 'published' | 'archived';
  publishedAt?: string;
  theme?: {
    primaryColor?: string;
    accentColor?: string;
  };
  coverImage?: string;
  createdAt: string;
  updatedAt: string;
}
```

### Pages (`/data/catalog/pages_{editionId}.json`)

```typescript
{
  id: string;
  editionId: string;
  index: number; // Numéro de page (1-based)
  templateType: 'HERO' | 'SPLIT_2' | 'GRID_4' | 'GRID_8' | 'STORY' | 'CATEGORY';
  title?: string;
  subtitle?: string;
  backgroundImage?: string;
  backgroundColor?: string;
  slots: Array<{
    slotId: string;
    productSku?: string;
    customTitle?: string;
    customBadge?: string; // "NEW", "PROMO"
    hotspotPosition?: { x: number; y: number }; // Pour HERO
    overridePrice?: number;
    imageOverride?: string;
  }>;
}
```

## Templates de pages

### HERO
- Page pleine largeur avec image de fond
- Hotspots cliquables pour produits
- Titre et sous-titre superposés

### SPLIT_2
- Deux produits en vedette (gros format)
- Idéal pour produits premium

### GRID_4
- Grille 2x2 avec 4 produits
- Format standard pour pages produits

### GRID_8
- Grille 2x4 avec 8 produits
- Format compact

### STORY
- Contenu éditorial avec titre/sous-titre
- 1-3 produits en vedette
- Idéal pour storytelling

### CATEGORY
- En-tête de catégorie
- Grille de produits (4+)
- Scroll vertical si nécessaire

## Administration

### Créer une édition

1. Accéder à `/_catalog/admin?t=TOKEN_ADMIN`
2. Cliquer sur "Nouvelle édition"
3. Remplir le titre
4. Enregistrer

### Ajouter des pages

1. Sélectionner une édition
2. Cliquer sur "Ajouter une page"
3. Choisir le template
4. Assigner des produits aux slots (par SKU)
5. Enregistrer les pages

### Publier une édition

1. Sélectionner l'édition
2. Cliquer sur "Publier"
3. L'édition devient visible dans le reader public

### Prévisualiser

Cliquer sur "Prévisualiser" pour voir l'édition dans le reader.

## Import Mercator CSV

### Format CSV attendu

Le CSV doit contenir au minimum:
- SKU (obligatoire)
- Description/Nom (obligatoire)
- Price (obligatoire)

Colonnes optionnelles:
- Promo
- Category
- Brand
- Image

### Mapping personnalisé

Vous pouvez définir un mapping JSON pour adapter les colonnes:

```json
{
  "SKU": "sku",
  "Description": "name",
  "Price": "price",
  "Promo": "promoPrice",
  "Category": "category",
  "Image": "images",
  "Brand": "brand"
}
```

### Import via API

```bash
curl -X POST \
  "http://localhost:3000/api/admin/import/mercator?t=TOKEN_ADMIN" \
  -F "file=@products.csv" \
  -F "mapping={\"SKU\":\"sku\",\"Description\":\"name\",\"Price\":\"price\"}"
```

### Résultat

L'import retourne:
- `totalRows`: Nombre total de lignes
- `created`: Produits créés
- `updated`: Produits mis à jour
- `skipped`: Lignes ignorées
- `errors`: Erreurs avec numéro de ligne

## Assistant vocal

### Commandes supportées

#### Recherche
- "Montre moi [produit]"
- "Cherche [terme]"
- "Trouve [terme]"

#### Filtres
- "Promotions uniquement"
- "Moins de 50€"
- "Plus de 100€"
- "[Catégorie]" (ex: "Toiture")

#### Navigation
- "Page suivante"
- "Page précédente"
- "Aller à la page 5"

#### Produits
- "Ouvre le premier"
- "Affiche le deuxième"
- "Montre le troisième"

### Utilisation

1. Cliquer sur le bouton micro (coin inférieur droit)
2. Parler la commande
3. L'assistant exécute l'action et confirme

### Fallback texte

Si la reconnaissance vocale n'est pas disponible, vous pouvez taper les commandes dans le champ texte.

## Navigation

### Mobile
- Scroll vertical avec snap par page
- Swipe pour changer de page
- Flèches de navigation

### Desktop
- Double page (spread)
- Scroll vertical avec snap
- Flèches gauche/droite ou haut/bas
- Molette de souris

### Raccourcis clavier
- `→` ou `↓`: Page suivante
- `←` ou `↑`: Page précédente
- `Esc`: Fermer modals

## Intégration avec le site principal

### Liens produits

Les produits dans le catalogue peuvent être liés aux pages produits du site principal via `urlSlug`:
- Format: `/shop/produit/{urlSlug}`
- Le catalogue ouvre le produit dans un modal QuickView
- Bouton "Voir sur le site" redirige vers la page produit

### Panier

Le catalogue peut ajouter des produits au panier du site principal:
- Utilise le même contexte `CartProvider`
- Les produits sont convertis au format shop
- Le panier est accessible depuis le catalogue

## Performance

### Optimisations
- Lazy loading des images
- Preload des pages adjacentes
- Intersection Observer pour la visibilité
- Memoization des composants lourds

### Lighthouse
- Score cible: 90+
- Images optimisées (Next.js Image)
- Code splitting automatique
- CSS critique inline

## Accessibilité

### Conformité
- Navigation clavier complète
- États de focus visibles
- Support `prefers-reduced-motion`
- Contraste WCAG AA
- Labels ARIA appropriés

### Mode réduit
Les animations sont désactivées si l'utilisateur préfère le mouvement réduit.

## Déploiement

### Build
Le catalogue est inclus dans le build Next.js standard:
```bash
npm run build
```

### Variables d'environnement
Assurez-vous de définir les tokens en production:
```env
CATALOG_TOKEN=your-secure-token-here
CATALOG_ADMIN_TOKEN=your-admin-token-here
```

### Migration vers base de données

Le système utilise actuellement des fichiers JSON. Pour migrer vers MySQL:

1. Créer les tables (voir `db/mysql-schema.sql`)
2. Modifier `lib/catalog/data.ts` pour utiliser MySQL
3. Migrer les données JSON vers la base

## Dépannage

### Le catalogue ne charge pas
- Vérifier que le token est correct
- Vérifier que `data/catalog/` existe
- Vérifier qu'une édition est publiée

### Les produits ne s'affichent pas
- Vérifier que les SKU dans les slots correspondent aux produits
- Vérifier que les images existent
- Vérifier la console pour les erreurs

### L'import CSV échoue
- Vérifier le format CSV (UTF-8)
- Vérifier que SKU, nom et prix sont présents
- Vérifier les séparateurs décimaux (point ou virgule)

## Support

Pour toute question ou problème, consulter:
- La documentation Next.js
- Les logs du serveur
- La console du navigateur

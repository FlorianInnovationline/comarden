# Catalogue Reader - Quick Start

## Accès rapide

### 1. Accéder au catalogue
```
http://localhost:3000/catalog-secret?t=catalog-secret-2024
```

### 2. Accéder à l'admin du catalogue
```
http://localhost:3000/admin/catalog
```
(Connectez-vous d'abord via `/admin/login`)

## Configuration initiale

### Variables d'environnement

Créez un fichier `.env.local` à la racine du projet:

```env
# Tokens d'accès au catalogue
CATALOG_TOKEN=catalog-secret-2024
CATALOG_ADMIN_TOKEN=admin-secret-2024
```

### Données de test

Les données de test sont déjà créées dans `/data/catalog/`:
- `products.json` - 10 produits
- `editions.json` - 1 édition publiée
- `pages_edition-winter-2024.json` - 5 pages

## Test rapide

1. **Démarrer le serveur:**
   ```bash
   npm run dev
   ```

2. **Ouvrir le catalogue:**
   - URL: `http://localhost:3000/_catalog?t=catalog-secret-2024`
   - Vous devriez voir 5 pages avec des produits

3. **Tester la navigation:**
   - Mobile: Scroll vertical, swipe
   - Desktop: Flèches clavier, molette souris
   - Double page sur desktop

4. **Tester l'assistant vocal:**
   - Cliquer sur le bouton micro (coin inférieur droit)
   - Dire: "Montre moi les promotions"
   - Ou: "Page suivante"

5. **Tester l'admin:**
   - URL: `http://localhost:3000/_catalog/admin?t=admin-secret-2024`
   - Créer une nouvelle édition
   - Ajouter des pages
   - Publier

## Import CSV

### Format minimal

Créez un fichier `products.csv`:

```csv
SKU,Description,Price,Promo,Category,Brand
TTC-CL-001,Tuiles terre cuite,125.00,99.00,Toiture,TERREAL
ARD-NAT-30x20,Ardoises naturelles,185.00,,Toiture,Ardoisières
```

### Import via curl

```bash
curl -X POST \
  "http://localhost:3000/api/admin/import/mercator?t=admin-secret-2024" \
  -F "file=@products.csv"
```

### Import via l'interface admin

(À venir - interface d'upload de fichier)

## Commandes vocales

### Recherche
- "Montre moi [produit]"
- "Cherche [terme]"

### Filtres
- "Promotions uniquement"
- "Moins de 50€"
- "Plus de 100€"
- "[Catégorie]" (ex: "Toiture")

### Navigation
- "Page suivante"
- "Page précédente"
- "Aller à la page 5"

### Produits
- "Ouvre le premier"
- "Affiche le deuxième"

## Structure des fichiers

```
data/catalog/
├── products.json          # Tous les produits
├── editions.json          # Toutes les éditions
└── pages_{editionId}.json # Pages d'une édition

components/catalog/
├── CatalogReader.tsx      # Composant principal
├── CatalogPageView.tsx    # Rendu des pages
├── QuickViewModal.tsx     # Modal produit
├── ShopThisPageDrawer.tsx # Drawer "Acheter cette page"
├── VoiceAssistant.tsx     # Assistant vocal
└── CatalogAdmin.tsx       # Interface admin

app/_catalog/
├── page.tsx               # Route publique
├── admin/page.tsx         # Route admin
└── edition/[id]/page.tsx  # Route édition spécifique
```

## Dépannage

### Le catalogue ne charge pas
- Vérifier que le token est correct dans l'URL
- Vérifier que `data/catalog/` existe et contient les fichiers
- Vérifier qu'une édition est publiée dans `editions.json`

### Erreur "No published catalog found"
- Ouvrir `data/catalog/editions.json`
- S'assurer qu'une édition a `"status": "published"`

### Les produits ne s'affichent pas
- Vérifier que les SKU dans `pages_*.json` correspondent aux SKU dans `products.json`
- Vérifier la console du navigateur pour les erreurs

### L'assistant vocal ne fonctionne pas
- Vérifier que le navigateur supporte Web Speech API (Chrome, Edge)
- Utiliser le champ texte comme fallback

## Prochaines étapes

1. **Personnaliser les tokens** dans `.env.local`
2. **Importer vos produits** via CSV
3. **Créer votre première édition** dans l'admin
4. **Ajouter des pages** avec vos produits
5. **Publier** et partager le lien avec le token

## Support

Voir la documentation complète dans `/docs/CATALOG.md`

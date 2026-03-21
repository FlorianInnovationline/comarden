# Images boutique — un dossier par produit

Chaque produit du seed a un dossier nommé comme son **slug** (ex. `mastic-airguard-tyvek`).

- **Côté boutique** : les images affichées = **fusion** du champ `images` (seed, admin, MySQL) **+** les fichiers image présents dans ce dossier (`jpg`, `jpeg`, `png`, `webp`, `gif`). Ordre : URLs enregistrées d’abord, puis fichiers du dossier (sans doublon). Les fichiers dont le nom commence par `main` sont listés en premier.
- **Page d’édition admin** : le formulaire montre uniquement le champ `images` en base (pas la fusion), pour éviter d’enregistrer par mégarde des chemins « auto-détectés ».
- Chemins attendus : `/images/products/<slug>/<fichier>.jpg`
- L’admin peut **uploader** vers ce dossier **en local** (`npm run dev`) ; sur **Vercel**, le disque est en lecture seule : ajoutez les fichiers ici puis `git push`, ou utilisez un stockage externe.

La liste des slugs est dérivée de `SEED_PRODUCT_SLUGS` dans `lib/shop/seed.ts`.

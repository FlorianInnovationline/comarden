# Images boutique — un dossier par produit

Chaque produit du seed a un dossier nommé comme son **slug** (ex. `mastic-airguard-tyvek`).

- **Le site ne lit pas automatiquement le dossier** : les images affichées viennent du champ `images` du produit (seed, admin ou base MySQL). Après upload, enregistrez le produit pour conserver les URLs.
- Chemins attendus : `/images/products/<slug>/<fichier>.jpg`
- L’admin peut **uploader** vers ce dossier **en local** (`npm run dev`) ; sur **Vercel**, le disque est en lecture seule : ajoutez les fichiers ici puis `git push`, ou utilisez un stockage externe.

La liste des slugs est dérivée de `SEED_PRODUCT_SLUGS` dans `lib/shop/seed.ts`.

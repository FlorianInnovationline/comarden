# Images boutique — un dossier par produit

Chaque produit du seed a un dossier nommé comme son **slug** (ex. `mastic-airguard-tyvek`).

- Fichiers référencés dans l’admin / la base : chemins du type `/images/products/<slug>/<fichier>.jpg`
- L’admin peut **uploader** vers ce dossier **en local** (`npm run dev`) ; sur **Vercel**, le disque est en lecture seule : ajoutez les fichiers ici puis `git push`, ou utilisez un stockage externe.

La liste des slugs est dérivée de `SEED_PRODUCT_SLUGS` dans `lib/shop/seed.ts`.

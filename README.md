# Sérénité Gestion Conseils — site v2

Site construit avec [Astro](https://astro.build) : composants modernes, CSS natif récent,
et un résultat final 100 % statique (HTML/CSS/JS), rapide et facile à héberger.

## Commandes

```bash
npm install                  # une seule fois
npm run dev                  # aperçu en direct sur http://localhost:4321
npm run build                # génère le site final dans le dossier dist/
npm run preview              # aperçu du site final
node scripts/og-image.mjs    # régénère l'image de partage (réseaux sociaux)
```

## Charte graphique

| Couleur | Code | Usage sur le site |
| --- | --- | --- |
| Prune | `#61193a` | couleur dominante : titres, mots importants, boutons, fonds sombres |
| Orange | `#e97e0d` | petites touches seulement (mots accentués des titres, puces) |
| Rose | `#e581bc` | teintes douces : halos discrets, encadrés « résultat » |
| Abricot | `#f6b55b` | boutons et badges sur fond prune, reflets |
| Blanc / Noir | `#ffffff` / `#000000` | fonds et texte |

- **Polices** : MADE Mirage (titres) et Garet (texte), dans `public/fonts/`.
- **Logo** : source dans `scripts/logo-source.png` ; toutes les déclinaisons (prune, blanc,
  monogramme, favicon) se régénèrent avec `node scripts/brand-assets.mjs`.
- ⚠️ **Licence MADE Mirage** : les fichiers fournis sont marqués « PERSONAL USE ».
  Une licence commerciale doit être achetée auprès de MADE Type avant la mise en ligne.
  Vérifier aussi les conditions d'utilisation de Garet.

## Modifier un texte, un numéro, un lien

Tout le contenu est regroupé dans **`src/data/site.ts`** : coordonnées, services
(et leur détail), modes d'intervention, zone d'intervention, cas clients, étapes de
la frise, partenaires, FAQ…
Les balises `<strong>…</strong>` mettent un mot en valeur (en prune).
Dans les titres, `<em>…</em>` affiche un mot clé en orange et en MAJUSCULES.
Les textes courants sont en noir sur fond clair et en blanc sur fond sombre, et centrés.

## Rubrique Conseils (articles)

Chaque article est un fichier Markdown dans **`src/content/conseils/`**.

- **Ajouter un article** : copier un fichier existant, le renommer (le nom du fichier
  devient l'adresse de la page), puis modifier l'en-tête entre les `---` :
  `title`, `description` (affichée dans Google), `category` (Trésorerie,
  Gestion administrative, Ressources humaines ou Pilotage) et `date`.
- **Photo de l'article** : déposer l'image dans `src/content/conseils/images/`, puis renseigner
  `cover` (chemin de l'image), `coverAlt` (description pour l'accessibilité) et `coverCredit`
  (nom de l'auteur et lien). N'utiliser que des photos libres de droits (par exemple Unsplash),
  sans texte, ou avec du texte en français. La liste des photos actuelles et de leurs auteurs
  est dans `scripts/photos.json`.
- **Durée et format** : calculés automatiquement à partir du texte (Express ≤ 3 min,
  Guide 4-5 min, Dossier 6 min et +).
- **L'essentiel en 30 secondes** : la liste `keyPoints` de l'en-tête (3 à 4 phrases).
- **Mettre un article à la une** de la page Conseils : `featured: true` (un seul à la fois).
- **Masquer un article** sans le supprimer : ajouter `draft: true` dans l'en-tête.
- Dans le texte : `## Titre` pour un intertitre (il apparaît dans le sommaire),
  `**mot**` pour mettre en gras, `- ` pour une liste à puces, `1. ` pour une liste numérotée,
  et une ligne commençant par `> **Bon à savoir** — …` pour un encadré d'astuce.

La page `/conseils.html`, l'aperçu sur l'accueil, les articles associés et le
plan du site (sitemap) se mettent à jour automatiquement.

## Référencement (SEO)

- Titres et descriptions de chaque page optimisés pour la Normandie (Eure 27, Seine-Maritime 76).
- Données structurées Google : entreprise locale avec zone desservie, FAQ, articles, fil d'Ariane.
- Plan du site généré automatiquement (`sitemap-index.xml`), déclaré dans `robots.txt`.
- Image de partage 1200×630 : `public/images/og-image.jpg`.
- Photos converties automatiquement en WebP/AVIF à la bonne taille.

## Mettre en ligne

Lancer `npm run build`, puis envoyer **le contenu du dossier `dist/`** chez l'hébergeur
(FTP, Netlify, Vercel, OVH…). Les adresses de l'ancien site sont conservées :
`/`, `/faq.html`, `/mentions-legales.html`, `/confidentialite.html`.

## Où se trouve quoi

| Élément | Fichier |
| --- | --- |
| Couleurs, typographies, boutons, cartes | `src/styles/global.css` |
| En-tête / pied de page | `src/components/Header.astro`, `Footer.astro` |
| Sections de l'accueil | `src/components/` : `Hero`, `Services`, `Formulas` (modes d'intervention), `About`, `Reasons`, `Journey` (frise), `Cases`, `Zone`, `Network`, `ConseilsTeaser`, `PromiseBand`, `Contact` |
| Articles | `src/content/conseils/*.md` |
| Animations (apparition, frise automatique, en-tête…) | `src/scripts/main.ts` (rythme de la frise : constantes `TL_STEP_MS`, `TL_END_MS`, `TL_RESUME_MS`) |
| Bandeau cookies (Calendly) | `src/components/CookieBanner.astro` |
| Photos optimisées | `src/assets/images/` |
| Logo, favicon, image de partage | `public/images/` |

## À compléter

- Téléphone et lien LinkedIn → `src/data/site.ts`
- SIRET, adresse du siège, hébergeur → `src/pages/mentions-legales.astro`
- Faire relire les articles de la rubrique Conseils par Nadège avant la mise en ligne

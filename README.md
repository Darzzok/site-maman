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

## Modifier un texte, un numéro, un lien

Tout le contenu est regroupé dans **`src/data/site.ts`** : coordonnées, services
(et leur détail), modes d'intervention, zone d'intervention, cas clients, étapes de
la frise, partenaires, FAQ…
Les balises `<strong>…</strong>` mettent un mot en valeur (en bleu).

## Rubrique Conseils (articles)

Chaque article est un fichier Markdown dans **`src/content/conseils/`**.

- **Ajouter un article** : copier un fichier existant, le renommer (le nom du fichier
  devient l'adresse de la page), puis modifier l'en-tête entre les `---` :
  `title`, `description` (affichée dans Google), `category` (Trésorerie,
  Gestion administrative, Ressources humaines ou Pilotage) et `date`.
- **Masquer un article** sans le supprimer : ajouter `draft: true` dans l'en-tête.
- Dans le texte : `## Titre` pour un intertitre, `**mot**` pour mettre en gras,
  `- ` en début de ligne pour une liste.

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
| Animations (apparition, frise, en-tête…) | `src/scripts/main.ts` |
| Bandeau cookies (Calendly) | `src/components/CookieBanner.astro` |
| Photos optimisées | `src/assets/images/` |
| Logo, favicon, image de partage | `public/images/` |

## À compléter

- Téléphone et lien LinkedIn → `src/data/site.ts`
- SIRET, adresse du siège, hébergeur → `src/pages/mentions-legales.astro`
- Faire relire les articles de la rubrique Conseils par Nadège avant la mise en ligne

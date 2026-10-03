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

## Expérience mobile

Sur téléphone, le site est pensé pour un défilement court et une navigation au pouce :

- **Carrousels glissables** : ajouter l’attribut `data-carousel` à une grille de cartes suffit (points de navigation
  ajoutés automatiquement, sans effet sur ordinateur).
- **« Lire la suite »** : `data-readmore="420"` replie un long texte au-delà de 420 px sur mobile (le texte reste
  lisible par Google).
- **Barre d’actions** en bas d’écran (Devis gratuit / Rendez-vous), masquée en haut de page, près du formulaire et
  sur les articles (`mobileBar={false}` dans `BaseLayout`).
- **Onglets Devis / Rendez-vous** dans la section Contact, frise compacte, pied de page en volets dépliables,
  liste d’articles compacte sur la page Conseils.

## Demande de devis en étapes

Le formulaire de devis (`src/components/QuoteWizard.astro`) guide le visiteur en 5 étapes : besoins, entreprise,
format d’accompagnement, coordonnées, puis récapitulatif avant envoi. Les réponses arrivent par e-mail via Formspree,
avec un objet clair (nom, activité, besoins).

- **Modifier les choix proposés** : listes `besoins`, `activites`, `effectifs`, `rythmes`… en haut du fichier.
- **Présélection depuis un lien** : `/?activite=btp#devis` (btp, sante, liberal, commerce, tpe) ou
  `/?besoin=tresorerie#devis`. Les boutons « Demander un devis » des pages métiers l’utilisent déjà.
- La saisie est conservée pendant la visite si la page est rechargée, et le formulaire reste utilisable sans JavaScript.

## Pages métiers et zones (référencement)

Des pages dédiées ciblent les recherches par métier et par ville :

| Type | Adresse | Fichier |
| --- | --- | --- |
| Regroupement des métiers | `/metiers.html` | `src/pages/metiers.astro` |
| Page métier | `/metiers/artisans-btp.html`… | `src/content/metiers/*.md` |
| Zone d’intervention | `/zone-intervention.html` | `src/pages/zone-intervention.astro` |
| Page ville / département | `/gestion-administrative/rouen.html`… | `src/content/zones/*.md` |

- **Modifier une page** : ouvrir le fichier `.md` correspondant. L’en-tête (entre les `---`) décrit les blocs
  (titre, accroche, enjeux, prestations, questions, articles associés) ; le texte en dessous forme la partie rédactionnelle.
- **Ajouter un métier ou une ville** : copier un fichier existant, le renommer (le nom devient l’adresse) et adapter
  tout le contenu. Le menu du pied de page, les liens croisés et le plan du site se mettent à jour automatiquement.
- **Important** : chaque page doit rester **unique** (textes, questions, exemples). Des pages quasi identiques d’une
  ville à l’autre sont pénalisées par Google.
- `seoTitle` (60 caractères max) et `description` (155 max) sont ce qui s’affiche dans Google.

## Référencement (SEO)

- Titres et descriptions optimisés pour chaque page (raccourcis automatiquement s’ils dépassent la taille affichée par Google).
- Données structurées Google : entreprise locale avec zone desservie, services par métier et par ville, FAQ, articles, fil d’Ariane.
- Maillage interne : accueil ↔ métiers ↔ villes ↔ articles, et colonnes Métiers / Zones dans le pied de page.
- Plan du site généré automatiquement (`sitemap-index.xml`), avec la date de mise à jour des articles, déclaré dans `robots.txt`.
- Page 404 personnalisée. Image de partage 1200×630 : `public/images/og-image.jpg`.
- Pages très légères (environ 11 à 19 Ko compressés, 6 Ko de JavaScript) et photos converties en WebP/AVIF.

### À faire après la mise en ligne (hors site, indispensable pour le SEO local)

1. **Fiche Google Business Profile** : créer la fiche « Sérénité Gestion Conseils » en tant qu’entreprise de services
   avec zone desservie (Eure, Seine-Maritime), sans afficher l’adresse si elle est personnelle. Mêmes nom, téléphone et
   site que sur le site web.
2. **Google Search Console** et **Bing Webmaster Tools** : valider le site et y déclarer `sitemap-index.xml`.
3. **Avis clients** : demander un avis Google à chaque client satisfait (c’est le premier critère du référencement local).
4. **Annuaires** : inscrire l’entreprise avec exactement les mêmes coordonnées (PagesJaunes, annuaires d’entreprises
   locaux, réseaux de dirigeants, page LinkedIn).
5. **Coordonnées** : renseigner le vrai téléphone (`phone`, `phoneLabel` puis `phoneIsSet: true`), le lien LinkedIn
   et, si possible, la commune de rattachement (`address`) dans `src/data/site.ts`.
6. **Nom de domaine sans accents** : réserver aussi `serenitegestionconseils.fr` et le rediriger vers le site, car
   beaucoup de personnes tapent l’adresse sans accents.

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
| Pages métiers / zones | contenu : `src/content/metiers/`, `src/content/zones/` ; gabarit : `src/components/Landing.astro` |
| Données structurées (SEO) | `src/utils/seo.ts` |
| Animations (apparition, frise automatique, en-tête…) | `src/scripts/main.ts` (rythme de la frise : constantes `TL_STEP_MS`, `TL_END_MS`, `TL_RESUME_MS`) |
| Bandeau cookies (Calendly) | `src/components/CookieBanner.astro` |
| Photos optimisées | `src/assets/images/` |
| Logo, favicon, image de partage | `public/images/` |

## À compléter

- Téléphone et lien LinkedIn → `src/data/site.ts`
- SIRET, adresse du siège, hébergeur → `src/pages/mentions-legales.astro`
- Faire relire les articles de la rubrique Conseils par Nadège avant la mise en ligne

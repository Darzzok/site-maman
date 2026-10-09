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
| Prune | `#61193a` | couleur dominante : titres, mots importants, boutons, fonds sombres (jamais éclaircie : elle tirerait vers le fuchsia) |
| Orange | `#e97e0d` | petites touches seulement (mots accentués des titres, puces) |
| Rose | `#e581bc` | toute petite touche décorative uniquement |
| Abricot | `#f6b55b` | boutons et badges sur fond prune, halos, fonds doux et encadrés |
| Blanc / Noir | `#ffffff` / `#000000` | fonds et texte ; gris clairs d’interface (bordures, pastilles) |

- **Polices** : **Playfair Display** (titres) et **Montserrat** (texte), dans `public/fonts/`. Ce sont des polices
  libres (licence SIL Open Font License, fichiers `OFL-*.txt` joints) : usage commercial autorisé, elles sont dans le
  dépôt Git. Elles remplacent MADE Mirage et Garet (licence « usage personnel » uniquement), dont elles reprennent le style.
  Les anciens fichiers sont rangés hors du projet, dans `polices-sous-licence (ne pas publier)`.
- **Logo** : source dans `scripts/logo-source.png` ; toutes les déclinaisons (prune, blanc,
  monogramme, favicon) se régénèrent avec `node scripts/brand-assets.mjs`.

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
- **Présélection depuis un lien** : `/?activite=btp#devis` (btp, agri, liberal, commerce, tpe) ou
  `/?besoin=tresorerie#devis`. Les boutons « Demander un devis » des pages métiers l’utilisent déjà.
- La saisie est conservée pendant la visite si la page est rechargée, et le formulaire reste utilisable sans JavaScript.

## Diagnostic de gestion (génération de contacts)

La page `/diagnostic-gestion.html` propose un diagnostic gratuit en 3 minutes : profil (activité, effectif, tranche
de chiffre d’affaires), puis 12 questions sur 4 domaines (trésorerie, facturation & relances, organisation
administrative, pilotage & personnel).

- **Parcours** : accueil animé → questions avec un « Bon à savoir » après chaque réponse → écran d’analyse animé →
  résultats (score sur 100 en jauge, radar des 12 réponses, enjeux chiffrés, détail par domaine, points forts).
- **Enjeux chiffrés** : trésorerie qui dort chez les clients (chiffre d’affaires ÷ 365 × jours au-delà d’une facture
  envoyée tout de suite et payée à 30 jours) et temps administratif en jours de travail par an. Les hypothèses
  (milieux de tranche, délais par réponse, 47 semaines, journées de 7 h) sont en bas de `src/data/diagnostic.ts`.
- **Plan d’action** : la 1re recommandation est visible librement, les suivantes se débloquent avec nom + e-mail.
  Case « être rappelé(e) pour un bilan offert » : le téléphone et un créneau deviennent obligatoires.
- **Bilan offert, directement dans les résultats** : accroche adaptée au domaine le plus faible, déroulé des 30 minutes,
  cas client du même métier, puis deux onglets :
  - **Agenda** : Calendly intégré (après accord des cookies), avec nom, e-mail et résumé du diagnostic pré-remplis.
    ⚠️ Pour que le résumé apparaisse dans Calendly, ajouter à l’évènement une **1re question personnalisée** (par
    exemple « Votre résultat de diagnostic »). Quand un rendez-vous est réservé, Nadège reçoit aussi un e-mail
    « 📅 Bilan réservé » avec le diagnostic complet (si la personne avait déjà laissé ses coordonnées).
  - **Être rappelé(e)** : téléphone + créneau (matin, midi, après-midi, fin de journée).
  - Un bouton flottant « Réserver mon bilan offert » reste visible tant que la section n’est pas à l’écran.
- **E-mails reçus par Nadège (Formspree)** : l’objet signale les contacts à traiter en priorité
  (« 🔥 À rappeler (l’après-midi) — Nom — 41/100 », « 🔥 Contact à relancer vite » si le score est sous 50,
  sinon « Diagnostic — … »). En tête de l’e-mail, une **fiche d’appel** : téléphone et créneau, phrase d’accroche toute
  prête, enjeu chiffré, points forts à valoriser et 3 priorités. Suivent les scores et toutes les réponses.
- **Rapport client (PDF à remettre lors du bilan)** : chaque e-mail contient un lien « 📄 Rapport à remettre au
  client » vers `/rapport-diagnostic.html#…`. Le lien ne contient que les réponses (aucune coordonnée) ; la page
  recalcule le diagnostic et affiche 4 pages A4 aux couleurs SGC :
  1. couverture (nom du client à saisir, profil, score, niveau) ;
  2. synthèse (4 domaines, enjeux chiffrés, points forts) ;
  3. plan sur 90 jours (une priorité par mois, avec la prestation correspondante), actions à consolider, notes d’entretien ;
  4. proposition d’accompagnement (formule recommandée, prestations concernées, gains attendus, prochaines étapes et
     coordonnées). Pas de tarif dans le rapport : Nadège envoie son devis séparément.

  Le nom du client, l’entreprise et les notes d’entretien se complètent en cliquant sur les zones en pointillés
  (mémorisées sur l’ordinateur utilisé) ; « Enregistrer en PDF » ouvre l’impression (choisir « Enregistrer au format
  PDF »). Les zones laissées vides s’impriment comme des lignes à compléter à la main. Page non indexée par Google. Le lien fonctionne sur le site en ligne (il reprend l’adresse du
  site sur lequel le diagnostic a été fait). Formule recommandée : `recommendFormula` dans `src/utils/diagnostic.ts` ;
  prestation par question : `serviceByQuestion` dans `src/data/diagnostic.ts`.
  (Une vraie pièce jointe PDF dans l’e-mail demanderait une formule Formspree payante ou un outil d’e-mailing.)
- **Modifier les questions, conseils, recommandations, niveaux, accroches du bilan, créneaux** : `src/data/diagnostic.ts`
  (chaque réponse vaut de 0 à 3 points ; `null` = « non concerné », exclu du calcul). Cas clients : `cases` dans
  `src/data/site.ts` (`focus` = domaine illustré).
- **Accès** : bouton « Diagnostic » dans l’en-tête (et dans le menu mobile), bandeau sur l’accueil (`src/components/DiagnosticTeaser.astro`), lien « Gratuit » dans
  l’en-tête de l’accueil, pied de page, fin des pages métiers/villes et des articles.
- **Lancement direct** : un lien vers `/diagnostic-gestion.html#commencer` ouvre directement la 1re question (utilisé
  par le bandeau de l’accueil, le lien « Gratuit » de l’en-tête, les pages métiers/villes et les articles). Sur la page,
  un bouton fixe « Lancer mon diagnostic gratuit » apparaît dès que le bouton principal sort de l’écran.
- Les réponses sont conservées pendant la visite (on peut recharger la page et reprendre) ; le résultat s’imprime ou
  s’enregistre en PDF.

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

## Mettre en ligne (Vercel)

Le site est envoyé sur Vercel **depuis cet ordinateur** : il est construit ici puis envoyé tel quel (les polices étant
désormais libres et dans le dépôt, une connexion GitHub ↔ Vercel est aussi possible). Réglages (cache, en-têtes de sécurité, rapport non indexé) : `vercel.json`.

1. **Une seule fois** : se connecter à son compte Vercel (le navigateur s’ouvre) puis relier le dossier au projet :
   ```bash
   npx vercel login
   npx vercel link --yes --project serenite-gestion-conseils
   ```
2. **Version de test** (adresse privée, visible seulement une fois connecté à Vercel) : `npm run deploy:test`
   (projet relié le 9 octobre 2026 : `serenite-gestion-conseils`. Attention : Vercel publie toujours le **tout premier**
   envoi d’un nouveau projet sur l’adresse publique `serenite-gestion-conseils.vercel.app`.)
3. **Mise en ligne officielle** : `npm run deploy`
4. **Nom de domaine** : dans Vercel, *Settings → Domains*, ajouter `sérénitégestionconseils.fr` (et la version sans
   accents `serenitegestionconseils.fr` en redirection), puis recopier chez le registraire les enregistrements DNS indiqués.

Les anciennes adresses sont conservées : `/`, `/faq.html`, `/mentions-legales.html`, `/confidentialite.html`.

## Où se trouve quoi

| Élément | Fichier |
| --- | --- |
| Couleurs, typographies, boutons, cartes | `src/styles/global.css` |
| En-tête / pied de page | `src/components/Header.astro`, `Footer.astro` |
| Sections de l'accueil | `src/components/` : `Hero`, `Services`, `DiagnosticTeaser`, `Formulas` (modes d'intervention), `About`, `Reasons`, `Journey` (frise), `Cases`, `Zone`, `Network`, `ConseilsTeaser`, `PromiseBand`, `Contact` |
| Articles | `src/content/conseils/*.md` |
| Pages métiers / zones | contenu : `src/content/metiers/`, `src/content/zones/` ; gabarit : `src/components/Landing.astro` |
| Données structurées (SEO) | `src/utils/seo.ts` |
| Animations (apparition, frise automatique, en-tête…) | `src/scripts/main.ts` (rythme de la frise : constantes `TL_STEP_MS`, `TL_END_MS`, `TL_RESUME_MS`) |
| Diagnostic de gestion | page : `src/pages/diagnostic-gestion.astro` ; parcours : `src/components/Diagnostic.astro` ; contenu : `src/data/diagnostic.ts` |
| Bandeau cookies (Calendly) | `src/components/CookieBanner.astro` |
| Photos optimisées | `src/assets/images/` |
| Logo, favicon, image de partage | `public/images/` |

## À compléter

- Téléphone et lien LinkedIn → `src/data/site.ts`
- SIRET, adresse du siège, hébergeur → `src/pages/mentions-legales.astro`
- Faire relire les articles de la rubrique Conseils par Nadège avant la mise en ligne

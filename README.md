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

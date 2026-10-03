# Sérénité Gestion Conseils — site v2

Site construit avec [Astro](https://astro.build) : composants modernes, CSS natif récent,
et un résultat final 100 % statique (HTML/CSS/JS), rapide et facile à héberger.

## Commandes

```bash
npm install        # une seule fois
npm run dev        # aperçu en direct sur http://localhost:4321
npm run build      # génère le site final dans le dossier dist/
npm run preview    # aperçu du site final
```

## Modifier un texte, un numéro, un lien

Tout le contenu est regroupé dans **`src/data/site.ts`** : coordonnées, services,
cas clients, étapes de la frise, partenaires, FAQ…
Les balises `<strong>…</strong>` mettent un mot en gras.

## Mettre en ligne

Lancer `npm run build`, puis envoyer **le contenu du dossier `dist/`** chez l'hébergeur
(FTP, Netlify, Vercel, OVH…). Les adresses sont les mêmes qu'avant :
`/`, `/faq.html`, `/mentions-legales.html`, `/confidentialite.html`.

## Où se trouve quoi

| Élément | Fichier |
| --- | --- |
| Couleurs, typographies, boutons, cartes | `src/styles/global.css` |
| En-tête / pied de page | `src/components/Header.astro`, `Footer.astro` |
| Sections de l'accueil | `src/components/Hero.astro`, `Services.astro`, `About.astro`, `Reasons.astro`, `Journey.astro` (frise), `Cases.astro`, `Network.astro`, `PromiseBand.astro`, `Contact.astro` |
| Animations (apparition, frise, en-tête…) | `src/scripts/main.ts` |
| Bandeau cookies (Calendly) | `src/components/CookieBanner.astro` |
| Photos et logo | `public/images/` |

## À compléter

- Téléphone et lien LinkedIn → `src/data/site.ts`
- SIRET, adresse du siège, hébergeur → `src/pages/mentions-legales.astro`

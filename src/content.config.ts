/**
 * Rubrique "Conseils" : chaque article est un fichier Markdown
 * dans src/content/conseils/. Pour ajouter un article, copier un
 * fichier existant, changer le nom du fichier et l'en-tête (entre les ---).
 * Les photos sont dans src/content/conseils/images/.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const conseils = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/conseils' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      category: z.enum(['Trésorerie', 'Gestion administrative', 'Ressources humaines', 'Pilotage']),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),
      // Photo de couverture (libre de droits) + texte alternatif + crédit
      cover: image().optional(),
      coverAlt: z.string().default(''),
      coverCredit: z.object({ name: z.string(), url: z.string().url() }).optional(),
      // "L'essentiel en 30 secondes" affiché en haut de l'article
      keyPoints: z.array(z.string()).default([]),
      // Article mis en avant en haut de la page Conseils
      featured: z.boolean().default(false),
      // Mettre "true" pour masquer un article sans le supprimer
      draft: z.boolean().default(false),
    }),
});

/**
 * Pages "métiers" (src/content/metiers/) et pages "zones" (src/content/zones/) :
 * des pages d'atterrissage optimisées pour le référencement. L'en-tête décrit les
 * blocs de la page, le texte Markdown en dessous forme la partie rédactionnelle.
 */
const landing = z.object({
  // Titre principal de la page (H1). <em>…</em> = mot clé en orange.
  title: z.string(),
  // Titre affiché dans Google (60 caractères max conseillés)
  seoTitle: z.string().max(65),
  // Description affichée dans Google (155 caractères max conseillés)
  description: z.string().max(160),
  eyebrow: z.string(),
  // Nom court (liens, cartes, fil d'Ariane)
  name: z.string(),
  // Texte de la carte sur la page de regroupement
  cardText: z.string(),
  icon: z.string(),
  order: z.number().default(0),
  lead: z.string(),
  // Puces sous le titre : métiers concernés ou communes desservies
  audience: z.array(z.string()).default([]),
  painsTitle: z.string(),
  pains: z.array(z.object({ icon: z.string(), title: z.string(), text: z.string() })),
  tasksTitle: z.string(),
  tasks: z.array(z.object({ title: z.string(), text: z.string() })),
  // Cas client mis en avant (position dans la liste des cas de site.ts)
  caseIndex: z.number().optional(),
  faq: z.array(z.object({ q: z.string(), a: z.string() })),
  // Articles Conseils associés (noms de fichiers sans .md)
  related: z.array(z.string()).default([]),
});

const metiers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/metiers' }),
  schema: landing,
});

const zones = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/zones' }),
  schema: landing.extend({
    kind: z.enum(['departement', 'ville']),
    // Département de rattachement ("27" ou "76")
    department: z.enum(['27', '76']),
    // Communes desservies (pour la carte et les données structurées)
    communes: z.array(z.string()).default([]),
  }),
});

export const collections = { conseils, metiers, zones };

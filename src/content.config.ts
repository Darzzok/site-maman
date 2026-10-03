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

export const collections = { conseils };

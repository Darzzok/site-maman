/**
 * Rubrique "Conseils" : chaque article est un fichier Markdown
 * dans src/content/conseils/. Pour ajouter un article, copier un
 * fichier existant, changer le nom du fichier et l'en-tête (entre les ---).
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const conseils = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/conseils' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.enum(['Trésorerie', 'Gestion administrative', 'Ressources humaines', 'Pilotage']),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    // Mettre "true" pour masquer un article sans le supprimer
    draft: z.boolean().default(false),
  }),
});

export const collections = { conseils };

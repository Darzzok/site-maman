import { getCollection, type CollectionEntry } from 'astro:content';

export type Conseil = CollectionEntry<'conseils'>;

/** Articles publiés, du plus récent au plus ancien */
export async function getConseils(): Promise<Conseil[]> {
  const all = await getCollection('conseils', ({ data }) => !data.draft);
  return all.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Temps de lecture estimé (environ 220 mots par minute) */
export function readingTime(body = ''): number {
  return Math.max(1, Math.round(body.trim().split(/\s+/).length / 220));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

export const categoryIcon: Record<string, string> = {
  Trésorerie: 'wallet',
  'Gestion administrative': 'file',
  'Ressources humaines': 'users',
  Pilotage: 'chart',
};

export const articleUrl = (entry: Conseil) => `/conseils/${entry.id}.html`;

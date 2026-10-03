import { getCollection, type CollectionEntry } from 'astro:content';

export type Conseil = CollectionEntry<'conseils'>;

/** Articles publiés : à la une d'abord, puis du plus récent au plus ancien */
export async function getConseils(): Promise<Conseil[]> {
  const all = await getCollection('conseils', ({ data }) => !data.draft);
  return all.sort(
    (a, b) =>
      Number(b.data.featured) - Number(a.data.featured) ||
      b.data.date.valueOf() - a.data.date.valueOf() ||
      a.data.title.localeCompare(b.data.title, 'fr'),
  );
}

/** Temps de lecture estimé (environ 200 mots par minute, arrondi au-dessus) */
export function readingTime(body = ''): number {
  return Math.max(1, Math.ceil(body.trim().split(/\s+/).length / 200));
}

export function formatDate(date: Date): string {
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}

/** Identité visuelle de chaque thème (icône + teinte de la couverture) */
export const categories = {
  Trésorerie: { icon: 'wallet', tone: 'blue', slug: 'tresorerie' },
  'Gestion administrative': { icon: 'file', tone: 'terra', slug: 'gestion-administrative' },
  'Ressources humaines': { icon: 'users', tone: 'navy', slug: 'ressources-humaines' },
  Pilotage: { icon: 'chart', tone: 'sage', slug: 'pilotage' },
} as const;

export type Category = keyof typeof categories;

export const categoryIcon: Record<string, string> = Object.fromEntries(
  Object.entries(categories).map(([k, v]) => [k, v.icon]),
);

export const articleUrl = (entry: Conseil) => `/conseils/${entry.id}.html`;

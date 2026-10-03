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

/** Format de lecture selon la durée : Express (≤ 3 min), Guide (4-5 min), Dossier (6 min et +) */
export function lengthFormat(minutes: number) {
  if (minutes <= 3) return { key: 'express', label: 'Express' } as const;
  if (minutes <= 5) return { key: 'guide', label: 'Guide' } as const;
  return { key: 'dossier', label: 'Dossier' } as const;
}

export const lengthFormats = [
  { key: 'express', label: 'Express', hint: '3 min max' },
  { key: 'guide', label: 'Guides', hint: '4 à 5 min' },
  { key: 'dossier', label: 'Dossiers', hint: '6 min et +' },
] as const;

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

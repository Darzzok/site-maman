import { getCollection, type CollectionEntry } from 'astro:content';

export type Metier = CollectionEntry<'metiers'>;
export type ZoneEntry = CollectionEntry<'zones'>;

export const metierUrl = (id: string) => `/metiers/${id}.html`;
export const zoneUrl = (id: string) => `/gestion-administrative/${id}.html`;

/** Pages métiers, dans l'ordre d'affichage */
export async function getMetiers(): Promise<Metier[]> {
  return (await getCollection('metiers')).sort((a, b) => a.data.order - b.data.order);
}

/** Pages locales : villes d'abord, puis départements */
export async function getZones(): Promise<ZoneEntry[]> {
  return (await getCollection('zones')).sort((a, b) => a.data.order - b.data.order);
}

/** Retire les balises du titre (pour les liens et le fil d'Ariane) */
export const plainTitle = (html: string) => html.replace(/<[^>]+>/g, '');

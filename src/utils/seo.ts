/**
 * Données structurées (schema.org) partagées entre les pages.
 * Google lit ces informations pour comprendre l'entreprise, sa zone et ses services.
 */
import { services, site, zone } from '../data/site';

export const businessId = `${site.url}/#entreprise`;

/** Entreprise locale : identité, coordonnées, zone desservie et prestations */
export function businessEntity() {
  const { address } = site;
  return {
    '@type': 'ProfessionalService',
    '@id': businessId,
    name: site.name,
    alternateName: `${site.name} — ${site.owner}`,
    description:
      'Conseil et accompagnement en gestion administrative, trésorerie, recouvrement, ressources humaines et pilotage pour TPE, artisans et professions libérales en Normandie (Eure et Seine-Maritime).',
    slogan: site.promise,
    url: `${site.url}/`,
    logo: `${site.url}/images/logo.png`,
    image: [`${site.url}/images/og-image.jpg`, `${site.url}/images/nadege.jpg`],
    email: site.email,
    ...(site.phoneIsSet ? { telephone: site.phone } : {}),
    priceRange: '€€',
    currenciesAccepted: 'EUR',
    paymentAccepted: 'Virement bancaire',
    address: {
      '@type': 'PostalAddress',
      ...(address.street ? { streetAddress: address.street } : {}),
      ...(address.postalCode ? { postalCode: address.postalCode } : {}),
      ...(address.locality ? { addressLocality: address.locality } : {}),
      addressRegion: zone.region,
      addressCountry: 'FR',
    },
    areaServed: [
      ...zone.departments.map((d) => ({
        '@type': 'AdministrativeArea',
        name: `${d.name} (${d.code})`,
        containedInPlace: { '@type': 'State', name: zone.region },
      })),
      ...zone.departments.flatMap((d) => d.cities.map((c) => ({ '@type': 'City', name: c }))),
    ],
    founder: {
      '@type': 'Person',
      name: site.owner,
      jobTitle: site.role,
      worksFor: { '@id': businessId },
    },
    knowsAbout: services.flatMap((s) => [s.title, ...(s.points ?? [])]),
    knowsLanguage: 'fr',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Prestations de gestion administrative et financière',
      itemListElement: services.map((s) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.title, areaServed: zone.short },
      })),
    },
    ...(site.linkedin.startsWith('http') ? { sameAs: [site.linkedin] } : {}),
  };
}

/** Fil d'Ariane pour Google (le dernier élément est la page courante) */
export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: it.url.startsWith('http') ? it.url : `${site.url}${it.url}`,
    })),
  };
}

/** Questions / réponses visibles sur la page */
export function faqLd(items: { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') },
    })),
  };
}

/** Coupe proprement un texte trop long pour les résultats Google */
export function clampText(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:.–—-]+$/, '')}…`;
}

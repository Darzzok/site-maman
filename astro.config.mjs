// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readdirSync, readFileSync } from 'node:fs';

/**
 * Date de dernière mise à jour de chaque article (champ "updated", sinon "date"),
 * transmise à Google dans le plan du site pour accélérer la prise en compte des modifications.
 */
const articleDates = Object.fromEntries(
  readdirSync('./src/content/conseils')
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const front = readFileSync(`./src/content/conseils/${f}`, 'utf8');
      const date = front.match(/^updated:\s*([\d-]+)/m)?.[1] ?? front.match(/^date:\s*([\d-]+)/m)?.[1];
      return [`/conseils/${f.replace(/\.md$/, '')}.html`, date];
    }),
);

export default defineConfig({
  site: 'https://www.xn--srnitgestionconseils-b2bbd.fr',
  // Génère faq.html, mentions-legales.html… (mêmes adresses que l'ancien site)
  build: { format: 'file' },
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      filter: (page) => !/mentions-legales|confidentialite|404/.test(page),
      serialize: (item) => {
        if (!item.url.endsWith('/') && !item.url.endsWith('.html')) item.url += '.html';
        const path = new URL(item.url).pathname;
        if (articleDates[path]) item.lastmod = new Date(articleDates[path]).toISOString();
        return item;
      },
    }),
  ],
});

// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.xn--srnitgestionconseils-b2bbd.fr',
  // Génère faq.html, mentions-legales.html… (mêmes adresses que l'ancien site)
  build: { format: 'file' },
  devToolbar: { enabled: false },
  integrations: [
    sitemap({
      filter: (page) => !/mentions-legales|confidentialite/.test(page),
      serialize: (item) => {
        if (!item.url.endsWith('/') && !item.url.endsWith('.html')) item.url += '.html';
        return item;
      },
    }),
  ],
});

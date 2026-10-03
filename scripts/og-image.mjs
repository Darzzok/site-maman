// Génère public/images/og-image.jpg (image de partage 1200×630) aux couleurs de la charte SGC.
// Utilisation : node scripts/og-image.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const file = (p) => fileURLToPath(new URL(p, import.meta.url));
const W = 1200;
const H = 630;
const MIRAGE = file('./fonts/mirage-regular.otf');
const GARET = file('./fonts/garet-book.otf');
const GARET_HEAVY = file('./fonts/garet-heavy.otf');

/** Texte rendu avec une police de la charte (Pango) */
const text = (markup, fontfile, font, width) =>
  sharp({ text: { text: markup, fontfile, font, width, rgba: true, dpi: 72, wrap: 'word' } }).png().toBuffer();

const photo = await sharp(file('../public/images/nadege.jpg'))
  .resize(470, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 90 })
  .toBuffer();
const logo = await sharp(file('../public/images/logo-full-white.png')).resize({ width: 300 }).toBuffer();

const title = await text(
  '<span foreground="#ffffff">Concentrez-vous sur\nvotre métier,\n</span><span foreground="#f6b55b">je m’occupe du reste.</span>',
  MIRAGE,
  'MADE Mirage 58',
  640,
);
const subtitle = await text(
  '<span foreground="#f4dbe6">Gestion administrative · Trésorerie · RH &amp; paie\nTPE, artisans et professions libérales</span>',
  GARET,
  'Garet 23',
  640,
);
const badgeText = await text('<span foreground="#ffffff">Normandie · Eure (27) · Seine-Maritime (76)</span>', GARET_HEAVY, 'Garet Heavy 19', 600);
const badgeMeta = await sharp(badgeText).metadata();

const background = Buffer.from(`
<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#61193a"/>
      <stop offset="1" stop-color="#2a0916"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.1" cy="0.05" r="0.75">
      <stop offset="0" stop-color="#e581bc" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#e581bc" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#3d0f23" stop-opacity="1"/>
      <stop offset="0.4" stop-color="#3d0f23" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
</svg>`);
const fade = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="470" height="${H}"><defs><linearGradient id="f" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3d0f23"/><stop offset="0.45" stop-color="#3d0f23" stop-opacity="0"/></linearGradient></defs><rect width="470" height="${H}" fill="url(#f)"/></svg>`,
);
const badgeW = (badgeMeta.width ?? 400) + 56;
const badge = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${badgeW}" height="52"><rect width="${badgeW}" height="52" rx="26" fill="#e97e0d"/></svg>`,
);

await sharp(background)
  .composite([
    { input: photo, left: 730, top: 0 },
    { input: fade, left: 730, top: 0 },
    { input: logo, left: 72, top: 56 },
    { input: title, left: 72, top: 230 },
    { input: subtitle, left: 72, top: 455 },
    { input: badge, left: 72, top: 540 },
    { input: badgeText, left: 100, top: 540 + Math.round((52 - (badgeMeta.height ?? 24)) / 2) },
  ])
  .jpeg({ quality: 86, mozjpeg: true })
  .toFile(file('../public/images/og-image.jpg'));

console.log('og-image.jpg généré');

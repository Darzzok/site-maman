// Génère les déclinaisons du logo SGC à partir de scripts/logo-source.png
// (logo noir sur fond transparent, 2000×1000).
// Utilisation : node scripts/brand-assets.mjs
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const file = (p) => fileURLToPath(new URL(p, import.meta.url));
const SRC = file('./logo-source.png');
const PLUM = { r: 0x61, g: 0x19, b: 0x3a };
const WHITE = { r: 255, g: 255, b: 255 };

// Zones mesurées sur le logo source
const FULL = { left: 279, top: 179, width: 1729 - 279 + 1, height: 850 - 179 + 1 }; // lettres + mots
const MARK = { left: 279, top: 179, width: 1729 - 279 + 1, height: 674 - 179 + 1 }; // lettres SGC seules

/** Recolore le logo (la transparence sert de masque) et le recadre */
async function recolor(area, color, width, pad = 0) {
  const alpha = await sharp(SRC).extract(area).extractChannel('alpha').toBuffer();
  const { width: w, height: h } = area;
  const img = sharp({ create: { width: w, height: h, channels: 3, background: color } }).joinChannel(alpha);
  const buf = await img.png().toBuffer();
  return sharp(buf)
    .extend({ top: pad, bottom: pad, left: pad, right: pad, background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .resize({ width })
    .png({ compressionLevel: 9 });
}

await (await recolor(FULL, PLUM, 1200, 0)).toFile(file('../public/images/logo-full.png'));
await (await recolor(FULL, WHITE, 1200, 0)).toFile(file('../public/images/logo-full-white.png'));
await (await recolor(MARK, PLUM, 600, 0)).toFile(file('../public/images/logo-mark.png'));
await (await recolor(MARK, WHITE, 600, 0)).toFile(file('../public/images/logo-mark-white.png'));

// Logo sur fond blanc (Google, partages)
const fullPlum = await (await recolor(FULL, PLUM, 1000, 0)).toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: WHITE } })
  .composite([{ input: fullPlum, gravity: 'center' }])
  .png()
  .toFile(file('../public/images/logo.png'));

// Favicon et icône Apple : monogramme blanc sur carré prune arrondi
async function icon(size, out) {
  const r = Math.round(size * 0.22);
  const bg = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${r}" fill="#61193a"/></svg>`,
  );
  const mark = await (await recolor(MARK, WHITE, Math.round(size * 0.74), 0)).toBuffer();
  await sharp(bg).composite([{ input: mark, gravity: 'center' }]).png().toFile(out);
}
await icon(96, file('../public/favicon.png'));
await icon(180, file('../public/apple-touch-icon.png'));
await icon(512, file('../public/icon-512.png'));

console.log('Déclinaisons du logo générées');

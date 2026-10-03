// Génère public/images/og-image.jpg (image de partage 1200×630).
// Utilisation : node scripts/og-image.mjs
import sharp from 'sharp';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const file = (p) => fileURLToPath(new URL(p, import.meta.url));

const W = 1200;
const H = 630;
const b64 = (p) => readFileSync(file(p)).toString('base64');

// Photo recadrée en portrait pour la moitié droite
const photo = await sharp(file('../public/images/nadege.jpg'))
  .resize(470, 630, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 90 })
  .toBuffer();

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#002c96"/>
      <stop offset="1" stop-color="#0a1a4f"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.15" cy="0.1" r="0.7">
      <stop offset="0" stop-color="#cb6a33" stop-opacity="0.35"/>
      <stop offset="1" stop-color="#cb6a33" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="fade" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#0a1a4f" stop-opacity="1"/>
      <stop offset="0.35" stop-color="#0a1a4f" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <image x="730" y="0" width="470" height="630" xlink:href="data:image/jpeg;base64,${photo.toString('base64')}"/>
  <rect x="730" y="0" width="470" height="630" fill="url(#fade)"/>

  <image x="72" y="64" width="92" height="72" xlink:href="data:image/png;base64,${b64('../public/images/logo-mark-white.png')}"/>
  <line x1="186" y1="70" x2="186" y2="130" stroke="#ffffff" stroke-opacity="0.3" stroke-width="1.5"/>
  <text x="206" y="104" font-family="Georgia, 'Times New Roman', serif" font-size="34" fill="#ffffff">Sérénité</text>
  <text x="207" y="128" font-family="Arial, sans-serif" font-size="13" letter-spacing="4" fill="#ffffff" fill-opacity="0.65">GESTION CONSEILS</text>

  <text font-family="Georgia, 'Times New Roman', serif" font-size="54" fill="#ffffff">
    <tspan x="72" y="250">Concentrez-vous sur</tspan>
    <tspan x="72" y="314">votre métier,</tspan>
    <tspan x="72" y="378" fill="#9db1ec" font-style="italic">je m’occupe du reste.</tspan>
  </text>

  <text font-family="Arial, sans-serif" font-size="22" fill="#ffffff" fill-opacity="0.8">
    <tspan x="72" y="448">Gestion administrative · Trésorerie · RH &amp; paie</tspan>
    <tspan x="72" y="480">TPE, artisans et professions libérales</tspan>
  </text>

  <rect x="72" y="520" width="440" height="50" rx="25" fill="#cb6a33"/>
  <text x="292" y="552" text-anchor="middle" font-family="Arial, sans-serif" font-weight="bold" font-size="19" fill="#ffffff">Normandie · Eure (27) · Seine-Maritime (76)</text>
</svg>`;

const out = file('../public/images/og-image.jpg');
await sharp(Buffer.from(svg)).jpeg({ quality: 86, mozjpeg: true }).toFile(out);
console.log('og-image.jpg généré');

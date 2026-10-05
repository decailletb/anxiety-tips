// Génère les icônes PNG de l'application (192 et 512 px) dans public/.
// Aucune dépendance : dessin pixel par pixel + encodeur PNG minimal (zlib de Node).
// Même motif que favicon.svg : fond sauge plein, vague claire au centre.
// Usage (une fois, ou après un changement de couleur) : node scripts/make-icons.mjs
// Les PNG produits sont commités ; ce script ne tourne pas au build.
import { writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';

const BG = [0x46, 0x68, 0x4f]; // sauge (--accent)
const FG = [0xf7, 0xf3, 0xec]; // sable (--bg)

// Vague : sinusoïde sur la zone centrale (dans la « zone sûre » des icônes masquables).
function inWave(x, y, size) {
  const u = x / size; // 0..1
  const v = y / size;
  if (u < 0.22 || u > 0.78) return 0;
  const center = 0.54 - 0.09 * Math.sin(((u - 0.22) / 0.56) * 2 * Math.PI);
  const half = 0.045;
  const d = Math.abs(v - center);
  // Bord adouci sur ~1 px
  const edge = 1 / size;
  if (d <= half - edge) return 1;
  if (d >= half + edge) return 0;
  return (half + edge - d) / (2 * edge);
}

function crc32(buf) {
  let c = ~0;
  for (const b of buf) {
    c ^= b;
    for (let k = 0; k < 8; k++) c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
  }
  return ~c >>> 0;
}

function chunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const td = Buffer.concat([Buffer.from(type, 'ascii'), data]);
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(td));
  return Buffer.concat([len, td, crc]);
}

function png(size) {
  const row = size * 3 + 1;
  const raw = Buffer.alloc(row * size);
  for (let y = 0; y < size; y++) {
    raw[y * row] = 0; // filtre : aucun
    for (let x = 0; x < size; x++) {
      // Sur-échantillonnage 2x2 pour lisser la courbe
      let a = 0;
      for (const [dx, dy] of [[0.25, 0.25], [0.75, 0.25], [0.25, 0.75], [0.75, 0.75]]) a += inWave(x + dx, y + dy, size);
      a /= 4;
      const o = y * row + 1 + x * 3;
      for (let i = 0; i < 3; i++) raw[o + i] = Math.round(BG[i] * (1 - a) + FG[i] * a);
    }
  }
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // profondeur
  ihdr[9] = 2; // RGB
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ]);
}

for (const size of [192, 512]) {
  const file = new URL(`../public/icon-${size}.png`, import.meta.url);
  writeFileSync(file, png(size));
  console.log(`écrit public/icon-${size}.png`);
}

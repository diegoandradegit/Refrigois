// Gera variantes AVIF e WebP das fotos do site em 3 larguras (480/960/1600),
// gravando ao lado dos originais dentro de dist/. Os .jpg originais NÃO são
// tocados nem removidos — continuam servindo de fallback para navegadores
// antigos e para o caso de este script falhar.
//
// Roda depois do "vite build" e antes do prerender. Se a dependência `sharp`
// não estiver instalada, o script apenas avisa e sai com sucesso: o build não
// pode quebrar por causa de otimização de imagem.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST_IMAGES = path.join(ROOT, 'dist', 'images');

const WIDTHS = [480, 960, 1600];
const SOURCE_EXT = /\.(jpe?g|png)$/i;

let sharp;
try {
  ({ default: sharp } = await import('sharp'));
} catch {
  console.log('  ⚠ sharp não instalado — pulando otimização de imagens (originais mantidos).');
  process.exit(0);
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(full);
    return SOURCE_EXT.test(entry.name) ? [full] : [];
  });
}

const files = walk(DIST_IMAGES);
let created = 0;
let skipped = 0;

for (const file of files) {
  const base = file.replace(SOURCE_EXT, '');
  let meta;
  try {
    meta = await sharp(file).metadata();
  } catch {
    continue;
  }

  for (const width of WIDTHS) {
    // Não faz upscale: se a foto original é menor que a largura alvo, a
    // variante sai no tamanho original mesmo (withoutEnlargement).
    // Só WebP. AVIF comprime um pouco melhor, mas é MUITO mais lento de
    // codificar — com ~135 fotos o build passava do tempo limite do Netlify.
    // WebP roda em segundos e é suportado por praticamente todos os
    // navegadores em uso hoje.
    for (const [ext, options] of [
      ['webp', { quality: 72 }],
    ]) {
      const out = `${base}-${width}.${ext}`;
      if (fs.existsSync(out)) {
        skipped += 1;
        continue;
      }
      try {
        await sharp(file)
          .resize({ width, withoutEnlargement: true })
          .toFormat(ext, options)
          .toFile(out);
        created += 1;
      } catch (err) {
        console.log(`  ⚠ falha ao gerar ${path.basename(out)}: ${err.message}`);
      }
    }
  }
}

console.log(`  ✓ imagens otimizadas: ${created} variantes geradas (${skipped} já existiam, ${files.length} originais preservados)`);

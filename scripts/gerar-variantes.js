// Gera as versoes .webp (640 e 1280) das imagens que ainda nao tem, e anota
// quais existem em generated/variantes.json.
//
// Por que o registro: o SmartImage monta um <picture> apontando para essas
// versoes. Quando o arquivo nao existe, o navegador prefere o <source> e a
// imagem simplesmente nao carrega — nao ha volta para o <img> de baixo.
// Com o registro, o componente so usa <picture> para imagem que realmente
// tem variante; o resto e servido direto.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const IMAGENS = path.join(ROOT, 'public', 'images');

const LARGURAS = [640, 1280];

let sharp;
try {
  ({ default: sharp } = await import('sharp'));
} catch {
  console.log('  ⚠ sharp indisponivel — imagens serao servidas sem variante .webp');
  fs.writeFileSync(path.join(ROOT, 'generated', 'variantes.json'), '[]');
  process.exit(0);
}

/** Lista recursivamente os arquivos de imagem originais. */
function listar(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const cheio = path.join(dir, e.name);
    if (e.isDirectory()) return listar(cheio);
    return /\.(jpe?g|png)$/i.test(e.name) ? [cheio] : [];
  });
}

const originais = listar(IMAGENS);
const comVariante = [];
let geradas = 0;
let falhas = 0;

for (const arquivo of originais) {
  const base = arquivo.replace(/\.(jpe?g|png)$/i, '');
  const publico = '/' + path.relative(path.join(ROOT, 'public'), arquivo).split(path.sep).join('/');

  try {
    for (const largura of LARGURAS) {
      const destino = `${base}-${largura}.webp`;
      if (fs.existsSync(destino)) continue;

      // withoutEnlargement: imagem menor que a largura alvo nao e esticada,
      // o que so aumentaria o peso sem ganho de qualidade.
      await sharp(arquivo)
        .resize(largura, null, { withoutEnlargement: true })
        .webp({ quality: 82 })
        .toFile(destino);
      geradas++;
    }
    comVariante.push(publico);
  } catch {
    falhas++;
  }
}

fs.mkdirSync(path.join(ROOT, 'generated'), { recursive: true });
fs.writeFileSync(
  path.join(ROOT, 'generated', 'variantes.json'),
  JSON.stringify(comVariante.sort(), null, 1)
);

console.log(
  `  ✓ ${comVariante.length} imagens com variante .webp` +
  (geradas ? ` (${geradas} gerada(s) agora)` : '') +
  (falhas ? ` — ${falhas} sem variante, serao servidas direto` : '')
);

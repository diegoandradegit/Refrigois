// Gera o cartao de compartilhamento (1200x630) de cada projeto e artigo a
// partir da foto de capa, no padrao definido: foto recortada em paisagem com
// a faixa da marca no topo.
//
// So gera para quem NAO tem arte propria enviada pelo painel. Item novo
// criado no painel ja nasce com cartao, sem ninguem precisar desenhar nada.
//
// Se o sharp nao estiver disponivel ou algo falhar, o script nao derruba o
// build: ele apenas nao registra o cartao, e o prerender usa a propria foto
// de capa como imagem de compartilhamento. Pior caso, o corte fica por conta
// da rede social — nunca fica sem imagem.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

const L = 1200;
const A = 630;

let sharp;
try {
  ({ default: sharp } = await import('sharp'));
} catch {
  console.log('  ⚠ sharp indisponivel — cartoes de compartilhamento usarao a foto de capa');
  fs.writeFileSync(path.join(ROOT, 'generated/og.json'), '{}');
  process.exit(0);
}

// Faixa da marca. Sem o titulo: o WhatsApp ja mostra o titulo abaixo da
// imagem, e repetir cobriria justamente o equipamento da foto.
const faixa = Buffer.from(`
<svg width="${L}" height="${A}" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="${L}" height="78" fill="#0f172a"/>
  <text x="48" y="52" font-family="Arial, Helvetica, sans-serif" font-size="30"
        font-weight="bold" fill="#ffffff" letter-spacing="1">REFRIGÓIS</text>
  <text x="${L - 48}" y="50" font-family="Arial, Helvetica, sans-serif" font-size="24"
        font-weight="bold" fill="#7dd3fc" text-anchor="end">refrigois.com.br</text>
</svg>`);

async function gerar(origem, saida) {
  const arquivo = path.join(DIST, origem.replace(/^\//, ''));
  if (!fs.existsSync(arquivo)) return false;

  const destino = path.join(DIST, 'og', saida);
  fs.mkdirSync(path.dirname(destino), { recursive: true });

  await sharp(arquivo)
    // position 'attention' evita cortar o equipamento ao passar de retrato
    // para paisagem: o recorte segue a regiao de maior detalhe da foto.
    .resize(L, A, { fit: 'cover', position: 'attention' })
    .composite([{ input: faixa, top: 0, left: 0 }])
    .jpeg({ quality: 86, progressive: true })
    .toFile(destino);

  return true;
}

const projetos = JSON.parse(fs.readFileSync(path.join(ROOT, 'generated/projetos.json'), 'utf-8'));
const artigos = JSON.parse(fs.readFileSync(path.join(ROOT, 'generated/artigos.json'), 'utf-8'));
const { categorias, servicos } = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'generated/servicos.json'), 'utf-8')
);

const mapa = {};
let feitos = 0;
let falhas = 0;

for (const p of projetos) {
  if (p.ogImage) continue;
  const nome = `projeto-${p.slug}.jpg`;
  try {
    if (await gerar(p.image, nome)) {
      mapa[`projetos/${p.slug}`] = `/og/${nome}`;
      feitos++;
    } else falhas++;
  } catch {
    falhas++;
  }
}

for (const a of artigos) {
  if (a.ogImage || !a.image) continue;
  const nome = `blog-${a.slug}.jpg`;
  try {
    if (await gerar(a.image, nome)) {
      mapa[`blog/${a.slug}`] = `/og/${nome}`;
      feitos++;
    } else falhas++;
  } catch {
    falhas++;
  }
}

// Servicos e categorias criados pelo painel nao tem cartao versionado no
// repositorio, entao sao gerados aqui a partir da propria foto. Os que ja
// tem arquivo em public/og/ sao mantidos como estao.
for (const c of categorias) {
  if (c.ogImage || !c.image) continue;
  const nome = `servicos-${c.slug}.jpg`;
  if (fs.existsSync(path.join(DIST, 'og', nome))) continue;
  try {
    if (await gerar(c.image, nome)) feitos++;
    else falhas++;
  } catch {
    falhas++;
  }
}

for (const sv of servicos) {
  if (sv.ogImage || !sv.image) continue;
  const nome = `servicos-${sv.categorySlug}-${sv.slug}.jpg`;
  if (fs.existsSync(path.join(DIST, 'og', nome))) continue;
  try {
    if (await gerar(sv.image, nome)) feitos++;
    else falhas++;
  } catch {
    falhas++;
  }
}

fs.writeFileSync(path.join(ROOT, 'generated/og.json'), JSON.stringify(mapa, null, 1));
console.log(`  ✓ ${feitos} cartoes de compartilhamento gerados${falhas ? ` (${falhas} usarao a foto de capa)` : ''}`);

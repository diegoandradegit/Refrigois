// Converte o data.ts em generated/servicos.json para o prerender consumir.
//
// Antes o prerender mantinha uma copia dos titulos e descricoes dos servicos
// dentro dele. Duas fontes para a mesma informacao significa uma delas ficar
// velha — e foi exatamente o que aconteceu com o blog.
//
// Quando os servicos passarem para o banco, este script sai e o
// sync-conteudo.js grava o mesmo arquivo.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { build } from 'esbuild';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const temp = path.join(ROOT, 'generated', '.data.mjs');

await build({
  entryPoints: [path.join(ROOT, 'data.ts')],
  outfile: temp,
  bundle: true,
  format: 'esm',
  platform: 'node',
  logLevel: 'error',
  loader: { '.json': 'json' },
});

const { servicesData, serviceCategoriesData } = await import(pathToFileURL(temp).href);

const saida = servicesData.map((s) => ({
  key: `${s.categorySlug}/${s.slug}`,
  title: s.seoTitle || `${s.title} | Refrigóis`,
  description: s.seoDescription || s.description,
  image: `/og/servicos-${s.categorySlug}-${s.slug}.jpg`,
  serviceTitle: s.title,
  faq: s.faq || [],
}));

fs.writeFileSync(
  path.join(ROOT, 'generated', 'servicos.json'),
  JSON.stringify({ categorias: serviceCategoriesData, servicos: saida }, null, 1)
);
fs.unlinkSync(temp);

const comFaq = saida.filter((s) => s.faq.length).length;
console.log(`  ✓ ${saida.length} servicos exportados (${comFaq} com FAQ propria)`);

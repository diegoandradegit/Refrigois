// Compara o sitemap recem-gerado com o do site que esta no ar.
// Se alguma URL indexada desaparecer sem ter sido despublicada de proposito,
// o build para. Build que para nao publica, entao o site continua intacto.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const novo = path.join(ROOT, 'dist', 'sitemap.xml');
const referencia = path.join(ROOT, 'generated', 'sitemap-anterior.xml');

function urls(arquivo) {
  if (!fs.existsSync(arquivo)) return null;
  return new Set(
    [...fs.readFileSync(arquivo, 'utf-8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
  );
}

const atuais = urls(novo);
if (!atuais) {
  console.error('\n  BUILD INTERROMPIDO: o sitemap nao foi gerado.\n');
  process.exit(1);
}

const anteriores = urls(referencia);

// Enderecos que sairam do ar de proposito, pelo painel
const despublicados = new Set(
  JSON.parse(fs.readFileSync(path.join(ROOT, 'generated/despublicados.json'), 'utf-8'))
    .map((d) => `https://refrigois.com.br${d.url}`)
);

if (anteriores) {
  const sumiram = [...anteriores].filter((u) => !atuais.has(u) && !despublicados.has(u));

  if (sumiram.length) {
    console.error('\n──────────────────────────────────────────────');
    console.error('  BUILD INTERROMPIDO: paginas sumiriam do site');
    console.error('──────────────────────────────────────────────');
    console.error(`  ${sumiram.length} endereco(s) que hoje estao no ar deixariam de existir,`);
    console.error('  sem terem sido despublicados pelo painel:\n');
    sumiram.slice(0, 10).forEach((u) => console.error(`    ${u}`));
    if (sumiram.length > 10) console.error(`    ... e mais ${sumiram.length - 10}`);
    console.error('\n  Isso costuma acontecer quando o endereco (slug) de um item publicado');
    console.error('  foi alterado no painel. Endereco ja indexado no Google nao deve mudar.');
    console.error('\n  O que fazer: volte o slug ao valor anterior no painel, ou, se a mudanca');
    console.error('  for mesmo necessaria, despublique o item antigo escolhendo "Redirecionar".');
    console.error('\n  O site que esta no ar NAO foi alterado.\n');
    process.exit(1);
  }

  const novas = [...atuais].filter((u) => !anteriores.has(u));
  console.log(`  ✓ sitemap conferido: ${atuais.size} URLs (${novas.length} nova(s), nenhuma perdida)`);
} else {
  console.log(`  ✓ sitemap com ${atuais.size} URLs (primeira verificacao, sem base de comparacao)`);
}

// Guarda a referencia para a proxima publicacao
fs.mkdirSync(path.dirname(referencia), { recursive: true });
fs.copyFileSync(novo, referencia);

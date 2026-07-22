// Trata os enderecos despublicados. Item que sai do ar nao pode virar erro 404:
// a URL pode ja estar indexada no Google e receber visita.
//
// "encerrado" -> 410, que diz ao Google que a pagina acabou de vez
// "redirect"  -> 301 para o destino escolhido no painel

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const despublicados = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'generated/despublicados.json'), 'utf-8')
);

const arquivo = path.join(ROOT, 'dist', '_redirects');
const existente = fs.existsSync(arquivo) ? fs.readFileSync(arquivo, 'utf-8') : '';

const linhas = despublicados.map((d) =>
  d.modo === 'redirect' && d.destino
    ? `${d.url}  ${d.destino}  301!`
    : `${d.url}  /404.html  410!`
);

if (linhas.length) {
  fs.writeFileSync(
    arquivo,
    `${linhas.join('\n')}\n\n# regras originais do site\n${existente}`
  );
  console.log(`  ✓ ${linhas.length} endereco(s) despublicado(s) tratado(s) sem gerar 404`);
}

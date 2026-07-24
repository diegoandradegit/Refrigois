// Junta num arquivo so todas as perguntas ja respondidas no site — servicos,
// produtos e artigos — para o tira-duvidas responder a partir delas.
//
// Sem IA nenhuma nesta versao: as respostas sao exatamente as que a equipe
// escreveu e revisou. Isso elimina de saida o risco de inventar medida, prazo
// ou preco, que e o problema mais caro de um chat automatico.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const G = path.join(ROOT, 'generated');

const ler = (nome) => JSON.parse(fs.readFileSync(path.join(G, nome), 'utf-8'));

const { servicos } = ler('servicos.json');
const { produtos } = ler('produtos.json');
const artigos = ler('artigos.json');

const perguntas = [];

for (const s of servicos) {
  for (const f of s.faq ?? []) {
    perguntas.push({
      q: f.q, a: f.a,
      origem: s.title,
      url: `/servicos/${s.categorySlug}/${s.slug}`,
    });
  }
}

for (const p of produtos) {
  for (const f of p.faq ?? []) {
    perguntas.push({ q: f.q, a: f.a, origem: p.title, url: `/produtos/${p.slug}` });
  }
}

for (const a of artigos) {
  for (const f of a.faq ?? []) {
    perguntas.push({ q: f.q, a: f.a, origem: a.title, url: `/blog/${a.slug}` });
  }
}

// Perguntas gerais que ninguem escreveu numa FAQ especifica, mas que sao das
// mais feitas. As respostas nao inventam numero: mandam para o orcamento, que
// e onde a resposta real existe.
const GERAIS = [
  {
    q: 'Vocês atendem em qual região?',
    a: 'Maringá e região, com atendimento em todo o Paraná para projetos agendados. ' +
       'Já executamos obras em Guaíra, Cascavel, Londrina e Foz do Iguaçu. ' +
       'Diga onde fica o estabelecimento que confirmamos o atendimento.',
    origem: 'Área de atendimento',
    url: '/contato',
  },
  {
    q: 'Quanto custa? Vocês têm tabela de preços?',
    a: 'Não trabalhamos com tabela fixa porque todo equipamento é fabricado sob medida — ' +
       'o valor depende das medidas, do acabamento e do sistema definidos no levantamento. ' +
       'Descreva o que precisa que a equipe retorna com o orçamento.',
    origem: 'Orçamento',
    url: '/contato',
  },
  {
    q: 'Qual o prazo de entrega?',
    a: 'O prazo varia com o tipo de equipamento, as medidas e a fila de produção no momento ' +
       'do pedido, por isso ele é informado junto com o orçamento, e não antes. ' +
       'Fale com a equipe para uma previsão do seu caso.',
    origem: 'Prazos',
    url: '/contato',
  },
  {
    q: 'Os equipamentos têm garantia?',
    a: 'Sim. O prazo de garantia consta na ficha de cada serviço e equipamento — ' +
       'na instalação de câmara fria, por exemplo, são 12 meses para a instalação completa. ' +
       'A garantia do seu caso é confirmada junto com o orçamento.',
    origem: 'Garantia',
    url: '/contato',
  },
  {
    q: 'Como peço um orçamento?',
    a: 'Pelo WhatsApp ou pelo formulário do site. Ajuda muito já dizer: o que será armazenado ' +
       'ou exposto, em que temperatura, as medidas do espaço e a cidade. ' +
       'Com isso a resposta sai direto com especificação, sem ida e volta.',
    origem: 'Orçamento',
    url: '/contato',
  },
];

perguntas.push(...GERAIS);

fs.writeFileSync(path.join(G, 'perguntas.json'), JSON.stringify(perguntas, null, 1));
console.log(`  ✓ ${perguntas.length} perguntas indexadas para o tira-duvidas`);

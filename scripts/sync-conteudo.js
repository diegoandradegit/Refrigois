// Busca no Supabase o conteudo publicado (projetos, fotos e artigos) e grava
// os arquivos que o site consome. Roda ANTES do "vite build".
//
// Por que gerar arquivos em vez de o site consultar o banco no navegador:
// o site continua 100% estatico. O visitante e o Google recebem HTML pronto,
// sem nenhuma chamada ao banco. Isso preserva a performance e o SEO.
//
// Se a busca falhar, o script encerra com erro e o build para. Build que para
// nao publica, entao o site que esta no ar continua intacto.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const GERADOS = path.join(ROOT, 'generated');
const UPLOADS = path.join(ROOT, 'public', 'images', 'uploads');
const OG_DIR = path.join(ROOT, 'public', 'og');

// Chave publicavel (nao e segredo): quem a usa so enxerga o que esta
// publicado, porque as politicas de acesso do banco limitam a leitura.
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://mpdlwheqvggbfxkhbtqg.supabase.co';
const SUPABASE_KEY = process.env.SUPABASE_KEY || 'sb_publishable_q_8gdU0dUXW-8BGvCWKhGg_NvMnakLs';

const cabecalhos = {
  apikey: SUPABASE_KEY,
  Authorization: `Bearer ${SUPABASE_KEY}`,
  Accept: 'application/json',
};

/** Encerra o build com uma mensagem que explica o problema e a saida. */
function pare(titulo, detalhe, oQueFazer) {
  console.error('\n──────────────────────────────────────────────');
  console.error(`  BUILD INTERROMPIDO: ${titulo}`);
  console.error('──────────────────────────────────────────────');
  if (detalhe) console.error(`  ${detalhe}`);
  if (oQueFazer) console.error(`\n  O que fazer: ${oQueFazer}`);
  console.error('\n  O site que esta no ar NAO foi alterado.\n');
  process.exit(1);
}

async function consultar(caminho, descricao) {
  const url = `${SUPABASE_URL}/rest/v1/${caminho}`;
  let resposta;
  try {
    resposta = await fetch(url, { headers: cabecalhos });
  } catch (e) {
    pare(
      'nao foi possivel falar com o banco de dados',
      `Falha de rede ao buscar ${descricao}: ${e.message}`,
      'Tente publicar de novo em alguns minutos. Se persistir, verifique se o projeto Supabase esta ativo.'
    );
  }
  if (!resposta.ok) {
    pare(
      'o banco de dados recusou a consulta',
      `${descricao} respondeu ${resposta.status}.`,
      'Verifique se as politicas de leitura publica do Supabase continuam ativas.'
    );
  }
  return resposta.json();
}

/** Baixa um arquivo do Storage para dentro do site. */
async function baixarDoStorage(caminho, destino) {
  const url = `${SUPABASE_URL}/storage/v1/object/public/fotos/${caminho}`;
  const r = await fetch(url);
  if (!r.ok) return false;
  fs.mkdirSync(path.dirname(destino), { recursive: true });
  fs.writeFileSync(destino, Buffer.from(await r.arrayBuffer()));
  return true;
}

/**
 * Resolve o endereco de uma imagem.
 * Caminhos que comecam com "/" ja vivem no site desde antes do painel.
 * Os demais estao no Storage e sao trazidos para o dominio, para o site
 * nunca depender de outro servidor para carregar imagem.
 */
async function resolverImagem(caminho, baixados) {
  if (!caminho) return null;
  if (caminho.startsWith('/')) return caminho;

  const seguro = caminho.replace(/[^a-zA-Z0-9._/-]/g, '_');
  const destino = path.join(UPLOADS, seguro);
  const publico = `/images/uploads/${seguro}`;

  if (fs.existsSync(destino)) return publico;
  const ok = await baixarDoStorage(caminho, destino);
  if (!ok) {
    console.warn(`  ⚠ imagem nao encontrada no Storage: ${caminho}`);
    return null;
  }
  baixados.push(publico);
  return publico;
}

/** Converte os blocos do painel para o formato que o site renderiza. */
function converterBlocos(blocos, mapaImagens) {
  return (blocos || []).map((b) => {
    const saida = {};
    if (b.heading) saida.heading = b.heading;

    if (b.tipo === 'paragrafo' && b.texto) saida.paragraphs = [b.texto];

    if (b.tipo === 'lista') {
      saida.list = {
        ...(b.titulo ? { title: b.titulo } : {}),
        items: b.itens || [],
        ...(b.ordenada ? { ordered: true } : {}),
      };
    }

    if (b.tipo === 'tabela') {
      saida.table = {
        ...(b.legenda ? { caption: b.legenda } : {}),
        headers: b.colunas || [],
        rows: b.linhas || [],
      };
    }

    if (b.tipo === 'imagem' && b.src) {
      saida.image = {
        src: mapaImagens.get(b.src) || b.src,
        alt: b.alt || '',
        ...(b.legenda ? { caption: b.legenda } : {}),
      };
    }

    if (b.tipo === 'callout') {
      saida.callout = {
        kind: b.estilo === 'atencao' ? 'atencao' : 'dica',
        title: b.titulo || '',
        text: b.texto || '',
      };
    }

    return saida;
  }).filter((b) => Object.keys(b).length > 0);
}

async function run() {
  console.log('Buscando conteudo publicado no banco...');

  const [segmentos, projetos, fotos, categorias, artigos] = await Promise.all([
    consultar('segmentos?select=id,slug,nome,ordem&order=ordem', 'segmentos'),
    consultar(
      'projetos?select=id,slug,titulo,segmento_id,cliente,descricao,prazo,local,features,seo_titulo,seo_descricao,og_imagem,destaque_home,ordem,publicado,ao_despublicar,redirect_destino&order=ordem',
      'projetos'
    ),
    consultar('projeto_fotos?select=projeto_id,caminho,alt,legenda,ordem,capa&order=ordem', 'fotos'),
    consultar('blog_categorias?select=id,slug,titulo,descricao,ordem&order=ordem', 'categorias do blog'),
    consultar(
      'artigos?select=id,slug,titulo,categoria_id,resumo,conteudo,destaques,faq,capa,capa_alt,seo_titulo,seo_descricao,og_imagem,minutos_leitura,projeto_relacionado_id,publicado,publicado_em,atualizado_em,ao_despublicar,redirect_destino&order=publicado_em.desc',
      'artigos'
    ),
  ]);

  const publicados = projetos.filter((p) => p.publicado);
  const artigosPublicados = artigos.filter((a) => a.publicado);

  if (publicados.length === 0 && artigosPublicados.length === 0) {
    pare(
      'nenhum conteudo publicado foi encontrado',
      'O banco respondeu, mas nao ha projetos nem artigos marcados como publicados.',
      'Verifique no painel se os itens estao com "Publicado no site" marcado.'
    );
  }

  const baixados = [];
  const mapaImagens = new Map();

  // ---------- PROJETOS ----------
  const segPorId = new Map(segmentos.map((s) => [s.id, s]));
  const fotosPorProjeto = new Map();
  for (const f of fotos) {
    if (!fotosPorProjeto.has(f.projeto_id)) fotosPorProjeto.set(f.projeto_id, []);
    fotosPorProjeto.get(f.projeto_id).push(f);
  }

  const projetosSaida = [];
  for (const p of publicados) {
    const seg = segPorId.get(p.segmento_id);
    const lista = (fotosPorProjeto.get(p.id) || []).sort((a, b) => a.ordem - b.ordem);

    const photos = [];
    for (const f of lista) {
      const src = await resolverImagem(f.caminho, baixados);
      if (!src) continue;
      mapaImagens.set(f.caminho, src);
      photos.push({ src, alt: f.alt, ...(f.legenda ? { caption: f.legenda } : {}) });
    }

    const capa = lista.find((f) => f.capa) || lista[0];
    const capaSrc = capa ? mapaImagens.get(capa.caminho) : null;

    if (!capaSrc) {
      console.warn(`  ⚠ projeto "${p.titulo}" sem foto utilizavel — sera ignorado`);
      continue;
    }

    projetosSaida.push({
      id: p.id,
      slug: p.slug,
      title: p.titulo,
      category: seg?.nome ?? '',
      categorySlug: seg?.slug ?? '',
      image: capaSrc,
      imageAlt: capa.alt,
      description: p.descricao ?? undefined,
      client: p.cliente ?? undefined,
      duration: p.prazo ?? undefined,
      local: p.local ?? undefined,
      features: p.features ?? [],
      photos,
      seoTitle: p.seo_titulo ?? undefined,
      seoDescription: p.seo_descricao ?? undefined,
      destaqueHome: p.destaque_home,
      ordem: p.ordem,
      ogImage: p.og_imagem ? await resolverImagem(p.og_imagem, baixados) : undefined,
    });
  }

  // ---------- ARTIGOS ----------
  const catPorId = new Map(categorias.map((c) => [c.id, c]));
  const projetoPorId = new Map(projetos.map((p) => [p.id, p]));

  const artigosSaida = [];
  for (const a of artigosPublicados) {
    const cat = catPorId.get(a.categoria_id);

    // Resolve as imagens do corpo antes de converter os blocos
    for (const b of a.conteudo || []) {
      if (b.tipo === 'imagem' && b.src && !mapaImagens.has(b.src)) {
        const src = await resolverImagem(b.src, baixados);
        if (src) mapaImagens.set(b.src, src);
      }
    }

    const capa = await resolverImagem(a.capa, baixados);

    artigosSaida.push({
      id: a.id,
      slug: a.slug,
      title: a.titulo,
      metaTitle: a.seo_titulo || `${a.titulo} | Refrigóis`,
      description: a.seo_descricao || a.resumo || '',
      excerpt: a.resumo || '',
      content: converterBlocos(a.conteudo, mapaImagens),
      image: capa || '',
      imageAlt: a.capa_alt ?? undefined,
      publishedAt: (a.publicado_em || '').slice(0, 10),
      updatedAt: (a.atualizado_em || '').slice(0, 10),
      category: cat?.titulo ?? '',
      categorySlug: cat?.slug ?? '',
      relatedProjectSlug: a.projeto_relacionado_id
        ? projetoPorId.get(a.projeto_relacionado_id)?.slug
        : undefined,
      keyTakeaways: a.destaques ?? [],
      faq: a.faq ?? [],
      readingMinutes: a.minutos_leitura ?? undefined,
      ogImage: a.og_imagem ? await resolverImagem(a.og_imagem, baixados) : undefined,
    });
  }

  // ---------- ENDERECOS DESPUBLICADOS ----------
  // Item que sai do ar nao pode virar erro 404: a URL ja pode estar indexada.
  const despublicados = [
    ...projetos.filter((p) => !p.publicado).map((p) => ({ url: `/projetos/${p.slug}`, ...p })),
    ...artigos.filter((a) => !a.publicado).map((a) => ({ url: `/blog/${a.slug}`, ...a })),
  ].map((item) => ({
    url: item.url,
    modo: item.ao_despublicar || 'encerrado',
    destino: item.redirect_destino || null,
  }));

  // ---------- GRAVACAO ----------
  fs.mkdirSync(GERADOS, { recursive: true });
  fs.writeFileSync(path.join(GERADOS, 'projetos.json'), JSON.stringify(projetosSaida, null, 1));
  fs.writeFileSync(path.join(GERADOS, 'artigos.json'), JSON.stringify(artigosSaida, null, 1));
  fs.writeFileSync(
    path.join(GERADOS, 'categorias.json'),
    JSON.stringify(
      categorias.map((c) => ({ slug: c.slug, title: c.titulo, description: c.descricao ?? '' })),
      null,
      1
    )
  );
  fs.writeFileSync(path.join(GERADOS, 'despublicados.json'), JSON.stringify(despublicados, null, 1));

  console.log(`  ✓ ${projetosSaida.length} projetos, ${projetosSaida.reduce((n, p) => n + p.photos.length, 0)} fotos`);
  console.log(`  ✓ ${artigosSaida.length} artigos, ${artigosSaida.reduce((n, a) => n + a.content.length, 0)} blocos`);
  if (baixados.length) console.log(`  ✓ ${baixados.length} imagens trazidas do Storage`);
  if (despublicados.length) console.log(`  ✓ ${despublicados.length} enderecos despublicados a tratar`);
}

await run();

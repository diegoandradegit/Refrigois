// Gera um index.html estático por rota dentro de dist/, com as meta tags
// corretas (title, description, Open Graph, Twitter Card, canonical) já
// embutidas. Necessário porque este é um SPA (React Router) e robôs de
// redes sociais (WhatsApp, Facebook, Twitter, LinkedIn...) não executam
// o JavaScript da página — eles só leem o HTML bruto que o servidor
// devolve. Sem isso, toda rota compartilhada mostra a mesma prévia da
// home. O usuário real continua recebendo o app React normal, que
// assume o controle assim que o JS carrega (hidratação client-side).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SITE_URL = 'https://refrigois.com.br';

const STATIC_PAGES = {
  '/servicos': {
    title: 'Serviços de Refrigeração Comercial e Industrial | Refrigóis',
    description: 'Câmara fria (instalação, fabricação, manutenção, reforma, higienização) e refrigeração comercial (freezer, geladeira, balcão, expositor e mais) em Maringá.',
    image: '/og/servicos.jpg',
  },
  '/projetos': {
    title: 'Projetos e Obras Realizadas | Refrigóis',
    description: 'Veja projetos de refrigeração comercial e industrial já entregues pela Refrigóis para supermercados, açougues, padarias, restaurantes e distribuidoras.',
    image: '/og/projetos.jpg',
  },
  '/produtos': {
    title: 'Catálogo de Produtos de Refrigeração Comercial | Refrigóis',
    description: 'Balcão refrigerado, vitrine, ilha de congelados, expositor vertical de bebidas e mais equipamentos de refrigeração comercial fabricados sob medida.',
    image: '/og/produtos.jpg',
  },
  '/contato': {
    title: 'Contato e Orçamento | Refrigóis',
    description: 'Fale com a Refrigóis e solicite um orçamento para refrigeração comercial e industrial em Maringá e região. Atendimento rápido via WhatsApp.',
    image: '/og/contato.jpg',
  },
  '/blog': {
    title: 'Blog | Dicas de Refrigeração Comercial e Câmara Fria | Refrigóis',
    description: 'Artigos sobre manutenção de câmara fria, refrigeração comercial, freezer e geladeira comercial — dicas técnicas da Refrigóis para o seu negócio.',
    image: '/og/blog.jpg',
  },
  '/solucoes': {
    title: 'Soluções por Segmento | Refrigóis',
    description: 'Refrigeração comercial para o seu tipo de negócio: açougue, supermercado, restaurante, padaria, distribuidora de bebidas, farmácia e sorveteria.',
    image: '/og/solucoes.jpg',
  },
  '/politica-de-privacidade': {
    title: 'Política de Privacidade | Refrigóis',
    description: 'Política de Privacidade da Refrigóis: como coletamos, usamos e protegemos seus dados, em conformidade com a LGPD.',
    image: '/og/home.jpg',
  },
  '/termos-de-uso': {
    title: 'Termos de Uso | Refrigóis',
    description: 'Termos de Uso do site da Refrigóis Refrigeração Comercial. Condições para utilização do site e dos nossos canais de contato.',
    image: '/og/home.jpg',
  },
  '/politica-de-cookies': {
    title: 'Política de Cookies | Refrigóis',
    description: 'Política de Cookies da Refrigóis: o que são cookies, como usamos e como você pode gerenciá-los.',
    image: '/og/home.jpg',
  },
};

// Categorias (páginas-hub)
// Categorias de servico, tambem vindas do banco. Criar uma categoria nova no
// painel passa a gerar a pagina, a entrada no sitemap, o card em /servicos e
// os links no menu e no rodape — sem mexer em codigo.
const CATEGORIES = {};

// Sub-serviços: chave = `${categorySlug}/${slug}`
// Servicos vindos de generated/servicos.json, escrito pelo
// exportar-servicos.js a partir do data.ts. Fonte unica: o que aparece na
// pagina e o que vai para o <title> e para o schema sao a mesma coisa.
const SERVICES = {};
const SERVICOS_FONTE = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'generated/servicos.json'), 'utf-8')
);
for (const c of SERVICOS_FONTE.categorias) {
  CATEGORIES[c.slug] = {
    title: c.seoTitle || `${c.title} | Refrig\u00f3is`,
    description: c.seoDescription || c.description,
    image: c.ogImage || `/og/servicos-${c.slug}.jpg`,
  };
}

for (const s of SERVICOS_FONTE.servicos) {
  SERVICES[`${s.categorySlug}/${s.slug}`] = {
    title: s.seoTitle || `${s.title} | Refrig\u00f3is`,
    description: s.seoDescription || s.description,
    image: s.ogImage || `/og/servicos-${s.categorySlug}-${s.slug}.jpg`,
    serviceTitle: s.title,
    faq: s.faq || [],
  };
}

const BLOG_CATEGORIES = {
  'camara-fria': {
    title: 'Câmara Fria | Blog Refrigóis',
    description: 'Instalação, fabricação, manutenção, reforma e diagnóstico de problemas em câmaras frias e câmaras frigoríficas.',
    image: '/og/blog-categoria-camara-fria.jpg',
  },
  'refrigeracao-comercial': {
    title: 'Refrigeração Comercial | Blog Refrigóis',
    description: 'Guias e comparativos sobre freezer, geladeira, expositores, chopeiras e demais equipamentos de refrigeração comercial.',
    image: '/og/blog-categoria-refrigeracao-comercial.jpg',
  },
  'manutencao': {
    title: 'Manutenção e Conservação | Blog Refrigóis',
    description: 'Boas práticas de manutenção preventiva e corretiva para prolongar a vida útil dos seus equipamentos de refrigeração.',
    image: '/og/blog-categoria-manutencao.jpg',
  },
  'noticias': {
    title: 'Notícias do Setor | Blog Refrigóis',
    description: 'Novidades, tendências e atualizações relevantes do mercado de refrigeração comercial e industrial.',
    image: '/og/blog-categoria-noticias.jpg',
  },
};

// Cartoes de compartilhamento gerados pelo gerar-og.js. Quando o cartao nao
// pode ser gerado, o valor cai na foto de capa — nunca fica sem imagem.
const OG = fs.existsSync(path.join(ROOT, 'generated/og.json'))
  ? JSON.parse(fs.readFileSync(path.join(ROOT, 'generated/og.json'), 'utf-8'))
  : {};

// Metadados dos artigos, vindos do arquivo gerado a partir do banco.
const BLOG_POSTS = {};
for (const a of JSON.parse(fs.readFileSync(path.join(ROOT, 'generated/artigos.json'), 'utf-8'))) {
  BLOG_POSTS[a.slug] = {
    title: a.metaTitle || `${a.title} | Refrig\u00f3is`,
    description: a.description,
    image: a.ogImage || OG[`blog/${a.slug}`] || a.image,
    publishedAt: a.publishedAt,
    updatedAt: a.updatedAt,
    categorySlug: a.categorySlug,
    articleTitle: a.title,
    readingMinutes: a.readingMinutes,
    faq: a.faq || [],
  };
}

const SEGMENTS = {
  'acougues': {
    title: 'Câmara Fria e Refrigeração para Açougue | Refrigóis',
    description: 'Câmara fria, balcão vitrine e equipamentos de refrigeração comercial para açougue em Maringá — fabricação sob medida, instalação e manutenção.',
    image: '/og/solucoes-acougues.jpg',
    faq: [
      { q: 'Qual o tamanho mínimo de câmara fria para um açougue?', a: 'Depende do volume de carne processado por semana, mas trabalhamos com projetos a partir de poucos metros quadrados até câmaras de grande porte para açougues com produção própria.' },
      { q: 'Vocês atendem em caso de pane fora do horário comercial?', a: 'Sim, contratos de manutenção preventiva incluem prioridade de atendimento em caso de emergência, já que sabemos que carne parada é prejuízo imediato.' },
    ],
  },
  'supermercados': {
    title: 'Refrigeração Comercial para Supermercado | Refrigóis',
    description: 'Câmara fria, ilha de congelados, expositores verticais e balcões refrigerados para supermercado em Maringá — projeto completo de refrigeração comercial.',
    image: '/og/solucoes-supermercados.jpg',
    faq: [
      { q: 'Fazem manutenção de vários equipamentos no mesmo contrato?', a: 'Sim, os contratos de manutenção preventiva cobrem múltiplos equipamentos do mesmo estabelecimento, com cronograma único de visitas.' },
      { q: 'Trabalham com retrofit de sistemas antigos?', a: 'Sim, fazemos reforma de câmaras frias e atualização de sistemas de refrigeração para melhorar eficiência energética.' },
    ],
  },
  'restaurantes': {
    title: 'Refrigeração Comercial para Restaurante | Refrigóis',
    description: 'Câmara fria, mesa refrigerada (pista fria) e geladeira comercial para restaurante em Maringá — equipamentos sob medida para cozinha profissional.',
    image: '/og/solucoes-restaurantes.jpg',
    faq: [
      { q: 'Fabricam mesa refrigerada sob medida pro tamanho da minha cozinha?', a: 'Sim, a mesa refrigerada (pista fria) é fabricada sob medida em aço inox, conforme o espaço e a quantidade de cubas necessárias.' },
      { q: 'Fazem higienização de câmara fria pra adequação sanitária?', a: 'Sim, oferecemos higienização especializada que atende às exigências da vigilância sanitária para estabelecimentos alimentícios.' },
    ],
  },
  'padarias': {
    title: 'Refrigeração Comercial para Padaria e Confeitaria | Refrigóis',
    description: 'Vitrine refrigerada, câmara fria para insumos e balcão vitrine para padaria e confeitaria em Maringá — fabricação sob medida com iluminação em LED.',
    image: '/og/solucoes-padarias.jpg',
    faq: [
      { q: 'A vitrine pode ter iluminação em LED pra destacar os doces?', a: 'Sim, fabricamos vitrines com iluminação em LED direcionada, pensada pra valorizar bolos, doces e salgados expostos.' },
      { q: 'Fazem vitrine pra produtos quentes também, tipo salgados assados?', a: 'Sim, trabalhamos com vitrines refrigeradas, quentes ou mistas, conforme a necessidade da padaria.' },
    ],
  },
  'distribuidoras-de-bebidas': {
    title: 'Refrigeração Comercial para Distribuidora de Bebidas | Refrigóis',
    description: 'Câmara fria com porta de vidro (walk-in cooler), resfriador de bebidas e chopeira para distribuidora e depósito de bebidas em Maringá.',
    image: '/og/solucoes-distribuidoras-de-bebidas.jpg',
    faq: [
      { q: 'O que é um walk-in cooler e vocês fabricam?', a: 'É uma câmara fria com porta de vidro, também chamada de beer cave, onde o cliente entra ou pega o produto direto na prateleira. Fabricamos sob medida para distribuidoras e bares.' },
      { q: 'Fazem manutenção de chopeira com contrato mensal?', a: 'Sim, oferecemos manutenção preventiva de chopeiras, incluindo limpeza de linha e ajuste de pressão de CO2.' },
    ],
  },
  'farmacias': {
    title: 'Câmara Fria para Farmácia e Medicamentos | Refrigóis',
    description: 'Câmara fria para armazenamento de medicamentos e vacinas em farmácia, com controle de temperatura e telemetria, em Maringá.',
    image: '/og/solucoes-farmacias.jpg',
    faq: [
      { q: 'A câmara fria registra a temperatura pra auditoria?', a: 'Sim, instalamos sistemas com telemetria de temperatura 24h e alarme de desvio, gerando histórico para fins de auditoria sanitária.' },
      { q: 'Qual a faixa de temperatura pra armazenamento de vacinas?', a: 'Varia conforme o tipo de medicamento/vacina — o sistema é configurado conforme a especificação do fabricante do produto armazenado.' },
    ],
  },
  'sorveterias': {
    title: 'Refrigeração Comercial para Sorveteria | Refrigóis',
    description: 'Freezer comercial, ilha refrigerada e câmara fria para sorveteria em Maringá — equipamentos para congelados de alta rotatividade.',
    image: '/og/solucoes-sorveterias.jpg',
    faq: [
      { q: 'Qual a temperatura ideal pra armazenar sorvete?', a: 'Geralmente -18°C ou inferior, dependendo do tipo de sorvete — dimensionamos o equipamento pra manter essa faixa mesmo com abertura frequente.' },
      { q: 'Fazem manutenção de urgência em dia de muito movimento?', a: 'Sim, priorizamos atendimento de emergência pra sorveterias em dias de pico, já que a parada nesse segmento é especialmente crítica.' },
    ],
  },
};

// Projetos e artigos vem dos arquivos gerados pelo sync-conteudo.js, que os
// escreve a partir do banco antes do build. Antes este trecho interpretava o
// data.ts como texto; agora le a mesma fonte que o site usa.
const PROJECTS = {};
for (const p of JSON.parse(fs.readFileSync(path.join(ROOT, 'generated/projetos.json'), 'utf-8'))) {
  PROJECTS[p.slug] = {
    title: p.seoTitle || `${p.title} | Refrig\u00f3is`,
    description: p.seoDescription || p.description || '',
    image: p.ogImage || OG[`projetos/${p.slug}`] || p.image,
    category: p.category,
    projectTitle: p.title,
    photos: (p.photos || []).map((f) => ({ src: f.src, alt: f.alt, caption: f.caption || null })),
  };
}

// Catalogo vindo de generated/produtos.json, escrito pelo sync-conteudo a
// partir do banco. Fonte unica: o que aparece na pagina e o que vai para o
// <title> e para o schema sao a mesma coisa.
const PRODUCTS = {};
const PRODUTOS_FONTE = JSON.parse(
  fs.readFileSync(path.join(ROOT, 'generated/produtos.json'), 'utf-8')
);
for (const pr of PRODUTOS_FONTE.produtos) {
  PRODUCTS[pr.slug] = {
    title: pr.seoTitle || `${pr.title} | Refrig\u00f3is`,
    description: pr.seoDescription || pr.resumo,
    image: pr.ogImage || `/og/produtos-${pr.slug}.jpg`,
    type: 'product',
    productTitle: pr.title,
    // A ficha tecnica vira propriedade no schema: e o que distingue este
    // registro do de um servico.
    ficha: pr.ficha || [],
    faq: pr.faq || [],
  };
}

function escapeHtml(s) {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const AREA_SERVED = ['Maringá', 'Paraná', 'São Paulo', 'Santa Catarina', 'Mato Grosso do Sul'];
const PROVIDER = {
  '@type': 'Organization',
  name: 'Refrigóis',
  url: SITE_URL,
};

function buildServiceSchema(meta, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: meta.title.replace(' | Refrigóis', ''),
    description: meta.description,
    url,
    provider: PROVIDER,
    areaServed: AREA_SERVED.map((name) => ({ '@type': name === 'Maringá' ? 'City' : 'State', name })),
  };
}

function buildArticleSchema(meta, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: meta.articleTitle || meta.title.replace(' | Refrigóis', ''),
    description: meta.description,
    image: meta.image?.startsWith('http') ? meta.image : `${SITE_URL}${meta.image}`,
    url,
    datePublished: meta.publishedAt,
    dateModified: meta.updatedAt || meta.publishedAt,
    author: PROVIDER,
    publisher: PROVIDER,
    mainEntityOfPage: url,
    inLanguage: 'pt-BR',
    ...(meta.readingMinutes ? { timeRequired: `PT${meta.readingMinutes}M` } : {}),
  };
}

// FAQ do artigo em schema proprio. Perguntas e respostas marcadas aumentam a
// chance de aparecer em resultado expandido na busca.

function buildProductSchema(meta, url) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: meta.title.replace(' | Refrigóis', ''),
    description: meta.description,
    image: meta.image?.startsWith('http') ? meta.image : `${SITE_URL}${meta.image}`,
    url,
    brand: { '@type': 'Brand', name: 'Refrigóis' },
    manufacturer: { '@type': 'Organization', name: 'Refrigóis' },
    category: 'Refrigeração Comercial',
    // Ficha tecnica como propriedades. Sem preco e sem oferta: o equipamento
    // e sob medida, entao declarar valor seria informacao falsa.
    ...(meta.ficha && meta.ficha.length
      ? {
          additionalProperty: meta.ficha.map((f) => ({
            '@type': 'PropertyValue',
            name: f.rotulo,
            value: f.valor,
          })),
        }
      : {}),
  };
}

function buildProjectSchema(meta, url) {
  const abs = (src) => (src.startsWith('http') ? src : `${SITE_URL}${src}`);
  const photos = meta.photos || [];

  // ImageObject por foto, com o alt escrito à mão como contentUrl/description.
  // É isso que dá chance real das fotos aparecerem no Google Imagens.
  const images = photos.map((photo) => ({
    '@type': 'ImageObject',
    contentUrl: abs(photo.src),
    url: abs(photo.src),
    description: photo.alt,
    ...(photo.caption ? { caption: photo.caption } : {}),
    creator: PROVIDER,
    creditText: 'Refrigóis',
    copyrightNotice: 'Refrigóis',
  }));

  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: meta.projectTitle || meta.title.replace(' | Refrigóis', ''),
    description: meta.description,
    url,
    about: {
      '@type': 'Service',
      name: `Refrigeração para ${meta.category}`,
      provider: PROVIDER,
      areaServed: AREA_SERVED.map((name) => ({ '@type': name === 'Maringá' ? 'City' : 'State', name })),
    },
    associatedMedia: images,
    image: images.map((img) => img.contentUrl),
    provider: PROVIDER,
  };
}

function buildBreadcrumbSchema(trail) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

function buildFAQSchema(faqItems) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

function injectMeta(html, meta, routePath) {
  const url = `${SITE_URL}${routePath}`;
  const rawImage = meta.image ?? '/og/home.jpg';
  const image = rawImage.startsWith('http') ? rawImage : `${SITE_URL}${rawImage}`;
  // Artigo do blog e 'article', nao 'website'. Isso muda como Facebook,
  // WhatsApp e LinkedIn classificam o link compartilhado.
  const type = meta.type ?? (meta.schemaKind === 'article' ? 'article' : 'website');

  let out = html;
  out = out.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);
  out = out.replace(/<meta name="description" content=".*?"\s*\/?>/i, `<meta name="description" content="${escapeHtml(meta.description)}" />`);
  out = out.replace(/<link rel="canonical" href=".*?"\s*\/?>/i, `<link rel="canonical" href="${url}" />`);
  out = out.replace(/<meta property="og:title" content=".*?"\s*\/?>/i, `<meta property="og:title" content="${escapeHtml(meta.title)}" />`);
  out = out.replace(/<meta property="og:description" content=".*?"\s*\/?>/i, `<meta property="og:description" content="${escapeHtml(meta.description)}" />`);
  out = out.replace(/<meta property="og:url" content=".*?"\s*\/?>/i, `<meta property="og:url" content="${url}" />`);
  out = out.replace(/<meta property="og:image" content=".*?"\s*\/?>/i, `<meta property="og:image" content="${image}" />`);
  out = out.replace(/<meta property="og:type" content=".*?"\s*\/?>/i, `<meta property="og:type" content="${type}" />`);
  out = out.replace(/<meta name="twitter:title" content=".*?"\s*\/?>/i, `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`);
  out = out.replace(/<meta name="twitter:description" content=".*?"\s*\/?>/i, `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`);

  // Schema JSON-LD específico da página (Service para serviços/categorias, BlogPosting para artigos)
  // — o site já tem HVACBusiness + FAQPage no nível global, isso soma um schema focado no que a página oferece.
  const scripts = [];
  if (meta.schemaKind === 'service') {
    scripts.push(buildServiceSchema(meta, url));
  } else if (meta.schemaKind === 'article') {
    scripts.push(buildArticleSchema(meta, url));
  } else if (meta.schemaKind === 'product') {
    scripts.push(buildProductSchema(meta, url));
  } else if (meta.schemaKind === 'project') {
    scripts.push(buildProjectSchema(meta, url));
  }
  if (meta.breadcrumb) {
    scripts.push(buildBreadcrumbSchema(meta.breadcrumb));
  }
  // FAQ da propria pagina. Quando existe, o FAQPage global do template e
  // removido: duas FAQPage na mesma pagina competem entre si e o Google pode
  // acabar ignorando as duas.
  if (meta.faq && meta.faq.length) {
    scripts.push(buildFAQSchema(meta.faq));
    out = out.replace(
      /<script type="application\/ld\+json">\s*\{[^<]*"@type":\s*"FAQPage"[\s\S]*?<\/script>/,
      ''
    );
  }
  if (scripts.length) {
    const tags = scripts.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n  ') + '\n  </head>';
    out = out.replace(/<\/head>/i, tags);
  }

  return out;
}

const WRITTEN_ROUTES = [];

// Renderizador de HTML, vindo do bundle de servidor gerado pelo
// "vite build --ssr". Quando ele nao existe, o site continua sendo publicado
// com o <body> montado pelo navegador — nao vale derrubar a publicacao por
// causa disso, mas o aviso aparece no log.
let renderizar = null;
try {
  ({ render: renderizar } = await import(
    pathToFileURL(path.join(ROOT, 'dist-ssr', 'entry-server.js')).href
  ));
} catch (e) {
  console.log(`  ⚠ HTML nao sera renderizado no build (${e.message.split('\n')[0]})`);
}

async function writeRoute(template, routePath, meta) {
  const outDir = path.join(DIST, routePath);
  fs.mkdirSync(outDir, { recursive: true });
  let html = injectMeta(template, meta, `/${routePath}`);

  if (renderizar) {
    try {
      const corpo = await renderizar(`/${routePath}`);
      html = html.replace('<div id="root"></div>', `<div id="root">${corpo}</div>`);
    } catch (e) {
      console.log(`  ⚠ /${routePath}: falha ao renderizar (${e.message.split('\n')[0]})`);
    }
  }

  fs.writeFileSync(path.join(outDir, 'index.html'), html);
  // Guarda a rota para o sitemap. noindex fica de fora (ex.: /link).
  if (!meta.noindex) {
    WRITTEN_ROUTES.push({ path: routePath, lastmod: meta.publishedAt || null });
  }
  console.log(`  ✓ /${routePath}`);
}

// Gera sitemap.xml automaticamente a partir das rotas realmente escritas,
// com <lastmod>. Assim nunca dessincroniza: toda página nova entra sozinha.
function writeSitemap() {
  const today = new Date().toISOString().slice(0, 10);
  const urls = [
    { path: '', lastmod: today }, // home
    ...WRITTEN_ROUTES.map((r) => ({ path: r.path, lastmod: r.lastmod || today })),
  ];
  const body = urls
    .map(
      (u) =>
        `  <url>\n    <loc>${SITE_URL}/${u.path}</loc>\n    <lastmod>${u.lastmod}</lastmod>\n  </url>`
    )
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), xml);
  console.log(`  ✓ sitemap.xml (${urls.length} URLs)`);
}

async function run() {
  const templatePath = path.join(DIST, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('dist/index.html não encontrado — rode "vite build" antes deste script.');
    process.exit(1);
  }
  const template = fs.readFileSync(templatePath, 'utf-8');

  console.log('Pré-renderizando meta tags por rota...');

  for (const [route, meta] of Object.entries(STATIC_PAGES)) {
    await writeRoute(template, route.replace(/^\//, ''), meta);
  }

  // 404.html — o Netlify serve automaticamente este arquivo para rotas não
  // encontradas. Recebe noindex e NÃO entra no sitemap (escrito direto, sem
  // passar pelo writeRoute/WRITTEN_ROUTES).
  {
    const notFoundMeta = {
      title: 'Página não encontrada (404) | Refrigóis',
      description: 'A página que você procura não foi encontrada. Veja os serviços de câmara fria e refrigeração comercial da Refrigóis.',
      image: '/og/home.jpg',
      noindex: true,
    };
    let html = injectMeta(template, notFoundMeta, '/404');
    html = html.replace(
      '<meta name="robots" content="index, follow" />',
      '<meta name="robots" content="noindex, follow" />'
    );
    fs.writeFileSync(path.join(DIST, '404.html'), html);
    console.log('  ✓ 404.html (noindex)');
  }
  for (const [slug, meta] of Object.entries(CATEGORIES)) {
    await writeRoute(template, `servicos/${slug}`, {
      ...meta,
      schemaKind: 'service',
      breadcrumb: [
        { name: 'Serviços', path: '/servicos' },
        { name: meta.title.replace(' | Refrigóis', ''), path: `/servicos/${slug}` },
      ],
    });
  }
  for (const [key, meta] of Object.entries(SERVICES)) {
    const [catSlug] = key.split('/');
    const catMeta = CATEGORIES[catSlug];
    await writeRoute(template, `servicos/${key}`, {
      ...meta,
      schemaKind: 'service',
      breadcrumb: [
        { name: 'Serviços', path: '/servicos' },
        { name: catMeta ? catMeta.title.replace(' | Refrigóis', '') : catSlug, path: `/servicos/${catSlug}` },
        { name: meta.title.replace(' | Refrigóis', ''), path: `/servicos/${key}` },
      ],
    });
  }
  for (const [slug, meta] of Object.entries(PRODUCTS)) {
    await writeRoute(template, `produtos/${slug}`, {
      ...meta,
      schemaKind: 'product',
      breadcrumb: [
        { name: 'Produtos', path: '/produtos' },
        { name: meta.title.replace(' | Refrigóis', ''), path: `/produtos/${slug}` },
      ],
    });
  }
  for (const [slug, meta] of Object.entries(PROJECTS)) {
    await writeRoute(template, `projetos/${slug}`, {
      ...meta,
      schemaKind: 'project',
      breadcrumb: [
        { name: 'Projetos', path: '/projetos' },
        { name: meta.projectTitle || meta.title.replace(' | Refrigóis', ''), path: `/projetos/${slug}` },
      ],
    });
  }

  for (const [slug, meta] of Object.entries(BLOG_POSTS)) {
    await writeRoute(template, `blog/${slug}`, {
      ...meta,
      schemaKind: 'article',
      breadcrumb: [
        { name: 'Blog', path: '/blog' },
        { name: meta.title.replace(' | Refrigóis', ''), path: `/blog/${slug}` },
      ],
    });
  }
  for (const [slug, meta] of Object.entries(BLOG_CATEGORIES)) {
    await writeRoute(template, `blog/categoria/${slug}`, {
      ...meta,
      breadcrumb: [
        { name: 'Blog', path: '/blog' },
        { name: meta.title.replace(' | Blog Refrigóis', ''), path: `/blog/categoria/${slug}` },
      ],
    });
  }

  // Páginas de paginação (blog geral e por categoria) — cada página tem sua
  // própria URL crawleável, com title/canonical próprios.
  const POSTS_PER_PAGE = 9;
  const allPostSlugs = Object.keys(BLOG_POSTS);
  const totalBlogPages = Math.max(1, Math.ceil(allPostSlugs.length / POSTS_PER_PAGE));
  for (let p = 2; p <= totalBlogPages; p++) {
    await writeRoute(template, `blog/pagina/${p}`, {
      title: `Blog — Página ${p} | Dicas de Refrigeração Comercial`,
      description: 'Artigos e notícias sobre manutenção de câmara fria, refrigeração comercial, freezer e geladeira comercial — conteúdo técnico da Refrigóis para o seu negócio.',
      image: '/og/blog.jpg',
      breadcrumb: [{ name: 'Blog', path: '/blog' }, { name: `Página ${p}`, path: `/blog/pagina/${p}` }],
    });
  }

  for (const [catSlug, catMeta] of Object.entries(BLOG_CATEGORIES)) {
    const postsInCat = Object.entries(BLOG_POSTS).filter(([, m]) => m.categorySlug === catSlug);
    const totalCatPages = Math.max(1, Math.ceil(postsInCat.length / POSTS_PER_PAGE));
    const catTitle = catMeta.title.replace(' | Blog Refrigóis', '');
    for (let p = 2; p <= totalCatPages; p++) {
      await writeRoute(template, `blog/categoria/${catSlug}/pagina/${p}`, {
        title: `${catTitle} — Página ${p} | Blog Refrigóis`,
        description: catMeta.description,
        image: catMeta.image,
        breadcrumb: [
          { name: 'Blog', path: '/blog' },
          { name: catTitle, path: `/blog/categoria/${catSlug}` },
          { name: `Página ${p}`, path: `/blog/categoria/${catSlug}/pagina/${p}` },
        ],
      });
    }
  }

  for (const [slug, meta] of Object.entries(SEGMENTS)) {
    await writeRoute(template, `solucoes/${slug}`, {
      ...meta,
      schemaKind: 'service',
      breadcrumb: [
        { name: 'Soluções por Segmento', path: '/solucoes' },
        { name: meta.title.replace(' | Refrigóis', ''), path: `/solucoes/${slug}` },
      ],
      faq: meta.faq,
    });
  }

  // A home nao passa pelo writeRoute: ela e o proprio arquivo base, e ja tem
  // as meta tags certas no index.html. Mas o corpo dela tambem precisa vir
  // renderizado, senao a pagina mais importante do site e a unica que chega
  // vazia para quem nao executa JavaScript.
  if (renderizar) {
    try {
      const corpo = await renderizar('/');
      fs.writeFileSync(
        templatePath,
        template.replace('<div id="root"></div>', `<div id="root">${corpo}</div>`)
      );
      console.log('  ✓ / (home)');
    } catch (e) {
      console.log(`  ⚠ home: falha ao renderizar (${e.message.split('\n')[0]})`);
    }
  }

  writeSitemap();
  console.log('Pré-renderização concluída.');
}

await run();

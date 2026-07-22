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
import { fileURLToPath } from 'node:url';

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
const CATEGORIES = {
  'camara-fria': {
    title: 'Câmara Fria | Refrigóis',
    description: 'Instalação, fabricação, manutenção, reforma e higienização de câmara fria e câmara frigorífica em Maringá e região.',
    image: '/og/servicos-camara-fria.jpg',
  },
  'refrigeracao-comercial': {
    title: 'Refrigeração Comercial | Refrigóis',
    description: 'Venda, instalação e manutenção de freezer, geladeira, balcão refrigerado, expositores e ilhas para o seu negócio em Maringá.',
    image: '/og/servicos-refrigeracao-comercial.jpg',
  },
};

// Sub-serviços: chave = `${categorySlug}/${slug}`
const SERVICES = {
  'camara-fria/instalacao': {
    title: 'Instalação de Câmara Fria | Refrigóis',
    description: 'Instalação de câmara fria e câmara frigorífica para açougue, supermercado, restaurante e distribuidora, com projeto sob medida em Maringá.',
    image: '/og/servicos-camara-fria-instalacao.jpg',
  },
  'camara-fria/fabricacao': {
    title: 'Fabricação de Câmara Fria | Refrigóis',
    description: 'Fabricação de câmara fria sob medida para supermercados, açougues, padarias, restaurantes e distribuidoras em Maringá.',
    image: '/og/servicos-camara-fria-fabricacao.jpg',
  },
  'camara-fria/manutencao': {
    title: 'Manutenção e Conserto de Câmara Fria | Refrigóis',
    description: 'Manutenção preventiva e conserto de câmara fria para supermercados, restaurantes, açougues e centros de distribuição, com atendimento rápido em Maringá e região.',
    image: '/og/servicos-camara-fria-manutencao.jpg',
  },
  'camara-fria/reforma': {
    title: 'Reforma de Câmara Fria | Refrigóis',
    description: 'Reforma e modernização de câmara fria: troca de isolamento, painéis, portas e atualização do sistema de refrigeração em Maringá.',
    image: '/og/servicos-camara-fria-reforma.jpg',
  },
  'camara-fria/higienizacao': {
    title: 'Higienização de Câmara Fria | Refrigóis',
    description: 'Higienização e limpeza especializada de câmara fria para garantir segurança sanitária e desempenho, em Maringá e região.',
    image: '/og/servicos-camara-fria-higienizacao.jpg',
  },
  'refrigeracao-comercial/freezer-comercial': {
    title: 'Freezer Comercial | Refrigóis',
    description: 'Venda, instalação e manutenção de freezer comercial para supermercados, açougues, padarias e distribuidoras em Maringá.',
    image: '/og/servicos-refrigeracao-comercial-freezer-comercial.jpg',
  },
  'refrigeracao-comercial/geladeira-comercial': {
    title: 'Geladeira Comercial | Refrigóis',
    description: 'Venda, instalação e manutenção de geladeira comercial para bares, restaurantes, lanchonetes e mercados em Maringá.',
    image: '/og/servicos-refrigeracao-comercial-geladeira-comercial.jpg',
  },
  'refrigeracao-comercial/balcao-refrigerado': {
    title: 'Balcão Refrigerado | Refrigóis',
    description: 'Fabricação, instalação e manutenção de balcão refrigerado e vitrine refrigerada para açougue, padaria e lanchonete em Maringá.',
    image: '/og/servicos-refrigeracao-comercial-balcao-refrigerado.jpg',
  },
  'refrigeracao-comercial/expositor-refrigerado': {
    title: 'Expositor Refrigerado | Refrigóis',
    description: 'Venda, instalação e manutenção de expositor vertical refrigerado (1, 2 ou 3 portas) para bares, mercados e conveniências em Maringá.',
    image: '/og/servicos-refrigeracao-comercial-expositor-refrigerado.jpg',
  },
  'refrigeracao-comercial/ilha-refrigerada': {
    title: 'Ilha Refrigerada | Refrigóis',
    description: 'Venda, instalação e manutenção de ilha refrigerada (ilha de congelados / freezer ilha) para supermercados e lojas de conveniência em Maringá.',
    image: '/og/servicos-refrigeracao-comercial-ilha-refrigerada.jpg',
  },
  'refrigeracao-comercial/mesa-refrigerada': {
    title: 'Mesa Refrigerada | Refrigóis',
    description: 'Fabricação, instalação e manutenção de mesa refrigerada para pizzarias, lanchonetes e cozinhas industriais em Maringá.',
    image: '/og/servicos-refrigeracao-comercial-mesa-refrigerada.jpg',
  },
  'refrigeracao-comercial/resfriador-de-bebidas': {
    title: 'Resfriador de Bebidas | Refrigóis',
    description: 'Venda, instalação e manutenção de resfriador de bebidas para bares, distribuidoras e lojas de conveniência em Maringá.',
    image: '/og/servicos-refrigeracao-comercial-resfriador-de-bebidas.jpg',
  },
  'refrigeracao-comercial/chopeira': {
    title: 'Chopeira | Refrigóis',
    description: 'Manutenção e instalação de chopeira e cervejeira para bares, restaurantes e distribuidoras em Maringá.',
    image: '/og/servicos-refrigeracao-comercial-chopeira.jpg',
  },
  'refrigeracao-comercial/maquina-de-gelo': {
    title: 'Máquina de Gelo | Refrigóis',
    description: 'Manutenção e instalação de máquina de gelo comercial para bares, restaurantes e distribuidoras em Maringá.',
    image: '/og/servicos-refrigeracao-comercial-maquina-de-gelo.jpg',
  },
  'refrigeracao-comercial/bebedouro-industrial': {
    title: 'Bebedouro Industrial | Refrigóis',
    description: 'Manutenção e instalação de bebedouro industrial para indústrias, escritórios e cozinhas industriais em Maringá.',
    image: '/og/servicos-refrigeracao-comercial-bebedouro-industrial.jpg',
  },
};

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

// Metadados dos artigos, lidos direto do blogData.ts. Antes esta lista era
// mantida a mao aqui e ficava dessincronizada do conteudo real. Quando o
// painel administrativo entrar, este bloco vira uma consulta ao banco.
const BLOG_POSTS = {};
{
  const src = fs.readFileSync(path.join(ROOT, 'blogData.ts'), 'utf-8');
  const block = src.slice(src.indexOf('export const blogPostsData'));
  const entries = block.split(/\n  \{\n/).slice(1);

  for (const entry of entries) {
    const pick = (field) => {
      const m = entry.match(new RegExp(`${field}: '((?:[^'\\\\]|\\\\.)*)'`));
      return m ? m[1].replace(/\\'/g, "'") : null;
    };
    const slug = pick('slug');
    if (!slug) continue;

    // FAQ do artigo -> FAQPage schema.
    const faq = [];
    const faqMatch = entry.match(/faq: \[([\s\S]*?)\n    \]/);
    if (faqMatch) {
      const re = /\{ q: '((?:[^'\\\\]|\\\\.)*)', a: '((?:[^'\\\\]|\\\\.)*)' \}/g;
      let m;
      while ((m = re.exec(faqMatch[1])) !== null) {
        faq.push({ q: m[1].replace(/\\'/g, "'"), a: m[2].replace(/\\'/g, "'") });
      }
    }

    BLOG_POSTS[slug] = {
      title: pick('metaTitle') || `${pick('title')} | Refrig\u00f3is`,
      description: pick('description'),
      image: `/og/blog-${slug}.jpg`,
      publishedAt: pick('publishedAt'),
      updatedAt: pick('updatedAt'),
      categorySlug: pick('categorySlug'),
      articleTitle: pick('title'),
      readingMinutes: pick('readingMinutes'),
      faq,
    };
  }
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

// Projetos do portfólio. Rotas NOVAS (/projetos/:slug) — não alteram
// nenhuma URL já indexada; apenas somam ao sitemap. Cada projeto ganha
// title/description próprios e schema ImageObject com as fotos da obra.
const PROJECTS = {};
{
  const projectsSource = fs.readFileSync(path.join(ROOT, 'data.ts'), 'utf-8');
  const start = projectsSource.indexOf('export const projectsData');
  const end = projectsSource.indexOf('export const projectCategories');
  const block = projectsSource.slice(start, end);

  // Extrai os campos que o prerender precisa direto do data.ts, sem precisar
  // compilar TypeScript. Quando o painel administrativo entrar, este trecho é
  // substituído por uma consulta ao banco — o resto do arquivo não muda.
  const entries = block.split(/\n  \{\n/).slice(1);
  for (const entry of entries) {
    const pick = (field) => {
      const m = entry.match(new RegExp(`${field}: '((?:[^'\\\\]|\\\\.)*)'`));
      return m ? m[1].replace(/\\'/g, "'") : null;
    };
    const slug = pick('slug');
    if (!slug) continue;
    const title = pick('title');
    const seoTitle = pick('seoTitle');
    const seoDescription = pick('seoDescription');
    const description = pick('description');
    const category = pick('category');
    const image = pick('image');

    // Fotos com alt (bloco `photos`) para o schema ImageObject.
    const photos = [];
    const photosMatch = entry.match(/photos: \[([\s\S]*?)\n    \]/);
    if (photosMatch) {
      const re = /\{ src: '([^']+)', alt: '((?:[^'\\\\]|\\\\.)*)'(?:, caption: '((?:[^'\\\\]|\\\\.)*)')? \}/g;
      let m;
      while ((m = re.exec(photosMatch[1])) !== null) {
        photos.push({ src: m[1], alt: m[2].replace(/\\'/g, "'"), caption: m[3] ? m[3].replace(/\\'/g, "'") : null });
      }
    }

    PROJECTS[slug] = {
      title: seoTitle || `${title} | Refrigóis`,
      description: seoDescription || description || '',
      image,
      category,
      projectTitle: title,
      photos: photos.length ? photos : (image ? [{ src: image, alt: title, caption: null }] : []),
    };
  }
}

const PRODUCTS = {
  'balcao-refrigerado-aco-inox': {
    title: 'Balcão refrigerado ou ambiente em aço inox | Refrigóis',
    description: 'Fabricado sob medida: com portas de aço ou vidro, controlador digital, degelo automático e muito mais.',
    image: '/og/produtos-balcao-refrigerado-aco-inox.jpg',
    type: 'product',
  },
  'vitrine-refrigerada-aco-inox': {
    title: 'Vitrine refrigerada, quente ou ambiente em aço inox | Refrigóis',
    description: 'Modelo quadrada ou redonda, iluminação de LED, prateleiras em vidro ou inox, sistema de aquecimento ar-forçado.',
    image: '/og/produtos-vitrine-refrigerada-aco-inox.jpg',
    type: 'product',
  },
  'coifa-aco-inox-industrial': {
    title: 'Coifa em aço inox industrial ou residencial | Refrigóis',
    description: 'Coifa em aço inox sob medida para cozinha industrial, modelo de encosto ou central, com iluminação em LED, em Maringá.',
    image: '/og/produtos-coifa-aco-inox-industrial.jpg',
    type: 'product',
  },
  'bancada-industrial-aco-inox': {
    title: 'Bancada industrial em aço inox | Refrigóis',
    description: 'Bancada industrial em aço inox sob medida, multiuso, com ou sem cuba e prateleiras, para cozinhas profissionais em Maringá.',
    image: '/og/produtos-bancada-industrial-aco-inox.jpg',
    type: 'product',
  },
  'balcao-vitrine-acougue-padaria-lanchonete': {
    title: 'Balcão vitrine refrigerada para açougue, padaria e lanchonete | Refrigóis',
    description: 'Sob medida para expositor de carnes, salgados, bolos e doces, com vidro curvo e iluminação em LED.',
    image: '/og/produtos-balcao-vitrine-acougue-padaria-lanchonete.jpg',
    type: 'product',
  },
  'ilha-de-congelados-e-bebidas': {
    title: 'Ilha de congelados e bebidas (freezer ilha) | Refrigóis',
    description: 'Freezer tipo ilha para supermercados e lojas de conveniência, tampa de vidro deslizante, 2 a 3 metros.',
    image: '/og/produtos-ilha-de-congelados-e-bebidas.jpg',
    type: 'product',
  },
  'expositor-vertical-de-bebidas': {
    title: 'Expositor vertical de bebidas (1, 2 ou 3 portas) | Refrigóis',
    description: 'Geladeira expositora com porta de vidro, ideal para bares, mercados, lanchonetes e conveniências.',
    image: '/og/produtos-expositor-vertical-de-bebidas.jpg',
    type: 'product',
  },
};

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
function buildFaqSchema(faq) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
}

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
  const type = meta.type ?? 'website';

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
    if (meta.faq && meta.faq.length) {
      scripts.push(buildFaqSchema(meta.faq));
    }
  } else if (meta.schemaKind === 'product') {
    scripts.push(buildProductSchema(meta, url));
  } else if (meta.schemaKind === 'project') {
    scripts.push(buildProjectSchema(meta, url));
  }
  if (meta.breadcrumb) {
    scripts.push(buildBreadcrumbSchema(meta.breadcrumb));
  }
  if (meta.faq) {
    scripts.push(buildFAQSchema(meta.faq));
  }
  if (scripts.length) {
    const tags = scripts.map((s) => `<script type="application/ld+json">${JSON.stringify(s)}</script>`).join('\n  ') + '\n  </head>';
    out = out.replace(/<\/head>/i, tags);
  }

  return out;
}

const WRITTEN_ROUTES = [];

function writeRoute(template, routePath, meta) {
  const outDir = path.join(DIST, routePath);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), injectMeta(template, meta, `/${routePath}`));
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

function run() {
  const templatePath = path.join(DIST, 'index.html');
  if (!fs.existsSync(templatePath)) {
    console.error('dist/index.html não encontrado — rode "vite build" antes deste script.');
    process.exit(1);
  }
  const template = fs.readFileSync(templatePath, 'utf-8');

  console.log('Pré-renderizando meta tags por rota...');

  for (const [route, meta] of Object.entries(STATIC_PAGES)) {
    writeRoute(template, route.replace(/^\//, ''), meta);
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
    writeRoute(template, `servicos/${slug}`, {
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
    writeRoute(template, `servicos/${key}`, {
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
    writeRoute(template, `produtos/${slug}`, {
      ...meta,
      schemaKind: 'product',
      breadcrumb: [
        { name: 'Produtos', path: '/produtos' },
        { name: meta.title.replace(' | Refrigóis', ''), path: `/produtos/${slug}` },
      ],
    });
  }
  for (const [slug, meta] of Object.entries(PROJECTS)) {
    writeRoute(template, `projetos/${slug}`, {
      ...meta,
      schemaKind: 'project',
      breadcrumb: [
        { name: 'Projetos', path: '/projetos' },
        { name: meta.projectTitle || meta.title.replace(' | Refrigóis', ''), path: `/projetos/${slug}` },
      ],
    });
  }

  for (const [slug, meta] of Object.entries(BLOG_POSTS)) {
    writeRoute(template, `blog/${slug}`, {
      ...meta,
      schemaKind: 'article',
      breadcrumb: [
        { name: 'Blog', path: '/blog' },
        { name: meta.title.replace(' | Refrigóis', ''), path: `/blog/${slug}` },
      ],
    });
  }
  for (const [slug, meta] of Object.entries(BLOG_CATEGORIES)) {
    writeRoute(template, `blog/categoria/${slug}`, {
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
    writeRoute(template, `blog/pagina/${p}`, {
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
      writeRoute(template, `blog/categoria/${catSlug}/pagina/${p}`, {
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
    writeRoute(template, `solucoes/${slug}`, {
      ...meta,
      schemaKind: 'service',
      breadcrumb: [
        { name: 'Soluções por Segmento', path: '/solucoes' },
        { name: meta.title.replace(' | Refrigóis', ''), path: `/solucoes/${slug}` },
      ],
      faq: meta.faq,
    });
  }

  writeSitemap();
  console.log('Pré-renderização concluída.');
}

run();

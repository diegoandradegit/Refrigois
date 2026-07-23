export interface Segment {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  painPoints: string[];
  relevantServices: string[]; // formato "categorySlug/slug"
  faq: { question: string; answer: string }[];
  image: string;
}

// Cidade atendida no Paraná. A estrutura está pronta para páginas locais
// (/cidades/:slug), mas as páginas completas só devem ser criadas quando
// houver dados reais do Search Console indicando demanda por cidade — para
// evitar doorway pages. Ver AUDITORIA/validação do plano.
export interface City {
  slug: string;
  name: string;
  region: string; // ex.: "Noroeste do Paraná"
  distanceFromBaseKm?: number; // distância aproximada de Maringá
  nearbyCities?: string[]; // cidades vizinhas cobertas a partir desta praça
  published: boolean; // false = ainda não gerar página indexável
}

export interface ServiceCategory {
  slug: string;
  title: string;
  description: string;
  image: string;
}

export interface BlogCategory {
  slug: string;
  title: string;
  description: string;
}

/** Imagem dentro do corpo do artigo. `alt` obrigatorio. */
export interface ArticleImage {
  src: string;
  alt: string;
  caption?: string;
}

/**
 * Bloco de conteudo do artigo. Alem dos paragrafos, um bloco pode trazer
 * uma imagem, uma lista ou uma tabela comparativa — os recursos que fazem
 * um artigo tecnico ser util de ler no celular.
 */
export interface ArticleBlock {
  heading?: string;
  paragraphs?: string[];
  image?: ArticleImage;
  list?: { title?: string; items: string[]; ordered?: boolean };
  table?: { caption?: string; headers: string[]; rows: string[][] };
  /** Caixa de destaque — alerta, dica ou ponto de atencao. */
  callout?: { kind: 'atencao' | 'dica'; title: string; text: string };
}

export interface BlogFAQ {
  q: string;
  a: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  excerpt: string;
  content: ArticleBlock[];
  image: string;
  /** Alt da imagem de capa. */
  imageAlt?: string;
  publishedAt: string;
  updatedAt?: string;
  category: string;
  categorySlug: string;
  relatedServiceSlug?: string;
  relatedCategorySlug?: string;
  /** Projeto do portfolio que comprova o assunto na pratica (E-E-A-T). */
  relatedProjectSlug?: string;
  /** Resumo em bullets no topo — responde a busca antes da rolagem. */
  keyTakeaways?: string[];
  /** Perguntas frequentes ao final, viram FAQPage schema no prerender. */
  faq?: BlogFAQ[];
  /** Tempo estimado de leitura, em minutos. */
  readingMinutes?: number;
}

/** Passo do "como funciona" — reduz o receio de nao saber no que se esta entrando. */
export interface ServiceStep {
  title: string;
  text: string;
}

export interface Service {
  id: string;
  slug: string;
  categorySlug: string;
  title: string;
  description: string;
  longDescription?: string;
  image: string;
  imageAlt?: string;
  features?: string[];
  technicalInfo?: string;
  warranty?: string;
  deliveryArea?: string;
  images?: string[];
  /** Galeria propria do servico, enviada pelo painel. */
  photos?: ProjectPhoto[];

  // --- Estrutura de conteudo por secao ---

  /** Promessa curta no topo, abaixo do titulo. Uma linha. */
  promise?: string;
  /** A dor que o visitante veio resolver. Vem antes da solucao. */
  problem?: { heading?: string; paragraphs: string[] };
  /** Para quais segmentos serve, com link para a pagina de cada um. */
  appliesTo?: { segmentSlug: string; label: string; note?: string }[];
  /** Obras do portfolio que comprovam este servico. */
  relatedProjectSlugs?: string[];
  /** Passos do primeiro contato ate a entrega. */
  howItWorks?: ServiceStep[];
  /** Perguntas proprias deste servico — viram FAQPage no prerender. */
  faq?: { q: string; a: string }[];
  /** Meta tags proprias. */
  seoTitle?: string;
  seoDescription?: string;
}

/**
 * Foto de um projeto do portfólio.
 * O `alt` é escrito à mão (e, futuramente, no painel administrativo) — é ele
 * que faz a foto aparecer no Google Imagens. Nunca deixar genérico.
 */
export interface ProjectPhoto {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  /** Slug da categoria — usado no filtro do /projetos e no futuro FK do banco. */
  categorySlug: string;
  image: string;
  /** Alt da foto de capa. */
  imageAlt?: string;
  description?: string;
  client?: string;
  duration?: string;
  features?: string[];
  /** Galeria legada (só caminhos). Mantida por compatibilidade. */
  images?: string[];
  /** Galeria nova, com alt por foto. Tem precedência sobre `images`. */
  photos?: ProjectPhoto[];
  /** Meta tags próprias da página do projeto. Caem no title/description do prerender. */
  seoTitle?: string;
  seoDescription?: string;
  /** Marca o projeto como destaque na home (substitui o critério automático). */
  destaqueHome?: boolean;
  /** Ordem de exibição — menor primeiro. */
  ordem?: number;
  /** Data da entrega, usada no schema e no texto da página. */
  concluidoEm?: string;
  /** Cidade/UF da obra — reforço de SEO local. */
  local?: string;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  image: string;
  images?: string[];
  /** Galeria propria do servico, enviada pelo painel. */
  photos?: ProjectPhoto[];
  shortDescription: string;
  description: string;
  specifications: {
    dimensions: string;
    material: string;
    capacity?: string;
    coolingRange?: string;
    weight?: string;
  };
  deliveryTime: string;
  features: string[];
}

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  description: string;
}
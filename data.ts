import { Service, ServiceCategory, Project, ProjectPhoto, Product } from './types';

// Servicos e suas categorias vem do banco. O arquivo generated/servicos.json
// e escrito pelo scripts/sync-conteudo.js antes de cada build, com o que esta
// publicado no painel. Nao edite a mao: a proxima publicacao sobrescreve.
import servicosGerados from './generated/servicos.json';
import projetosGerados from './generated/projetos.json';

export const serviceCategoriesData: ServiceCategory[] =
  servicosGerados.categorias as ServiceCategory[];

export const servicesData: Service[] = servicosGerados.servicos as Service[];

export const projectsData: Project[] = projetosGerados as Project[];

/**
 * Categorias do portfólio, derivadas dos projetos publicados.
 * Usadas no filtro de /projetos — sem duplicar lista à mão.
 */
export const projectCategories = Array.from(
  projectsData.reduce((map, p) => {
    if (!map.has(p.categorySlug)) map.set(p.categorySlug, { slug: p.categorySlug, label: p.category, count: 0 });
    map.get(p.categorySlug)!.count += 1;
    return map;
  }, new Map<string, { slug: string; label: string; count: number }>())
    .values()
).sort((a, b) => b.count - a.count || a.label.localeCompare(b.label, 'pt-BR'));

/** Fotos de um projeto, normalizadas: `photos` tem precedência sobre `images`. */
export function getProjectPhotos(project: Project): ProjectPhoto[] {
  if (project.photos && project.photos.length) return project.photos;
  if (project.images && project.images.length) {
    return project.images.map((src, i) => ({
      src,
      alt: `${project.title} — foto ${i + 1}`,
    }));
  }
  return [{ src: project.image, alt: project.imageAlt || project.title }];
}

/** Projetos destacados na home, na ordem definida. */
export function getFeaturedProjects(limit: number): Project[] {
  const byOrdem = (a: Project, b: Project) => (a.ordem ?? 999) - (b.ordem ?? 999);
  const destaques = projectsData.filter((p) => p.destaqueHome).sort(byOrdem);
  if (destaques.length >= limit) return destaques.slice(0, limit);
  const resto = projectsData.filter((p) => !p.destaqueHome).sort(byOrdem);
  return [...destaques, ...resto].slice(0, limit);
}

export const productsData: Product[] = [
  {
    id: '1',
    slug: 'balcao-refrigerado-aco-inox',
    title: 'Balcão refrigerado ou ambiente em aço inox',
    category: 'Expositores',
    image: '/images/produtos/balcao-refrigerado-aco-inox.jpg',
    shortDescription: 'fabricado sob medida: com portas de aço ou vidro, controlador digital, degelo automático e muito mais...',
    description: 'O Balcão Refrigerado em aço inox foi desenvolvido para aliar o design moderno à eficiência térmica. Com vidros curvos duplos, garante a perfeita visualização dos produtos ao mesmo tempo em que reduz a troca de calor com o ambiente externo. O sistema de ar forçado mantém a temperatura uniforme em todas as prateleiras.',
    specifications: {
      dimensions: '2000mm (L) x 1300mm (A) x 650mm (P)',
      material: 'Aço Inox 430/304 e vidros temperados',
      capacity: '3 níveis de prateleiras (aprox. 450 litros)',
      coolingRange: '+2°C a +8°C',
      weight: '120 kg'
    },
    deliveryTime: '15 a 20 dias úteis',
    features: [
      'Iluminação interna em LED (frio ou quente)',
      'Controlador digital de temperatura com degelo automático',
      'Portas traseiras deslizantes em vidro',
      'Isolamento em poliuretano injetado'
    ]
  },
  {
    id: '2',
    slug: 'vitrine-refrigerada-aco-inox',
    title: 'Vitrine refrigerada, quente ou ambiente em aço inox',
    category: 'Vitrines',
    image: '/images/produtos/vitrine-producao-2.jpg',
    images: [
      '/images/produtos/vitrine-producao-2.jpg',
      '/images/produtos/vitrine-producao-1.jpg',
      '/images/produtos/vitrine-producao-3.jpg',
      '/images/produtos/vitrine-producao-4.jpg'
    ],
    shortDescription: 'modelo quadrada ou redonda, iluminação de led, prateleiras em vidro ou inox, sistema de aquecimento ar-forçado.',
    description: 'Nossas vitrines proporcionam alto requinte para sua loja, destacando seus produtos através de um projeto luminotécnico em LED. Equipamento disponível em versões refrigeradas, estufas quentes ou mistas, ideal para confeitarias e padarias de alto padrão.',
    specifications: {
      dimensions: '1500mm (L) x 1200mm (A) x 600mm (P)',
      material: 'Aço Inox escovado, madeirado e vidros duplos',
      capacity: '3 prateleiras em vidro temperado',
      coolingRange: '+3°C a +10°C (Refrigerada) ou até +65°C (Quente)',
      weight: '90 kg'
    },
    deliveryTime: '20 a 25 dias úteis',
    features: [
      'Design em linhas retas (modelo joalheiro)',
      'Controle preciso de temperatura e umidade',
      'Iluminação em LED independente por prateleira',
      'Acabamento premium personalizável'
    ]
  },
  {
    id: '3',
    slug: 'coifa-aco-inox-industrial',
    title: 'Coifa em aço inox industrial ou residencial',
    category: 'Exaustão',
    image: '/images/produtos/coifa-aco-inox-industrial.jpg',
    shortDescription: 'sob medida, encosto ou central, iluminação em Led.',
    description: 'Sistema completo de exaustão fabricado rigorosamente dentro das normas. As coifas em aço inox garantem durabilidade, fácil higienização e excelente capacidade de captação de vapores e gorduras em cozinhas profissionais e áreas gourmet.',
    specifications: {
      dimensions: 'Fabricação 100% sob medida',
      material: 'Aço Inox 430 ou 304 (Chapa 22/20)',
      weight: 'Variável conforme projeto'
    },
    deliveryTime: '10 a 15 dias úteis',
    features: [
      'Filtros inerciais (baffle) removíveis',
      'Dutos em aço galvanizado ou inox',
      'Calha periférica para coleta de gordura',
      'Solda TIG com acabamento escovado'
    ]
  },
  {
    id: '4',
    slug: 'bancada-industrial-aco-inox',
    title: 'Bancada industrial em aço inox',
    category: 'Mobiliário Inox',
    image: '/images/produtos/bancada-industrial-aco-inox.jpg',
    shortDescription: 'multiuso, sob medida, com ou sem cuba, prateleiras.',
    description: 'Bancadas de manipulação robustas e totalmente de acordo com as exigências da Vigilância Sanitária (ANVISA). Superfície lisa que impede acúmulo de bactérias, sendo o equipamento padrão ouro para manipulação de alimentos e produtos químicos.',
    specifications: {
      dimensions: 'Fabricação sob medida',
      material: 'Aço Inox 304/430 com reforço inferior',
      capacity: 'Suporta até 300kg distribuídos',
      weight: '45 kg (média)'
    },
    deliveryTime: '7 a 12 dias úteis',
    features: [
      'Sapatas niveladoras em poliamida',
      'Opção com cuba estampada ou soldada',
      'Espelho traseiro (frontão) contra respingos',
      'Prateleira inferior lisa ou gradeada'
    ]
  },
  {
    id: '5',
    slug: 'balcao-vitrine-acougue-padaria-lanchonete',
    title: 'Balcão vitrine refrigerada para açougue, padaria e lanchonete',
    category: 'Vitrines',
    image: '/images/produtos/balcao-vitrine-acougue-padaria-lanchonete.jpg',
    shortDescription: 'sob medida para expositor de carnes, salgados, bolos e doces, com vidro curvo e iluminação em LED.',
    description: 'Balcão vitrine refrigerada fabricado sob medida para expor carnes no açougue, salgados na lanchonete ou bolos e doces na padaria e confeitaria. Estrutura monobloco em aço inox, vidro curvo resistente e sistema de refrigeração com ar forçado para manter a temperatura uniforme durante todo o dia de exposição.',
    specifications: {
      dimensions: '1400mm a 2500mm (L) x 1250mm (A) x 700mm (P)',
      material: 'Aço Inox 430/304, estrutura monobloco e vidro curvo temperado',
      capacity: '2 a 4 níveis de prateleiras (varia por segmento)',
      coolingRange: '0°C a +8°C',
      weight: '110 a 180 kg (conforme tamanho)'
    },
    deliveryTime: '15 a 20 dias úteis',
    features: [
      'Estrutura monobloco (maior resistência do vidro)',
      'Iluminação em LED para valorizar os produtos',
      'Controlador digital de temperatura',
      'Adaptável para açougue, padaria, confeitaria ou lanchonete'
    ]
  },
  {
    id: '6',
    slug: 'ilha-de-congelados-e-bebidas',
    title: 'Ilha de congelados e bebidas (freezer ilha)',
    category: 'Expositores',
    image: '/images/produtos/ilha-de-congelados-e-bebidas.jpg',
    shortDescription: 'freezer tipo ilha para supermercados e lojas de conveniência, tampa de vidro deslizante, 2 a 3 metros.',
    description: 'A ilha de congelados, também conhecida como freezer ilha, é o equipamento horizontal aberto usado em supermercados e lojas de conveniência para expor congelados e bebidas, com tampa de vidro deslizante para fácil acesso do cliente. Design que otimiza o espaço de venda e favorece a compra por impulso.',
    specifications: {
      dimensions: '2000mm a 3000mm (L) x 900mm (A) x 750mm (P)',
      material: 'Aço pré-pintado com tampo em vidro temperado deslizante',
      capacity: '500 a 850 litros (conforme tamanho)',
      coolingRange: '-18°C ou inferior (congelados) / 0°C a 5°C (resfriados)',
      weight: '150 a 220 kg (conforme tamanho)'
    },
    deliveryTime: '20 a 25 dias úteis',
    features: [
      'Tampa de vidro deslizante ou basculante',
      'Divisórias internas ajustáveis',
      'Iluminação interna em LED',
      'Baixo consumo de energia'
    ]
  },
  {
    id: '7',
    slug: 'expositor-vertical-de-bebidas',
    title: 'Expositor vertical de bebidas (1, 2 ou 3 portas)',
    category: 'Expositores',
    image: '/images/produtos/expositor-vertical-de-bebidas.jpg',
    shortDescription: 'geladeira expositora com porta de vidro, ideal para bares, mercados, lanchonetes e conveniências.',
    description: 'O expositor vertical de bebidas é a geladeira expositora com porta de vidro que todo bar, mercado ou loja de conveniência precisa: visibilidade total do produto, fechamento automático da porta para economia de energia e capacidade para centenas de latas ou garrafas.',
    specifications: {
      dimensions: '600mm a 1900mm (L) x 2000mm (A) x 650mm (P)',
      material: 'Aço pré-pintado com porta(s) de vidro duplo',
      capacity: '230 a 800 litros (conforme número de portas)',
      coolingRange: '0°C a +7°C',
      weight: '80 a 160 kg (conforme tamanho)'
    },
    deliveryTime: '15 a 20 dias úteis',
    features: [
      'Portas de vidro com fechamento automático',
      'Iluminação interna em LED',
      'Prateleiras reguláveis em altura',
      'Disponível com 1, 2 ou 3 portas'
    ]
  }
];

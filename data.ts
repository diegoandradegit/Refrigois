import { Service, ServiceCategory, Project, ProjectPhoto, Product } from './types';

export const serviceCategoriesData: ServiceCategory[] = [
  {
    slug: 'camara-fria',
    title: 'Câmara Fria',
    description: 'Instalação, fabricação, manutenção, reforma e higienização de câmara fria e câmara frigorífica em Maringá e região.',
    image: '/images/servicos/categorias/camara-fria.jpg',
  },
  {
    slug: 'refrigeracao-comercial',
    title: 'Refrigeração Comercial',
    description: 'Venda, instalação e manutenção de freezer comercial, geladeira comercial, balcão refrigerado, expositores, ilhas, chopeiras e mais equipamentos para o seu negócio em Maringá.',
    image: '/images/servicos/categorias/refrigeracao-comercial.jpg',
  },
];

export const servicesData: Service[] = [
  // ---------- Câmara Fria ----------
  {
    id: '1',
    slug: 'instalacao',
    categorySlug: 'camara-fria',
    title: 'Instalação de Câmara Fria',
    description: 'Instalação de câmara fria e câmara frigorífica para açougue, supermercado, restaurante e distribuidora, com projeto sob medida em Maringá.',
    longDescription: 'A instalação de câmara fria exige planejamento técnico preciso: dimensionamento da carga térmica, escolha dos painéis isotérmicos corretos e posicionamento da unidade condensadora. Cuidamos de todo o processo, do projeto à entrega — incluindo câmaras com porta de vidro (walk-in cooler / beer cave) para bares e distribuidoras de bebidas — garantindo eficiência energética desde o primeiro dia.',
    image: '/images/servicos/instalacao.jpg',
    features: ['Projeto e dimensionamento de carga térmica', 'Montagem de painéis isotérmicos EPS/PUR', 'Instalação de unidade condensadora e evaporadora', 'Opção com porta de vidro (walk-in cooler / beer cave)'],
    technicalInfo: 'Instalação para câmaras resfriadas (0°C a 5°C) e congeladas (-18°C a -25°C), de pequeno a grande porte.',
    warranty: '12 meses para a instalação completa.',
    deliveryArea: 'Maringá e região, com atendimento nacional para projetos agendados.'
  },
  {
    id: '2',
    slug: 'fabricacao',
    categorySlug: 'camara-fria',
    title: 'Fabricação de Câmara Fria',
    description: 'Fabricação de câmara fria sob medida para supermercados, açougues, padarias, restaurantes e distribuidoras em Maringá.',
    longDescription: 'Construção completa de câmaras frias para resfriados (0°C a 5°C) ou congelados (-18°C a -25°C), incluindo modelos com porta de vidro (walk-in cooler / beer cave). Usamos painéis isotérmicos EPS ou PUR com portas de alto desempenho, além de sistemas de frio dimensionados para suportar o fluxo intenso de mercadorias do seu negócio.',
    image: '/images/servicos/fabricacao.jpg',
    features: ['Isolamento térmico com painéis modulares', 'Unidades condensadoras com baixo ruído', 'Portas seccionais, de correr ou de vidro', 'Quadros de comando com telemetria'],
    technicalInfo: 'Fluidos refrigerantes HFC e HFO. Opções de degelo elétrico ou gás quente.',
    warranty: '12 meses para projeto completo.',
    deliveryArea: 'Sul e Centro-Oeste do Brasil.'
  },
  {
    id: '3',
    slug: 'manutencao',
    categorySlug: 'camara-fria',
    title: 'Manutenção e Conserto de Câmara Fria',
    description: 'Manutenção preventiva e conserto de câmara fria para supermercados, restaurantes, açougues e centros de distribuição, com atendimento rápido em Maringá e região.',
    longDescription: 'A manutenção e o conserto de câmara fria são essenciais para evitar perda de mercadoria, quebra de temperatura e paradas inesperadas que geram prejuízo. Nossa equipe técnica realiza diagnóstico completo do sistema, troca de componentes desgastados, verificação de vedação das portas e ajuste do controle de temperatura. Também oferecemos contratos de manutenção preventiva periódica, com visitas programadas que evitam quebras inesperadas.',
    image: '/images/servicos/manutencao.jpg',
    features: ['Diagnóstico completo do sistema de refrigeração', 'Conserto e reparo de vazamentos de gás', 'Verificação e substituição de borrachas de vedação', 'Contratos de manutenção preventiva periódica'],
    technicalInfo: 'Atendimento a câmaras frias resfriadas (0°C a 5°C) e congeladas (-18°C a -25°C), com unidades condensadoras de qualquer porte.',
    warranty: '90 dias para serviços prestados, além da garantia de peças trocadas.',
    deliveryArea: 'Maringá e região (raio de 150km).'
  },
  {
    id: '4',
    slug: 'reforma',
    categorySlug: 'camara-fria',
    title: 'Reforma de Câmara Fria',
    description: 'Reforma e modernização de câmara fria: troca de isolamento, painéis, portas e atualização do sistema de refrigeração em Maringá.',
    longDescription: 'A reforma de câmara fria atualiza o sistema de refrigeração, isolamento e componentes estruturais de uma câmara já existente, estendendo sua vida útil e reduzindo o consumo de energia. Fazemos análise técnica completa antes de propor a reforma, incluindo troca de painéis, portas, evaporadores e unidades condensadoras.',
    image: '/images/servicos/reforma.jpg',
    features: ['Análise técnica e diagnóstico completo', 'Troca de painéis isotérmicos e portas', 'Atualização de evaporadores e unidades condensadoras', 'Modernização do sistema de controle'],
    technicalInfo: 'Reformas parciais (isolamento, portas) ou completas (retrofit total do sistema de refrigeração).',
    warranty: '12 meses para os componentes reformados.',
    deliveryArea: 'Maringá e região (raio de 150km).'
  },
  {
    id: '5',
    slug: 'higienizacao',
    categorySlug: 'camara-fria',
    title: 'Higienização de Câmara Fria',
    description: 'Higienização e limpeza especializada de câmara fria para garantir segurança sanitária e desempenho, em Maringá e região.',
    longDescription: 'A higienização de câmara fria remove o acúmulo de gelo, mofo e resíduos que comprometem a segurança sanitária e a eficiência do equipamento. Realizamos limpeza especializada interna e externa, incluindo evaporadores e drenos, mantendo sua câmara fria dentro das exigências da vigilância sanitária.',
    image: '/images/servicos/higienizacao.jpg',
    features: ['Limpeza interna e externa especializada', 'Higienização de evaporadores e drenos', 'Remoção de gelo acumulado e mofo', 'Adequação às normas da vigilância sanitária'],
    technicalInfo: 'Higienização recomendada a cada 6 meses, ou conforme exigência do seu segmento (alimentício, farmacêutico).',
    warranty: 'Relatório de serviço para fins de auditoria sanitária.',
    deliveryArea: 'Maringá e região (raio de 150km).'
  },

  // ---------- Refrigeração Comercial ----------
  {
    id: '6',
    slug: 'freezer-comercial',
    categorySlug: 'refrigeracao-comercial',
    title: 'Freezer Comercial',
    description: 'Venda, instalação e manutenção de freezer comercial para supermercados, açougues, padarias e distribuidoras em Maringá.',
    longDescription: 'Fabricamos, instalamos e damos manutenção em freezers comerciais horizontais e verticais para armazenamento e exposição de congelados. Se o seu freezer comercial parou ou perdeu eficiência, atendemos com agilidade para não deixar mercadoria em risco.',
    image: '/images/servicos/freezer-comercial.jpg',
    features: ['Fabricação e venda sob medida', 'Instalação técnica completa', 'Manutenção preventiva e conserto', 'Diagnóstico de falhas em compressor e gás'],
    technicalInfo: 'Atendimento a freezers comerciais horizontais e verticais de qualquer marca e porte.',
    warranty: '90 dias em serviços, 12 meses em fabricação própria.',
    deliveryArea: 'Maringá e região (raio de 150km).'
  },
  {
    id: '7',
    slug: 'geladeira-comercial',
    categorySlug: 'refrigeracao-comercial',
    title: 'Geladeira Comercial',
    description: 'Venda, instalação e manutenção de geladeira comercial para bares, restaurantes, lanchonetes e mercados em Maringá.',
    longDescription: 'A geladeira comercial precisa aguentar rotina pesada de abre e fecha, dia após dia. Fazemos manutenção preventiva e corretiva, além de fabricação sob medida para necessidades específicas do seu negócio, sempre priorizando o funcionamento contínuo e a economia de energia.',
    image: '/images/servicos/geladeira-comercial.jpg',
    features: ['Diagnóstico de falhas em compressor e gás refrigerante', 'Troca de termostato e controlador digital', 'Recarga de gás refrigerante', 'Substituição de borrachas de vedação'],
    technicalInfo: 'Atendimento a geladeiras comerciais de qualquer marca e porte.',
    warranty: '90 dias para serviços prestados, além da garantia de peças trocadas.',
    deliveryArea: 'Maringá e região (raio de 150km).'
  },
  {
    id: '8',
    slug: 'balcao-refrigerado',
    categorySlug: 'refrigeracao-comercial',
    title: 'Balcão Refrigerado',
    description: 'Fabricação, instalação e manutenção de balcão refrigerado e vitrine refrigerada para açougue, padaria e lanchonete em Maringá.',
    longDescription: 'Balcão refrigerado e vitrine refrigerada exigem atenção constante à vedação, ao motor e ao sistema de ar forçado para manter a exposição dos produtos sempre na temperatura certa. Fabricamos sob medida em aço inox e também fazemos manutenção preventiva e corretiva, evitando embaçamento de vidros e perda de produtos expostos.',
    image: '/images/servicos/balcao-refrigerado.jpg',
    features: ['Fabricação sob medida em aço inox', 'Troca de motor e compressor', 'Reparo e troca de vidros', 'Ajuste do sistema de ar forçado'],
    technicalInfo: 'Atendimento a balcões e vitrines refrigeradas de açougue, padaria, confeitaria e lanchonete.',
    warranty: '90 dias em serviços, 12 meses em fabricação própria.',
    deliveryArea: 'Maringá e região (raio de 150km).'
  },
  {
    id: '9',
    slug: 'expositor-refrigerado',
    categorySlug: 'refrigeracao-comercial',
    title: 'Expositor Refrigerado',
    description: 'Venda, instalação e manutenção de expositor vertical refrigerado (1, 2 ou 3 portas) para bares, mercados e conveniências em Maringá.',
    longDescription: 'O expositor vertical refrigerado é a geladeira expositora com porta de vidro que todo bar, mercado ou loja de conveniência precisa: visibilidade total do produto e fechamento automático da porta para economia de energia. Fazemos manutenção preventiva e corretiva, corrigindo problemas de vedação, embaçamento de vidro e falhas no compressor.',
    image: '/images/servicos/expositor-refrigerado.jpg',
    features: ['Disponível com 1, 2 ou 3 portas', 'Reparo e ajuste de portas de vidro', 'Troca de borrachas de vedação', 'Manutenção de motor e compressor'],
    technicalInfo: 'Atendimento a expositores verticais de qualquer marca e número de portas.',
    warranty: '90 dias para serviços prestados, além da garantia de peças trocadas.',
    deliveryArea: 'Maringá e região (raio de 150km).'
  },
  {
    id: '10',
    slug: 'ilha-refrigerada',
    categorySlug: 'refrigeracao-comercial',
    title: 'Ilha Refrigerada',
    description: 'Venda, instalação e manutenção de ilha refrigerada (ilha de congelados / freezer ilha) para supermercados e lojas de conveniência em Maringá.',
    longDescription: 'A ilha refrigerada, também conhecida como ilha de congelados ou freezer ilha, é o equipamento horizontal aberto usado em supermercados e conveniências para expor congelados e bebidas, com tampa de vidro deslizante. Fazemos manutenção preventiva e corretiva, corrigindo falhas de compressor, vedação da tampa e sistema de degelo.',
    image: '/images/servicos/ilha-refrigerada.jpg',
    features: ['Diagnóstico de falhas no compressor', 'Ajuste e troca de vedação da tampa de vidro', 'Manutenção do sistema de degelo', 'Calibração do controlador de temperatura'],
    technicalInfo: 'Atendimento a ilhas refrigeradas de 2 a 3 metros, de qualquer marca.',
    warranty: '90 dias para serviços prestados, além da garantia de peças trocadas.',
    deliveryArea: 'Maringá e região (raio de 150km).'
  },
  {
    id: '11',
    slug: 'mesa-refrigerada',
    categorySlug: 'refrigeracao-comercial',
    title: 'Mesa Refrigerada',
    description: 'Fabricação, instalação e manutenção de mesa refrigerada para pizzarias, lanchonetes e cozinhas industriais em Maringá.',
    longDescription: 'A mesa refrigerada (também chamada de pista fria ou bancada refrigerada) é essencial em pizzarias, lanchonetes e cozinhas industriais para manter ingredientes na temperatura correta durante o preparo. Fabricamos sob medida em aço inox e fazemos manutenção preventiva e corretiva para garantir refrigeração uniforme.',
    image: '/images/servicos/mesa-refrigerada.jpg',
    features: ['Fabricação sob medida em aço inox', 'Cuba fria (pista fria) para ingredientes', 'Manutenção de compressor e gás refrigerante', 'Ajuste de sistema de ar forçado'],
    technicalInfo: 'Atendimento a mesas/bancadas refrigeradas de qualquer marca e porte.',
    warranty: '90 dias em serviços, 12 meses em fabricação própria.',
    deliveryArea: 'Maringá e região (raio de 150km).'
  },
  {
    id: '12',
    slug: 'resfriador-de-bebidas',
    categorySlug: 'refrigeracao-comercial',
    title: 'Resfriador de Bebidas',
    description: 'Venda, instalação e manutenção de resfriador de bebidas para bares, distribuidoras e lojas de conveniência em Maringá.',
    longDescription: 'O resfriador de bebidas mantém cervejas, refrigerantes e outras bebidas na temperatura ideal de consumo. Trabalhamos com diferentes modelos, incluindo câmaras com porta de vidro (walk-in cooler / beer cave), e realizamos manutenção preventiva e corretiva para o seu negócio nunca ficar sem bebida gelada.',
    image: '/images/servicos/resfriador-de-bebidas.jpg',
    features: ['Modelos verticais, ilha ou walk-in cooler', 'Instalação técnica completa', 'Manutenção preventiva e corretiva', 'Ajuste de temperatura por tipo de bebida'],
    technicalInfo: 'Temperatura ajustável conforme o produto: cervejas, vinhos, destilados ou bebidas em geral.',
    warranty: '90 dias em serviços, 12 meses em fabricação própria.',
    deliveryArea: 'Maringá e região (raio de 150km).'
  },
  {
    id: '13',
    slug: 'chopeira',
    categorySlug: 'refrigeracao-comercial',
    title: 'Chopeira',
    description: 'Manutenção e instalação de chopeira e cervejeira para bares, restaurantes e distribuidoras em Maringá.',
    longDescription: 'Chopeira parada é chope choco e cliente insatisfeito. Fazemos instalação e manutenção preventiva e corretiva de chopeiras e cervejeiras, incluindo limpeza de linhas, troca de componentes de refrigeração e ajuste de pressão de CO2.',
    image: '/images/servicos/chopeira.jpg',
    features: ['Instalação técnica completa', 'Limpeza de linhas de chopeira', 'Manutenção do sistema de refrigeração', 'Ajuste de pressão de CO2'],
    technicalInfo: 'Atendimento a chopeiras e cervejeiras de contrapressão e convencionais, de qualquer marca.',
    warranty: '90 dias para serviços prestados, além da garantia de peças trocadas.',
    deliveryArea: 'Maringá e região (raio de 150km).'
  },
  {
    id: '14',
    slug: 'maquina-de-gelo',
    categorySlug: 'refrigeracao-comercial',
    title: 'Máquina de Gelo',
    description: 'Manutenção e instalação de máquina de gelo comercial para bares, restaurantes e distribuidoras em Maringá.',
    longDescription: 'A máquina de gelo comercial precisa de manutenção regular para manter a produção e evitar contaminação. Fazemos instalação, limpeza especializada e manutenção preventiva e corretiva, garantindo produção constante de gelo para o seu negócio.',
    image: '/images/servicos/maquina-de-gelo.jpg',
    features: ['Instalação técnica completa', 'Limpeza e higienização especializada', 'Manutenção de compressor e sistema de produção', 'Diagnóstico de queda de produção de gelo'],
    technicalInfo: 'Atendimento a máquinas de gelo em cubo, escama ou nugget, de qualquer marca.',
    warranty: '90 dias para serviços prestados, além da garantia de peças trocadas.',
    deliveryArea: 'Maringá e região (raio de 150km).'
  },
  {
    id: '15',
    slug: 'bebedouro-industrial',
    categorySlug: 'refrigeracao-comercial',
    title: 'Bebedouro Industrial',
    description: 'Manutenção e instalação de bebedouro industrial para indústrias, escritórios e cozinhas industriais em Maringá.',
    longDescription: 'O bebedouro industrial atende alta demanda de consumo e precisa de manutenção regular para garantir água gelada e higienizada. Fazemos instalação, manutenção preventiva e corretiva, incluindo limpeza de reservatório e troca de filtros.',
    image: '/images/servicos/bebedouro-industrial.jpg',
    features: ['Instalação técnica completa', 'Limpeza de reservatório e troca de filtros', 'Manutenção do sistema de refrigeração', 'Diagnóstico de baixa produção de água gelada'],
    technicalInfo: 'Atendimento a bebedouros industriais de coluna, pressão ou compressor, de qualquer marca.',
    warranty: '90 dias para serviços prestados, além da garantia de peças trocadas.',
    deliveryArea: 'Maringá e região (raio de 150km).'
  },
];

// Projetos vindos do banco de dados. O arquivo generated/projetos.json e
// escrito pelo scripts/sync-conteudo.js antes de cada build, com o que esta
// publicado no painel. Nao edite a mao: a proxima publicacao sobrescreve.
import projetosGerados from './generated/projetos.json';

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

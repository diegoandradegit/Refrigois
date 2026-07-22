import { City } from './types';

// ESTRUTURA DE CIDADES — PARANÁ
//
// Esta é a base de dados das cidades prioritárias de atendimento da Refrigóis.
// A estrutura técnica (tipo, rota /cidades/:slug e componente base) está pronta,
// mas as PÁGINAS COMPLETAS por cidade NÃO devem ser criadas em massa: cada uma
// precisa de conteúdo único (segmentos fortes da cidade, FAQ local, cidades
// vizinhas) para não virar "doorway page", o que o Google penaliza.
//
// Estratégia aprovada: publicar poucas por vez, começando pelas praças de
// baixa concorrência (Paranavaí, Umuarama, Campo Mourão) quando o Search
// Console mostrar impressões reais por esses termos. Enquanto `published`
// for false, a cidade aparece na cobertura regional (rodapé/mapa), mas não
// gera página indexável própria.

export const citiesData: City[] = [
  // Corredor Maringá (noroeste)
  { slug: 'maringa', name: 'Maringá', region: 'Noroeste do Paraná', distanceFromBaseKm: 0, published: false },
  { slug: 'paranavai', name: 'Paranavaí', region: 'Noroeste do Paraná', distanceFromBaseKm: 75, nearbyCities: ['Nova Londrina', 'Loanda', 'Alto Paraná'], published: false },
  { slug: 'umuarama', name: 'Umuarama', region: 'Noroeste do Paraná', distanceFromBaseKm: 110, nearbyCities: ['Xambrê', 'Pérola', 'Altônia'], published: false },
  { slug: 'campo-mourao', name: 'Campo Mourão', region: 'Centro-Ocidental do Paraná', distanceFromBaseKm: 90, nearbyCities: ['Peabiru', 'Araruna'], published: false },
  { slug: 'cianorte', name: 'Cianorte', region: 'Noroeste do Paraná', distanceFromBaseKm: 70, nearbyCities: ['Terra Boa', 'Jussara'], published: false },
  { slug: 'mandaguacu', name: 'Mandaguaçu', region: 'Noroeste do Paraná', distanceFromBaseKm: 25, published: false },
  { slug: 'paicandu', name: 'Paiçandu', region: 'Noroeste do Paraná', distanceFromBaseKm: 15, published: false },
  { slug: 'sarandi', name: 'Sarandi', region: 'Noroeste do Paraná', distanceFromBaseKm: 12, published: false },
  { slug: 'marialva', name: 'Marialva', region: 'Noroeste do Paraná', distanceFromBaseKm: 20, published: false },

  // Eixo norte (Londrina)
  { slug: 'londrina', name: 'Londrina', region: 'Norte do Paraná', distanceFromBaseKm: 100, nearbyCities: ['Cambé', 'Rolândia', 'Ibiporã'], published: false },
  { slug: 'apucarana', name: 'Apucarana', region: 'Norte do Paraná', distanceFromBaseKm: 55, published: false },
  { slug: 'arapongas', name: 'Arapongas', region: 'Norte do Paraná', distanceFromBaseKm: 65, published: false },

  // Oeste
  { slug: 'cascavel', name: 'Cascavel', region: 'Oeste do Paraná', distanceFromBaseKm: 235, nearbyCities: ['Toledo', 'Corbélia'], published: false },
  { slug: 'toledo', name: 'Toledo', region: 'Oeste do Paraná', distanceFromBaseKm: 250, published: false },
  { slug: 'guaira', name: 'Guaíra', region: 'Oeste do Paraná', distanceFromBaseKm: 200, published: false },
  { slug: 'foz-do-iguacu', name: 'Foz do Iguaçu', region: 'Oeste do Paraná', distanceFromBaseKm: 330, published: false },

  // Centro-sul e leste
  { slug: 'guarapuava', name: 'Guarapuava', region: 'Centro-Sul do Paraná', distanceFromBaseKm: 290, published: false },
  { slug: 'ponta-grossa', name: 'Ponta Grossa', region: 'Campos Gerais', distanceFromBaseKm: 340, published: false },
  { slug: 'curitiba', name: 'Curitiba', region: 'Região Metropolitana de Curitiba', distanceFromBaseKm: 430, published: false },
];

// Helper: cidades já liberadas para gerar página indexável.
export const publishedCities = citiesData.filter((c) => c.published);

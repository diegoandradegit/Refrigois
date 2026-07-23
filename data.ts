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

// Catalogo vindo do banco, gravado por scripts/sync-conteudo.js antes do
// build. Nao edite a mao: a proxima publicacao sobrescreve.
import produtosGerados from './generated/produtos.json';

export const productsData: Product[] = produtosGerados.produtos as Product[];

export const productCategories = produtosGerados.categorias;

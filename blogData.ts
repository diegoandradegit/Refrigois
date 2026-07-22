import { BlogPost, BlogCategory } from './types';

// Conteudo do blog vindo do banco de dados, gravado por
// scripts/sync-conteudo.js antes do build. Nao edite a mao.
import categoriasGeradas from './generated/categorias.json';
import artigosGerados from './generated/artigos.json';

export const blogCategoriesData: BlogCategory[] = categoriasGeradas as BlogCategory[];

export const blogPostsData: BlogPost[] = artigosGerados as BlogPost[];

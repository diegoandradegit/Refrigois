import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Calendar } from 'lucide-react';
import { blogPostsData, blogCategoriesData } from '../blogData';
import { Contact } from '../components/Contact';
import { ServiceArea } from '../components/ServiceArea';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Pagination } from '../components/Pagination';
import { useSEO } from '../hooks/useSEO';

interface BlogCategoryPageProps {
  onOpenQuote: () => void;
}

const POSTS_PER_PAGE = 9;

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

export const BlogCategoryPage: React.FC<BlogCategoryPageProps> = ({ onOpenQuote }) => {
  const { categorySlug, page } = useParams<{ categorySlug: string; page?: string }>();
  const category = blogCategoriesData.find((c) => c.slug === categorySlug);
  const allPosts = blogPostsData
    .filter((p) => p.categorySlug === categorySlug)
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

  const currentPage = Math.max(1, parseInt(page || '1', 10) || 1);
  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(start, start + POSTS_PER_PAGE);
  const basePath = `/blog/categoria/${categorySlug}`;

  useSEO({
    title: category
      ? currentPage > 1 ? `${category.title} — Página ${currentPage} | Blog Refrigóis` : `${category.title} | Blog Refrigóis`
      : 'Categoria não encontrada',
    description: category ? category.description : 'Categoria não encontrada.',
    path: currentPage > 1 ? `${basePath}/pagina/${currentPage}` : basePath,
    image: categorySlug ? `https://refrigois.com.br/og/blog-categoria-${categorySlug}.jpg` : undefined,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categorySlug, currentPage]);

  if (!category) {
    return (
      <main className="pt-32 pb-24 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Categoria não encontrada</h1>
        <Link to="/blog" className="text-brand-600 hover:underline">Voltar para o blog</Link>
      </main>
    );
  }

  return (
    <main className="pt-20">
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Blog', href: '/blog' }, { label: category.title }]} />
          <Link to="/blog" className="flex w-fit items-center text-brand-600 hover:text-brand-800 mb-6 transition-colors text-sm font-bold uppercase tracking-widest">
            <ArrowLeft size={16} className="mr-2" />
            Voltar para o Blog
          </Link>
          <div className="max-w-3xl mb-12 md:mb-16">
            <h1 className="text-xs md:text-sm font-bold tracking-widest text-brand-600 uppercase mb-3">Categoria</h1>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{category.title}</h2>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">{category.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-slate-50 border border-slate-100 hover:border-brand-300 transition-all duration-300 hover:shadow-lg flex flex-col rounded-sm overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">{post.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Calendar size={14} />
                      {formatDate(post.publishedAt)}
                    </span>
                    <span className="inline-flex items-center text-sm font-bold text-brand-600 group-hover:text-brand-800 transition-colors">
                      Ler
                      <ArrowRight size={16} className="ml-1 transform transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <Pagination currentPage={currentPage} totalPages={totalPages} basePath={basePath} />
        </div>
      </section>
      <ServiceArea />
      <Contact onOpenQuote={onOpenQuote} compact />
    </main>
  );
};

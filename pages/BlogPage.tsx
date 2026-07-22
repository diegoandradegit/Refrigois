import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Calendar, Clock, RefreshCw } from 'lucide-react';
import { blogPostsData, blogCategoriesData } from '../blogData';
import { Contact } from '../components/Contact';
import { ServiceArea } from '../components/ServiceArea';
import { Pagination } from '../components/Pagination';
import { useSEO } from '../hooks/useSEO';

interface BlogPageProps {
  onOpenQuote: () => void;
}

const POSTS_PER_PAGE = 9;

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

export const BlogPage: React.FC<BlogPageProps> = ({ onOpenQuote }) => {
  const { page } = useParams<{ page?: string }>();
  const currentPage = Math.max(1, parseInt(page || '1', 10) || 1);

  const sorted = [...blogPostsData].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  const totalPages = Math.max(1, Math.ceil(sorted.length / POSTS_PER_PAGE));
  const start = (currentPage - 1) * POSTS_PER_PAGE;
  const pagePosts = sorted.slice(start, start + POSTS_PER_PAGE);

  useSEO({
    title: currentPage > 1
      ? `Blog — Página ${currentPage} | Dicas de Refrigeração Comercial`
      : 'Blog | Dicas de Refrigeração Comercial e Câmara Fria',
    description: 'Artigos e notícias sobre manutenção de câmara fria, refrigeração comercial, freezer e geladeira comercial — conteúdo técnico da Refrigóis para o seu negócio.',
    path: currentPage > 1 ? `/blog/pagina/${currentPage}` : '/blog',
    image: 'https://refrigois.com.br/og/blog.jpg',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <main className="pt-20">
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            {/* O H1 precisa ser o assunto da pagina, nao o rotulo da secao.
                Antes "Blog" era o H1 e o titulo real era H2. */}
            <p className="text-xs md:text-sm font-bold tracking-widest text-brand-600 uppercase mb-3">Blog</p>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Dicas de Refrigeração Comercial e Câmara Fria
            </h1>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              Conteúdo técnico escrito por quem instala e mantém equipamento de refrigeração todos os dias.
              Guias práticos para entender, escolher e conservar o que mantém o seu negócio funcionando.
            </p>
          </div>

          {/* Categorias */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 md:mb-16">
            {blogCategoriesData.map((cat) => (
              <Link
                key={cat.slug}
                to={`/blog/categoria/${cat.slug}`}
                className="px-4 py-2 text-sm font-bold uppercase tracking-wide border border-slate-200 rounded-full text-slate-700 hover:border-brand-500 hover:text-brand-600 transition-colors"
              >
                {cat.title}
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {pagePosts.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="group bg-slate-50 border border-slate-100 hover:border-brand-300 transition-all duration-300 hover:shadow-lg flex flex-col rounded-sm overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.imageAlt || post.title}
                    width={600}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-xs font-bold text-brand-600 uppercase tracking-wide mb-2">{post.category}</span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 leading-snug">{post.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed flex-1">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="flex items-center gap-3 text-xs text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} />
                        {formatDate(post.publishedAt)}
                      </span>
                      {post.readingMinutes && (
                        <span className="flex items-center gap-1.5">
                          <Clock size={14} />
                          {post.readingMinutes} min
                        </span>
                      )}
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

          <Pagination currentPage={currentPage} totalPages={totalPages} basePath="/blog" />
        </div>
      </section>
      <ServiceArea />
      <Contact onOpenQuote={onOpenQuote} compact />
    </main>
  );
};

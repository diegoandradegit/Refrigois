import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, ArrowRight, Check, AlertTriangle, Lightbulb, ChevronDown, Clock, RefreshCw } from 'lucide-react';
import { blogPostsData } from '../blogData';
import { servicesData, serviceCategoriesData, projectsData } from '../data';
import { Contact } from '../components/Contact';
import { ServiceArea } from '../components/ServiceArea';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Button } from '../components/Button';
import { useSEO } from '../hooks/useSEO';
import { formatarData } from '../utils/data';

interface BlogPostPageProps {
  onOpenQuote: () => void;
}


export const BlogPostPage: React.FC<BlogPostPageProps> = ({ onOpenQuote }) => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPostsData.find((p) => p.slug === slug);

  useSEO({
    title: post ? post.metaTitle : 'Artigo não encontrado',
    description: post ? post.description : 'Artigo não encontrado.',
    path: `/blog/${slug}`,
    image: slug ? `https://refrigois.com.br/og/blog-${slug}.jpg` : undefined,
    type: 'article',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!post) {
    return (
      <main className="pt-32 pb-24 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Artigo não encontrado</h1>
        <Link to="/blog" className="text-brand-600 hover:underline">Voltar para o blog</Link>
      </main>
    );
  }

  const relatedService = post.relatedServiceSlug
    ? servicesData.find((s) => `${s.categorySlug}/${s.slug}` === post.relatedServiceSlug)
    : undefined;
  const relatedCategory = post.relatedCategorySlug
    ? serviceCategoriesData.find((c) => c.slug === post.relatedCategorySlug)
    : undefined;
  const relatedProject = post.relatedProjectSlug
    ? projectsData.find((p) => p.slug === post.relatedProjectSlug)
    : undefined;

  return (
    <main className="pt-20">
      <article>
        <section className="relative py-20 md:py-28 bg-slate-900">
          <div className="absolute inset-0 z-0">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover object-center opacity-30"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs
              dark
              items={[
                { label: 'Blog', href: '/blog' },
                { label: post.category, href: `/blog/categoria/${post.categorySlug}` },
                { label: post.title },
              ]}
            />
            <Link to="/blog" className="flex w-fit items-center text-brand-300 hover:text-white mb-6 transition-colors text-sm font-bold uppercase tracking-widest">
              <ArrowLeft size={16} className="mr-2" />
              Voltar para o Blog
            </Link>
            <Link
              to={`/blog/categoria/${post.categorySlug}`}
              className="inline-block text-xs font-bold text-brand-400 hover:text-brand-300 uppercase tracking-wide mb-3 transition-colors"
            >
              {post.category}
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold text-white mt-1 mb-4 leading-tight">
              {post.title}
            </h1>
            {/* Autoria e datas: sinais de E-E-A-T que o Google usa pra avaliar
                quem escreveu, com que experiencia e se o conteudo esta vivo. */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-400">
              <span className="text-slate-300">
                Por <strong className="font-bold text-white">Equipe Tecnica Refrigois</strong>
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar size={14} />
                {formatarData(post.publishedAt)}
              </span>
              {post.updatedAt && post.updatedAt !== post.publishedAt && (
                <span className="flex items-center gap-1.5">
                  <RefreshCw size={14} />
                  Atualizado em {formatarData(post.updatedAt)}
                </span>
              )}
              {post.readingMinutes && (
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {post.readingMinutes} min de leitura
                </span>
              )}
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <aside className="mb-10 bg-brand-50 border-l-4 border-brand-500 p-5 md:p-6 rounded-sm">
                <h2 className="text-sm font-bold uppercase tracking-widest text-brand-700 mb-3">
                  Resumo rapido
                </h2>
                <ul className="space-y-2">
                  {post.keyTakeaways.map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-slate-800 text-sm md:text-base leading-relaxed">
                      <Check size={17} className="text-brand-600 shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            )}

            {post.content.map((block, i) => (
              <div key={i} className="mb-8">
                {block.heading && (
                  <h2 className="text-2xl font-bold text-slate-900 mb-4 scroll-mt-24">{block.heading}</h2>
                )}

                {block.paragraphs?.map((p, j) => (
                  <p key={j} className="text-slate-700 leading-relaxed mb-4">{p}</p>
                ))}

                {block.list && (
                  <div className="mb-4">
                    {block.list.title && (
                      <p className="font-bold text-slate-900 mb-3">{block.list.title}</p>
                    )}
                    {block.list.ordered ? (
                      <ol className="space-y-3">
                        {block.list.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-3 text-slate-700 leading-relaxed">
                            <span className="shrink-0 w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                              {j + 1}
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ol>
                    ) : (
                      <ul className="space-y-2.5">
                        {block.list.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-3 text-slate-700 leading-relaxed">
                            <Check size={17} className="text-brand-600 shrink-0 mt-1" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {block.table && (
                  <figure className="mb-4">
                    {/* Rolagem horizontal: tabela tecnica no celular precisa disso
                        pra nao estourar a largura da tela. */}
                    <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                      <table className="w-full min-w-[480px] text-sm border border-slate-200 rounded-sm overflow-hidden">
                        <thead>
                          <tr className="bg-slate-100">
                            {block.table.headers.map((h, j) => (
                              <th key={j} className="text-left font-bold text-slate-900 px-3 py-2.5 border-b border-slate-200">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {block.table.rows.map((row, j) => (
                            <tr key={j} className={j % 2 ? 'bg-slate-50' : 'bg-white'}>
                              {row.map((cell, k) => (
                                <td key={k} className="px-3 py-2.5 text-slate-700 border-b border-slate-100 align-top">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {block.table.caption && (
                      <figcaption className="text-xs text-slate-500 mt-2 italic">{block.table.caption}</figcaption>
                    )}
                  </figure>
                )}

                {block.image && (
                  <figure className="mb-4">
                    <img
                      src={block.image.src}
                      alt={block.image.alt}
                      width={1200}
                      height={800}
                      loading="lazy"
                      decoding="async"
                      className="w-full rounded-sm border border-slate-200"
                    />
                    {block.image.caption && (
                      <figcaption className="text-sm text-slate-500 mt-2 italic">{block.image.caption}</figcaption>
                    )}
                  </figure>
                )}

                {block.callout && (
                  <div
                    className={`mb-4 p-5 rounded-sm border-l-4 ${
                      block.callout.kind === 'atencao'
                        ? 'bg-amber-50 border-amber-500'
                        : 'bg-slate-50 border-brand-500'
                    }`}
                  >
                    <p className="flex items-center gap-2 font-bold text-slate-900 mb-1.5">
                      {block.callout.kind === 'atencao' ? (
                        <AlertTriangle size={17} className="text-amber-600 shrink-0" />
                      ) : (
                        <Lightbulb size={17} className="text-brand-600 shrink-0" />
                      )}
                      {block.callout.title}
                    </p>
                    <p className="text-slate-700 leading-relaxed text-sm md:text-base">{block.callout.text}</p>
                  </div>
                )}
              </div>
            ))}

            {post.faq && post.faq.length > 0 && (
              <section className="mt-12 border-t border-slate-200 pt-10">
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Perguntas frequentes</h2>
                <div className="space-y-3">
                  {post.faq.map((item, i) => (
                    <details key={i} className="group bg-slate-50 border border-slate-200 rounded-sm">
                      <summary className="cursor-pointer list-none px-5 py-4 font-bold text-slate-900 flex items-start justify-between gap-3">
                        <span>{item.q}</span>
                        <ChevronDown size={18} className="shrink-0 mt-0.5 text-slate-500 transition-transform group-open:rotate-180" />
                      </summary>
                      <p className="px-5 pb-4 text-slate-700 leading-relaxed">{item.a}</p>
                    </details>
                  ))}
                </div>
              </section>
            )}

            {relatedProject && (
              <Link
                to={`/projetos/${relatedProject.slug}`}
                className="mt-10 flex flex-col sm:flex-row gap-4 bg-slate-900 text-white rounded-sm overflow-hidden group"
              >
                <img
                  src={relatedProject.image}
                  alt={relatedProject.imageAlt || relatedProject.title}
                  width={400}
                  height={300}
                  loading="lazy"
                  className="w-full sm:w-48 h-40 sm:h-auto object-cover"
                />
                <div className="p-5 flex flex-col justify-center">
                  <span className="text-brand-400 text-xs font-bold uppercase tracking-widest mb-1">
                    Veja na pratica
                  </span>
                  <p className="font-bold text-lg leading-tight mb-2">{relatedProject.title}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-400 group-hover:text-brand-300">
                    Ver projeto executado <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            )}

            {(relatedService || relatedCategory) && (
              <div className="mt-12 bg-slate-50 border border-slate-100 rounded-sm p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sm text-slate-500 mb-1">Precisa desse serviço?</p>
                  <p className="font-bold text-slate-900">
                    {relatedService ? relatedService.title : relatedCategory?.title}
                  </p>
                </div>
                <Link
                  to={
                    relatedService
                      ? `/servicos/${relatedService.categorySlug}/${relatedService.slug}`
                      : `/servicos/${relatedCategory?.slug}`
                  }
                  className="inline-flex items-center text-sm font-bold text-brand-600 hover:text-brand-800 transition-colors uppercase tracking-wide shrink-0"
                >
                  Ver serviço
                  <ArrowRight size={16} className="ml-2" />
                </Link>
              </div>
            )}

            <div className="mt-10">
              <Button onClick={onOpenQuote} className="bg-brand-600 hover:bg-brand-700 border-brand-600 text-white">
                Solicitar Orçamento
              </Button>
            </div>
          </div>
        </section>
      </article>

      <ServiceArea />

      <Contact onOpenQuote={onOpenQuote} compact />
    </main>
  );
};

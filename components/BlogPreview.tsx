import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { blogPostsData } from '../blogData';
import { formatarData } from '../utils/data';


export const BlogPreview: React.FC = () => {
  const latest = [...blogPostsData]
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
    .slice(0, 3);

  return (
    <section className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-10 md:mb-12 gap-4">
          <div>
            <h2 className="text-xs md:text-sm font-bold tracking-widest text-brand-600 uppercase mb-3">Blog</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
              Dicas de Refrigeração Comercial
            </h3>
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center text-sm font-bold text-brand-600 hover:text-brand-800 transition-colors uppercase tracking-wide shrink-0"
          >
            Ver todos os artigos
            <ArrowRight size={16} className="ml-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {latest.map((post) => (
            <Link
              key={post.id}
              to={`/blog/${post.slug}`}
              className="group bg-white border border-slate-100 hover:border-brand-300 transition-all duration-300 hover:shadow-lg flex flex-col rounded-sm overflow-hidden"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <span className="text-xs font-bold text-brand-600 uppercase tracking-wide mb-2">{post.category}</span>
                <h4 className="text-base font-bold text-slate-900 mb-2 leading-snug">{post.title}</h4>
                <span className="flex items-center gap-1.5 text-xs text-slate-400 mt-auto">
                  <Calendar size={13} />
                  {formatarData(post.publishedAt)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

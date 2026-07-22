import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, Calendar, MapPin, Building2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { projectsData, getProjectPhotos } from '../data';
import { Contact } from '../components/Contact';
import { ServiceArea } from '../components/ServiceArea';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { SmartImage } from '../components/SmartImage';
import { useSEO } from '../hooks/useSEO';

interface IndividualProjectPageProps {
  onOpenQuote: () => void;
}

export const IndividualProjectPage: React.FC<IndividualProjectPageProps> = ({ onOpenQuote }) => {
  const { slug } = useParams<{ slug: string }>();
  const project = projectsData.find((p) => p.slug === slug);

  const photos = project ? getProjectPhotos(project) : [];
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useSEO({
    title: project ? (project.seoTitle ?? project.title) : 'Projeto nao encontrado',
    description: project ? (project.seoDescription ?? project.description ?? '') : 'Projeto nao encontrado.',
    path: `/projetos/${slug}`,
    image: project ? `https://refrigois.com.br${project.image}` : undefined,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    setActiveIndex(0);
  }, [slug]);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const prev = useCallback(() => setActiveIndex((i) => (i - 1 + photos.length) % photos.length), [photos.length]);
  const next = useCallback(() => setActiveIndex((i) => (i + 1) % photos.length), [photos.length]);

  useEffect(() => {
    if (!lightboxOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [lightboxOpen, closeLightbox, prev, next]);

  if (!project) {
    return (
      <main className="pt-32 pb-24 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Projeto nao encontrado</h1>
        <p className="text-slate-600 mb-6">Esse projeto pode ter sido movido. Veja o portfolio completo.</p>
        <Link to="/projetos" className="text-brand-600 font-bold hover:underline">
          Ver todos os projetos
        </Link>
      </main>
    );
  }

  const related = projectsData
    .filter((p) => p.categorySlug === project.categorySlug && p.slug !== project.slug)
    .slice(0, 3);

  return (
    <main className="pt-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <Breadcrumbs
          items={[
            { label: 'Projetos', href: '/projetos' },
            { label: project.title },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Galeria */}
          <div>
            <button
              onClick={() => setLightboxOpen(true)}
              className="block w-full relative overflow-hidden rounded-sm bg-white shadow-sm group"
              aria-label="Ampliar foto"
            >
              <SmartImage
                src={photos[activeIndex].src}
                alt={photos[activeIndex].alt}
                width={1200}
                height={900}
                priority
                sizes="(max-width: 1024px) 100vw, 600px"
                className="w-full h-[300px] sm:h-[420px] object-cover"
              />
            </button>

            {photos[activeIndex].caption && (
              <p className="text-sm text-slate-500 mt-2 italic">{photos[activeIndex].caption}</p>
            )}

            {photos.length > 1 && (
              <div className="flex gap-2 mt-4 overflow-x-auto hide-scrollbar pb-1">
                {photos.map((photo, idx) => (
                  <button
                    key={photo.src}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Ver foto ${idx + 1} de ${photos.length}`}
                    aria-current={idx === activeIndex}
                    className={`shrink-0 w-20 h-20 rounded-sm overflow-hidden border-2 transition-colors ${
                      idx === activeIndex ? 'border-brand-500' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={photo.src} alt="" className="w-full h-full object-cover" loading="lazy" width={80} height={80} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Ficha do projeto */}
          <div>
            <span className="inline-block text-brand-600 font-bold text-xs uppercase tracking-widest mb-3">
              {project.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-tight">{project.title}</h1>
            {project.description && (
              <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8">{project.description}</p>
            )}

            <dl className="grid grid-cols-2 gap-4 mb-8">
              {project.client && (
                <div className="bg-white p-4 rounded-sm border border-slate-200">
                  <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">
                    <Building2 size={13} /> Cliente
                  </dt>
                  <dd className="text-slate-900 font-bold text-sm">{project.client}</dd>
                </div>
              )}
              {project.duration && (
                <div className="bg-white p-4 rounded-sm border border-slate-200">
                  <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">
                    <Calendar size={13} /> Prazo de execucao
                  </dt>
                  <dd className="text-slate-900 font-bold text-sm">{project.duration}</dd>
                </div>
              )}
              {project.local && (
                <div className="bg-white p-4 rounded-sm border border-slate-200">
                  <dt className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-500 font-bold mb-1">
                    <MapPin size={13} /> Local
                  </dt>
                  <dd className="text-slate-900 font-bold text-sm">{project.local}</dd>
                </div>
              )}
            </dl>

            {project.features && project.features.length > 0 && (
              <div className="mb-8">
                <h2 className="text-sm font-bold uppercase tracking-widest text-slate-900 mb-4">
                  O que foi executado
                </h2>
                <ul className="space-y-3">
                  {project.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-slate-700">
                      <CheckCircle2 size={18} className="text-brand-600 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <button
              onClick={onOpenQuote}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold uppercase tracking-wider text-sm rounded-sm transition-colors"
            >
              Quero um projeto assim <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Projetos do mesmo segmento — link interno relevante */}
        {related.length > 0 && (
          <section className="border-t border-slate-200 pt-12">
            <h2 className="text-xl font-bold text-slate-900 mb-6">
              Outros projetos para {project.category.toLowerCase()}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {related.map((item) => (
                <Link
                  key={item.id}
                  to={`/projetos/${item.slug}`}
                  className="group block bg-white rounded-sm overflow-hidden border border-slate-200 hover:border-brand-400 transition-colors"
                >
                  <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                    <SmartImage
                      src={item.image}
                      alt={item.imageAlt || item.title}
                      width={600}
                      height={450}
                      sizes="(max-width: 640px) 100vw, 300px"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-slate-900 leading-tight mb-1">{item.title}</h3>
                    <span className="text-xs text-brand-600 font-bold uppercase tracking-wider">Ver projeto</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        <div className="mt-12">
          <Link to="/projetos" className="inline-flex items-center gap-2 text-slate-600 hover:text-brand-600 font-bold text-sm transition-colors">
            <ArrowLeft size={16} /> Voltar para o portfolio
          </Link>
        </div>
      </div>

      <ServiceArea />
      <Contact onOpenQuote={onOpenQuote} />

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/95"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ampliada do projeto ${project.title}`}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-brand-400 bg-slate-900/50 rounded-full p-2 z-20"
            aria-label="Fechar foto"
          >
            <X size={24} />
          </button>
          {photos.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 text-white hover:text-brand-400 bg-slate-900/50 rounded-full p-2 z-20"
              aria-label="Foto anterior"
            >
              <ChevronLeft size={28} />
            </button>
          )}
          <img
            src={photos[activeIndex].src}
            alt={photos[activeIndex].alt}
            className="max-w-full max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {photos.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 text-white hover:text-brand-400 bg-slate-900/50 rounded-full p-2 z-20"
              aria-label="Proxima foto"
            >
              <ChevronRight size={28} />
            </button>
          )}
        </div>
      )}
    </main>
  );
};

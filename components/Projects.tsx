import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GripHorizontal, X, ChevronLeft, ChevronRight, Images, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectsData, projectCategories, getProjectPhotos, getFeaturedProjects } from '../data';
import { SmartImage } from './SmartImage';
import type { Project } from '../types';

interface ProjectsProps {
  /** Quando presente, renderiza o carrossel de destaques da home. */
  limit?: number;
  hideButton?: boolean;
  /** Mostra o filtro por categoria (usado na página /projetos). */
  showFilter?: boolean;
}

export const Projects: React.FC<ProjectsProps> = ({ limit, hideButton, showFilter }) => {
  const isCarousel = !!limit;
  const [activeCategory, setActiveCategory] = useState<string>('todos');

  const ordered = [...projectsData].sort((a, b) => (a.ordem ?? 999) - (b.ordem ?? 999));
  const filtered = activeCategory === 'todos' ? ordered : ordered.filter((p) => p.categorySlug === activeCategory);
  const displayData = isCarousel ? getFeaturedProjects(limit) : filtered;

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const gallery = selectedProject ? getProjectPhotos(selectedProject) : [];

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setActiveIndex(0);
  };

  const closeProject = useCallback(() => setSelectedProject(null), []);

  const showPrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + gallery.length) % gallery.length);
  }, [gallery.length]);

  const showNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % gallery.length);
  }, [gallery.length]);

  // Teclado (Esc fecha, setas navegam) + trava o scroll do fundo enquanto a
  // galeria está aberta. Sem isso, no celular a página rola por trás do modal.
  useEffect(() => {
    if (!selectedProject) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeProject();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [selectedProject, closeProject, showPrev, showNext]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta > 0) showPrev();
      else showNext();
    }
    touchStartX.current = null;
  };

  return (
    <section id="projects" className="py-16 md:py-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12">
          <div className="max-w-2xl mb-6 md:mb-0">
            <h2 className="text-xs md:text-sm font-bold tracking-widest text-brand-400 uppercase mb-3">Portfolio</h2>
            <h3 className="text-3xl md:text-4xl font-bold mb-4">Obras e Instalacoes</h3>
            <p className="text-slate-400 font-light text-sm md:text-base">
              Equipamentos de refrigeracao fabricados e instalados pela Refrigois em acougues, padarias, supermercados,
              restaurantes e distribuidoras. Fotos das obras entregues.
            </p>
          </div>
          <div className="hidden md:block">
            <div className="h-px w-24 bg-slate-700 mb-6"></div>
          </div>
        </div>

        {showFilter && (
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap hide-scrollbar">
            <button
              onClick={() => setActiveCategory('todos')}
              aria-pressed={activeCategory === 'todos'}
              className={`shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm border-2 transition-colors ${
                activeCategory === 'todos'
                  ? 'border-brand-400 bg-brand-400 text-slate-900'
                  : 'border-slate-700 text-slate-300 hover:border-brand-400 hover:text-brand-400'
              }`}
            >
              Todos ({projectsData.length})
            </button>
            {projectCategories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                aria-pressed={activeCategory === cat.slug}
                className={`shrink-0 px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-sm border-2 transition-colors ${
                  activeCategory === cat.slug
                    ? 'border-brand-400 bg-brand-400 text-slate-900'
                    : 'border-slate-700 text-slate-300 hover:border-brand-400 hover:text-brand-400'
                }`}
              >
                {cat.label} ({cat.count})
              </button>
            ))}
          </div>
        )}

        <div
          className={
            isCarousel
              ? 'flex overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-4 gap-4 pb-6 -mx-4 px-4 lg:mx-0 lg:px-0 hide-scrollbar'
              : 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'
          }
          style={isCarousel ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : undefined}
        >
          {displayData.map((project, i) => {
            const photos = getProjectPhotos(project);
            return (
              <article
                key={project.id}
                className={
                  isCarousel
                    ? 'snap-center shrink-0 w-[85%] sm:w-[45%] lg:w-auto group relative overflow-hidden aspect-[4/5] sm:aspect-square bg-slate-800 rounded-sm'
                    : 'group relative overflow-hidden aspect-[4/5] sm:aspect-square bg-slate-800 rounded-sm'
                }
              >
                <SmartImage
                  src={project.image}
                  alt={project.imageAlt || project.title}
                  width={800}
                  height={800}
                  priority={i === 0 && !isCarousel}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 320px"
                />

                {photos.length > 1 && (
                  <span className="absolute top-3 right-3 flex items-center gap-1 bg-slate-900/75 text-white text-[10px] font-bold px-2 py-1 rounded-full tracking-wider backdrop-blur-sm">
                    <Images size={11} />
                    {photos.length}
                  </span>
                )}

                {/* Legenda sempre visivel: no mobile o hover nao existe, entao
                    sem isso o card fica sendo so uma foto sem contexto. */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent p-4 md:p-5 pt-12">
                  <span className="block text-brand-300 font-bold text-[10px] uppercase tracking-wider mb-1">
                    {project.category}
                  </span>
                  <h4 className="text-base md:text-lg font-bold text-white leading-tight mb-3">
                    <Link
                      to={`/projetos/${project.slug}`}
                      className="focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 rounded-sm"
                    >
                      {/* Link cobrindo o card inteiro: o card todo e clicavel e
                          continua sendo um <a> real, que o Google rastreia. */}
                      <span className="absolute inset-0" aria-hidden="true" />
                      {project.title}
                    </Link>
                  </h4>
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-400">
                      Ver projeto <ArrowRight size={13} />
                    </span>
                    {photos.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          openProject(project);
                        }}
                        className="relative z-10 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white transition-colors"
                      >
                        Abrir fotos
                      </button>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {!isCarousel && displayData.length === 0 && (
          <p className="text-slate-400 py-12 text-center">
            Nenhum projeto nesse segmento ainda.{' '}
            <button onClick={() => setActiveCategory('todos')} className="text-brand-400 font-bold underline">
              Ver todos os projetos
            </button>
          </p>
        )}

        {isCarousel && (
          <div className="flex justify-center items-center gap-2 mt-2 lg:hidden text-slate-500 text-xs uppercase tracking-widest font-bold">
            <GripHorizontal size={16} />
            <span>Deslize para ver mais</span>
          </div>
        )}

        {!hideButton && (
          <div className="mt-12 text-center">
            <Link
              to="/projetos"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold transition-all duration-200 uppercase tracking-wider focus:outline-none border-2 border-brand-400 text-brand-400 hover:bg-brand-400 hover:text-slate-900 rounded-sm"
            >
              Ver todo o portfolio
            </Link>
          </div>
        )}
      </div>

      {selectedProject && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center p-4 bg-slate-900/95 backdrop-blur-sm"
          onClick={closeProject}
          role="dialog"
          aria-modal="true"
          aria-label={`Fotos do projeto ${selectedProject.title}`}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-brand-400 transition-colors z-20 bg-slate-900/50 rounded-full p-2"
            onClick={(e) => {
              e.stopPropagation();
              closeProject();
            }}
            aria-label="Fechar galeria"
          >
            <X size={24} />
          </button>

          <div className="absolute top-6 left-6 text-white z-20 max-w-[70%]">
            <p className="text-brand-300 font-bold text-xs uppercase tracking-wider">{selectedProject.category}</p>
            <h4 className="text-base md:text-lg font-bold">{selectedProject.title}</h4>
          </div>

          <div
            className="relative w-full max-w-5xl flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            {gallery.length > 1 && (
              <button
                onClick={showPrev}
                className="absolute left-2 md:-left-4 text-white hover:text-brand-400 transition-colors bg-slate-900/50 hover:bg-slate-900/80 rounded-full p-2 z-10"
                aria-label="Foto anterior"
              >
                <ChevronLeft size={28} />
              </button>
            )}

            <img
              src={gallery[activeIndex].src}
              alt={gallery[activeIndex].alt}
              className="max-w-full max-h-[70vh] object-contain rounded-sm shadow-2xl"
            />

            {gallery.length > 1 && (
              <button
                onClick={showNext}
                className="absolute right-2 md:-right-4 text-white hover:text-brand-400 transition-colors bg-slate-900/50 hover:bg-slate-900/80 rounded-full p-2 z-10"
                aria-label="Proxima foto"
              >
                <ChevronRight size={28} />
              </button>
            )}
          </div>

          {gallery[activeIndex].caption && (
            <p className="mt-3 text-slate-300 text-sm text-center max-w-xl px-4" onClick={(e) => e.stopPropagation()}>
              {gallery[activeIndex].caption}
            </p>
          )}

          {gallery.length > 1 && (
            <div className="mt-4 flex items-center gap-3" onClick={(e) => e.stopPropagation()}>
              <span className="text-slate-400 text-xs font-bold tracking-wider hidden sm:inline">
                {activeIndex + 1} / {gallery.length}
              </span>
              <div className="flex gap-2 overflow-x-auto max-w-[80vw] hide-scrollbar">
                {gallery.map((photo, idx) => (
                  <button
                    key={photo.src}
                    onClick={() => setActiveIndex(idx)}
                    aria-label={`Ver foto ${idx + 1}`}
                    aria-current={idx === activeIndex}
                    className={`shrink-0 w-14 h-14 rounded-sm overflow-hidden border-2 transition-colors ${
                      idx === activeIndex ? 'border-brand-400' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={photo.src} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <Link
            to={`/projetos/${selectedProject.slug}`}
            onClick={(e) => e.stopPropagation()}
            className="mt-6 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-brand-400 hover:text-brand-300 transition-colors"
          >
            Ver detalhes do projeto <ArrowRight size={15} />
          </Link>
        </div>
      )}
    </section>
  );
};

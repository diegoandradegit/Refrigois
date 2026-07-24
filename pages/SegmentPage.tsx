import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { segmentsData } from '../segmentsData';
import { servicesData, projectsData } from '../data';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Contact } from '../components/Contact';
import { ServiceArea } from '../components/ServiceArea';
import { Button } from '../components/Button';
import { useSEO } from '../hooks/useSEO';

interface SegmentPageProps {
  onOpenQuote: () => void;
}

export const SegmentPage: React.FC<SegmentPageProps> = ({ onOpenQuote }) => {
  const { slug } = useParams<{ slug: string }>();
  const segment = segmentsData.find((s) => s.slug === slug);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useSEO({
    title: segment ? segment.metaTitle : 'Segmento não encontrado',
    description: segment ? segment.description : 'Segmento não encontrado.',
    path: `/solucoes/${slug}`,
    image: slug ? `https://refrigois.com.br/og/solucoes-${slug}.jpg` : undefined,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!segment) {
    return (
      <main className="pt-32 pb-24 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Segmento não encontrado</h1>
        <Link to="/solucoes" className="text-brand-600 hover:underline">Voltar para soluções</Link>
      </main>
    );
  }

  const relevantServices = segment.relevantServices
    .map((key) => servicesData.find((s) => `${s.categorySlug}/${s.slug}` === key))
    .filter(Boolean);

  const segmentCategoryMap: Record<string, string[]> = {
    'acougues': ['Açougues'],
    'supermercados': ['Supermercados'],
    'restaurantes': ['Restaurantes'],
    'padarias': ['Padarias'],
    'distribuidoras-de-bebidas': ['Distribuidoras'],
    'farmacias': ['Farmácias'],
    'sorveterias': ['Sorveterias'],
  };
  const relatedCategories = slug ? segmentCategoryMap[slug] || [] : [];
  const relatedProjects = projectsData.filter((p) => relatedCategories.includes(p.category));

  return (
    <main className="pt-20">
      <section className="relative py-24 md:py-32 bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img
            src={segment.image}
            alt={segment.title}
            className="w-full h-full object-cover object-center opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs dark items={[{ label: 'Soluções por Segmento', href: '/solucoes' }, { label: segment.title }]} />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight max-w-3xl">
            {segment.title}
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl leading-relaxed">{segment.intro}</p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Desafios comuns nesse segmento</h2>
              <div className="space-y-4 mb-12">
                {segment.painPoints.map((point, i) => (
                  <div key={i} className="flex items-start bg-slate-50 border border-slate-100 rounded-sm p-4">
                    <CheckCircle2 className="text-brand-600 mt-1 mr-3 shrink-0" size={20} />
                    <span className="text-slate-700 text-sm">{point}</span>
                  </div>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-6">Serviços que atendem esse segmento</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
                {relevantServices.map((s) => s && (
                  <Link
                    key={s.id}
                    to={`/servicos/${s.categorySlug}/${s.slug}`}
                    className="group flex items-center justify-between bg-slate-50 border border-slate-100 hover:border-brand-300 rounded-sm p-4 transition-colors"
                  >
                    <span className="font-bold text-slate-900 text-sm">{s.title}</span>
                    <ArrowRight size={16} className="text-brand-600 transform transition-transform group-hover:translate-x-1 shrink-0" />
                  </Link>
                ))}
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-6">Perguntas frequentes</h2>
              <div className="space-y-3">
                {segment.faq.map((item, i) => {
                  const isOpen = openFaq === i;
                  return (
                    <div key={i} className="bg-slate-50 border border-slate-100 rounded-sm overflow-hidden">
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : i)}
                        className="w-full flex items-center justify-between gap-4 text-left px-5 py-4"
                        aria-expanded={isOpen}
                      >
                        <span className="font-bold text-slate-900 text-sm">{item.question}</span>
                        <ChevronDown size={18} className={`shrink-0 text-brand-600 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-4 text-slate-600 text-sm leading-relaxed">{item.answer}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-brand-50 p-8 rounded-sm border border-brand-100 sticky top-24">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Precisa de refrigeração para o seu negócio?</h3>
                <p className="text-slate-600 mb-8 text-sm">
                  Fale com a gente e receba uma proposta pensada pro seu tipo de operação.
                </p>
                <Button onClick={onOpenQuote} className="w-full bg-brand-600 hover:bg-brand-700 text-white">
                  Solicitar Orçamento
                </Button>

                {relatedProjects.length > 0 && (
                  <div className="mt-8 pt-8 border-t border-brand-100">
                    <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-4">Projetos nesse segmento</h4>
                    <div className="space-y-3">
                      {relatedProjects.slice(0, 4).map((p) => (
                        <Link key={p.id} to={`/projetos/${p.slug}`} className="flex items-center gap-3 group">
                          <img src={p.image} alt={p.title} className="w-14 h-14 object-cover rounded-sm shrink-0" loading="lazy" referrerPolicy="no-referrer" />
                          <span className="text-sm text-slate-700 group-hover:text-brand-600 transition-colors">{p.title}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceArea />
      <Contact onOpenQuote={onOpenQuote} compact />
    </main>
  );
};

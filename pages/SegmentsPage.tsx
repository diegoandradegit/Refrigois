import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { segmentsData } from '../segmentsData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Contact } from '../components/Contact';
import { ServiceArea } from '../components/ServiceArea';
import { useSEO } from '../hooks/useSEO';

interface SegmentsPageProps {
  onOpenQuote: () => void;
}

export const SegmentsPage: React.FC<SegmentsPageProps> = ({ onOpenQuote }) => {
  useSEO({
    title: 'Soluções por Segmento | Refrigóis',
    description: 'Refrigeração comercial para o seu tipo de negócio: açougue, supermercado, restaurante, padaria, distribuidora de bebidas, farmácia e sorveteria.',
    path: '/solucoes',
    image: 'https://refrigois.com.br/og/solucoes.jpg',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-20">
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs items={[{ label: 'Soluções por Segmento' }]} />
          <div className="max-w-3xl mb-12 md:mb-16">
            <h1 className="text-xs md:text-sm font-bold tracking-widest text-brand-600 uppercase mb-3">Soluções por Segmento</h1>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Refrigeração Comercial para o Seu Tipo de Negócio
            </h2>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              Cada segmento tem uma necessidade diferente de refrigeração. Veja como a Refrigóis atende o seu.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {segmentsData.map((seg) => (
              <Link
                key={seg.slug}
                to={`/solucoes/${seg.slug}`}
                className="group bg-slate-50 border border-slate-100 hover:border-brand-300 transition-all duration-300 hover:shadow-lg flex flex-col rounded-sm overflow-hidden"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={seg.image}
                    alt={seg.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{seg.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed flex-1">{seg.description}</p>
                  <span className="inline-flex items-center text-sm font-bold text-brand-600 group-hover:text-brand-800 transition-colors uppercase tracking-wide">
                    Ver soluções
                    <ArrowRight size={16} className="ml-2 transform transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ServiceArea />
      <Contact onOpenQuote={onOpenQuote} compact />
    </main>
  );
};

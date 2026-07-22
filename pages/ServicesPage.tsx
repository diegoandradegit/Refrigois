import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { serviceCategoriesData, servicesData } from '../data';
import { Contact } from '../components/Contact';
import { ServiceArea } from '../components/ServiceArea';
import { useSEO } from '../hooks/useSEO';

interface ServicesPageProps {
  onOpenQuote: () => void;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({ onOpenQuote }) => {
  useSEO({
    title: 'Serviços de Refrigeração Comercial e Industrial',
    description: 'Câmara fria (instalação, fabricação, manutenção, reforma, higienização) e refrigeração comercial (freezer, geladeira, balcão, expositor e mais) em Maringá.',
    path: '/servicos',
    image: 'https://refrigois.com.br/og/servicos.jpg',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-20">
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <h1 className="text-xs md:text-sm font-bold tracking-widest text-brand-600 uppercase mb-3">Nossos Serviços</h1>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Garantia de Temperatura e Qualidade</h2>
            <p className="text-slate-600 leading-relaxed text-sm md:text-base">
              Duas frentes completas de refrigeração comercial e industrial, do projeto à manutenção contínua.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {serviceCategoriesData.map((category) => {
              const subServices = servicesData.filter(s => s.categorySlug === category.slug);
              return (
                <Link
                  key={category.slug}
                  to={`/servicos/${category.slug}`}
                  className="group relative overflow-hidden rounded-sm border border-slate-100 hover:border-brand-300 transition-all duration-300 hover:shadow-xl flex flex-col"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-2xl md:text-3xl font-bold text-white">{category.title}</h3>
                    </div>
                  </div>
                  <div className="p-6 bg-slate-50 flex-1 flex flex-col">
                    <p className="text-slate-600 text-sm mb-4 leading-relaxed">{category.description}</p>
                    <ul className="text-sm text-slate-700 mb-6 space-y-1">
                      {subServices.slice(0, 5).map((s) => (
                        <li key={s.id}>• {s.title}</li>
                      ))}
                    </ul>
                    <span className="mt-auto inline-flex items-center text-sm font-bold text-brand-600 group-hover:text-brand-800 transition-colors uppercase tracking-wide">
                      Ver serviços
                      <ArrowRight size={16} className="ml-2 transform transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
      <ServiceArea />
      <Contact onOpenQuote={onOpenQuote} compact />
    </main>
  );
};

import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';
import { serviceCategoriesData, servicesData } from '../data';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Contact } from '../components/Contact';
import { ServiceArea } from '../components/ServiceArea';
import { useSEO } from '../hooks/useSEO';

interface ServiceCategoryPageProps {
  onOpenQuote: () => void;
}

export const ServiceCategoryPage: React.FC<ServiceCategoryPageProps> = ({ onOpenQuote }) => {
  const { categorySlug } = useParams<{ categorySlug: string }>();

  const category = serviceCategoriesData.find(c => c.slug === categorySlug);
  const subServices = servicesData.filter(s => s.categorySlug === categorySlug);

  useSEO({
    title: category ? category.title : 'Categoria não encontrada',
    description: category ? category.description : 'Categoria não encontrada.',
    path: `/servicos/${categorySlug}`,
    image: categorySlug ? `https://refrigois.com.br/og/servicos-${categorySlug}.jpg` : undefined,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categorySlug]);

  if (!category) {
    return (
      <main className="pt-32 pb-24 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Categoria não encontrada</h1>
        <Link to="/servicos" className="text-brand-600 hover:underline">Voltar para serviços</Link>
      </main>
    );
  }

  return (
    <main className="pt-20">
      {/* Hero */}
      <section className="relative py-24 md:py-32 bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img
            src={category.image}
            alt={category.title}
            className="w-full h-full object-cover object-center opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs dark items={[{ label: 'Serviços', href: '/servicos' }, { label: category.title }]} />
          <Link to="/servicos" className="inline-flex items-center text-brand-300 hover:text-white mb-6 transition-colors text-sm font-bold uppercase tracking-widest">
            <ArrowLeft size={16} className="mr-2" />
            Voltar para Serviços
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {category.title}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            {category.description}
          </p>
        </div>
      </section>

      {/* Sub-services grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-10">
            Serviços de {category.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {subServices.map((service) => (
              <Link
                key={service.id}
                to={`/servicos/${category.slug}/${service.slug}`}
                className="group bg-slate-50 border border-slate-100 hover:border-brand-300 transition-all duration-300 hover:shadow-lg flex flex-col rounded-sm overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-brand-900/20 group-hover:bg-transparent transition-colors" />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed flex-1">{service.description}</p>
                  <span className="inline-flex items-center text-sm font-bold text-brand-600 group-hover:text-brand-800 transition-colors uppercase tracking-wide">
                    Ver mais
                    <ArrowRight size={16} className="ml-2 transform transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {subServices[0]?.features && (
            <div className="mt-16 bg-slate-50 border border-slate-100 rounded-sm p-8 md:p-10">
              <h3 className="text-xl font-bold text-slate-900 mb-6">Por que escolher a Refrigóis</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {subServices.slice(0, 4).map((s) => (
                  <div key={s.id} className="flex items-start">
                    <CheckCircle2 className="text-brand-600 mt-1 mr-3 shrink-0" size={20} />
                    <span className="text-slate-700 text-sm">{s.title}: {s.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <ServiceArea />
      <Contact onOpenQuote={onOpenQuote} compact />
    </main>
  );
};

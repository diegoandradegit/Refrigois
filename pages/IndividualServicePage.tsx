import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesData, serviceCategoriesData } from '../data';
import { Contact } from '../components/Contact';
import { ServiceArea } from '../components/ServiceArea';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ArrowLeft, CheckCircle2, MapPin, Shield } from 'lucide-react';
import { Button } from '../components/Button';
import { useSEO } from '../hooks/useSEO';

interface IndividualServicePageProps {
  onOpenQuote: () => void;
}

export const IndividualServicePage: React.FC<IndividualServicePageProps> = ({ onOpenQuote }) => {
  const { categorySlug, slug } = useParams<{ categorySlug: string; slug: string }>();

  const service = servicesData.find(s => s.slug === slug && s.categorySlug === categorySlug);
  const category = serviceCategoriesData.find(c => c.slug === categorySlug);

  useSEO({
    title: service ? service.title : 'Serviço não encontrado',
    description: service ? service.description : 'Serviço não encontrado.',
    path: `/servicos/${categorySlug}/${slug}`,
    image: categorySlug && slug ? `https://refrigois.com.br/og/servicos-${categorySlug}-${slug}.jpg` : undefined,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [categorySlug, slug]);

  if (!service) {
    return (
      <main className="pt-32 pb-24 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Serviço não encontrado</h1>
        <Link to="/servicos" className="text-brand-600 hover:underline">Voltar para serviços</Link>
      </main>
    );
  }

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src={service.image} 
            alt={service.title} 
            className="w-full h-full object-cover object-center opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            dark
            items={[
              { label: 'Serviços', href: '/servicos' },
              { label: category?.title || 'Categoria', href: `/servicos/${categorySlug}` },
              { label: service.title },
            ]}
          />
          <Link to={`/servicos/${categorySlug}`} className="inline-flex items-center text-brand-300 hover:text-white mb-6 transition-colors text-sm font-bold uppercase tracking-widest">
            <ArrowLeft size={16} className="mr-2" />
            Voltar para {category?.title || 'Serviços'}
          </Link>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {service.title}
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl leading-relaxed">
            {service.description}
          </p>
        </div>
      </section>

      {/* Galeria de fotos — reaproveita a imagem principal até termos fotos reais do serviço */}
      <section className="py-12 md:py-16 bg-slate-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div className="rounded-sm overflow-hidden aspect-[4/3]">
              <img
                src={service.image}
                alt={`${service.title} em Maringá — Refrigóis`}
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="rounded-sm overflow-hidden aspect-[4/3]">
              <img
                src={service.image}
                alt={`${service.title} — detalhe do serviço realizado pela Refrigóis`}
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-slate-900 mb-6">Sobre o Serviço</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-10">
                {service.longDescription || service.description}
              </p>

              {service.features && service.features.length > 0 && (
                <>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">O que está incluso</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-start">
                        <CheckCircle2 className="text-brand-600 mt-1 mr-3 shrink-0" size={20} />
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
              
              <div className="bg-slate-50 p-8 rounded-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Informações Técnicas</h3>
                <p className="text-slate-600">
                  {service.technicalInfo || 'Entre em contato para mais detalhes técnicos sobre a aplicação deste serviço.'}
                </p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-brand-50 p-8 rounded-sm border border-brand-100 sticky top-24">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Precisa deste serviço?</h3>
                <p className="text-slate-600 mb-8">
                  Nossa equipe técnica está pronta para avaliar sua necessidade e propor a melhor solução.
                </p>
                
                <Button onClick={onOpenQuote} className="w-full bg-brand-600 hover:bg-brand-700 text-white mb-8">
                  Solicitar Orçamento
                </Button>

                <div className="space-y-6">
                  {service.warranty && (
                    <div className="flex items-start">
                      <Shield className="text-brand-600 mt-1 mr-4 shrink-0" size={24} />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-1">Garantia</h4>
                        <p className="text-slate-600 text-sm">{service.warranty}</p>
                      </div>
                    </div>
                  )}
                  
                  {service.deliveryArea && (
                    <div className="flex items-start">
                      <MapPin className="text-brand-600 mt-1 mr-4 shrink-0" size={24} />
                      <div>
                        <h4 className="font-bold text-slate-900 text-sm uppercase tracking-wider mb-1">Área de Atendimento</h4>
                        <p className="text-slate-600 text-sm">{service.deliveryArea}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <ServiceArea />
      <Contact onOpenQuote={onOpenQuote} />
    </main>
  );
};

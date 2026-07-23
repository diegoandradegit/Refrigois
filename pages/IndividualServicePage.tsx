import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { servicesData, serviceCategoriesData, projectsData } from '../data';
import { Contact } from '../components/Contact';
import { ServiceArea } from '../components/ServiceArea';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ArrowLeft, CheckCircle2, MapPin, Shield, ChevronDown } from 'lucide-react';
import { Button } from '../components/Button';
import { useSEO } from '../hooks/useSEO';

interface IndividualServicePageProps {
  onOpenQuote: () => void;
}

export const IndividualServicePage: React.FC<IndividualServicePageProps> = ({ onOpenQuote }) => {
  const { categorySlug, slug } = useParams<{ categorySlug: string; slug: string }>();

  const service = servicesData.find(s => s.slug === slug && s.categorySlug === categorySlug);

  const galeria = service?.photos ?? [];

  // Obras do portfolio que comprovam este servico
  const obras = (service?.relatedProjectSlugs ?? [])
    .map((slug) => projectsData.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
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

      {/* Galeria de fotos do servico. Sem fotos cadastradas, a faixa nao
          aparece — antes esta secao repetia a foto principal duas vezes lado
          a lado, como se fossem imagens diferentes. */}
      {galeria.length > 0 && (
        <section className="py-12 md:py-16 bg-slate-50 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`grid gap-4 md:gap-6 ${
                galeria.length === 1 ? 'grid-cols-1 max-w-3xl mx-auto' : 'grid-cols-1 sm:grid-cols-2'
              }`}
            >
              {galeria.map((foto, i) => (
                <figure key={foto.src} className="m-0">
                  <div className="rounded-sm overflow-hidden aspect-[4/3] bg-slate-100">
                    <img
                      src={foto.src}
                      alt={foto.alt}
                      width={800}
                      height={600}
                      className="w-full h-full object-cover"
                      loading={i === 0 ? 'eager' : 'lazy'}
                    />
                  </div>
                  {foto.caption && (
                    <figcaption className="text-sm text-slate-500 mt-2">{foto.caption}</figcaption>
                  )}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Content Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            <div className="lg:col-span-2">
              {/* Problema antes da solucao: o visitante precisa sentir que o
                  problema dele foi entendido antes de ouvir a proposta. */}
              {service.problem && (
                <div className="mb-12">
                  {service.problem.heading && (
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">{service.problem.heading}</h2>
                  )}
                  {service.problem.paragraphs.map((p, i) => (
                    <p key={i} className="text-slate-600 text-lg leading-relaxed mb-4">{p}</p>
                  ))}
                </div>
              )}

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
              
              {service.appliesTo && service.appliesTo.length > 0 && (
                <>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Para quais negócios</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-12">
                    {service.appliesTo.map((a) => (
                      <Link
                        key={a.segmentSlug}
                        to={`/solucoes/${a.segmentSlug}`}
                        className="block p-4 border border-slate-200 rounded-sm hover:border-brand-400 transition-colors"
                      >
                        <span className="block font-bold text-slate-900">{a.label}</span>
                        {a.note && <span className="block text-sm text-slate-500 mt-0.5">{a.note}</span>}
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {/* Prova: obras reais deste tipo de servico. E o que separa uma
                  pagina de servico de um texto institucional qualquer. */}
              {obras.length > 0 && (
                <>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Obras que executamos</h3>
                  <p className="text-slate-500 mb-6">Projetos reais entregues pela Refrigóis.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                    {obras.map((o) => (
                      <Link key={o.slug} to={`/projetos/${o.slug}`} className="group block">
                        <div className="aspect-[4/3] overflow-hidden rounded-sm bg-slate-100 mb-2">
                          <img
                            src={o.image}
                            alt={o.imageAlt || o.title}
                            width={600}
                            height={450}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <span className="block font-bold text-slate-900 text-sm leading-tight">{o.title}</span>
                        <span className="text-xs text-brand-600 font-bold uppercase tracking-wider">Ver projeto</span>
                      </Link>
                    ))}
                  </div>
                </>
              )}

              {service.howItWorks && service.howItWorks.length > 0 && (
                <>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Como funciona</h3>
                  <ol className="space-y-5 mb-12">
                    {service.howItWorks.map((passo, i) => (
                      <li key={i} className="flex gap-4">
                        <span className="shrink-0 w-8 h-8 rounded-full bg-brand-600 text-white font-bold flex items-center justify-center">
                          {i + 1}
                        </span>
                        <div>
                          <span className="block font-bold text-slate-900 mb-1">{passo.title}</span>
                          <p className="text-slate-600 leading-relaxed">{passo.text}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </>
              )}

              <div className="bg-slate-50 p-8 rounded-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-4">Informações Técnicas</h3>
                <p className="text-slate-600">
                  {service.technicalInfo || 'Entre em contato para mais detalhes técnicos sobre a aplicação deste serviço.'}
                </p>
              </div>

              {service.faq && service.faq.length > 0 && (
                <section className="mt-12">
                  <h3 className="text-2xl font-bold text-slate-900 mb-6">Perguntas frequentes</h3>
                  <div className="space-y-3">
                    {service.faq.map((item, i) => (
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

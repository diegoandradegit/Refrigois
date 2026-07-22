import React from 'react';
import { ArrowRight, GripHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';
import { servicesData } from '../data';

interface ServicesProps {
  onOpenQuote: () => void;
  limit?: number;
  hideButton?: boolean;
}

export const Services: React.FC<ServicesProps> = ({ onOpenQuote, limit, hideButton }) => {
  const FEATURED_SLUGS = ['instalacao', 'manutencao', 'freezer-comercial', 'balcao-refrigerado'];
  const displayData = limit
    ? servicesData.filter(s => FEATURED_SLUGS.includes(s.slug)).sort((a, b) => FEATURED_SLUGS.indexOf(a.slug) - FEATURED_SLUGS.indexOf(b.slug))
    : servicesData;
  const isCarousel = !!limit;

  return (
    <section id="services" className="py-16 md:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <h2 className="text-xs md:text-sm font-bold tracking-widest text-brand-600 uppercase mb-3">Nossos Serviços</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Garantia de Temperatura e Qualidade</h3>
          <p className="text-slate-600 leading-relaxed text-sm md:text-base">
            Profissionais certificados para atender desde pequenos reparos comerciais até grandes sistemas de refrigeração industrial e HVAC.
          </p>
        </div>

        <div 
          className={
            isCarousel 
              ? "flex overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-4 gap-4 lg:gap-6 pb-6 -mx-4 px-4 lg:mx-0 lg:px-0 hide-scrollbar" 
              : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          } 
          style={isCarousel ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : undefined}
        >
          {displayData.map((service) => (
            <div 
              key={service.id} 
              className={
                isCarousel 
                  ? "snap-center shrink-0 w-[85%] sm:w-[45%] lg:w-auto group bg-slate-50 border border-slate-100 hover:border-brand-300 transition-all duration-300 hover:shadow-lg flex flex-col rounded-sm overflow-hidden" 
                  : "group bg-slate-50 border border-slate-100 hover:border-brand-300 transition-all duration-300 hover:shadow-lg flex flex-col rounded-sm overflow-hidden"
              }
            >
              <div className="relative h-56 md:h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-brand-900/20 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h4 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h4>
                <p className="text-slate-600 text-sm mb-6 leading-relaxed flex-1">
                  {service.description}
                </p>
                <Link 
                  to={`/servicos/${service.categorySlug}/${service.slug}`}
                  className="inline-flex items-center text-sm font-bold text-brand-600 hover:text-brand-800 transition-colors uppercase tracking-wide group/btn"
                >
                  Ver mais
                  <ArrowRight size={16} className="ml-2 transform transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        {/* Helper text for mobile to indicate scrolling */}
        {isCarousel && (
          <div className="flex justify-center items-center gap-2 mt-2 lg:hidden text-slate-400 text-xs uppercase tracking-widest font-bold">
            <GripHorizontal size={16} />
            <span>Deslize para ver mais</span>
          </div>
        )}

        {!hideButton && (
          <div className="mt-12 text-center">
            <Link 
              to="/servicos"
              className="inline-flex items-center justify-center px-8 py-3 text-sm font-bold transition-all duration-200 uppercase tracking-wider focus:outline-none border-2 border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white rounded-sm"
            >
              Ver todos os serviços
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
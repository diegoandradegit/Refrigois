import React from 'react';
import { ArrowRight, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { productsData } from '../data';

interface ProductsProps {
  onOpenQuote: () => void;
  limit?: number;
  hideButton?: boolean;
}

export const Products: React.FC<ProductsProps> = ({ onOpenQuote, limit, hideButton }) => {
  const withGallery = productsData.filter((p) => p.images && p.images.length > 1);
  const withoutGallery = productsData.filter((p) => !(p.images && p.images.length > 1));
  const orderedData = limit ? [...withGallery, ...withoutGallery] : productsData;
  const displayData = limit ? orderedData.slice(0, limit) : orderedData;
  const isCarousel = !!limit;

  return (
    <section id="products" className={`bg-white border-t border-brand-100 ${hideButton ? 'py-8' : 'py-24'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!hideButton && (
          <div className="text-center mb-16">
            <h2 className="text-brand-600 font-bold tracking-widest uppercase text-sm mb-3">Nossos Produtos</h2>
            <h3 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Equipamentos Prontos para o Seu Negócio
            </h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Conheça nossa linha de produtos fabricados sob rigorosos padrões de qualidade.
            </p>
          </div>
        )}

        <div 
          className={
            isCarousel
              ? "flex overflow-x-auto gap-8 pb-12 snap-x snap-mandatory"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          }
          style={isCarousel ? { scrollbarWidth: 'none', msOverflowStyle: 'none' } : undefined}
        >
          {displayData.map((product) => (
            <Link 
              key={product.id} 
              to={`/produtos/${product.slug}`}
              className={
                isCarousel
                  ? "block snap-center shrink-0 w-[85%] sm:w-[45%] lg:w-[30%] bg-white group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                  : "block bg-white group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
              }
            >
              <div className="relative h-64 overflow-hidden bg-white mb-6">
                <img 
                  src={product.image} 
                  alt={product.title}
                  loading="lazy"
                  className="w-full h-full object-contain object-center transform group-hover:scale-105 transition-transform duration-700 ease-in-out"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="px-4 text-center">
                <p className="text-slate-600 text-sm leading-relaxed">
                  <strong className="text-slate-900 text-base">{product.title}</strong>
                  {product.shortDescription ? `, ${product.shortDescription.toLowerCase()}` : ''}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {!hideButton && (
          <div className="text-center mt-12">
            <Link 
              to="/produtos"
              className="inline-flex items-center justify-center px-8 py-4 text-sm font-bold transition-all duration-200 uppercase tracking-wider bg-brand-600 hover:bg-brand-700 text-white rounded-sm"
            >
              <ShoppingCart className="mr-2" size={18} />
              Ver Todos os Produtos
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsData } from '../data';
import { Contact } from '../components/Contact';
import { ServiceArea } from '../components/ServiceArea';
import { ProductQuoteModal } from '../components/ProductQuoteModal';
import { ArrowLeft, CheckCircle2, Box, Calendar, Weight, ThermometerSnowflake, MessageCircle, ChevronRight } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';

interface IndividualProductPageProps {
  onOpenQuote: () => void;
}

export const IndividualProductPage: React.FC<IndividualProductPageProps> = ({ onOpenQuote }) => {
  const { slug } = useParams<{ slug: string }>();
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  
  const product = productsData.find(p => p.slug === slug);
  const gallery = product ? (product.images && product.images.length > 0 ? product.images : [product.image]) : [];
  const currentImage = activeImage || (product ? product.image : '');

  useEffect(() => {
    setActiveImage(null);
  }, [slug]);

  useSEO({
    title: product ? product.title : 'Produto não encontrado',
    description: product ? product.description : 'Produto não encontrado.',
    path: `/produtos/${slug}`,
    image: slug ? `https://refrigois.com.br/og/produtos-${slug}.jpg` : undefined,
    type: 'product',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <main className="pt-32 pb-24 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Produto não encontrado</h1>
        <Link to="/produtos" className="text-brand-600 hover:underline">Voltar para produtos</Link>
      </main>
    );
  }

  return (
    <main className="pt-20 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="flex text-sm text-slate-500 mb-8" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link to="/" className="hover:text-brand-600 transition-colors">Início</Link>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRight size={16} className="mx-1" />
                <Link to="/produtos" className="hover:text-brand-600 transition-colors">Produtos</Link>
              </div>
            </li>
            <li aria-current="page">
              <div className="flex items-center">
                <ChevronRight size={16} className="mx-1" />
                <span className="text-slate-900 font-medium">{product.title}</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Product E-commerce Layout */}
        <div className="bg-white rounded-sm shadow-sm border border-slate-200 overflow-hidden mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            
            {/* Left Column: Image */}
            <div className="p-8 md:p-12 flex flex-col items-center justify-center bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200">
              <div className="relative w-full aspect-square max-w-md mx-auto rounded-sm overflow-hidden shadow-md">
                <img 
                  src={currentImage} 
                  alt={product.title} 
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
              {gallery.length > 1 && (
                <div className="flex gap-3 mt-4 max-w-md w-full justify-center flex-wrap">
                  {gallery.map((img) => (
                    <button
                      key={img}
                      onClick={() => setActiveImage(img)}
                      className={`w-16 h-16 rounded-sm overflow-hidden border-2 transition-colors ${currentImage === img ? 'border-brand-600' : 'border-slate-200 opacity-70 hover:opacity-100'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Details & Actions */}
            <div className="p-8 md:p-12 flex flex-col">
              <span className="text-brand-600 font-bold tracking-widest uppercase text-xs mb-3">
                {product.category}
              </span>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                {product.title}
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                {product.description}
              </p>

              <div className="space-y-4 mb-10">
                <h3 className="font-bold text-slate-900 uppercase tracking-wider text-sm mb-4">Características:</h3>
                {product.features && product.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle2 className="text-brand-600 mt-0.5 mr-3 shrink-0" size={18} />
                    <span className="text-slate-700 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-auto pt-8 border-t border-slate-100">
                <p className="text-sm text-slate-500 mb-4">Gostou deste equipamento? Fale com um consultor agora mesmo.</p>
                <button 
                  onClick={() => setIsProductModalOpen(true)}
                  className="w-full flex items-center justify-center px-8 py-4 text-sm font-bold transition-all duration-200 uppercase tracking-wider bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-sm shadow-md hover:shadow-lg"
                >
                  <MessageCircle size={20} className="mr-2" />
                  Orçamento via WhatsApp
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* Specifications Section */}
        <div className="bg-white rounded-sm shadow-sm border border-slate-200 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-4">
            Especificações Técnicas
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col p-6 bg-slate-50 rounded-sm border border-slate-100">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center">
                <Box size={16} className="mr-2 text-brand-600" />
                Medidas
              </span>
              <span className="text-slate-900 text-sm font-medium">
                {product.specifications.dimensions}
              </span>
            </div>

            <div className="flex flex-col p-6 bg-slate-50 rounded-sm border border-slate-100">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center">
                <CheckCircle2 size={16} className="mr-2 text-brand-600" />
                Material
              </span>
              <span className="text-slate-900 text-sm font-medium">
                {product.specifications.material}
              </span>
            </div>

            {product.specifications.capacity && (
              <div className="flex flex-col p-6 bg-slate-50 rounded-sm border border-slate-100">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center">
                  <Box size={16} className="mr-2 text-brand-600" />
                  Capacidade
                </span>
                <span className="text-slate-900 text-sm font-medium">
                  {product.specifications.capacity}
                </span>
              </div>
            )}

            {product.specifications.coolingRange && (
              <div className="flex flex-col p-6 bg-slate-50 rounded-sm border border-slate-100">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center">
                  <ThermometerSnowflake size={16} className="mr-2 text-brand-600" />
                  Faixa de Resfriamento
                </span>
                <span className="text-slate-900 text-sm font-medium">
                  {product.specifications.coolingRange}
                </span>
              </div>
            )}

            {product.specifications.weight && (
              <div className="flex flex-col p-6 bg-slate-50 rounded-sm border border-slate-100">
                <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center">
                  <Weight size={16} className="mr-2 text-brand-600" />
                  Peso Médio
                </span>
                <span className="text-slate-900 text-sm font-medium">
                  {product.specifications.weight}
                </span>
              </div>
            )}
            
            <div className="flex flex-col p-6 bg-slate-50 rounded-sm border border-slate-100">
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2 flex items-center">
                <Calendar size={16} className="mr-2 text-brand-600" />
                Prazo de Entrega
              </span>
              <span className="text-slate-900 text-sm font-medium">
                {product.deliveryTime}
              </span>
            </div>
          </div>
        </div>

      </div>

      <ProductQuoteModal 
        isOpen={isProductModalOpen} 
        onClose={() => setIsProductModalOpen(false)} 
        product={product} 
      />

      <ServiceArea />
      <Contact onOpenQuote={onOpenQuote} />
    </main>
  );
};


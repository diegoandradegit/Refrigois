import React, { useEffect } from 'react';
import { Products } from '../components/Products';
import { Contact } from '../components/Contact';
import { ServiceArea } from '../components/ServiceArea';
import { useSEO } from '../hooks/useSEO';

interface ProductsPageProps {
  onOpenQuote: () => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onOpenQuote }) => {
  useSEO({
    title: 'Catálogo de Produtos',
    description: 'Equipamentos de refrigeração fabricados com tecnologia de ponta, materiais de alta durabilidade e eficiência energética para o seu negócio.',
    path: '/produtos',
    image: 'https://refrigois.com.br/og/produtos.jpg',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-20">
      <section className="bg-slate-900 py-20 text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Catálogo de Produtos</h1>
        <p className="text-lg text-slate-300 max-w-2xl mx-auto">
          Equipamentos fabricados com tecnologia de ponta, materiais de alta durabilidade e eficiência energética para o seu negócio.
        </p>
      </section>

      <Products onOpenQuote={onOpenQuote} hideButton={true} />
      
      <ServiceArea />
      
      <Contact onOpenQuote={onOpenQuote} />
    </main>
  );
};

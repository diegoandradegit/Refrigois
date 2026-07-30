import React from 'react';
import { trackQuoteModalOpen } from '../utils/analytics';

interface CTABannerProps {
  onOpenQuote: () => void;
  titulo?: string;
  texto?: string;
}

export const CTABanner: React.FC<CTABannerProps> = ({ onOpenQuote, titulo, texto }) => {
  return (
    <section className="bg-brand-600">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 text-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
          {titulo ?? 'Refrigeração comercial sob medida para a sua operação'}
        </h2>
        <p className="text-brand-50 text-sm md:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
          {texto ??
            'Projeto técnico, fabricação, instalação e manutenção de câmaras frias e equipamentos para o seu negócio. Solicite uma avaliação técnica sem compromisso.'}
        </p>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => {
              trackQuoteModalOpen('cta_banner');
              onOpenQuote();
            }}
            className="w-full sm:w-auto min-w-[240px] inline-flex items-center justify-center px-8 py-3 rounded-sm font-bold uppercase tracking-wider text-sm text-white border-2 border-white/80 hover:bg-white/10 transition-colors"
          >
            Solicitar Orçamento
          </button>
        </div>
      </div>
    </section>
  );
};

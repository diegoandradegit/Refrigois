import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from './Button';
import { trackQuoteModalOpen, trackWhatsAppClick } from '../utils/analytics';

interface CTABannerProps {
  onOpenQuote: () => void;
  titulo?: string;
  texto?: string;
}

const WHATSAPP =
  'https://wa.me/5544999368420?text=' +
  encodeURIComponent('Olá! Gostaria de um orçamento de refrigeração comercial.');

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
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => {
              trackQuoteModalOpen('cta_banner');
              onOpenQuote();
            }}
            className="w-full sm:w-auto min-w-[220px] bg-white text-brand-700 hover:bg-brand-50 border-white font-bold"
          >
            Solicitar Orçamento
          </Button>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('cta_banner')}
            className="w-full sm:w-auto min-w-[220px] inline-flex items-center justify-center gap-2 px-6 py-3 rounded-sm font-bold uppercase tracking-wider text-sm text-white border-2 border-white/70 hover:bg-white/10 transition-colors"
          >
            <MessageCircle size={18} /> Chamar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
};

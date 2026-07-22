import React from 'react';
import { Button } from './Button';
import { ChevronDown } from 'lucide-react';

interface HeroProps {
  onOpenQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenQuote }) => {
  return (
    <section id="hero" className="relative min-h-[600px] h-[85vh] sm:h-screen flex items-center overflow-hidden bg-slate-950">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero.jpg" 
          alt="Equipamentos de refrigeração comercial: expositor de bebidas, balcão vitrine e mesa refrigerada em aço inox" 
          className="w-full h-full object-cover object-[68%_center] sm:object-[center_center]"
          referrerPolicy="no-referrer"
          fetchPriority="high"
        />
        {/* Gradiente lateral: escurece a esquerda (onde fica o texto) e preserva o produto visível a direita */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/75 to-slate-950/10 sm:via-slate-950/60 sm:to-transparent" />
        {/* Leve reforço embaixo para o texto não colidir com o chão da imagem em telas baixas */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 pt-16">
        <div className="max-w-xl text-left">
          <span className="inline-block py-1 px-3 border border-brand-400/50 text-brand-300 text-[10px] md:text-xs uppercase tracking-[0.3em] mb-4 md:mb-6 animate-fade-in-up backdrop-blur-sm rounded-full font-bold">
            Especialistas em Refrigeração Comercial
          </span>
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
            Soluções Completas em <span className="text-brand-400">Refrigeração</span> Comercial
          </h1>
          <p className="text-sm sm:text-lg md:text-xl text-slate-200 mb-8 md:mb-10 max-w-lg font-light leading-relaxed drop-shadow-md">
            Fabricação, instalação e manutenção de equipamentos de refrigeração e ventilação para uso industrial e comercial. Atendimento técnico especializado.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <Button 
              onClick={onOpenQuote} 
              className="w-full sm:w-auto min-w-[200px] bg-brand-600 hover:bg-brand-700 text-white font-bold shadow-lg"
            >
              Solicitar Orçamento
            </Button>
            <Button 
              variant="outline" 
              className="w-full sm:w-auto min-w-[200px] text-white border-2 border-white hover:bg-white hover:text-slate-900 font-bold shadow-lg"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Ver Serviços
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50 hidden sm:block">
        <ChevronDown size={32} />
      </div>
    </section>
  );
};
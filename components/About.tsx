import React from 'react';
import { CheckCircle2, Clock, Award, Users } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Image Grid - Adjusted for mobile responsivenes */}
          <div className="grid grid-cols-2 gap-4 order-2 lg:order-1 mt-8 lg:mt-0">
            <img 
              src="/images/about-1.jpg" 
              alt="Instalação de equipamento" 
              className="rounded-sm shadow-xl translate-y-0 md:translate-y-12 object-cover h-48 md:h-80 w-full"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <img 
              src="/images/about-2.jpg" 
              alt="Manutenção técnica de refrigeração" 
              className="rounded-sm shadow-xl object-cover h-48 md:h-80 w-full"
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <h2 className="text-xs md:text-sm font-bold tracking-widest text-brand-600 uppercase mb-3">Sobre Nós</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Tradição e Tecnologia em Refrigeração</h3>
            <p className="text-slate-600 mb-6 leading-relaxed text-sm md:text-base">
              A Refrigois atua na fabricação, instalação e manutenção de equipamentos de refrigeração comercial e industrial. Nosso compromisso é entregar soluções de alta performance para o seu negócio.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed text-sm md:text-base">
              Localizados em Maringá - PR, atendemos supermercados, bares, indústrias e comércio em geral. Oferecemos assistência técnica especializada para garantir que seus equipamentos operem com eficiência máxima e baixo consumo de energia.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-brand-100 rounded-full text-brand-700 shrink-0">
                  <Award size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm uppercase">Garantia Técnica</h4>
                  <p className="text-xs text-slate-500 mt-1">Serviços executados dentro das normas vigentes.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-brand-100 rounded-full text-brand-700 shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm uppercase">Prontidão</h4>
                  <p className="text-xs text-slate-500 mt-1">Atendimento ágil para evitar paradas na sua operação.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-brand-100 rounded-full text-brand-700 shrink-0">
                  <Users size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm uppercase">Equipe Qualificada</h4>
                  <p className="text-xs text-slate-500 mt-1">Técnicos constantemente treinados e atualizados.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="p-2 bg-brand-100 rounded-full text-brand-700 shrink-0">
                  <CheckCircle2 size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 text-sm uppercase">Projetos Sob Medida</h4>
                  <p className="text-xs text-slate-500 mt-1">Adequamos soluções para a sua necessidade estrutural.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
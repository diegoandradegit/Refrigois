import React from 'react';
import { UserCheck, Award, Ruler, ShieldCheck } from 'lucide-react';

const ITENS = [
  {
    icon: UserCheck,
    titulo: 'Atendimento do próprio dono',
    texto: 'Você fala direto com quem entende e decide — não com call center nem intermediário.',
  },
  {
    icon: Award,
    titulo: '15 anos de experiência real',
    texto: 'Câmaras e equipamentos instalados e mantidos em Maringá e região, com técnica de verdade.',
  },
  {
    icon: Ruler,
    titulo: 'Projeto com cálculo de carga térmica',
    texto: 'Nada de chute: cada solução é dimensionada para o seu produto e a sua operação.',
  },
  {
    icon: ShieldCheck,
    titulo: 'Garantia e pós-venda de verdade',
    texto: 'Quem instala é quem mantém. A gente volta quando você precisa, sem jogo de empurra.',
  },
];

export const Diferenciais: React.FC = () => {
  return (
    <section className="relative bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Avatar */}
          <div className="relative order-2 lg:order-1 flex justify-center">
            <div
              className="absolute bottom-0 w-72 h-72 md:w-96 md:h-96 bg-brand-500/20 rounded-full blur-3xl"
              aria-hidden="true"
            />
            <img
              src="/images/mascote/tecnico.webp"
              alt="Técnico da Refrigóis com caixa de ferramentas e manifold de refrigeração"
              width={780}
              height={1170}
              loading="lazy"
              decoding="async"
              className="flutua relative w-56 sm:w-64 md:w-80 drop-shadow-2xl"
            />
          </div>

          {/* Conteúdo */}
          <div className="order-1 lg:order-2">
            <h2 className="text-xs md:text-sm font-bold tracking-widest text-brand-400 uppercase mb-3">
              Por que escolher a Refrigóis
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-8 leading-tight">
              Técnica de verdade, atendimento de gente
            </h3>

            <div className="space-y-5">
              {ITENS.map((item) => (
                <div key={item.titulo} className="flex items-start gap-4">
                  <span className="shrink-0 inline-grid place-items-center w-11 h-11 rounded-xl bg-brand-500/15 text-brand-300 ring-1 ring-brand-500/20">
                    <item.icon size={21} />
                  </span>
                  <div>
                    <h4 className="font-bold text-white leading-tight mb-1">{item.titulo}</h4>
                    <p className="text-sm text-slate-300 leading-relaxed">{item.texto}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

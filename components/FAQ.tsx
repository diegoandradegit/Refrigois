import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQS: FAQItem[] = [
  {
    question: 'O que está incluso em um serviço de refrigeração comercial?',
    answer: 'A refrigeração comercial da Refrigóis cobre desde a fabricação sob medida (balcões, vitrines, câmaras frias) até a instalação e manutenção preventiva/corretiva de equipamentos para supermercados, bares, restaurantes e distribuidoras. Cada projeto é avaliado tecnicamente antes do orçamento.',
  },
  {
    question: 'Qual a diferença entre manutenção preventiva e corretiva?',
    answer: 'A manutenção preventiva é feita em intervalos regulares para evitar falhas antes que aconteçam, prolongando a vida útil do equipamento. A corretiva é acionada quando já existe um problema (câmara não gela, vazamento de gás, etc.) e exige atendimento mais rápido. Trabalhamos com os dois modelos, incluindo contratos preventivos periódicos.',
  },
  {
    question: 'A Refrigóis atende fora de Maringá?',
    answer: 'Sim. Nossa base de atendimento técnico é Maringá e região (raio de aproximadamente 150km), mas projetos de fabricação e instalação sob medida são avaliados para todo o território nacional, conforme a viabilidade logística.',
  },
  {
    question: 'Quanto tempo leva para fabricar um equipamento sob medida?',
    answer: 'O prazo varia de acordo com a complexidade do projeto (dimensões, materiais, quantidade). Após a visita técnica e aprovação do orçamento, informamos um prazo estimado antes de iniciar a fabricação.',
  },
  {
    question: 'Vocês dão garantia nos serviços de refrigeração comercial?',
    answer: 'Sim, todos os serviços contam com garantia técnica, além da garantia de fábrica das peças e componentes substituídos. O prazo específico é informado no orçamento de cada serviço.',
  },
  {
    question: 'Como solicito um orçamento?',
    answer: 'Você pode solicitar pelo botão "Solicitar Orçamento" no site ou falar diretamente com nossa equipe pelo WhatsApp. Pedimos algumas informações básicas (tipo de equipamento, endereço e prazo desejado) para agilizar a resposta.',
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 md:py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-xs md:text-sm font-bold tracking-widest text-brand-600 uppercase mb-3">Dúvidas Frequentes</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
            Perguntas sobre Refrigeração Comercial
          </h3>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="bg-white border border-slate-200 rounded-sm overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 md:px-6 md:py-5"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-slate-900 text-sm md:text-base">{item.question}</span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-brand-600 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 md:px-6 md:pb-6 text-slate-600 text-sm leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

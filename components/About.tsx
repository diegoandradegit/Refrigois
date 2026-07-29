import React from 'react';
import { ShieldCheck, Handshake, HeartHandshake } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Composição de imagens */}
          <div className="relative order-2 lg:order-1 pb-10 sm:pb-0">
            <div className="absolute -top-8 -left-8 w-48 h-48 bg-brand-200/60 rounded-full blur-3xl" aria-hidden="true" />

            <div className="relative">
              <img
                src="/images/sobre/robert-escritorio.webp"
                alt="Robert Góis, fundador da Refrigóis, no escritório da empresa"
                width={1100}
                height={825}
                loading="lazy"
                decoding="async"
                className="relative w-full rounded-2xl shadow-2xl object-cover aspect-[4/3] transition-transform duration-700 ease-out hover:scale-[1.02]"
              />

              <img
                src="/images/sobre/robert-loja.webp"
                alt="Robert Góis atendendo em loja, junto aos expositores de bebidas"
                width={760}
                height={1140}
                loading="lazy"
                decoding="async"
                className="hidden sm:block absolute -bottom-8 -left-8 w-32 md:w-44 rounded-xl shadow-2xl object-cover aspect-[3/4] border-4 border-slate-50"
              />

              <div className="flutua absolute -bottom-5 right-4 sm:-right-4 bg-white rounded-2xl shadow-xl ring-1 ring-slate-100 px-5 py-3 flex items-center gap-3">
                <span className="text-4xl font-extrabold text-brand-600 leading-none">15</span>
                <span className="text-[11px] font-bold text-slate-700 leading-tight uppercase tracking-wide">
                  anos de<br />experiência
                </span>
              </div>
            </div>
          </div>

          {/* Conteúdo */}
          <div className="order-1 lg:order-2">
            <h2 className="text-xs md:text-sm font-bold tracking-widest text-brand-600 uppercase mb-3">
              Quem faz a Refrigóis
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 leading-tight">
              15 anos cuidando do frio de quem vive dele
            </h3>

            <p className="text-slate-600 mb-5 leading-relaxed text-sm md:text-base">
              À frente da Refrigóis está <strong className="text-slate-900">Robert Góis</strong>, que há 15 anos
              trabalha com refrigeração comercial. Foi nesse tempo, atendendo açougues, mercados, padarias,
              restaurantes e distribuidoras, que ele construiu o jeito de trabalhar que define a empresa: técnica
              de verdade, sem enrolação, e a palavra que se cumpre.
            </p>
            <p className="text-slate-600 mb-5 leading-relaxed text-sm md:text-base">
              Honestidade, respeito e dedicação não são frase de efeito aqui — são a forma como cada cliente é
              atendido, do primeiro orçamento à manutenção anos depois. Como homem de família e de fé, Robert leva
              esses valores para dentro do trabalho e acredita que bom negócio é o que se sustenta na confiança.
            </p>
            <p className="text-slate-600 mb-8 leading-relaxed text-sm md:text-base">
              Por isso, quando você fala com a Refrigóis, fala com quem entende do assunto e assume o compromisso
              pessoalmente. É essa seriedade que faz o cliente voltar e indicar.
            </p>

            <div className="mb-8">
              <p className="text-lg font-bold text-slate-900">Robert Góis</p>
              <p className="text-sm text-slate-500">Fundador · Refrigóis Refrigeração Comercial</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: ShieldCheck, titulo: 'Honestidade', texto: 'O que a gente combina é o que a gente cumpre.' },
                { icon: Handshake, titulo: 'Respeito', texto: 'Cada cliente atendido como a gente gostaria de ser.' },
                { icon: HeartHandshake, titulo: 'Dedicação', texto: 'Do orçamento à manutenção, presente de verdade.' },
              ].map((v) => (
                <div key={v.titulo} className="bg-white rounded-xl border border-slate-100 p-4">
                  <span className="inline-grid place-items-center w-10 h-10 rounded-full bg-brand-100 text-brand-700 mb-3">
                    <v.icon size={20} />
                  </span>
                  <h4 className="font-bold text-slate-900 text-sm">{v.titulo}</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-snug">{v.texto}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

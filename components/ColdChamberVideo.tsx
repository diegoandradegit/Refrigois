import React from 'react';

/**
 * Seção de GIF do bom resfriamento da câmara fria.
 *
 * O arquivo é servido como estático (pasta /public/videos), não importado
 * no código — assim dá pra trocar depois de extrair a pasta de deploy,
 * sem precisar rodar build de novo.
 *
 * Pra ativar: coloque o arquivo com o nome exato "camara-fria.gif"
 * dentro da pasta "videos" (na raiz do site, ao lado do index.html).
 */
export const ColdChamberVideo: React.FC = () => {
  return (
    <section className="relative bg-slate-900 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="text-center mb-10">
          <h2 className="text-xs md:text-sm font-bold tracking-widest text-brand-400 uppercase mb-3">Refrigeração Comercial</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-white">
            Sempre na <span className="text-brand-400">Temperatura Certa</span>.
          </h3>
          <p className="text-slate-300 mt-4 max-w-xl mx-auto text-sm md:text-base">
            Resfriamento constante, sem oscilações — pra seu produto nunca perder qualidade.
          </p>
        </div>

        <div className="relative aspect-video max-w-4xl mx-auto rounded-sm overflow-hidden shadow-2xl border border-slate-800 bg-slate-800">
          <img
            src="/videos/camara-fria.gif"
            alt="Câmara fria em funcionamento mostrando resfriamento constante"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
};

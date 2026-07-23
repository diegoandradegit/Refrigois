import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { productsData, productCategories } from '../data';
import { SmartImage } from './SmartImage';
import { Reveal } from './Reveal';
import type { Product } from '../types';

/**
 * Linha de especificacao do card: material, medida e faixa de temperatura.
 *
 * E o que torna um catalogo util — da para comparar modelos sem abrir
 * nenhum. Card de produto sem medida e card de servico disfarcado.
 */
function resumoTecnico(p: Product): string {
  const buscar = (...termos: string[]) =>
    p.ficha?.find((f) => termos.some((t) => f.rotulo.toLowerCase().includes(t)))?.valor;

  return [
    buscar('material')?.split(/[,(]/)[0].trim(),
    buscar('dimens', 'medida'),
    buscar('temperatura'),
  ]
    .filter(Boolean)
    .join(' · ');
}

interface ProductsProps {
  onOpenQuote: () => void;
  hideButton?: boolean;
}

export const Products: React.FC<ProductsProps> = ({ hideButton }) => {
  const categorias = productCategories.filter((c) =>
    productsData.some((p) => p.categorySlug === c.slug)
  );

  // Modelo sem categoria aparece num grupo proprio no fim. Sem isso ele
  // sumiria da listagem em silencio, por nao pertencer a nenhum grupo —
  // conteudo publicado nunca deve desaparecer sem aviso.
  const semCategoria = productsData.filter(
    (p) => !categorias.some((c) => c.slug === p.categorySlug)
  );
  const grupos = [
    ...categorias.map((c) => ({ nome: c.nome, slug: c.slug, itens: productsData.filter((p) => p.categorySlug === c.slug) })),
    ...(semCategoria.length ? [{ nome: 'Outros equipamentos', slug: 'outros', itens: semCategoria }] : []),
  ];

  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!hideButton && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Modelos que fabricamos
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Equipamentos em aço inox produzidos sob medida. Veja as fichas técnicas.
            </p>
          </div>
        )}

        {grupos.map((cat) => {
          const doGrupo = cat.itens;
          return (
            <div key={cat.slug} className="mb-14 last:mb-0">
              <h3 className="text-sm font-bold uppercase tracking-wider text-brand-600 mb-5 pb-2 border-b border-slate-200">
                {cat.nome}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {doGrupo.map((produto) => {
                  const tecnico = resumoTecnico(produto);
                  return (
                    <Reveal key={produto.slug}>
                      <Link
                        to={`/produtos/${produto.slug}`}
                        className="group flex flex-col h-full bg-white border border-slate-200 rounded-sm overflow-hidden hover:border-brand-400 hover:shadow-lg transition-all"
                      >
                        <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                          <SmartImage
                            src={produto.image}
                            alt={produto.imageAlt || produto.title}
                            width={600}
                            height={450}
                            loading="lazy"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>

                        <div className="flex flex-col flex-1 p-5">
                          <h4 className="font-bold text-slate-900 leading-tight mb-2">
                            {produto.title}
                          </h4>

                          {tecnico && (
                            <p className="text-xs text-slate-500 mb-3 leading-relaxed">{tecnico}</p>
                          )}

                          <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">
                            {produto.resumo}
                          </p>

                          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 group-hover:gap-2.5 transition-all">
                            Ver ficha técnica <ArrowRight size={15} />
                          </span>
                        </div>
                      </Link>
                    </Reveal>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

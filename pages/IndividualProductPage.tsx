import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Wrench, Images, CheckCircle2 } from 'lucide-react';
import { productsData, projectsData } from '../data';
import { SmartImage } from './../components/SmartImage';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Contact } from '../components/Contact';
import { Button } from '../components/Button';
import { useSEO } from '../hooks/useSEO';

interface Props {
  onOpenQuote: () => void;
}

/**
 * Galeria do modelo: clicar na miniatura troca a foto grande.
 *
 * Antes as miniaturas eram imagens estaticas — clicar nelas nao fazia nada,
 * o que quebra a expectativa de qualquer catalogo.
 */
function Galeria({
  fotos,
}: {
  fotos: { src: string; alt: string; caption?: string }[];
}) {
  const [ativa, setAtiva] = useState(0);
  const atual = fotos[ativa];
  if (!atual) return null;

  return (
    <div>
      <figure className="m-0 mb-4">
        <div className="aspect-[4/3] rounded-sm overflow-hidden bg-slate-100">
          <SmartImage
            src={atual.src}
            alt={atual.alt}
            width={900}
            height={675}
            className="w-full h-full object-cover"
          />
        </div>
        {atual.caption && (
          <figcaption className="text-sm text-slate-500 mt-2">{atual.caption}</figcaption>
        )}
      </figure>

      {fotos.length > 1 && (
        <div className="grid grid-cols-4 gap-3">
          {fotos.map((f, i) => (
            <button
              key={f.src}
              type="button"
              onClick={() => setAtiva(i)}
              aria-label={`Ver foto ${i + 1} de ${fotos.length}`}
              aria-current={i === ativa}
              className={`aspect-[4/3] rounded-sm overflow-hidden bg-slate-100 border-2 transition-colors ${
                i === ativa ? 'border-brand-500' : 'border-transparent hover:border-slate-300'
              }`}
            >
              <SmartImage
                src={f.src}
                alt={f.alt}
                width={300}
                height={225}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export const IndividualProductPage: React.FC<Props> = ({ onOpenQuote }) => {
  const { slug } = useParams<{ slug: string }>();
  const produto = productsData.find((p) => p.slug === slug);

  const obras = (produto?.relatedProjectSlugs ?? [])
    .map((s) => projectsData.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  useSEO({
    title: produto?.seoTitle || (produto ? `${produto.title} | Refrigóis` : 'Produto'),
    description: produto?.seoDescription || produto?.resumo || '',
    path: `/produtos/${slug}`,
    image: produto?.ogImage || `https://refrigois.com.br/og/produtos-${slug}.jpg`,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!produto) return <Navigate to="/produtos" replace />;

  const galeria = produto.photos ?? [];

  // Foto principal e galeria numa lista so, sem repetir a mesma imagem.
  const todasAsFotos = [
    ...(produto.image ? [{ src: produto.image, alt: produto.imageAlt || produto.title, caption: undefined }] : []),
    ...galeria.filter((f) => f.src !== produto.image),
  ];
  const ficha = produto.ficha ?? [];
  const configuracoes = produto.configuracoes ?? [];

  return (
    <main className="pt-20">
      {/* 1. Identificacao — nomeia o objeto, nao a acao */}
      <section className="bg-slate-900 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { name: 'Produtos', path: '/produtos' },
              { name: produto.title, path: `/produtos/${produto.slug}` },
            ]}
          />
          <Link
            to="/produtos"
            className="inline-flex items-center gap-2 text-brand-300 hover:text-brand-200 font-bold text-sm mt-4 mb-5"
          >
            <ArrowLeft size={16} /> VOLTAR AO CATÁLOGO
          </Link>

          {produto.category && (
            <span className="block text-brand-400 font-bold text-sm uppercase tracking-wider mb-2">
              {produto.category}
            </span>
          )}
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{produto.title}</h1>
          <p className="text-lg text-slate-300 max-w-3xl">{produto.resumo}</p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Fotos */}
            <div>
              <Galeria fotos={todasAsFotos} />
            </div>

            {/* 3. Ficha tecnica — a secao que justifica a pagina existir */}
            <div>
              {produto.aplicacao && produto.aplicacao.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold text-slate-900 mb-4">Para que serve</h2>
                  {produto.aplicacao.map((p, i) => (
                    <p key={i} className="text-slate-600 leading-relaxed mb-4">{p}</p>
                  ))}
                </>
              )}

              {ficha.length > 0 && (
                <>
                  <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-1">Ficha técnica</h2>
                  {/* Todo equipamento e fabricado sob medida. Sem esta linha, a
                      medida na tabela parece a de um modelo de prateleira. */}
                  <p className="text-sm text-slate-500 mb-4">
                    Medidas de referência — o equipamento é fabricado na medida do seu espaço.
                  </p>
                  <dl className="border border-slate-200 rounded-sm overflow-hidden">
                    {ficha.map((linha, i) => (
                      <div
                        key={linha.rotulo}
                        className={`flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 px-4 py-3 ${
                          i % 2 === 0 ? 'bg-slate-50' : 'bg-white'
                        }`}
                      >
                        <dt className="text-sm font-bold text-slate-700 sm:w-48 shrink-0">
                          {linha.rotulo}
                        </dt>
                        <dd className="text-sm text-slate-600 m-0">{linha.valor}</dd>
                      </div>
                    ))}
                  </dl>
                </>
              )}

              <div className="mt-8">
                <Button onClick={onOpenQuote}>Pedir orçamento deste modelo</Button>
              </div>
            </div>
          </div>

          {/* 4. Configuracoes */}
          {configuracoes.length > 0 && (
            <div className="mt-14">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Configurações</h2>
              <p className="text-slate-500 mb-6">
                O modelo é fabricado sob medida — estas são as opções disponíveis.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {configuracoes.map((c) => (
                  <div key={c.titulo} className="flex gap-3 p-4 border border-slate-200 rounded-sm">
                    <CheckCircle2 size={18} className="text-brand-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="block font-bold text-slate-900 text-sm">{c.titulo}</span>
                      {c.texto && (
                        <span className="block text-sm text-slate-600 mt-0.5">{c.texto}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. Onde ja foi entregue — o que separa este catalogo de um
              catalogo copiado de fornecedor */}
          {obras.length > 0 && (
            <div className="mt-14">
              <h2 className="flex items-center gap-2 text-2xl font-bold text-slate-900 mb-2">
                <Images size={20} className="text-brand-600" /> Onde já foi entregue
              </h2>
              <p className="text-slate-500 mb-6">Obras reais executadas com este modelo.</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {obras.map((o) => (
                  <Link key={o.slug} to={`/projetos/${o.slug}`} className="group block">
                    <div className="aspect-[4/3] overflow-hidden rounded-sm bg-slate-100 mb-2">
                      <SmartImage
                        src={o.image}
                        alt={o.imageAlt || o.title}
                        width={600}
                        height={450}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <span className="block font-bold text-slate-900 text-sm leading-tight">
                      {o.title}
                    </span>
                    <span className="text-xs text-brand-600 font-bold uppercase tracking-wider">
                      Ver projeto
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* 6. Servico relacionado — o produto aponta em vez de disputar */}
          {produto.servico && (
            <Link
              to={`/servicos/${produto.servico.categorySlug}/${produto.servico.slug}`}
              className="mt-14 flex items-center gap-4 p-5 bg-slate-50 border border-slate-200 rounded-sm hover:border-brand-400 transition-colors group"
            >
              <Wrench size={22} className="text-brand-600 shrink-0" />
              <div className="flex-1">
                <span className="block text-sm text-slate-500">Quem fabrica e instala</span>
                <span className="block font-bold text-slate-900 group-hover:text-brand-600">
                  {produto.servico.title}
                </span>
              </div>
              <ArrowLeft size={18} className="rotate-180 text-slate-400 shrink-0" />
            </Link>
          )}

          {/* 7. Perguntas de especificacao */}
          {produto.faq && produto.faq.length > 0 && (
            <div className="mt-14">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Perguntas frequentes</h2>
              <div className="space-y-3">
                {produto.faq.map((item, i) => (
                  <details key={i} className="group bg-slate-50 border border-slate-200 rounded-sm">
                    <summary className="cursor-pointer list-none px-5 py-4 font-bold text-slate-900 flex items-start justify-between gap-3">
                      <span>{item.q}</span>
                      <ChevronDown
                        size={18}
                        className="shrink-0 mt-0.5 text-slate-500 transition-transform group-open:rotate-180"
                      />
                    </summary>
                    <p className="px-5 pb-4 text-slate-700 leading-relaxed">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 8. Fechamento */}
      <Contact onOpenQuote={onOpenQuote} />
    </main>
  );
};

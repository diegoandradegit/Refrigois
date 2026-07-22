import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { citiesData } from '../citiesData';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Contact } from '../components/Contact';
import { Button } from '../components/Button';
import { useSEO } from '../hooks/useSEO';

interface CityPageProps {
  onOpenQuote: () => void;
}

// Componente BASE de página de cidade.
//
// A estrutura está pronta, mas as páginas completas por cidade só são geradas
// quando `published: true` em citiesData.ts — o que deve acontecer poucas por
// vez, com conteúdo único, conforme os dados do Search Console mostrarem
// demanda real. Enquanto isso, a rota responde com um conteúdo enxuto de
// cobertura + CTA (sem página fina indexável em massa).
export const CityPage: React.FC<CityPageProps> = ({ onOpenQuote }) => {
  const { slug } = useParams<{ slug: string }>();
  const city = citiesData.find((c) => c.slug === slug);

  useSEO({
    title: city
      ? `Refrigeração Comercial e Câmara Fria em ${city.name} | Refrigóis`
      : 'Cidade não encontrada',
    description: city
      ? `Fabricação, instalação e manutenção de câmara fria e refrigeração comercial em ${city.name} e região. Atendimento sob medida da Refrigóis.`
      : 'Cidade não encontrada.',
    path: `/cidades/${slug}`,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!city) {
    return (
      <main className="pt-32 pb-24 text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Cidade não encontrada</h1>
        <Link to="/" className="text-brand-600 hover:underline">Voltar para a página inicial</Link>
      </main>
    );
  }

  return (
    <main className="pt-20">
      <section className="relative py-24 md:py-32 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs
            items={[
              { label: city.name },
            ]}
          />
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-6 mb-4 max-w-3xl">
            Câmara Fria e Refrigeração Comercial em {city.name}
          </h1>
          <p className="text-slate-300 text-lg max-w-2xl mb-8">
            A Refrigóis atende {city.name} e região com fabricação, instalação e manutenção
            de câmara fria e equipamentos de refrigeração comercial — projeto sob medida para
            açougues, supermercados, distribuidoras, restaurantes e farmácias.
          </p>
          <Button
            onClick={onOpenQuote}
            className="bg-brand-600 hover:bg-brand-700 border-brand-600 text-white"
          >
            Solicitar Orçamento <ArrowRight size={18} className="ml-2" />
          </Button>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6">
            Atendimento sob medida em {city.name}
          </h2>
          <p className="text-slate-600 leading-relaxed mb-4">
            Como todos os nossos equipamentos são fabricados sob medida, atendemos {city.name}
            {' '}({city.region}) com a mesma qualidade da nossa base em Maringá — do projeto à
            instalação e à manutenção preventiva.
          </p>
          {city.nearbyCities && city.nearbyCities.length > 0 && (
            <p className="text-slate-600 leading-relaxed mb-8">
              Também atendemos as cidades da região: {city.nearbyCities.join(', ')}.
            </p>
          )}
          <div className="flex flex-wrap gap-4">
            <Link to="/servicos/camara-fria/fabricacao" className="text-brand-600 font-medium hover:underline">Fabricação de câmara fria</Link>
            <Link to="/servicos/camara-fria/instalacao" className="text-brand-600 font-medium hover:underline">Instalação de câmara fria</Link>
            <Link to="/servicos/camara-fria/manutencao" className="text-brand-600 font-medium hover:underline">Manutenção de câmara fria</Link>
            <Link to="/solucoes" className="text-brand-600 font-medium hover:underline">Soluções por segmento</Link>
          </div>
        </div>
      </section>

      <Contact onOpenQuote={onOpenQuote} compact />
    </main>
  );
};

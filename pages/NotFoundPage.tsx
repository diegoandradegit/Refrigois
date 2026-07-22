import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, MessageCircle, ArrowRight } from 'lucide-react';
import { useSEO } from '../hooks/useSEO';
import { trackWhatsAppClick } from '../utils/analytics';

interface NotFoundPageProps {
  onOpenQuote: () => void;
}

const whatsappNumber = '5544999368420';
const whatsappMsg = encodeURIComponent(
  'Olá! Estava no site da Refrigóis e gostaria de falar sobre refrigeração comercial.'
);

const mainLinks = [
  { label: 'Câmara Fria', to: '/servicos/camara-fria' },
  { label: 'Refrigeração Comercial', to: '/servicos/refrigeracao-comercial' },
  { label: 'Produtos', to: '/produtos' },
  { label: 'Soluções por Segmento', to: '/solucoes' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contato', to: '/contato' },
];

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ onOpenQuote }) => {
  useSEO({
    title: 'Página não encontrada (404)',
    description: 'A página que você procura não foi encontrada. Veja os serviços de câmara fria e refrigeração comercial da Refrigóis.',
    path: '/404',
    noindex: true,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-20 min-h-screen bg-slate-900 flex items-center">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <p className="text-7xl md:text-8xl font-bold text-brand-500 mb-4">404</p>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
          Página não encontrada
        </h1>
        <p className="text-slate-300 mb-10 max-w-xl mx-auto">
          O endereço que você tentou acessar não existe ou foi movido. Mas a Refrigóis
          continua aqui para cuidar da sua refrigeração comercial — escolha um caminho abaixo.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-medium px-6 py-3 rounded-sm transition-colors"
          >
            <Home size={18} /> Voltar para a Home
          </Link>
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('not_found_page')}
            className="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-sm transition-colors"
          >
            <MessageCircle size={18} /> Falar no WhatsApp
          </a>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <p className="text-slate-400 text-sm uppercase tracking-wider mb-4">Páginas principais</p>
          <div className="flex flex-wrap gap-x-6 gap-y-3 justify-center">
            {mainLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="inline-flex items-center gap-1 text-brand-400 hover:text-brand-300 transition-colors text-sm"
              >
                {l.label} <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

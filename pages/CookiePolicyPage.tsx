import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useSEO } from '../hooks/useSEO';

interface LegalPageProps {
  onOpenQuote: () => void;
}

export const CookiePolicyPage: React.FC<LegalPageProps> = () => {
  useSEO({
    title: 'Política de Cookies',
    description: 'Política de Cookies da Refrigóis: o que são cookies, como usamos e como você pode gerenciá-los.',
    path: '/politica-de-cookies',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-28 pb-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Política de Cookies' },
          ]}
        />
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-6 mb-2">Política de Cookies</h1>
        <p className="text-slate-500 text-sm mb-10">Última atualização: julho de 2026</p>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
          <p>
            Esta Política de Cookies explica o que são cookies, como a Refrigóis os utiliza neste
            site e como você pode gerenciá-los.
          </p>

          <h2 className="text-xl font-bold text-slate-900">1. O que são cookies</h2>
          <p>
            Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita
            um site. Eles permitem que o site funcione corretamente, lembre preferências e colete
            informações estatísticas de navegação.
          </p>

          <h2 className="text-xl font-bold text-slate-900">2. Tipos de cookies que utilizamos</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Essenciais:</strong> necessários para o funcionamento básico do site.</li>
            <li><strong>Analíticos:</strong> do Google Analytics 4, para entender de forma agregada como o site é utilizado e melhorá-lo.</li>
            <li><strong>De atribuição (UTMs):</strong> registram a origem da sua visita (por exemplo, um link do Instagram ou do Google Meu Negócio) para sabermos de onde vêm os contatos.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900">3. Como gerenciar cookies</h2>
          <p>
            Você pode bloquear ou excluir cookies nas configurações do seu navegador. A maioria dos
            navegadores permite recusar cookies ou avisar antes de armazená-los. Observe que
            desativar certos cookies pode afetar algumas funcionalidades do site.
          </p>
          <p>
            Para saber como fazer isso, consulte a ajuda do seu navegador (Chrome, Firefox, Safari,
            Edge, entre outros).
          </p>

          <h2 className="text-xl font-bold text-slate-900">4. Mais informações</h2>
          <p>
            O tratamento dos dados coletados por cookies está descrito na nossa
            {' '}<Link to="/politica-de-privacidade" className="text-brand-600 hover:underline">Política de Privacidade</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900">5. Contato</h2>
          <p>
            Refrigóis Refrigeração Comercial<br />
            WhatsApp / Telefone: (44) 99936-8420
          </p>
        </div>
      </div>
    </main>
  );
};

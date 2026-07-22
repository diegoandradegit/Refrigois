import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useSEO } from '../hooks/useSEO';

interface LegalPageProps {
  onOpenQuote: () => void;
}

export const PrivacyPolicyPage: React.FC<LegalPageProps> = () => {
  useSEO({
    title: 'Política de Privacidade',
    description: 'Política de Privacidade da Refrigóis: como coletamos, usamos e protegemos seus dados, em conformidade com a LGPD.',
    path: '/politica-de-privacidade',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-28 pb-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Política de Privacidade' },
          ]}
        />
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-6 mb-2">Política de Privacidade</h1>
        <p className="text-slate-500 text-sm mb-10">Última atualização: julho de 2026</p>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
          <p>
            A Refrigóis Refrigeração Comercial respeita a sua privacidade e está comprometida com a
            proteção dos dados pessoais tratados por meio deste site, em conformidade com a Lei nº
            13.709/2018 (Lei Geral de Proteção de Dados — LGPD).
          </p>

          <h2 className="text-xl font-bold text-slate-900">1. Quais dados coletamos</h2>
          <p>Coletamos os seguintes dados, sempre com uma finalidade específica:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li><strong>Dados fornecidos por você:</strong> nome, telefone/WhatsApp, e-mail e a descrição da sua necessidade, informados nos formulários de orçamento e contato.</li>
            <li><strong>Dados de navegação:</strong> páginas visitadas, tempo de permanência, dispositivo e origem do acesso, coletados por ferramentas de análise.</li>
            <li><strong>Parâmetros de campanha (UTMs):</strong> quando você chega ao site por um link de anúncio, rede social ou Google Meu Negócio, registramos a origem para entender de onde vêm nossos contatos.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900">2. Como usamos seus dados</h2>
          <ul className="list-disc pl-6 space-y-1">
            <li>Responder solicitações de orçamento e contato;</li>
            <li>Prestar e acompanhar nossos serviços de refrigeração comercial;</li>
            <li>Melhorar o site e entender quais conteúdos são mais úteis;</li>
            <li>Cumprir obrigações legais e regulatórias.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900">3. Google Analytics</h2>
          <p>
            Utilizamos o Google Analytics 4 para entender, de forma agregada e anônima, como os
            visitantes usam o site. Essa ferramenta pode coletar dados de navegação por meio de
            cookies. As informações ajudam a melhorar a experiência e não são usadas para
            identificar você pessoalmente. Saiba mais na
            {' '}<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline">Política de Privacidade do Google</a>.
          </p>

          <h2 className="text-xl font-bold text-slate-900">4. Cookies</h2>
          <p>
            O site utiliza cookies para funcionamento e análise. Você pode gerenciar ou desativar
            cookies nas configurações do seu navegador. Para mais detalhes, consulte nossa
            {' '}<Link to="/politica-de-cookies" className="text-brand-600 hover:underline">Política de Cookies</Link>.
          </p>

          <h2 className="text-xl font-bold text-slate-900">5. Compartilhamento de dados</h2>
          <p>
            Não vendemos seus dados. Utilizamos o serviço de e-mail transacional Resend para
            processar e entregar as mensagens enviadas pelos formulários do site. Esses provedores
            tratam os dados apenas para viabilizar o envio, seguindo suas próprias políticas de
            segurança. Podemos compartilhar dados quando exigido por lei ou autoridade competente.
          </p>

          <h2 className="text-xl font-bold text-slate-900">6. Seus direitos (LGPD)</h2>
          <p>
            Você pode, a qualquer momento, solicitar acesso, correção, exclusão ou portabilidade
            dos seus dados, bem como revogar consentimentos. Para exercer esses direitos, entre em
            contato pelos canais informados abaixo.
          </p>

          <h2 className="text-xl font-bold text-slate-900">7. Segurança e retenção</h2>
          <p>
            Adotamos medidas técnicas e organizacionais para proteger seus dados. Mantemos as
            informações apenas pelo tempo necessário às finalidades descritas ou conforme exigido
            por lei.
          </p>

          <h2 className="text-xl font-bold text-slate-900">8. Contato</h2>
          <p>
            Refrigóis Refrigeração Comercial<br />
            Rua Pioneira Gertrude Heck Fritzen, 5821 — Conj. João de Barro I, Maringá — PR, CEP 87053-124<br />
            WhatsApp / Telefone: (44) 99936-8420
          </p>
        </div>
      </div>
    </main>
  );
};

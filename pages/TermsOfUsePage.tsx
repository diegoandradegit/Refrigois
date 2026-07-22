import React, { useEffect } from 'react';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useSEO } from '../hooks/useSEO';

interface LegalPageProps {
  onOpenQuote: () => void;
}

export const TermsOfUsePage: React.FC<LegalPageProps> = () => {
  useSEO({
    title: 'Termos de Uso',
    description: 'Termos de Uso do site da Refrigóis Refrigeração Comercial. Condições para utilização do site e dos nossos canais de contato.',
    path: '/termos-de-uso',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-28 pb-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs
          items={[
            { label: 'Termos de Uso' },
          ]}
        />
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-6 mb-2">Termos de Uso</h1>
        <p className="text-slate-500 text-sm mb-10">Última atualização: julho de 2026</p>

        <div className="prose prose-slate max-w-none space-y-6 text-slate-700 leading-relaxed">
          <p>
            Ao acessar e utilizar o site da Refrigóis Refrigeração Comercial, você concorda com os
            termos descritos abaixo. Recomendamos a leitura atenta deste documento.
          </p>

          <h2 className="text-xl font-bold text-slate-900">1. Sobre o site</h2>
          <p>
            Este site tem caráter informativo e comercial, apresentando os serviços e produtos de
            refrigeração comercial da Refrigóis — fabricação, instalação e manutenção de câmara
            fria e equipamentos correlatos — e disponibilizando canais para solicitação de
            orçamento e contato.
          </p>

          <h2 className="text-xl font-bold text-slate-900">2. Uso adequado</h2>
          <p>Ao utilizar o site, você se compromete a:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Fornecer informações verdadeiras nos formulários;</li>
            <li>Não utilizar o site para fins ilícitos ou que violem direitos de terceiros;</li>
            <li>Não tentar comprometer a segurança, a integridade ou o funcionamento do site.</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-900">3. Orçamentos e informações</h2>
          <p>
            As informações de produtos e serviços têm caráter ilustrativo. Valores, prazos e
            especificações são confirmados por meio de orçamento formal, elaborado conforme cada
            projeto. Imagens podem ter caráter ilustrativo e não constituem oferta vinculante.
          </p>

          <h2 className="text-xl font-bold text-slate-900">4. Propriedade intelectual</h2>
          <p>
            A marca, o logotipo, os textos e os demais elementos deste site pertencem à Refrigóis
            ou são utilizados sob autorização. É vedada a reprodução sem consentimento prévio.
          </p>

          <h2 className="text-xl font-bold text-slate-900">5. Links externos</h2>
          <p>
            O site pode conter links para páginas de terceiros (como redes sociais e Google Meu
            Negócio). Não nos responsabilizamos pelo conteúdo ou pelas práticas de privacidade
            desses sites.
          </p>

          <h2 className="text-xl font-bold text-slate-900">6. Limitação de responsabilidade</h2>
          <p>
            Empenhamo-nos para manter as informações corretas e o site disponível, mas não
            garantimos ausência de interrupções ou erros. O uso do site é de responsabilidade do
            usuário.
          </p>

          <h2 className="text-xl font-bold text-slate-900">7. Alterações</h2>
          <p>
            Estes termos podem ser atualizados a qualquer momento. A versão vigente é sempre a
            publicada nesta página.
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

import React from 'react';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { Products } from '../components/Products';
import { Projects } from '../components/Projects';
import { About } from '../components/About';
import { FAQ } from '../components/FAQ';
import { Contact } from '../components/Contact';
import { Diferenciais } from '../components/Diferenciais';
import { CTABanner } from '../components/CTABanner';
import { ServiceArea } from '../components/ServiceArea';
import { BlogPreview } from '../components/BlogPreview';
import { Reveal } from '../components/Reveal';
import { useSEO } from '../hooks/useSEO';

interface HomeProps {
  onOpenQuote: () => void;
}

export const Home: React.FC<HomeProps> = ({ onOpenQuote }) => {
  useSEO({
    title: 'Refrigeração Comercial e Industrial em Maringá',
    description: 'Fabricação, instalação e manutenção de câmaras frias, balcão refrigerado, expositores e equipamentos de refrigeração comercial e industrial em Maringá e região. Orçamento rápido.',
    path: '/',
  });

  return (
    <main>
      <Hero onOpenQuote={onOpenQuote} />
      <Reveal><Services onOpenQuote={onOpenQuote} limit={4} /></Reveal>
      <Reveal><Products onOpenQuote={onOpenQuote} limit={3} /></Reveal>
      <Reveal><Projects limit={4} /></Reveal>
      <Reveal><About /></Reveal>
      <Reveal><Diferenciais /></Reveal>
      <Reveal><CTABanner onOpenQuote={onOpenQuote} /></Reveal>
      <Reveal><ServiceArea /></Reveal>
      <Reveal><BlogPreview /></Reveal>
      <Reveal><Contact onOpenQuote={onOpenQuote} compact /></Reveal>
      <Reveal><FAQ /></Reveal>
      <Reveal>
        <CTABanner
          onOpenQuote={onOpenQuote}
          titulo="Vamos cuidar do seu frio?"
          texto="Peça um orçamento sem compromisso ou fale agora com a nossa equipe. Atendemos Maringá e toda a região."
        />
      </Reveal>
    </main>
  );
};

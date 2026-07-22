import React from 'react';
import { Hero } from '../components/Hero';
import { Services } from '../components/Services';
import { Products } from '../components/Products';
import { Projects } from '../components/Projects';
import { About } from '../components/About';
import { FAQ } from '../components/FAQ';
import { Contact } from '../components/Contact';
import { ColdChamberVideo } from '../components/ColdChamberVideo';
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
      <Reveal><ColdChamberVideo /></Reveal>
      <Reveal><ServiceArea /></Reveal>
      <Reveal><BlogPreview /></Reveal>
      <Reveal><Contact onOpenQuote={onOpenQuote} compact /></Reveal>
      <Reveal><FAQ /></Reveal>
    </main>
  );
};

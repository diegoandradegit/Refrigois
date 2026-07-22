import React, { useEffect } from 'react';
import { Projects } from '../components/Projects';
import { Contact } from '../components/Contact';
import { ServiceArea } from '../components/ServiceArea';
import { useSEO } from '../hooks/useSEO';

interface ProjectsPageProps {
  onOpenQuote: () => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onOpenQuote }) => {
  useSEO({
    title: 'Projetos e Obras Realizadas',
    description: 'Veja projetos de refrigeracao comercial e industrial ja entregues pela Refrigois: camaras frias, expositores e equipamentos sob medida.',
    path: '/projetos',
    image: 'https://refrigois.com.br/og/projetos.jpg',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-20 bg-slate-900">
      <Projects hideButton={true} showFilter={true} />
      <ServiceArea />
      <Contact onOpenQuote={onOpenQuote} />
    </main>
  );
};

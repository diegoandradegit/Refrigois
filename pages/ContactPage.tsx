import React, { useEffect } from 'react';
import { Contact } from '../components/Contact';
import { ServiceArea } from '../components/ServiceArea';
import { useSEO } from '../hooks/useSEO';

interface ContactPageProps {
  onOpenQuote: () => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onOpenQuote }) => {
  useSEO({
    title: 'Contato e Orçamento',
    description: 'Fale com a Refrigóis e solicite um orçamento para refrigeração comercial e industrial em Maringá e região. Atendimento rápido via WhatsApp.',
    path: '/contato',
    image: 'https://refrigois.com.br/og/contato.jpg',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="pt-20">
      <Contact onOpenQuote={onOpenQuote} />
      <ServiceArea />
    </main>
  );
};

import React from 'react';
import { useInView } from '../hooks/useInView';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // ms
}

/**
 * Envolve uma seção e aplica um fade + slide-up suave quando ela entra na tela.
 * Usa animação nativa CSS (via Tailwind), sem custo de performance perceptível.
 */
export const Reveal: React.FC<RevealProps> = ({ children, className = '', delay = 0 }) => {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${isInView ? 'animate-reveal' : 'reveal-oculto'} ${className}`}
      style={isInView && delay ? { animationDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
};

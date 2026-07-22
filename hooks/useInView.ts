import { useEffect, useRef, useState } from 'react';

/**
 * Retorna true assim que o elemento referenciado entra na tela (uma vez só,
 * não desanima ao rolar pra cima de novo — evita efeito repetitivo/cansativo).
 */
export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T | null>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Se o navegador não suporta IntersectionObserver, mostra direto (sem animação)
    if (typeof IntersectionObserver === 'undefined') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);

    // Rede de segurança: se por algum motivo o observer nunca disparar
    // (conteúdo muito alto, elemento mal dimensionado, etc.), garante que
    // o conteúdo não fique invisível pra sempre.
    const safetyTimer = setTimeout(() => setIsInView(true), 1200);

    return () => {
      observer.disconnect();
      clearTimeout(safetyTimer);
    };
  }, [threshold]);

  return { ref, isInView };
}

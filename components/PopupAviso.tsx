import React, { useState, useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import config from '../generated/configuracoes.json';
import { trackEvent } from '../utils/analytics';

const cfg = config as unknown as Record<string, string>;

const WHATSAPP =
  'https://wa.me/5544999368420?text=' + encodeURIComponent('Olá! Vim pelo site da Refrigóis.');
const KEY = 'popupAvisoFechado';

interface PopupAvisoProps {
  onOpenQuote?: () => void;
}

/**
 * Popup de aviso/promoção controlado 100% pelo painel (tabela configuracoes).
 * Liga/desliga, textos, botão e gatilho (tempo, rolagem % ou saída) são
 * definidos pelo admin. Respeita frequência (sessão, dia ou sempre).
 */
export const PopupAviso: React.FC<PopupAvisoProps> = ({ onOpenQuote }) => {
  const ativo = cfg.popup_ativo === 'true';
  const gatilho = cfg.popup_gatilho || 'tempo';
  const tempo = Math.max(1, parseInt(cfg.popup_tempo || '10', 10));
  const scrollPct = Math.min(100, Math.max(10, parseInt(cfg.popup_scroll || '60', 10)));
  const frequencia = cfg.popup_frequencia || 'sessao';

  const [isOpen, setIsOpen] = useState(false);

  const jaMostrado = useCallback(() => {
    try {
      if (frequencia === 'sempre') return false;
      if (frequencia === 'sessao') return !!sessionStorage.getItem(KEY);
      if (frequencia === 'dia') {
        const ts = localStorage.getItem(KEY);
        return !!ts && Date.now() - Number(ts) < 24 * 60 * 60 * 1000;
      }
    } catch {
      /* storage indisponível — mostra mesmo assim */
    }
    return false;
  }, [frequencia]);

  const marcar = useCallback(() => {
    try {
      if (frequencia === 'sessao') sessionStorage.setItem(KEY, '1');
      else if (frequencia === 'dia') localStorage.setItem(KEY, String(Date.now()));
    } catch {
      /* ignora */
    }
  }, [frequencia]);

  const abrir = useCallback(() => {
    if (jaMostrado()) return;
    setIsOpen(true);
    trackEvent('popup_aviso_shown', { gatilho });
  }, [jaMostrado, gatilho]);

  useEffect(() => {
    if (!ativo || jaMostrado()) return;

    if (gatilho === 'scroll') {
      const onScroll = () => {
        const el = document.documentElement;
        const pct = ((el.scrollTop + window.innerHeight) / el.scrollHeight) * 100;
        if (pct >= scrollPct) {
          abrir();
          window.removeEventListener('scroll', onScroll);
        }
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }

    if (gatilho === 'saida') {
      const onLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) {
          abrir();
          document.removeEventListener('mouseleave', onLeave);
        }
      };
      document.addEventListener('mouseleave', onLeave);
      // Fallback no celular (onde não existe "saída" do mouse): abre por tempo.
      const t = setTimeout(abrir, Math.max(tempo, 20) * 1000);
      return () => {
        document.removeEventListener('mouseleave', onLeave);
        clearTimeout(t);
      };
    }

    // Padrão: por tempo.
    const t = setTimeout(abrir, tempo * 1000);
    return () => clearTimeout(t);
  }, [ativo, gatilho, tempo, scrollPct, abrir, jaMostrado]);

  if (!ativo || !isOpen) return null;

  const fechar = () => {
    setIsOpen(false);
    marcar();
    trackEvent('popup_aviso_close', {});
  };

  const clicarBotao = () => {
    trackEvent('popup_aviso_cta', { acao: cfg.popup_acao });
    marcar();
    setIsOpen(false);
    const acao = cfg.popup_acao || 'orcamento';
    if (acao === 'orcamento') onOpenQuote?.();
    else if (acao === 'whatsapp') window.open(WHATSAPP, '_blank', 'noopener');
    else if (acao === 'link' && cfg.popup_link) window.open(cfg.popup_link, '_blank', 'noopener');
  };

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
      onClick={fechar}
    >
      <div
        className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 md:p-8 text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={fechar}
          aria-label="Fechar"
          className="absolute top-3 right-3 w-9 h-9 grid place-items-center rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
        >
          <X size={20} />
        </button>

        {cfg.popup_selo && (
          <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-brand-700 bg-brand-50 px-3 py-1 rounded-full mb-4">
            {cfg.popup_selo}
          </span>
        )}
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          {cfg.popup_titulo || 'Fale com a Refrigóis'}
        </h2>
        {cfg.popup_texto && (
          <p className="text-slate-600 leading-relaxed mb-6 text-sm md:text-base whitespace-pre-line">
            {cfg.popup_texto}
          </p>
        )}
        <button
          onClick={clicarBotao}
          className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3 rounded-sm transition-colors"
        >
          {cfg.popup_botao || 'Falar com a equipe'}
        </button>
      </div>
    </div>
  );
};

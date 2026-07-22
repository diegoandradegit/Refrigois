import React, { useState, useEffect } from 'react';
import { X, Wrench, ThermometerSnowflake, ShieldCheck } from 'lucide-react';
import { trackSalesPopupShown, trackSalesPopupClose, trackSalesPopupCTAClick } from '../utils/analytics';

interface SalesPopupProps {
  onOpenQuote: () => void;
}

// DESATIVADO TEMPORARIAMENTE (jul/2026) — enquanto o site está em
// finalização, quem aparece é o AnnouncementPopup (aviso de site em
// desenvolvimento). Para reativar este popup de urgência depois, basta
// trocar ENABLED para true e voltar a renderizar <SalesPopup /> no App.tsx.
const ENABLED = false;

export const SalesPopup: React.FC<SalesPopupProps> = ({ onOpenQuote }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  useEffect(() => {
    if (!ENABLED) return;

    // Verifica se já foi fechado nesta sessão
    const sessionClosed = sessionStorage.getItem('salesPopupClosed');
    if (sessionClosed) return;

    // Gatilho por Tempo (15 segundos)
    const timer = setTimeout(() => {
      if (!hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
        trackSalesPopupShown('timer');
      }
    }, 15000);

    // Gatilho por Intenção de Saída (Mouse saindo da tela pelo topo)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggered) {
        setIsOpen(true);
        setHasTriggered(true);
        trackSalesPopupShown('exit_intent');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [hasTriggered]);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('salesPopupClosed', 'true');
    trackSalesPopupClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity animate-fade-in"
        onClick={handleClose}
      ></div>

      {/* Card */}
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in-up border-t-4 border-brand-600">
        <button 
          onClick={handleClose}
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 bg-slate-100 rounded-full p-1 transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Side Banner */}
          <div className="hidden md:flex flex-col items-center justify-center bg-brand-50 w-1/3 p-6 border-r border-brand-100">
            <div className="w-16 h-16 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mb-4">
              <ThermometerSnowflake size={32} />
            </div>
            <p className="text-center text-xs text-brand-700 font-bold uppercase tracking-wider">Atendimento Imediato</p>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8 flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide">
                Equipamento Parado?
              </span>
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">
              Precisando de Assistência Urgente?
            </h3>
            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
              Não perca produtos ou vendas. Nossa equipe técnica está pronta para avaliar e consertar o seu equipamento com rapidez.
            </p>

            <div className="bg-slate-50 rounded-lg p-4 mb-6 border border-slate-100">
              <h4 className="text-sm font-bold text-slate-800 mb-3 uppercase tracking-wide">Vantagens Refrigois:</h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <Wrench size={16} className="text-brand-500" />
                  <span>Técnicos Certificados</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-700">
                  <ShieldCheck size={16} className="text-green-500" />
                  <span>Garantia de Qualidade</span>
                </li>
              </ul>
            </div>

            <button
              onClick={() => {
                trackSalesPopupCTAClick();
                setIsOpen(false);
                sessionStorage.setItem('salesPopupClosed', 'true');
                onOpenQuote();
              }}
              className="flex items-center justify-center w-full gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-bold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              <Wrench size={20} />
              <span>Agendar Visita Técnica</span>
            </button>
            
            <p className="text-center text-[10px] text-slate-400 mt-3">
              Atendimento em toda Maringá e Região
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, Loader2 } from 'lucide-react';
import { trackEvent, trackFormSubmit, getStoredUTMs } from '../utils/analytics';

// Popup de aviso — site em finalização.
//
// Substitui temporariamente o SalesPopup (que está desativado). Mostra a
// logo da empresa, avisa que o site ainda está sendo atualizado com fotos,
// vídeos e informações completas, reforça que o atendimento segue normal
// e traz um formulário curto de contato (nome + WhatsApp + necessidade).
//
// Aparece uma vez por sessão, 8 segundos após a entrada. Depois de fechado
// ou enviado, não volta a aparecer na mesma sessão.

interface AnnouncementPopupProps {
  onOpenQuote?: () => void;
}

const SESSION_KEY = 'announcementPopupClosed';
const DELAY_MS = 8000;

export const AnnouncementPopup: React.FC<AnnouncementPopupProps> = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [form, setForm] = useState({ name: '', email: '', phone: '', description: '' });

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SESSION_KEY)) return;
    } catch {
      // sessionStorage indisponível (modo restrito) — segue mostrando
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
      trackEvent('announcement_popup_shown', { page_path: window.location.pathname });
    }, DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setIsOpen(false);
    try {
      sessionStorage.setItem(SESSION_KEY, 'true');
    } catch {
      /* ignora */
    }
    trackEvent('announcement_popup_close', { page_path: window.location.pathname });
  };

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setErrorMsg('Preencha nome, e-mail e WhatsApp para continuarmos.');
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/.netlify/functions/send-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          description: form.description || 'Contato pelo aviso do site (site em finalização).',
          source: 'Popup de Aviso',
          ...getStoredUTMs(),
        }),
      });

      if (!res.ok) throw new Error('Não foi possível enviar agora.');

      setStatus('success');
      trackFormSubmit('announcement_popup', 'success');
      try {
        sessionStorage.setItem(SESSION_KEY, 'true');
      } catch {
        /* ignora */
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Não foi possível enviar agora.';
      setStatus('error');
      setErrorMsg(message);
      trackFormSubmit('announcement_popup', 'error', { error_message: message });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm">
      <div className="relative bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <button
          onClick={close}
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-700 transition-colors z-10"
          aria-label="Fechar aviso"
        >
          <X size={22} />
        </button>

        {/* Cabeçalho com a logo */}
        <div className="bg-slate-900 px-6 pt-8 pb-6 text-center">
          <img
            src="/logo.png"
            alt="Refrigóis Refrigeração Comercial"
            className="h-14 w-auto mx-auto object-contain brightness-0 invert"
          />
        </div>

        <div className="p-6">
          {status === 'success' ? (
            <div className="text-center py-6">
              <CheckCircle2 size={48} className="text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Recebemos seu contato!</h3>
              <p className="text-slate-600 text-sm mb-6">
                Nossa equipe vai retornar pelo WhatsApp o mais rápido possível.
              </p>
              <button
                onClick={close}
                className="px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm uppercase tracking-wide rounded-sm transition-colors"
              >
                Continuar navegando
              </button>
            </div>
          ) : (
            <>
              <div className="mb-5">
                <span className="inline-block text-[11px] font-bold uppercase tracking-widest text-brand-600 mb-2">
                  Aviso
                </span>
                <h3 className="text-xl font-bold text-slate-900 mb-3 leading-snug">
                  Nosso site ainda está em desenvolvimento
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                  Em breve ele estará completo, com fotos e vídeos dos nossos trabalhos e
                  todas as informações da empresa.
                </p>
                <p className="text-slate-900 text-sm font-semibold leading-relaxed">
                  A Refrigóis continua atendendo normalmente — fabricação, instalação e
                  manutenção de câmara fria e refrigeração comercial.
                </p>
              </div>

              <div className="border-t border-slate-200 pt-5">
                <p className="text-sm font-bold text-slate-900 mb-3">
                  Precisa de um orçamento? Deixe seu contato:
                </p>

                <div className="space-y-3">
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Seu nome"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-brand-600 transition-colors"
                  />
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="Seu e-mail"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-brand-600 transition-colors"
                  />
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="WhatsApp com DDD"
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-brand-600 transition-colors"
                  />
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="O que você precisa? (opcional)"
                    rows={2}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-sm text-sm focus:outline-none focus:border-brand-600 transition-colors resize-none"
                  />
                </div>

                {status === 'error' && (
                  <p className="text-red-600 text-xs mt-3">{errorMsg}</p>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={status === 'sending'}
                  className="w-full mt-4 flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 disabled:opacity-60 text-white font-bold text-sm uppercase tracking-wide py-3 rounded-sm transition-colors"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Enviando...
                    </>
                  ) : (
                    'Solicitar Orçamento'
                  )}
                </button>

                <button
                  onClick={close}
                  className="w-full mt-2 text-slate-500 hover:text-slate-700 text-xs py-2 transition-colors"
                >
                  Continuar navegando
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

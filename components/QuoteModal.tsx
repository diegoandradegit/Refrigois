import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { QuoteFormData } from '../types';
import { trackFormSubmit, getStoredUTMs } from '../utils/analytics';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

export const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<QuoteFormData>({
    name: '',
    email: '',
    phone: '',
    description: ''
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    // Reseta o estado depois de um instante, pra não "piscar" o formulário durante o fechamento
    setTimeout(() => {
      setStatus('idle');
      setFormData({ name: '', email: '', phone: '', description: '' });
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/.netlify/functions/send-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, source: 'Modal de Orçamento', ...getStoredUTMs() }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Não foi possível enviar sua solicitação.');
      }

      setStatus('success');
      trackFormSubmit('quote_modal', 'success');
    } catch (err) {
      setStatus('error');
      const message = err instanceof Error ? err.message : 'Não foi possível enviar sua solicitação.';
      setErrorMsg(message);
      trackFormSubmit('quote_modal', 'error', { error_message: message });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity"
        onClick={handleClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-md rounded-lg shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Solicitar Orçamento</h3>
          <button onClick={handleClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {status === 'success' ? (
          <div className="p-8 text-center">
            <CheckCircle2 className="mx-auto text-green-600 mb-4" size={48} />
            <h4 className="text-lg font-bold text-slate-900 mb-2">Solicitação enviada!</h4>
            <p className="text-slate-600 text-sm mb-6">
              Recebemos seus dados e enviamos uma confirmação para o seu e-mail. Nossa equipe vai entrar em contato em breve.
            </p>
            <Button onClick={handleClose} className="bg-brand-600 hover:bg-brand-700 text-white border-brand-600">
              Fechar
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-1">Nome Completo</label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Seu nome"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-1">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-1">WhatsApp / Telefone</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="(00) 00000-0000"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-bold text-slate-700 mb-1">O que você precisa?</label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all resize-none"
                placeholder="Descreva brevemente (ex: instalação de câmara fria, conserto de balcão...)"
              />
            </div>

            {status === 'error' && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-100 text-red-700 text-sm rounded-sm p-3">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="pt-2">
              <Button
                type="submit"
                fullWidth
                disabled={status === 'sending'}
                className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white border-brand-600 disabled:opacity-60"
              >
                {status === 'sending' ? 'Enviando...' : 'Enviar Solicitação'}
                <Send size={18} />
              </Button>
              <p className="text-xs text-slate-500 text-center mt-3">
                Você recebe uma confirmação por e-mail e nossa equipe retorna em breve.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

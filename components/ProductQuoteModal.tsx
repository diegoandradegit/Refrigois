import React, { useState } from 'react';
import { X, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { Product } from '../types';
import { trackFormSubmit, getStoredUTMs } from '../utils/analytics';

interface ProductQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

export const ProductQuoteModal: React.FC<ProductQuoteModalProps> = ({ isOpen, onClose, product }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    deadline: ''
  });
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStatus('idle');
      setFormData({ name: '', email: '', phone: '', address: '', deadline: '' });
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
        body: JSON.stringify({
          ...formData,
          description: `Interesse no produto: ${product.title}. Prazo desejado: ${formData.deadline || 'não informado'}.`,
          productTitle: product.title,
          source: 'Modal de Produto',
          ...getStoredUTMs(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Não foi possível enviar sua solicitação.');
      }

      setStatus('success');
      trackFormSubmit('product_quote_modal', 'success', { item_name: product.title });
    } catch (err) {
      setStatus('error');
      const message = err instanceof Error ? err.message : 'Não foi possível enviar sua solicitação.';
      setErrorMsg(message);
      trackFormSubmit('product_quote_modal', 'error', { item_name: product.title, error_message: message });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      <div className="relative bg-white w-full max-w-lg rounded-sm shadow-2xl overflow-hidden animate-fade-in-up">
        <div className="bg-slate-900 px-6 py-4 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Interesse no Produto</h3>
          <button onClick={handleClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {status === 'success' ? (
          <div className="p-8 text-center">
            <CheckCircle2 className="mx-auto text-green-600 mb-4" size={48} />
            <h4 className="text-lg font-bold text-slate-900 mb-2">Solicitação enviada!</h4>
            <p className="text-slate-600 text-sm mb-6">
              Recebemos seu interesse em <strong>{product.title}</strong> e enviamos uma confirmação para o seu e-mail. Nossa equipe vai entrar em contato em breve.
            </p>
            <Button onClick={handleClose} className="bg-brand-600 hover:bg-brand-700 text-white border-brand-600">
              Fechar
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="mb-2 p-4 bg-brand-50 border border-brand-100 rounded-sm flex items-center">
              <div className="w-16 h-16 shrink-0 bg-white border border-slate-200 rounded-sm overflow-hidden mr-4">
                <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <p className="text-xs font-bold text-brand-600 uppercase tracking-wider mb-1">{product.category}</p>
                <h4 className="text-sm font-bold text-slate-900">{product.title}</h4>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <label htmlFor="address" className="block text-sm font-bold text-slate-700 mb-1">Endereço Completo</label>
              <input
                type="text"
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Rua, Número, Bairro, Cidade - UF"
              />
            </div>

            <div>
              <label htmlFor="deadline" className="block text-sm font-bold text-slate-700 mb-1">Prazo que precisa</label>
              <input
                type="text"
                id="deadline"
                name="deadline"
                required
                value={formData.deadline}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-slate-300 rounded-sm focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                placeholder="Ex: Para próxima semana, em 30 dias..."
              />
            </div>

            {status === 'error' && (
              <div className="flex items-start gap-2 bg-red-50 border border-red-100 text-red-700 text-sm rounded-sm p-3">
                <AlertCircle size={18} className="shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="pt-4">
              <Button
                type="submit"
                fullWidth
                disabled={status === 'sending'}
                className="flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white border-brand-600 py-3 disabled:opacity-60"
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

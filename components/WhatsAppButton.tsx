import React, { useState } from 'react';
import { MessageCircle, Bot, X } from 'lucide-react';
import { trackWhatsAppClick } from '../utils/analytics';
import { TiraDuvidas } from './TiraDuvidas';
import config from '../generated/configuracoes.json';

const WHATS = '5544999368420';
const MENSAGEM = encodeURIComponent(
  'Olá! Estou no site da Refrigois e gostaria de tirar dúvidas sobre serviços de refrigeração.'
);

/**
 * Botao flutuante de contato.
 *
 * Com o tira-duvidas ligado, um toque abre duas opcoes em vez de empilhar dois
 * botoes na tela: em celular, dois botoes fixos cobrem conteudo, e o site e
 * quase todo trafego movel.
 *
 * Com ele desligado no painel, o comportamento volta a ser exatamente o de
 * antes — um toque, WhatsApp direto.
 */
export const WhatsAppButton: React.FC = () => {
  const chatAtivo = Boolean((config as Record<string, unknown>).chat_ativo);
  const [aberto, setAberto] = useState(false);
  const [chat, setChat] = useState(false);

  const rotuloChat = (config as Record<string, unknown>).chat_titulo as string;
  const rotuloWhats = (config as Record<string, unknown>).whatsapp_titulo as string;

  if (!chatAtivo) {
    return (
      <a
        href={`https://wa.me/${WHATS}?text=${MENSAGEM}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick('floating_button')}
        className="fixed bottom-6 right-6 z-40 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="Conversar no WhatsApp"
      >
        <MessageCircle size={28} fill="white" className="text-green-600" />
        <span className="absolute right-full mr-3 bg-white text-slate-800 text-xs font-bold py-1 px-2 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Falar com Técnico
        </span>
      </a>
    );
  }

  return (
    <>
      {chat && <TiraDuvidas aoFechar={() => { setChat(false); setAberto(false); }} />}

      {!chat && (
        <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
          {aberto && (
            <>
              <button
                onClick={() => setChat(true)}
                className="flex items-center gap-2 bg-white text-slate-800 font-bold text-sm pl-4 pr-3 py-2.5 rounded-full shadow-lg border border-slate-200 hover:border-brand-400 transition-colors"
              >
                {rotuloChat}
                <span className="bg-brand-600 text-white p-1.5 rounded-full">
                  <Bot size={16} />
                </span>
              </button>

              <a
                href={`https://wa.me/${WHATS}?text=${MENSAGEM}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('floating_button')}
                className="flex items-center gap-2 bg-white text-slate-800 font-bold text-sm pl-4 pr-3 py-2.5 rounded-full shadow-lg border border-slate-200 hover:border-green-400 transition-colors"
              >
                {rotuloWhats}
                <span className="bg-green-600 text-white p-1.5 rounded-full">
                  <MessageCircle size={16} />
                </span>
              </a>
            </>
          )}

          <button
            onClick={() => setAberto((v) => !v)}
            aria-expanded={aberto}
            aria-label={aberto ? 'Fechar opções de contato' : 'Abrir opções de contato'}
            className={`p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center ${
              aberto ? 'bg-slate-800 text-white rotate-90' : 'bg-green-600 text-white hover:bg-green-700 hover:scale-110'
            }`}
          >
            {aberto ? <X size={28} /> : <MessageCircle size={28} fill="white" className="text-green-600" />}
          </button>
        </div>
      )}
    </>
  );
};

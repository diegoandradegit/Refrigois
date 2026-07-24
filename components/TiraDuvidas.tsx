import React, { useEffect, useRef, useState } from 'react';
import { X, Send, Phone } from 'lucide-react';
import config from '../generated/configuracoes.json';
import { trackWhatsAppClick } from '../utils/analytics';

interface Mensagem {
  de: 'pessoa' | 'assistente';
  texto: string;
  hora: string;
  /** Mostra o convite para o WhatsApp dentro da propria fala. */
  convite?: boolean;
}

const WHATS = '5544999368420';
const ASSISTENTE = 'https://mpdlwheqvggbfxkhbtqg.supabase.co/functions/v1/assistente';

function agora() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function sessaoAtual() {
  const chave = 'refrigois_chat_sessao';
  try {
    let s = sessionStorage.getItem(chave);
    if (!s) {
      s = crypto.randomUUID();
      sessionStorage.setItem(chave, s);
    }
    return s;
  } catch {
    return crypto.randomUUID();
  }
}

function linkWhatsApp(historico: Mensagem[]) {
  const ultimas = historico
    .filter((m) => m.de === 'pessoa')
    .slice(-3)
    .map((m) => m.texto)
    .join(' / ');

  const texto = ultimas
    ? `Olá! Estava no site da Refrigóis falando sobre: ${ultimas}`
    : 'Olá! Estou no site da Refrigóis e gostaria de tirar dúvidas.';

  return `https://wa.me/${WHATS}?text=${encodeURIComponent(texto)}`;
}

export const TiraDuvidas: React.FC<{ aoFechar: () => void }> = ({ aoFechar }) => {
  const saudacao = (config as Record<string, unknown>).chat_saudacao as string;
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    { de: 'assistente', texto: saudacao, hora: agora() },
  ]);
  const [texto, setTexto] = useState('');
  const [pensando, setPensando] = useState(false);
  const sessao = useRef(sessaoAtual());
  const fim = useRef<HTMLDivElement>(null);
  const campo = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fim.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens, pensando]);

  async function responder(pergunta: string) {
    const historico = mensagens.slice(-6).map((m) => ({ de: m.de, texto: m.texto }));
    setMensagens((m) => [...m, { de: 'pessoa', texto: pergunta, hora: agora() }]);
    setTexto('');
    setPensando(true);

    try {
      const r = await fetch(ASSISTENTE, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pergunta, historico, sessao: sessao.current }),
      });
      if (!r.ok) throw new Error('indisponivel');

      const dados = await r.json();
      if (!dados.resposta) throw new Error('sem resposta');

      setMensagens((m) => [
        ...m,
        {
          de: 'assistente',
          texto: dados.resposta,
          hora: agora(),
          // O convite so aparece quando o proprio assistente decide encaminhar
          convite: dados.proxima_acao === 'encaminhar_whatsapp',
        },
      ]);
    } catch {
      // Sem assistente, encaminha para a equipe. Responder por conta propria
      // com texto de FAQ so entregaria uma imitacao ruim de conversa.
      setMensagens((m) => [
        ...m,
        {
          de: 'assistente',
          texto:
            'Não consegui responder agora. Chama a equipe no WhatsApp que alguém te atende direto.',
          hora: agora(),
          convite: true,
        },
      ]);
    } finally {
      setPensando(false);
      campo.current?.focus();
    }
  }

  return (
    <div className="fixed inset-0 z-50 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[380px] sm:h-[580px] bg-white sm:rounded-xl sm:shadow-2xl flex flex-col overflow-hidden sm:border sm:border-slate-200">
      <header className="flex items-center gap-3 px-4 py-3 bg-slate-900 text-white shrink-0">
        <span className="w-9 h-9 rounded-full bg-brand-600 flex items-center justify-center font-bold text-sm shrink-0">
          R
        </span>
        <div className="flex-1 min-w-0">
          <span className="block font-bold text-sm leading-tight">Refrigóis</span>
          <span className="block text-[11px] text-emerald-400">online</span>
        </div>
        <a
          href={linkWhatsApp(mensagens)}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('chat_topo')}
          aria-label="Falar no WhatsApp"
          className="p-2 text-slate-300 hover:text-emerald-400 transition-colors"
        >
          <Phone size={18} />
        </a>
        <button onClick={aoFechar} aria-label="Fechar" className="p-1 text-slate-300 hover:text-white">
          <X size={20} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-2 bg-slate-50">
        {mensagens.map((m, i) => (
          <div key={i} className={m.de === 'pessoa' ? 'flex justify-end' : 'flex justify-start'}>
            <div className="max-w-[80%]">
              <div
                className={`px-3.5 py-2 text-sm leading-relaxed whitespace-pre-line ${
                  m.de === 'pessoa'
                    ? 'bg-brand-600 text-white rounded-2xl rounded-br-sm'
                    : 'bg-white text-slate-800 rounded-2xl rounded-bl-sm shadow-sm'
                }`}
              >
                {m.texto}
                <span
                  className={`block text-right text-[10px] mt-1 ${
                    m.de === 'pessoa' ? 'text-brand-200' : 'text-slate-400'
                  }`}
                >
                  {m.hora}
                </span>
              </div>

              {m.convite && (
                <a
                  href={linkWhatsApp(mensagens)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('chat_convite')}
                  className="mt-1.5 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold py-2 px-4 rounded-full"
                >
                  <Phone size={15} /> Chamar no WhatsApp
                </a>
              )}
            </div>
          </div>
        ))}

        {pensando && (
          <div className="flex justify-start">
            <div className="flex gap-1 px-4 py-3 bg-white rounded-2xl rounded-bl-sm shadow-sm">
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.15s]" />
              <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.3s]" />
            </div>
          </div>
        )}

        <div ref={fim} />
      </div>

      <div className="flex items-center gap-2 px-3 py-3 bg-white border-t border-slate-100 shrink-0">
        <input
          ref={campo}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && !pensando && texto.trim() && responder(texto.trim())}
          placeholder="Mensagem"
          className="flex-1 px-4 py-2.5 bg-slate-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <button
          onClick={() => texto.trim() && responder(texto.trim())}
          disabled={!texto.trim() || pensando}
          aria-label="Enviar"
          className="bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white w-10 h-10 rounded-full flex items-center justify-center shrink-0"
        >
          <Send size={17} />
        </button>
      </div>
    </div>
  );
};

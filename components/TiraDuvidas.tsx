import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Send, ArrowRight, Bot } from 'lucide-react';
import perguntas from '../generated/perguntas.json';
import config from '../generated/configuracoes.json';
import { trackWhatsAppClick } from '../utils/analytics';

interface Pergunta {
  q: string;
  a: string;
  origem: string;
  url: string;
}

interface Mensagem {
  de: 'pessoa' | 'assistente';
  texto: string;
  fonte?: { origem: string; url: string };
  sugestoes?: Pergunta[];
}

const BASE = perguntas as Pergunta[];

/** Tira acento e pontuacao para a busca nao depender de digitacao exata. */
function normalizar(t: string) {
  return t
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Palavras que aparecem em quase toda pergunta e nao ajudam a distinguir.
const VAZIAS = new Set([
  'a','o','as','os','de','da','do','das','dos','e','em','no','na','nos','nas',
  'um','uma','para','por','com','que','qual','quais','como','meu','minha','se',
  'ou','ao','aos','the','muito','mais','ja','tem','ter','pode','posso','preciso',
  'vocês','voces','eu','isso','esse','essa','sobre',
]);

function palavras(t: string) {
  return normalizar(t).split(' ').filter((p) => p.length > 2 && !VAZIAS.has(p));
}

/**
 * Compara pelo inicio da palavra, para "chopeira" encontrar "chope" e
 * "camaras" encontrar "camara". Comparar palavra inteira fazia a busca
 * depender de o visitante escrever exatamente como esta escrito na FAQ.
 */
function combina(termo: string, texto: string) {
  const raiz = termo.slice(0, Math.max(4, termo.length - 2));
  return texto.split(' ').some((p) => {
    if (p.startsWith(raiz)) return true;
    // A comparacao inversa so vale para palavra longa: com palavra curta o
    // prefixo fica generico demais e passa a casar com quase tudo.
    if (p.length < 5) return false;
    return termo.startsWith(p.slice(0, Math.max(4, p.length - 2)));
  });
}

/**
 * Perguntas sobre preco, prazo e orcamento tem resposta propria e nao devem
 * cair na FAQ mais parecida. Antes, "quanto custa uma camara fria" respondia
 * sobre camara que nao gela — o pior tipo de erro, porque parece resposta.
 */
const INTENCOES: { termos: RegExp; pergunta: string }[] = [
  { termos: /\b(custa|custo|preco|precos|valor|valores|quanto|orcament|barato)/, pergunta: 'Quanto custa' },
  { termos: /\b(prazo|demora|tempo de entrega|entrega em)/, pergunta: 'Qual o prazo de entrega' },
  { termos: /\b(garantia|garante)/, pergunta: 'garantia' },
  // Intencao de compra: quem diz "preciso de uma camara" nao quer FAQ de
  // manutencao, quer falar com alguem.
  { termos: /\b(preciso de|quero (um|uma|comprar)|gostaria de (um|uma)|comprar|adquirir|fazer um orcament)/, pergunta: 'Como peço um orçamento' },
];

/**
 * Busca as perguntas mais parecidas.
 *
 * Peso maior para acerto no titulo da pergunta, menor na resposta e no nome do
 * item de origem — quem pergunta usa as palavras do titulo mais que as do corpo.
 *
 * O corte por pontuacao minima existe para o chat admitir que nao sabe em vez
 * de devolver a resposta menos errada. "Voces atendem em Cascavel" achando
 * "Voces atendem emergencia?" e pior do que nao achar nada.
 */
function buscar(texto: string, limite = 3): Pergunta[] {
  const termos = palavras(texto);
  if (!termos.length) return [];

  // Intencao explicita tem precedencia sobre semelhanca de palavras
  const normalizado = normalizar(texto);
  for (const intencao of INTENCOES) {
    if (intencao.termos.test(normalizado)) {
      const direta = BASE.filter((i) => normalizar(i.q).includes(normalizar(intencao.pergunta)));
      if (direta.length) return direta.slice(0, limite);
    }
  }

  const pontuadas = BASE.map((item) => {
    const naPergunta = normalizar(item.q);
    const naResposta = normalizar(item.a);
    const naOrigem = normalizar(item.origem);

    let pontos = 0;
    let acertos = 0;
    for (const t of termos) {
      if (combina(t, naPergunta)) { pontos += 3; acertos++; }
      else if (combina(t, naOrigem)) { pontos += 2; acertos++; }
      else if (combina(t, naResposta)) { pontos += 1; acertos++; }
    }
    return { item, pontos, acertos };
  });

  // Precisa acertar pelo menos metade dos termos da pergunta — e nunca menos
  // de dois quando a pergunta tem varios.
  // Pergunta curta pode ter um acerto so; a partir de tres termos passa a
  // exigir metade, para nao devolver a resposta menos errada.
  const minimo = termos.length <= 2 ? 1 : Math.ceil(termos.length / 2);

  return pontuadas
    .filter((x) => x.acertos >= minimo)
    .sort((a, b) => b.pontos - a.pontos || b.acertos - a.acertos)
    .slice(0, limite)
    .map((x) => x.item);
}

const WHATS = '5544999368420';

function linkWhatsApp(historico: Mensagem[]) {
  const ultimas = historico
    .filter((m) => m.de === 'pessoa')
    .slice(-3)
    .map((m) => m.texto)
    .join(' / ');

  const texto = ultimas
    ? `Olá! Estava no site da Refrigóis tirando dúvidas sobre: ${ultimas}`
    : 'Olá! Estou no site da Refrigóis e gostaria de tirar dúvidas.';

  return `https://wa.me/${WHATS}?text=${encodeURIComponent(texto)}`;
}

export const TiraDuvidas: React.FC<{ aoFechar: () => void }> = ({ aoFechar }) => {
  const saudacao = (config as Record<string, unknown>).chat_saudacao as string;
  const [mensagens, setMensagens] = useState<Mensagem[]>([
    { de: 'assistente', texto: saudacao },
  ]);
  const [texto, setTexto] = useState('');
  const fim = useRef<HTMLDivElement>(null);

  // Sugestoes iniciais: as perguntas mais comuns, para quem nao sabe o que perguntar
  const iniciais = useMemo(() => BASE.slice(0, 4), []);

  useEffect(() => {
    fim.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mensagens]);

  function responder(pergunta: string) {
    const achadas = buscar(pergunta);
    const novas: Mensagem[] = [{ de: 'pessoa', texto: pergunta }];

    if (achadas.length === 0) {
      novas.push({
        de: 'assistente',
        texto:
          'Não encontrei essa resposta no que já está publicado aqui. ' +
          'Para essa dúvida, o melhor caminho é falar com a equipe pelo WhatsApp — ' +
          'assim alguém que executa te responde direto.',
      });
    } else {
      const [melhor, ...outras] = achadas;
      novas.push({
        de: 'assistente',
        texto: melhor.a,
        fonte: { origem: melhor.origem, url: melhor.url },
        sugestoes: outras,
      });
    }
    setMensagens((m) => [...m, ...novas]);
    setTexto('');
  }

  return (
    <div className="fixed inset-0 z-50 sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[380px] sm:h-[560px] bg-white sm:rounded-lg sm:shadow-2xl flex flex-col sm:border sm:border-slate-200">
      <header className="flex items-center gap-3 px-4 py-3 bg-slate-900 text-white sm:rounded-t-lg shrink-0">
        <Bot size={20} className="text-brand-400 shrink-0" />
        <div className="flex-1 min-w-0">
          <span className="block font-bold text-sm leading-tight">Assistente Refrigóis</span>
          <span className="block text-[11px] text-slate-400">Respostas do próprio site</span>
        </div>
        <button onClick={aoFechar} aria-label="Fechar" className="text-slate-300 hover:text-white">
          <X size={20} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {mensagens.map((m, i) => (
          <div key={i}>
            <div
              className={`max-w-[85%] px-3.5 py-2.5 rounded-lg text-sm leading-relaxed ${
                m.de === 'pessoa'
                  ? 'ml-auto bg-brand-600 text-white'
                  : 'bg-slate-100 text-slate-800'
              }`}
            >
              {m.texto}
            </div>

            {m.fonte && (
              <Link
                to={m.fonte.url}
                onClick={aoFechar}
                className="inline-flex items-center gap-1 mt-1.5 text-xs font-bold text-brand-600 hover:text-brand-800"
              >
                Ler mais em {m.fonte.origem} <ArrowRight size={12} />
              </Link>
            )}

            {m.sugestoes && m.sugestoes.length > 0 && (
              <div className="mt-2 space-y-1.5">
                <span className="block text-[11px] text-slate-400">Também pode ajudar:</span>
                {m.sugestoes.map((s) => (
                  <button
                    key={s.q}
                    onClick={() => responder(s.q)}
                    className="block w-full text-left text-xs text-slate-700 bg-white border border-slate-200 hover:border-brand-400 rounded px-2.5 py-1.5"
                  >
                    {s.q}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}

        {mensagens.length === 1 && (
          <div className="space-y-1.5 pt-1">
            <span className="block text-[11px] text-slate-400">Perguntas comuns:</span>
            {iniciais.map((p) => (
              <button
                key={p.q}
                onClick={() => responder(p.q)}
                className="block w-full text-left text-xs text-slate-700 bg-white border border-slate-200 hover:border-brand-400 rounded px-2.5 py-1.5"
              >
                {p.q}
              </button>
            ))}
          </div>
        )}

        <div ref={fim} />
      </div>

      {/* O WhatsApp fica sempre visivel: o chat nunca vira barreira entre o
          visitante e uma pessoa de verdade. */}
      <a
        href={linkWhatsApp(mensagens)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick('tira_duvidas')}
        className="flex items-center justify-center gap-2 mx-4 mb-2 py-2 text-sm font-bold text-green-700 bg-green-50 border border-green-200 rounded-md hover:bg-green-100 shrink-0"
      >
        Falar com um técnico no WhatsApp
      </a>

      <div className="flex gap-2 px-4 pb-4 shrink-0">
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && texto.trim() && responder(texto.trim())}
          placeholder="Escreva sua dúvida"
          className="flex-1 px-3 py-2.5 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
        <button
          onClick={() => texto.trim() && responder(texto.trim())}
          disabled={!texto.trim()}
          aria-label="Enviar"
          className="bg-brand-600 hover:bg-brand-700 disabled:opacity-40 text-white px-3.5 rounded-md"
        >
          <Send size={17} />
        </button>
      </div>
    </div>
  );
};

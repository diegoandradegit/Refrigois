import { Check, AlertTriangle, Lightbulb } from 'lucide-react';
import type { ArticleBlock } from '../types';

/**
 * Renderiza uma lista de blocos de conteudo (paragrafo, lista, tabela, imagem,
 * callout) — o mesmo formato do corpo dos artigos. Extraido para ser usado
 * tanto no blog quanto nas paginas de servico, mantendo o visual identico.
 */
export function BlocosConteudo({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <div key={i} className="mb-8">
          {block.heading && (
            <h2 className="text-2xl font-bold text-slate-900 mb-4 scroll-mt-24">{block.heading}</h2>
          )}

          {block.paragraphs?.map((p, j) => (
            <p key={j} className="text-slate-700 leading-relaxed mb-4">{p}</p>
          ))}

          {block.list && (
            <div className="mb-4">
              {block.list.title && (
                <p className="font-bold text-slate-900 mb-3">{block.list.title}</p>
              )}
              {block.list.ordered ? (
                <ol className="space-y-3">
                  {block.list.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-slate-700 leading-relaxed">
                      <span className="shrink-0 w-6 h-6 rounded-full bg-brand-600 text-white text-xs font-bold flex items-center justify-center mt-0.5">
                        {j + 1}
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
              ) : (
                <ul className="space-y-2.5">
                  {block.list.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-slate-700 leading-relaxed">
                      <Check size={17} className="text-brand-600 shrink-0 mt-1" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {block.table && (
            <figure className="mb-4">
              <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
                <table className="w-full min-w-[480px] text-sm border border-slate-200 rounded-sm overflow-hidden">
                  <thead>
                    <tr className="bg-slate-100">
                      {block.table.headers.map((h, j) => (
                        <th key={j} className="text-left font-bold text-slate-900 px-3 py-2.5 border-b border-slate-200">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.table.rows.map((row, j) => (
                      <tr key={j} className={j % 2 ? 'bg-slate-50' : 'bg-white'}>
                        {row.map((cell, k) => (
                          <td key={k} className="px-3 py-2.5 text-slate-700 border-b border-slate-100 align-top">
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {block.table.caption && (
                <figcaption className="text-xs text-slate-500 mt-2 italic">{block.table.caption}</figcaption>
              )}
            </figure>
          )}

          {block.image && (
            <figure className="mb-4">
              <img
                src={block.image.src}
                alt={block.image.alt}
                width={1200}
                height={800}
                loading="lazy"
                decoding="async"
                className="w-full rounded-sm border border-slate-200"
              />
              {block.image.caption && (
                <figcaption className="text-sm text-slate-500 mt-2 italic">{block.image.caption}</figcaption>
              )}
            </figure>
          )}

          {block.callout && (
            <div
              className={`mb-4 p-5 rounded-sm border-l-4 ${
                block.callout.kind === 'atencao'
                  ? 'bg-amber-50 border-amber-500'
                  : 'bg-slate-50 border-brand-500'
              }`}
            >
              <p className="flex items-center gap-2 font-bold text-slate-900 mb-1.5">
                {block.callout.kind === 'atencao' ? (
                  <AlertTriangle size={17} className="text-amber-600 shrink-0" />
                ) : (
                  <Lightbulb size={17} className="text-brand-600 shrink-0" />
                )}
                {block.callout.title}
              </p>
              <p className="text-slate-700 leading-relaxed text-sm md:text-base">{block.callout.text}</p>
            </div>
          )}
        </div>
      ))}
    </>
  );
}

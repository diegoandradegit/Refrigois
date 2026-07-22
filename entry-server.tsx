// Entrada usada pelo build para gerar o HTML de cada pagina.
//
// Sem isto, o arquivo publicado chegava com o <body> vazio: as meta tags e os
// schemas estavam la, mas todo o texto visivel so aparecia depois que o
// navegador executava o JavaScript. Rastreador que nao executa JavaScript
// — varios assistentes de IA, por exemplo — via uma pagina em branco.

import React from 'react';
import { renderToReadableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { AppContent } from './App';

export async function render(url: string): Promise<string> {
  const stream = await renderToReadableStream(
    <StaticRouter location={url}>
      <AppContent />
    </StaticRouter>
  );

  // allReady espera as paginas carregadas sob demanda (React.lazy) ficarem
  // prontas antes de ler o resultado. Sem isso o HTML sairia com o indicador
  // de carregamento no lugar do conteudo.
  await stream.allReady;

  const partes: string[] = [];
  const decoder = new TextDecoder();
  for await (const pedaco of stream as unknown as AsyncIterable<Uint8Array>) {
    partes.push(decoder.decode(pedaco, { stream: true }));
  }
  return partes.join('');
}

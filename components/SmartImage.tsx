import React from 'react';
import variantes from '../generated/variantes.json';

/**
 * Imagem responsiva do portfólio.
 *
 * As variantes .webp (640 e 1280 de largura) são versionadas junto com os
 * originais em public/images/projetos/ — NÃO são geradas no build. Isso é
 * proposital: com <picture>, se o navegador suporta WebP ele usa a URL do
 * <source> e, se esse arquivo não existir, a imagem simplesmente não carrega
 * — o <img> de baixo NÃO é usado como fallback de erro 404, só de formato
 * não suportado. Depender do build para gerar essas variantes já quebrou a
 * galeria uma vez. Arquivo versionado é arquivo que existe.
 *
 * Fotos enviadas pelo painel já chegam em .webp otimizado e NÃO têm variantes.
 * Para elas o <picture> é desligado automaticamente — sem isso, o srcSet
 * apontaria para "foto.webp-1280.webp", que não existe, e a imagem quebrava.
 *
 * width/height são obrigatórios: sem eles o navegador não reserva o espaço da
 * imagem e a página "pula" enquanto carrega (CLS, uma das métricas de Core
 * Web Vitals).
 */

interface SmartImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  /** true apenas na imagem principal acima da dobra (LCP). */
  priority?: boolean;
  sizes?: string;
  /** Desliga o <picture> e usa só o original — para imagens sem variantes. */
  noWebp?: boolean;
}

const WIDTHS = [640, 1280];

function buildSrcSet(src: string) {
  const withoutExt = src.replace(/\.(jpe?g|png)$/i, '');
  return WIDTHS.map((w) => `${withoutExt}-${w}.webp ${w}w`).join(', ');
}

/** Imagens que possuem as versoes -640.webp e -1280.webp geradas. */
const VARIANTES = new Set(variantes as string[]);

export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px',
  noWebp = false,
}) => {
  const img = (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : 'auto'}
      decoding={priority ? 'sync' : 'async'}
    />
  );

  // Imagem que já é .webp não tem variantes: usar <picture> aqui apontaria
  // para um arquivo inexistente e a imagem não carregaria.
  const jaEhWebp = /\.webp(\?|$)/i.test(src);

  // So usa <picture> para imagem que realmente tem variante gerada. O registro
  // e escrito pelo scripts/gerar-variantes.js durante o build. Sem essa
  // checagem, o <source> apontaria para arquivo inexistente e a imagem nao
  // carregaria — foi o que aconteceu com as fotos do catalogo de produtos.
  const temVariante = VARIANTES.has(src.split('?')[0]);
  if (noWebp || jaEhWebp || !temVariante) return img;

  return (
    <picture>
      <source type="image/webp" srcSet={buildSrcSet(src)} sizes={sizes} />
      {img}
    </picture>
  );
};

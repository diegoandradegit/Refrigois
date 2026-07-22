import React from 'react';

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

  if (noWebp) return img;

  return (
    <picture>
      <source type="image/webp" srcSet={buildSrcSet(src)} sizes={sizes} />
      {img}
    </picture>
  );
};

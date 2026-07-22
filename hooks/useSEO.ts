import { useEffect } from 'react';
import { trackPageView } from '../utils/analytics';

interface SEOProps {
  title: string;
  description: string;
  path?: string; // e.g. '/servicos' - defaults to current location
  image?: string;
  type?: 'website' | 'article' | 'product';
  noindex?: boolean; // quando true, adiciona <meta name="robots" content="noindex, follow">
}

const SITE_NAME = 'Refrigóis';
const SITE_URL = 'https://refrigois.com.br';
const DEFAULT_IMAGE = `${SITE_URL}/og/home.jpg`;

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLinkTag(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Atualiza title, meta description, canonical e Open Graph/Twitter a cada
 * troca de página do SPA. Necessário porque o React Router não recarrega
 * o index.html, então sem isso todas as rotas ficam com o mesmo <title>
 * e <meta description> (péssimo para SEO e para IAs que leem meta tags).
 */
export function useSEO({ title, description, path, image, type = 'website', noindex = false }: SEOProps) {
  useEffect(() => {
    const fullTitle = `${title} | ${SITE_NAME}`;
    const url = `${SITE_URL}${path ?? window.location.pathname}`;
    const img = image ?? DEFAULT_IMAGE;

    document.title = fullTitle;

    setMetaTag('name', 'description', description);
    setMetaTag('name', 'robots', noindex ? 'noindex, follow' : 'index, follow');
    setLinkTag('canonical', url);

    setMetaTag('property', 'og:title', fullTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', url);
    setMetaTag('property', 'og:image', img);
    setMetaTag('property', 'og:type', type);
    setMetaTag('property', 'og:site_name', SITE_NAME);
    setMetaTag('property', 'og:locale', 'pt_BR');

    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', fullTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', img);

    // GA4: envia o pageview manualmente a cada troca de rota do SPA (ver
    // comentário completo em utils/analytics.ts e no snippet do index.html).
    trackPageView(path ?? window.location.pathname, fullTitle);
  }, [title, description, path, image, type]);
}

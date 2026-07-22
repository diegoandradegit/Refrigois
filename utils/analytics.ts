// Módulo central de medição (GA4) da Refrigóis.
//
// Tudo que dispara um evento pro Google Analytics passa por aqui — é a
// única fonte de verdade pra nomes de evento e nomes de parâmetro, pra
// nunca divergir entre componentes (ex.: um lugar mandando "whatsapp_click"
// e outro "whatsApp_Click", o que quebraria os relatórios no GA4).
//
// CONVENÇÃO DE NOMENCLATURA
// - Eventos: snake_case, verbo no final quando fizer sentido (ex.: form_submit)
// - Parâmetros: snake_case
// - Valores de local (link_location): snake_case, descreve ONDE na página
//   o clique aconteceu (floating_button, header_desktop, contact_page...)
// - Nunca usar acento ou espaço em nomes de evento/parâmetro (o GA4 aceita,
//   mas dificulta escrever queries e comparar com a doc oficial)

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

const SITE_URL = 'https://refrigois.com.br';

// ─────────────────────────────────────────────────────────────────────────
// UTM — captura e persistência por sessão
// ─────────────────────────────────────────────────────────────────────────
// Convenção de UTM da Refrigóis (usar sempre nesse formato ao criar links):
//
//   Canal                        utm_source   utm_medium   utm_campaign (exemplo)
//   Google Meu Negócio (GBP)     gbp          organic      perfil_empresarial
//   Instagram — bio              instagram    social       bio
//   Instagram — post             instagram    social       post_<assunto>
//   Instagram — stories          instagram    social       stories_<data>
//   WhatsApp Business (link)     whatsapp     direct       cartao_visita
//   Google Ads (futuro)          google       cpc          <nome_da_campanha>
//   Meta Ads (futuro)            facebook     cpc          <nome_da_campanha>
//   E-mail marketing (futuro)    email        email        <nome_do_disparo>
//
// Exemplo de link pronto pra colar na bio do Instagram:
//   https://refrigois.com.br/?utm_source=instagram&utm_medium=social&utm_campaign=bio
//
// O GA4 já atribui a sessão automaticamente pelos parâmetros utm_* presentes
// na URL de entrada — isso não depende de código. O que fazemos aqui é só
// GUARDAR esses valores na sessão do navegador para poder anexá-los como
// contexto extra nos eventos de lead (formulário/WhatsApp/telefone), o que
// ajuda a cruzar "de onde veio o contato" mesmo em relatórios fora do GA4
// (por exemplo, dentro do e-mail que a equipe recebe).

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'] as const;
type UtmKey = (typeof UTM_KEYS)[number];
type UtmData = Partial<Record<UtmKey, string>>;

const UTM_STORAGE_KEY = 'refrigois_utm';

/**
 * Lê os utm_* da URL atual (se houver) e persiste em sessionStorage, para
 * que continuem disponíveis mesmo depois que o visitante navega para outra
 * rota do SPA (onde a URL não carrega mais os parâmetros originais).
 * Chamar uma única vez, no bootstrap da aplicação (index.tsx).
 */
export function captureUTMs(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const found: UtmData = {};
    let hasAny = false;

    UTM_KEYS.forEach((key) => {
      const value = params.get(key);
      if (value) {
        found[key] = value;
        hasAny = true;
      }
    });

    if (hasAny) {
      // Nova visita com UTM novo sobrescreve a anterior — é a mais recente
      // que deve "levar o crédito" pelo contato gerado nesta sessão.
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(found));
    }
  } catch {
    // sessionStorage pode falhar em modo privado/restrito — não é crítico
  }
}

/** Retorna os UTMs guardados nesta sessão (ou objeto vazio se não houver). */
export function getStoredUTMs(): UtmData {
  try {
    const raw = sessionStorage.getItem(UTM_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as UtmData) : {};
  } catch {
    return {};
  }
}

// ─────────────────────────────────────────────────────────────────────────
// Base — envio de eventos pro dataLayer/gtag
// ─────────────────────────────────────────────────────────────────────────

function gtagAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

/** Envia um evento genérico pro GA4. Uso interno — prefira as funções
 * nomeadas abaixo (trackWhatsAppClick, trackFormSubmit etc.) em vez de
 * chamar trackEvent diretamente, para manter a nomenclatura consistente. */
export function trackEvent(eventName: string, params: Record<string, unknown> = {}): void {
  if (!gtagAvailable()) return;
  window.gtag('event', eventName, params);
}

// ─────────────────────────────────────────────────────────────────────────
// Page view — chamado pelo hook useSEO a cada troca de rota do SPA
// ─────────────────────────────────────────────────────────────────────────
// Necessário porque o gtag.js só dispara page_view automaticamente no
// carregamento inicial da página. Como este é um SPA (React Router), sem
// isso todas as navegações internas ficariam invisíveis pro GA4 — o
// relatório mostraria só 1 pageview por sessão, não importa quantas
// páginas a pessoa visitou. Por isso o gtag('config', ...) no index.html
// é inicializado com send_page_view: false, e cada troca de rota dispara
// esse evento manualmente com o path e o title corretos.
export function trackPageView(path: string, title: string): void {
  if (!gtagAvailable()) return;
  window.gtag('event', 'page_view', {
    page_location: `${SITE_URL}${path}`,
    page_path: path,
    page_title: title,
  });
}

// ─────────────────────────────────────────────────────────────────────────
// WhatsApp
// ─────────────────────────────────────────────────────────────────────────
// link_location: onde o botão/link está — usar sempre um destes valores
// para manter os relatórios comparáveis:
//   'floating_button' | 'header' | 'contact_page' | 'sales_popup' |
//   'product_modal' | 'footer'
export function trackWhatsAppClick(linkLocation: string, extra: Record<string, unknown> = {}): void {
  trackEvent('whatsapp_click', {
    link_location: linkLocation,
    page_path: window.location.pathname,
    ...getStoredUTMs(),
    ...extra,
  });
}

// ─────────────────────────────────────────────────────────────────────────
// Telefone
// ─────────────────────────────────────────────────────────────────────────
export function trackPhoneClick(linkLocation: string): void {
  trackEvent('phone_click', {
    link_location: linkLocation,
    page_path: window.location.pathname,
    ...getStoredUTMs(),
  });
}

// ─────────────────────────────────────────────────────────────────────────
// Modal de orçamento — abertura (intenção) e formulário (submissão)
// ─────────────────────────────────────────────────────────────────────────
// link_location: de onde o modal foi aberto — usar:
//   'header_desktop' | 'header_mobile' | 'contact_page' | 'sales_popup' |
//   'service_page' | 'product_page' | 'segment_page' | 'blog_post'
export function trackQuoteModalOpen(linkLocation: string): void {
  trackEvent('quote_modal_open', {
    link_location: linkLocation,
    page_path: window.location.pathname,
    ...getStoredUTMs(),
  });
}

// form_name: identifica QUAL formulário — usar:
//   'quote_modal' | 'product_quote_modal'
export function trackFormSubmit(
  formName: string,
  status: 'success' | 'error',
  extra: Record<string, unknown> = {}
): void {
  trackEvent('form_submit', {
    form_name: formName,
    status,
    page_path: window.location.pathname,
    ...getStoredUTMs(),
    ...extra,
  });

  // generate_lead é um evento recomendado do GA4 (usado por padrão em
  // relatórios e sugerido pra conversão) — disparado só quando o envio
  // deu certo, que é o momento real de geração do lead.
  if (status === 'success') {
    trackEvent('generate_lead', {
      form_name: formName,
      currency: 'BRL',
      page_path: window.location.pathname,
      ...getStoredUTMs(),
      ...extra,
    });
  }
}

// ─────────────────────────────────────────────────────────────────────────
// Pop-up de vendas (SalesPopup)
// ─────────────────────────────────────────────────────────────────────────
// trigger_type: 'timer' (apareceu após 15s) | 'exit_intent' (mouse saindo)
export function trackSalesPopupShown(triggerType: 'timer' | 'exit_intent'): void {
  trackEvent('sales_popup_shown', {
    trigger_type: triggerType,
    page_path: window.location.pathname,
  });
}

export function trackSalesPopupClose(): void {
  trackEvent('sales_popup_close', { page_path: window.location.pathname });
}

export function trackSalesPopupCTAClick(): void {
  trackEvent('sales_popup_cta_click', { page_path: window.location.pathname });
}

// ─────────────────────────────────────────────────────────────────────────
// CTA genérico — para cliques que não se encaixam nas categorias acima
// ─────────────────────────────────────────────────────────────────────────
export function trackCTAClick(ctaLabel: string, linkLocation: string): void {
  trackEvent('cta_click', {
    cta_label: ctaLabel,
    link_location: linkLocation,
    page_path: window.location.pathname,
  });
}

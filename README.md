# Refrigóis — Site institucional

Site em React + Vite, pré-renderizado (SEO) e otimizado para posicionamento
orgânico no Google. Domínio oficial: https://refrigois.com.br

## Como rodar localmente

```bash
npm install
npm run dev       # servidor de desenvolvimento (localhost:3000)
```

## Como gerar o site para publicar

```bash
npm run build     # gera a pasta dist/ com todas as páginas pré-renderizadas
```

O comando `build` roda o Vite e depois o script `scripts/prerender.js`, que
gera um HTML estático para cada rota (com meta tags e schema JSON-LD) na pasta
`dist/`.

## Publicação (Netlify)

O deploy é feito arrastando o **conteúdo da pasta `dist/`** no painel do Netlify.
O `netlify.toml` já inclui a função serverless de e-mail e o redirect de SPA.

⚠️ A função de e-mail (`netlify/functions/send-quote.mjs`) precisa da variável
de ambiente `RESEND_API_KEY` configurada no painel do Netlify.

## Onde editar cada coisa

- **Serviços e produtos**: `data.ts`
- **Blog (artigos)**: `blogData.ts`
- **Soluções por segmento**: `segmentsData.ts`
- **Imagens**: `public/images/` — organizadas por pasta (servicos, produtos,
  projetos, blog, solucoes). Para trocar por uma foto real, basta substituir o
  arquivo pelo mesmo nome, sem mexer no código.
- **Página link-in-bio** (`/link`): `public/link/index.html` (HTML estático puro)
- **E-mail dos formulários**: `netlify/functions/send-quote.mjs`

## Estrutura de rotas

- `/` — Home
- `/servicos`, `/servicos/:categoria`, `/servicos/:categoria/:servico`
- `/produtos`, `/produtos/:slug`
- `/solucoes`, `/solucoes/:segmento`
- `/blog`, `/blog/pagina/:n`, `/blog/categoria/:cat`, `/blog/categoria/:cat/pagina/:n`, `/blog/:slug`
- `/projetos`, `/contato`
- `/link` — cartão digital (bio do Instagram)

## SEO

- `scripts/prerender.js` — gera HTML estático + schema (Service, BlogPosting,
  BreadcrumbList, FAQPage) por rota
- `public/sitemap.xml`, `public/robots.txt`, `public/llms.txt`
- Tailwind compilado no build (não usa CDN)

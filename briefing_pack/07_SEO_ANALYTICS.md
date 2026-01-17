# 07 — SEO, SOCIAL E ANALYTICS (mínimo bem feito)

## SEO técnico
- `metadata` por página (title/description)
- canonical URL
- OpenGraph + Twitter cards
- sitemap.xml
- robots.txt
- RSS (/rss.xml)

## OG Images (assinatura monocromática)
- Gerar OG automaticamente (ex.: @vercel/og) com:
  - fundo degradê cinza
  - grid leve
  - título do post
  - “v1 torres” no rodapé
- Evitar imagens pesadas em runtime: gerar no build quando possível.

## Analytics (opcional)
Preferir privacy-first:
- Plausible / Umami (self-host opcional)
Se usar Vercel Analytics, ok (baixo atrito).
Regra: não bloquear performance e não coletar dados sensíveis.

## Newsletter (opcional)
- Resend + formulário simples
- Double opt-in
- Sem “pop-up agressivo”

# 04 — ARQUITETURA, INFRA E DEPLOY

## Decisão (recomendada)
**Next.js (App Router) + MDX no Git + deploy na Vercel + DNS na Cloudflare.**

Por quê:
- Conteúdo versionado (Git = histórico/auditabilidade).
- Performance e DX bons (ISR/SSG).
- Infra mínima (custo baixo) e escala “de graça”.
- Dá para plugar features “de produto” (⌘K, OG images dinâmicas, search local).

---

## 1) Stack (MVP)
### Frontend
- Next.js (App Router) + TypeScript
- TailwindCSS + shadcn/ui (componentes base)
- Font: Geist Mono (primary)

### Conteúdo
- MDX em `/content`
- Validação de frontmatter com Zod
- Syntax highlight: Shiki (via rehype)
- Mermaid para diagramas (` ```mermaid `)
- KaTeX para matemática (econometria/estatística)

### Busca
- Index local (build-time) com FlexSearch / Orama
- Command palette (⌘K) consumindo esse index

### Qualidade
- ESLint + Prettier
- Vitest (mínimo: utils e render de conteúdo)
- Playwright (smoke: home + post + project)

---

## 2) Modelagem de conteúdo (data contracts)
### Tipos principais
- `post`: { title, date, tags[], summary, readingTime, canonical?, draft? }
- `project`: { title, status, period, stack[], outcomes[], links{repo,demo,writeup}, metrics[] }
- `note`: { title, date, tags[], summary }

Regras:
- `tags` controladas (evitar 200 tags)
- `series` opcional (um post pertence a uma série)
- `slug` derivado do path
- `draft: true` não publica em produção

---

## 3) Roteamento (IA / URLs)
- `/` (home)
- `/blog` + `/blog/[slug]`
- `/projects` + `/projects/[slug]`
- `/notes` + `/notes/[slug]`
- `/about`
- `/now`
- `/rss.xml`, `/sitemap.xml`

---

## 4) Infra (produção)
### Opção A — Vercel (recomendada)
- GitHub → Vercel (preview por PR)
- SSG/ISR para posts
- Edge middleware só se realmente precisar (evitar)

### DNS — Cloudflare
- DNS + SSL + redirect www→root (ou o contrário)
- HSTS
- Cache padrão (sem mexer demais)

### Observabilidade mínima (custo/benefício)
- Sentry (frontend errors)
- Vercel Analytics (web vitals)
- Uptime (Better Stack / UptimeRobot)

---

## 5) “Área Lab” (opcional — para mostrar infra/DevOps de verdade)
Se você quiser provar musculatura (sem inflar custo do blog):
- `/lab` com demos interativas
- Backend separado (quando precisar):
  - **FastAPI** em AWS Lambda (API Gateway) ou ECS Fargate
  - Armazenamento de artefatos: S3 (Parquet/JSON), com versionamento
  - Jobs: GitHub Actions cron ou EventBridge
  - Logs: CloudWatch + alarmes

**Critério:** só criar backend se o demo exigir (ex.: embeddings, rotas, geoprocessamento).

---

## 6) CI/CD (mínimo)
### GitHub Actions
- lint + typecheck + tests
- build (preview já fica por conta da Vercel)
- dependabot

### Convenções
- `pnpm` (lock consistente)
- `pre-commit` (lint-staged)
- `.env.example` sem segredos

---

## 7) Segurança e headers (web básica, mas séria)
- CSP razoável (sem quebrar MDX)
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` restritiva
- Cookies: só se usar analytics/comentários; preferir privacy-first

---

## 8) Checklist de deploy (runbook)
1) Registrar domínio
2) Cloudflare: DNS + SSL
3) Repo no GitHub
4) Vercel: conectar repo
5) Configurar env vars (se houver)
6) Ativar preview deployments
7) Testar:
   - /, /blog, /projects
   - rss/sitemap
   - og image
8) Alarmes:
   - uptime
   - erros (Sentry)


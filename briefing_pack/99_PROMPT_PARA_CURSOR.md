# 99 — PROMPT INICIAL PARA O CURSOR (copiar/colar)

Você é um engenheiro front-end sênior + arquiteto. Crie um site pessoal/blog/portfólio para “v1 torres” com estética monocromática (preto/branco/cinza) e tipografia mono legível.

## Requisitos obrigatórios
1) Branding:
- Logo textual: `v1`
- Nome: `v1 torres`
- Subtítulo: `v1 dev — vinícius torres`

2) Tech:
- Next.js (App Router) + TypeScript
- Tailwind + shadcn/ui
- Fonte: Geist Mono (primary)
- Conteúdo em MDX no Git (sem CMS)

3) Páginas:
- `/` (home)
- `/blog` + `/blog/[slug]`
- `/projects` + `/projects/[slug]`
- `/notes` + `/notes/[slug]`
- `/about`
- `/now`

4) UX:
- Command palette (⌘K) para buscar posts/projects/notes
- RSS + sitemap + OG images
- Código com highlight + botão copy
- Suporte Mermaid + KaTeX

5) Design:
- Monocromático, com degradês sutis (sem cor)
- Bordas 1px e cards minimalistas
- Background grid opcional (toggle)

6) Qualidade:
- Lighthouse performance alto (evitar JS desnecessário)
- Acessibilidade: foco visível, navegação por teclado

## Entregáveis
- Scaffold completo do projeto
- Conteúdo de exemplo:
  - 2 posts MDX (1 ML/IA; 1 system design)
  - 2 projetos (SAEP e Migração AWS VPC) no formato case study
  - 3 notes curtas
- README com comandos e deploy na Vercel

## Diretrizes
- Não use paleta colorida.
- Não use bibliotecas pesadas se não forem necessárias.
- Componentes limpos e idiomáticos.
- Configurar lint/format.
- Estrutura sugerida:
  - /content/{blog,projects,notes}
  - /src/app
  - /src/components
  - /src/lib (mdx, search, utils)
  - /src/styles (tokens)

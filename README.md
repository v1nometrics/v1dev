# v1torres.dev

Site pessoal e blog de Vinicius Torres — Economista, Tech Lead em Dados, IA e Arquitetura de Software.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Runtime:** Bun
- **Styling:** Tailwind CSS 3 + CSS variables (design tokens)
- **Conteúdo:** MDX (`next-mdx-remote/rsc`) + frontmatter Zod
- **i18n:** next-intl (PT-BR / EN) + LocaleProvider (troca client-side)
- **Tema:** next-themes (dark/light/system)
- **Font:** Geist Mono
- **Highlight:** Shiki via `rehype-pretty-code`

## Estrutura

```
frontend/src/
├── app/
│   ├── globals.css              # Design tokens + MDX/diagram styles
│   ├── rss.xml/route.ts         # Feed RSS (só conteúdo publicado)
│   └── [locale]/
│       ├── page.tsx             # Home (recentes via content loader)
│       ├── blog/
│       │   ├── page.tsx         # Listagem artigos + notas
│       │   └── [slug]/page.tsx  # Post/nota MDX
│       ├── lab/                 # Projetos (modal)
│       ├── refs/
│       ├── prompts/
│       └── readme/
├── components/
│   ├── blog/                    # UI da listagem
│   ├── home/                    # UI da home
│   ├── mdx/                     # Callout, Diagram, Flow, Compare, Delta
│   ├── layout/                  # Header, Footer
│   ├── ui/                      # Theme/Language toggle, T
│   └── providers/
├── content/
│   ├── blog/                    # Artigos: slug.mdx (pt-BR) + slug.en.mdx
│   ├── notes/                   # Notas (mesmo padrão bilíngue)
│   └── projects/                # Cases (MDX; lab ainda usa dados embutidos)
├── i18n/
├── locales/
│   ├── pt-BR.json
│   └── en.json
└── lib/
    ├── content.ts               # Loader MDX + draft + locale
    └── utils.ts
```

## Rotas

| Rota | Descrição |
|------|-----------|
| `/`, `/en` | Home com bio e posts recentes |
| `/blog`, `/en/blog` | Artigos + notas (collapsible) |
| `/blog/[slug]`, `/en/blog/[slug]` | Conteúdo MDX no locale ativo |
| `/lab` | Projetos e experimentos (modal) |
| `/refs` | Biblioteca de referências |
| `/prompts` | Templates de prompts XML |
| `/readme` | Sobre |
| `/rss.xml` | Feed RSS dinâmico |

## Conteúdo (MDX)

- Arquivos em `frontend/src/content/{blog,notes,projects}/`
- **pt-BR:** `slug.mdx` (default)
- **EN:** `slug.en.mdx` (fallback para pt-BR se faltar tradução)
- Frontmatter validado com Zod: `title`, `date`, `tags`, `summary`, `draft?`, `readingTime?`
- `draft: true` oculta de listagem, home, slug (404), RSS e `generateStaticParams`
- Componentes MDX: `Callout`, `Diagram`, `Flow`, `Compare`, `Delta`

### Posts publicados agora

- `llms-nao-tornam-pipelines-obsoletos` (PT + EN)

### Em draft (no repo, ocultos na UI)

- `cache-hierarquico-swr`
- `embeddings-producao`

## Features

### i18n
- Português brasileiro (default, sem prefixo na URL)
- Inglês (`/en` prefix)
- `localePrefix: "as-needed"`
- UI via next-intl + `<T>` com scramble ao trocar idioma
- **Conteúdo do blog/notas** também muda com o locale

### Design System
- Monocromático: preto, branco, cinza
- Tipografia: Geist Mono (lowercase)
- Bordas pontilhadas (`border-dotted`)
- Símbolos: `› · - | / ● ○ ◐ □`
- Detalhes: [frontend/DESIGN_SYSTEM.md](./frontend/DESIGN_SYSTEM.md)

### Blog
- Pipeline MDX real (não placeholder)
- Artigos + notas
- Diagramas tipográficos no artigo (box-drawing)
- Metadata/OG por post
- Data de calendário sem drift de fuso; `readingTime` opcional no frontmatter

### RSS
- Agrega posts e notes **publicados**
- Ordenado por data
- Cache: 1h + stale-while-revalidate 24h

## Desenvolvimento

```bash
cd frontend

# Instalar dependências
bun install

# Dev server
bun run dev

# Build
bun run build

# Lint
bun run lint
```

App em `frontend/` (não na raiz do monorepo).

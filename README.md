# v1torres.dev

Site pessoal e blog de Vinicius Torres — Economista, Tech Lead em Dados, IA e Arquitetura de Software.

## Stack

- **Framework:** Next.js 16 (App Router)
- **Runtime:** Bun
- **Styling:** Tailwind CSS 4
- **i18n:** next-intl (PT-BR / EN)
- **Tema:** next-themes (dark/light/system)
- **Font:** Geist Mono

## Estrutura

```
src/
├── app/
│   ├── globals.css          # Design tokens + animacoes
│   ├── rss.xml/route.ts     # Feed RSS dinamico
│   └── [locale]/
│       ├── page.tsx         # Home
│       ├── blog/            # Artigos e notas
│       ├── lab/             # Projetos (modal)
│       ├── refs/            # Biblioteca de referencias
│       ├── prompts/         # Templates de prompts XML
│       └── readme/          # Sobre
├── components/
│   ├── layout/              # Header, Footer
│   ├── ui/                  # Theme toggle, Language toggle, T (texto traduzido)
│   └── providers/           # Theme provider, Locale provider
├── content/
│   ├── blog/                # Artigos MDX
│   ├── notes/               # Notas curtas MDX
│   └── projects/            # Projetos MDX
├── i18n/
│   └── routing.ts           # next-intl navigation
├── locales/
│   ├── pt-BR.json
│   └── en.json
└── lib/
    └── utils.ts
```

## Rotas

| Rota | Descricao |
|------|-----------|
| `/` | Home com bio e posts recentes |
| `/blog` | Artigos tecnicos e notas rapidas (collapsible sections) |
| `/lab` | Projetos e experimentos (modal ao clicar) |
| `/refs` | Biblioteca curada de referencias (filtro + busca + sort) |
| `/prompts` | Templates de prompts com referencias XML (collapsible preview) |
| `/readme` | Sobre mim, agora, stack, idiomas, principios, contato |
| `/rss.xml` | Feed RSS dinamico |

## Features

### i18n
- Portugues brasileiro (default, sem prefix na URL)
- Ingles (com /en prefix)
- `localePrefix: "as-needed"`
- Language toggle com SVG bandeiras
- **100% client-side** — troca sem page refresh
- Animacao matrix scramble ao trocar idioma (2.5s)
- Persistencia em localStorage

### Design System
- Monocromatico: preto, branco, cinza (sem cores)
- Tipografia: Geist Mono (lowercase)
- Bordas pontilhadas (`border-dotted`)
- Simbolos ASCII: `› · - | / ● ○ ◐ □`
- Animacoes: blink cursor (1.22s), grid-rows transitions (300ms)

### Header
- Logo: `›v1_` com cursor piscante
- Menu com indicador de rota ativa (› com width animation)
- Theme toggle (● / ○)
- Language toggle (SVG bandeiras)

### Readme
- Bio com formacao e hands-on
- Secao "agora" com mes dinamico
- Stack categorizada (languages, data, ml, infra, databases, observability)
- Idiomas (portugues nativo, ingles c1 cambridge, espanhol fluente)
- Principios
- Contato (github, linkedin, email, whatsapp | baixar cv)
- CollapsibleSection com animacao suave

### Lab (Projetos)
- Modal inline ao inves de pagina
- Status indicators: `● production` `○ completed` `◐ development` `□ archived`
- Type: internal / personal / oss / client
- Domain: tags de area
- Highlights, stack, screenshots

### Blog
- Artigos (posts longos) + Notas (ideias curtas)
- CollapsibleSection com grid-rows animation
- Tags como badges

### Refs (Referencias)
- Filtro por categoria
- Busca por titulo/autor/tags
- Ordenacao: ano ou alfabetica (toggle)
- Export XML

### Prompts
- Templates estruturados em XML
- Referencias embutidas
- Preview collapsible
- Copy/download

### RSS
- Feed dinamico em `/rss.xml`
- Agrega blog posts e notes
- Ordenado por data
- Cache: 1h + stale-while-revalidate 24h

## Desenvolvimento

```bash
# Instalar dependencias
bun install

# Rodar dev server
bun run dev

# Build
bun run build

# Lint
bun run lint
```

## Design System

Consulte [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) para tokens completos.

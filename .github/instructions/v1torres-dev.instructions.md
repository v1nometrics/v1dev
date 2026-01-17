---
applyTo: "frontend/**"
---

# v1torres.dev — Development Guidelines

> **Versao:** 3.0 — Janeiro 2026  
> **Autor:** Vinicius Torres

---

## 1. Conceito & Identidade

### 1.1 Estetica

Design inspirado em **terminais de codigo** e **maquinas de datilografia**:

- **Monocromatico**: preto, branco e cinza — sem cores
- **Tipografia**: Geist Mono — monospace como elemento central
- **Minimalismo funcional**: cada elemento justifica sua existencia
- **Anti-template**: evitar qualquer aspecto "pronto" ou "Notion-like"

### 1.2 Principios de Design

| Principio | Aplicacao |
|-----------|-----------|
| Menos e mais | Remover antes de adicionar |
| Tipografia primeiro | Texto e o conteudo principal |
| Contraste funcional | Hierarquia sem cores |
| Espaco como elemento | Margens e gaps sao decisoes de design |
| Maximo com minimo | Extrair o melhor de cada recurso |

### 1.3 Anti-Patterns (NUNCA usar)

- Cards com sombra
- Border-radius > 0
- Hover scales/transforms
- Gradientes
- Cores de destaque
- Icones de bibliotecas (Lucide, FontAwesome)
- Emojis
- Animacoes decorativas
- Padding simetrico excessivo

### 1.4 Elementos Permitidos

- Bordas pontilhadas (`border-dotted`)
- Simbolos ASCII: `› · - | / ● ○ ◐ □`
- Transicoes suaves em hover (150-300ms)
- Backdrop blur em modais
- Animacao blink para cursor (1.22s)

---

## 2. Stack Tecnica

```
Framework:  Next.js 16 (App Router)
Runtime:    Bun
Styling:    Tailwind CSS 4
i18n:       next-intl (PT-BR / EN)
Tema:       next-themes (dark/light/system)
Font:       Geist Mono
```

### 2.1 Estrutura de Pastas

```
src/
├── app/
│   ├── globals.css          # Design tokens + animacoes
│   ├── rss.xml/route.ts     # Feed RSS dinamico
│   └── [locale]/
│       ├── page.tsx         # Home
│       ├── blog/            # Artigos e notas
│       ├── lab/             # Projetos (modal)
│       ├── refs/            # Referencias (filtros + sort)
│       ├── prompts/         # Templates XML
│       └── readme/          # Sobre
├── components/
│   ├── layout/              # Header, Footer
│   ├── ui/                  # Theme toggle, Language toggle, T (texto traduzido)
│   ├── mdx/                 # Componentes MDX
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

---

## 3. Design Tokens

### 3.1 Cores — Light Mode

```css
--bg-primary: #ffffff;
--bg-secondary: #fafafa;
--bg-tertiary: #f4f4f5;

--fg-primary: #09090b;
--fg-secondary: #27272a;
--fg-muted: #52525b;
--fg-subtle: #71717a;

--border-default: #d4d4d8;
--border-dotted: #a1a1aa;
```

### 3.2 Cores — Dark Mode

```css
--bg-primary: #09090b;
--bg-secondary: #18181b;
--bg-tertiary: #27272a;

--fg-primary: #fafafa;
--fg-secondary: #d4d4d8;
--fg-muted: #a1a1aa;
--fg-subtle: #71717a;

--border-default: #3f3f46;
--border-dotted: #3f3f46;
```

### 3.3 Tipografia

```css
--font-mono: "Geist Mono", "Berkeley Mono", "IBM Plex Mono", 
             "JetBrains Mono", ui-monospace, monospace;
```

| Size | Uso |
|------|-----|
| `text-xs` (12px) | Badges, datas, metadados |
| `text-sm` (13px) | Corpo padrao, navegacao |
| `text-lg` (16px) | Subtitulos |
| `text-xl` (18px) | Titulos de secao |
| `text-2xl` (20px) | Nome na home |

### 3.4 Espacamento

```css
Container: max-w-6xl (1152px)
Padding mobile: px-4
Padding tablet: px-6
Padding desktop: px-12
Vertical mobile: py-12
Vertical desktop: py-16
```

---

## 4. Theme System

### 4.1 Arquitetura

```
ThemeProvider (next-themes)
    ↓
html[class="dark" | class="light"]
    ↓
CSS Variables (:root / .dark)
    ↓
Tailwind @theme inline mapping
```

### 4.2 Hydration Mismatch (CRITICO)

**Sempre** usar `suppressHydrationWarning` no `<html>`:

```tsx
<html lang="pt-BR" suppressHydrationWarning>
```

**Nunca** acessar theme no render inicial:

```tsx
"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => setMounted(true), []);
  
  if (!mounted) return <span className="w-4">◐</span>;
  
  return (
    <button onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      {resolvedTheme === "dark" ? "●" : "○"}
    </button>
  );
}
```

### 4.3 Uso de Cores

**CORRETO** — Usa variaveis CSS:
```tsx
<div className="bg-bg-primary text-fg-primary border-border-default" />
```

**INCORRETO** — Cores hardcoded:
```tsx
<div className="bg-white text-black" />          // NAO
<div className="dark:bg-black" />                 // NAO
<div className="bg-[#0B0C0F]" />                  // NAO
```

---

## 5. Componentes

### 5.1 Badge

```tsx
<span className="badge">tag</span>
<span className="badge badge-solid">ativo</span>
```

### 5.2 Separador

```tsx
<hr className="separator-dotted" />
```

### 5.3 Status Indicators

```tsx
● — production (em producao)
○ — completed (concluido)
◐ — development (em dev)
□ — archived (arquivado)
```

### 5.4 CollapsibleSection

```tsx
function CollapsibleSection({ title, defaultOpen = true, children }) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <section className="mb-8">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-2 text-sm font-medium"
      >
        <span className={cn(
          "transition-transform duration-200",
          isOpen ? "rotate-90" : "rotate-0"
        )}>›</span>
        <span>{title}</span>
      </button>
      
      <div className={cn(
        "grid transition-all duration-300 ease-out",
        isOpen ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
      )}>
        <div className="overflow-hidden">{children}</div>
      </div>
    </section>
  );
}
```

### 5.5 Modal

```tsx
<div className="fixed inset-0 z-50 bg-bg-primary/80 backdrop-blur-sm">
  <div className="bg-bg-primary border border-border-default">
    {/* Header sticky, footer sticky, content scroll */}
  </div>
</div>
```

### 5.6 Links

- Sem `border-bottom`
- Hover: `text-fg-muted` → `text-fg-primary`
- Transition: `transition-colors`

---

## 6. Animacoes

### 6.1 Blink Cursor

```css
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
```

Uso: `style={{ animation: "blink 1.22s step-end infinite" }}`

### 6.2 Grid Rows (Collapsible)

```css
transition-all duration-300 ease-out
grid-rows-[0fr] → grid-rows-[1fr]
```

### 6.3 Width (Menu Indicator)

```css
transition-all duration-200
w-0 → w-2
```

---

## 7. i18n

### 7.1 Arquitetura

Sistema 100% **client-side** para troca de idioma sem page refresh:

```
LocaleProvider (Context)
├── locale: "pt-BR" | "en"
├── messages: Record<string, unknown>
├── toggleLocale(): void
├── t(key: string): string
└── lastChange: number (timestamp para trigger de animacao)
```

### 7.2 Configuracao

- Locales: `pt-BR` (default), `en`
- Prefix: `as-needed` (sem /pt-BR na URL default)
- Persistencia: `localStorage` key `v1-locale`
- URL sync: `history.replaceState` (sem navegacao)

### 7.3 Componente T (Texto Traduzido)

```tsx
// Uso basico — texto com animacao matrix ao trocar idioma
<T k="home.bio" />

// Com tag customizada
<T k="readme.title" as="h1" className="text-xl" />

// Props
interface TProps {
  k: string;         // Chave de traducao (dot notation)
  className?: string;
  duration?: number; // Duracao da animacao (default: 2500ms)
  as?: ElementType;  // Tag HTML (default: "span")
}
```

### 7.4 Regras de Traducao

| Elemento | Traduzido? | Componente |
|----------|------------|------------|
| Header/Nav | Nao | Static text |
| Conteudo paginas | Sim | `<T k="..." />` |
| Titulos secoes | Sim | `<T k="..." />` |
| Labels UI | Sim | `<T k="..." />` |

### 7.5 Language Toggle

```tsx
// Mostra bandeira do idioma destino (para onde vai mudar)
<LanguageToggle />
// pt-BR ativo -> mostra bandeira USA
// en ativo -> mostra bandeira Brasil
```

### 7.6 Matrix Scramble Animation

Efeito de troca de caracteres estilo "matrix/hacker" ao trocar idioma:

- **Duracao:** 2500ms (2.5 segundos)
- **Charset:** `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*!?<>[]{}`
- **Easing:** ease-out cubico
- **Preserva:** espacos e pontuacao durante animacao

**Funcionamento:**
1. Detecta mudanca de locale via `lastChange` timestamp
2. Compara texto anterior com novo texto traduzido
3. Se diferentes, executa animacao scramble caractere por caractere

---

## 8. Paginas

### 8.1 Home (`/`)

- Bio com greeting + nome + role
- Posts recentes (link para /blog)
- Sidebar com "agora" (desktop)

### 8.2 Blog (`/blog`)

- Artigos longos + Notas curtas
- CollapsibleSection para cada grupo
- Sidebar com notas (desktop)

### 8.3 Lab (`/lab`)

- Lista de projetos
- **Modal** ao clicar (nao pagina)
- Status: `● ○ ◐ □`
- Type: internal / personal / oss / client
- Domain: tags de area
- Highlights, stack, screenshots

### 8.4 Refs (`/refs`)

- Biblioteca de referencias (livros, papers, tools)
- Filtro por categoria
- Busca por titulo/autor/tags
- Ordenacao: ano ou alfabetica (toggle)
- Export XML

### 8.5 Prompts (`/prompts`)

- Templates estruturados em XML
- Referencias embutidas
- Preview collapsible
- Copy/download

### 8.6 Readme (`/readme`)

- Bio: formacao, hands-on (backend, api design, database modeling, etc)
- Agora: `${t("now.title")} · ${new Date().toLocaleDateString(locale, { month: "long", year: "numeric" })}`
- Stack: languages, data, ml, infra, databases, observability
- Idiomas: portugues (nativo), ingles (c1 cambridge), espanhol (fluente)
- Principios: producao primeiro, dados auditaveis, codigo limpo, maximo com minimo
- Contato: github, linkedin, email, whatsapp | baixar cv

### 8.7 RSS (`/rss.xml`)

- Feed dinamico
- Agrega blog posts e notes
- Ordenado por data decrescente
- Cache: 1h + stale-while-revalidate 24h

---

## 9. Padroes de Codigo

### 9.1 Client vs Server Components

**Server** (default): paginas estaticas, data fetching
**Client** (`"use client"`): useState, eventos, browser APIs

### 9.2 Estrutura de Componente

```tsx
"use client"; // se necessario

import { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type { Locale } from "@/i18n";

interface Props {
  locale: Locale;
}

export function Component({ locale }: Props) {
  const t = useTranslations("section");
  // ...
}
```

### 9.3 cn() para Classes

```tsx
import { cn } from "@/lib/utils";

cn("base", condition && "conditional", className);
```

---

## 10. Performance

- Images: `next/image` com dimensoes
- Heavy components: dynamic imports
- Lists: stable keys (nao index)
- Evitar inline functions em render

---

## 11. Acessibilidade

- Contraste minimo 4.5:1
- Semantica: `<nav>`, `<main>`, `<article>`, `<section>`
- `title` em indicadores de status
- `aria-expanded` em collapsibles
- Tab navigation funcional
- Escape fecha modais

---

## 12. Git Commits

```
type(scope): message

feat(ui): add theme toggle
fix(i18n): resolve locale detection
docs: update design system
refactor(lab): switch to modal
```

---

## Referencias

- [DESIGN_SYSTEM.md](../../frontend/DESIGN_SYSTEM.md) — Design tokens completos
- [Tailwind CSS](https://tailwindcss.com)
- [next-intl](https://next-intl-docs.vercel.app)
- [next-themes](https://github.com/pacocoursey/next-themes)

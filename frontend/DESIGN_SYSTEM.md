# v1torres.dev — Design System

> **Versao:** 2.0  
> **Ultima atualizacao:** Janeiro 2026  
> **Autor:** Vinicius Torres

---

## 1. Conceito

### 1.1 Identidade Visual

Design inspirado em **terminais de codigo** e **maquinas de datilografia**:
- Precisao tecnica
- Minimalismo funcional
- Autenticidade (anti-template)

**Keywords:** monochromatic, terminal, typewriter, data engineering, clean

### 1.2 Principios

| Principio | Descricao |
|-----------|-----------|
| **Menos e mais** | Cada elemento justifica sua existencia |
| **Tipografia primeiro** | Texto e o conteudo principal |
| **Contraste funcional** | Hierarquia clara sem cores |
| **Espaco como elemento** | Margens e gaps sao design decisions |
| **Anti-template** | Evitar aspecto "pronto" ou "Notion-like" |

---

## 2. Cores

### 2.1 Paleta — Light Mode

```css
--bg-primary: #ffffff;      /* Fundo principal */
--bg-secondary: #fafafa;    /* Fundo elevado */
--bg-tertiary: #f4f4f5;     /* Fundo de destaque */

--fg-primary: #09090b;      /* Texto principal */
--fg-secondary: #27272a;    /* Texto secundario */
--fg-muted: #52525b;        /* Texto suave */
--fg-subtle: #71717a;       /* Texto muito suave */

--border-default: #d4d4d8;  /* Bordas padrao */
--border-dotted: #a1a1aa;   /* Bordas pontilhadas */
```

### 2.2 Paleta — Dark Mode

```css
--bg-primary: #09090b;      /* Fundo principal */
--bg-secondary: #18181b;    /* Fundo elevado */
--bg-tertiary: #27272a;     /* Fundo de destaque */

--fg-primary: #fafafa;      /* Texto principal */
--fg-secondary: #d4d4d8;    /* Texto secundario */
--fg-muted: #a1a1aa;        /* Texto suave */
--fg-subtle: #71717a;       /* Texto muito suave */

--border-default: #3f3f46;  /* Bordas padrao */
--border-dotted: #3f3f46;   /* Bordas pontilhadas */
```

### 2.3 Regras

- **Nunca** usar cores alem de preto, branco e cinza
- **Nunca** usar gradientes
- Contraste minimo WCAG AA (4.5:1 para texto normal)

---

## 3. Tipografia

### 3.1 Font Stack

```css
--font-mono: "Geist Mono", "Berkeley Mono", "IBM Plex Mono", 
             "JetBrains Mono", ui-monospace, monospace;
```

### 3.2 Escala

| Token | Size | Uso |
|-------|------|-----|
| `text-xs` | 12px | Badges, datas, metadados |
| `text-sm` | 13px | Corpo padrao, navegacao |
| `text-base` | 14px | Enfase no corpo |
| `text-lg` | 16px | Subtitulos |
| `text-xl` | 18px | Titulos de secao |
| `text-2xl` | 20px | Nome principal (home) |

### 3.3 Regras

- Todo texto e **lowercase** (exceto nomes proprios e siglas)
- Peso maximo: `font-medium` (500)
- Line height: 1.5 (corpo), 1.25 (titulos)

---

## 4. Espacamento

### 4.1 Layout

```
Container: max-w-6xl (1152px)
Padding mobile: px-4 (16px)
Padding tablet: px-6 (24px)  
Padding desktop: px-12 (48px)
Vertical mobile: py-12 (48px)
Vertical desktop: py-16 (64px)
```

### 4.2 Gaps

| Token | Uso |
|-------|-----|
| `gap-2` | Entre badges |
| `gap-4` | Entre elementos inline |
| `gap-6` | Entre secoes pequenas |
| `gap-8` | Entre secoes medias |

---

## 5. Componentes

### 5.1 Badge

```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 2px 8px;
  font-size: 12px;
  border: 1px dotted var(--border-dotted);
  color: var(--fg-muted);
}
```

### 5.2 Separador

```css
.separator-dotted {
  border: none;
  border-top: 1px dotted var(--border-dotted);
  margin: 32px 0;
}
```

### 5.3 Status Indicators

```
● — production (em producao)
○ — completed (concluido)
◐ — development (em dev)
□ — archived (arquivado)
```

### 5.4 CollapsibleSection

```tsx
// Padrao reutilizado em readme, blog, prompts
<section>
  <button onClick={() => setIsOpen(!isOpen)}>
    <span className={isOpen ? "rotate-90" : "rotate-0"}>›</span>
    <span>{title}</span>
  </button>
  <div className={isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}>
    <div className="overflow-hidden">{children}</div>
  </div>
</section>
```

Animacao: `transition-all duration-300 ease-out`

### 5.5 Modal

```tsx
<div className="fixed inset-0 z-50 bg-bg-primary/80 backdrop-blur-sm">
  <div className="bg-bg-primary border border-border-default">
    {/* Header sticky, footer sticky, content scroll */}
  </div>
</div>
```

---

## 6. Animacoes

### 6.1 Blink Cursor

```css
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.animate-blink {
  animation: blink 1.22s step-end infinite;
}
```

Usado no logo: `›v1_`

### 6.2 Grid Rows Transition

```css
.grid-rows-[0fr] → .grid-rows-[1fr]
transition-all duration-300 ease-out
```

Usado em CollapsibleSection.

### 6.3 Width Animation (Menu Ativo)

```css
transition-all duration-200
w-0 → w-2 (indicador ›)
```

---

## 7. Simbolos ASCII

| Simbolo | Uso |
|---------|-----|
| `›` | Indicador de item/menu ativo, collapsible |
| `·` | Separador inline |
| `-` | Item de lista |
| `\|` | Separador de links |
| `/` | Divisor |
| `●` | Status production / dark mode |
| `○` | Status completed / light mode |
| `◐` | Status development / loading |
| `□` | Status archived |

---

## 8. Anti-Patterns (NUNCA usar)

- Cards com sombra
- Border-radius > 0
- Hover scales/transforms
- Gradientes
- Cores de destaque
- Icones de bibliotecas (Lucide, FontAwesome)
- Emojis
- Animacoes decorativas
- Padding simetrico excessivo

---

## 9. Acessibilidade

- Contraste minimo 4.5:1
- Semantica: `<nav>`, `<main>`, `<article>`, `<section>`
- `title` em indicadores de status
- Tab navigation funcional
- Escape fecha modais
- `aria-expanded` em collapsibles

---

## 10. Responsividade

### Breakpoints

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
```

### Padroes

- Mobile: single column, collapsible sections
- Desktop: sidebars quando aplicavel (blog notes, refs filters)
- Padding aumenta com viewport

# 09 — ESPECIFICAÇÃO DE COMPONENTES (para manter consistência)

> **Atualizado:** Janeiro 2026

## UI primitives
- Badge (tag, badge-solid)
- Separator (separator-dotted)
- Toggle Theme (● / ○)
- Toggle Language (bandeiras SVG)
- **T** — Texto traduzido com animação matrix (2.5s)
- CollapsibleSection (› com rotate animation)
- Modal (backdrop blur, sticky header/footer)

## Content components (MDX)
- Callout (note/warn/decision)
- CodeBlock (copy)
- Figure (caption)
- Quote
- Steps (ordered)
- Metrics (lista de números)

## Layout
- Container (max-w-6xl)
- Header (logo ›v1_ + nav + toggles)
- Footer (links + RSS)
- PageHeader (title + subtitle + meta)
- Toc (desktop sticky)

## Providers
- ThemeProvider (next-themes)
- LocaleProvider (100% client-side i18n)

## Status Indicators
- ● — production (em produção)
- ○ — completed (concluído)
- ◐ — development (em dev)
- □ — archived (arquivado)

## States
- Skeleton (loading)
- Empty state (sem posts)
- Error boundary (fallback)

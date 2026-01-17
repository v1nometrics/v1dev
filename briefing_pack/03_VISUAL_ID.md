# 03 — IDENTIDADE VISUAL (UI system)

## 1) Princípios visuais
- **Monocromático**: P&B + cinzas (sem cor).
- **Contraste controlado**: legibilidade primeiro; “sofisticação” vem de tipografia e espaçamento.
- **Industrial/diagramático**: grid, linhas, marcações, setas discretas.
- **Movimento mínimo**: microinteração só para feedback e hierarquia (não para “entreter”).

## 2) Tokens (recomendação)
Veja `assets/design_tokens.css` para a versão pronta (CSS variables).
Resumo conceitual:
- Fundo (dark): #0B0C0F / #0E1116
- Texto primário: #E6E6E6
- Texto secundário: #A6A6A6
- Borda: #23252B
- Card: #12141A
- “Code bg”: #0F1218
- Focus ring: #FFFFFF (com alpha)

### Degradês (sem cor)
- Usar apenas variação de luminância:
  - radial: centro levemente mais claro
  - linear: topo um pouco mais claro que base
- Intensidade baixa (2–6% de diferença).

## 3) Tipografia
**Escolha padrão:** Geist Mono (legível e “de produto”).
- Base font-size: 18px
- line-height: 1.7
- tracking: leve (-0.01em no heading, 0 no corpo)

Hierarquia:
- H1 40–44px / 1.1
- H2 28–32px / 1.2
- H3 22–24px / 1.3
- Body 18px / 1.7
- Small 14–15px / 1.6

## 4) Layout e grid
- Container: 1040–1120px max.
- Margens: 24px mobile, 40–64px desktop.
- Ritmo vertical: espaçamento múltiplo de 8 (8/16/24/32/48/64).

### Composição (home)
- Hero em 2 colunas (desktop):
  - Esquerda: “v1 torres” + tagline
  - Direita: “status card” (now/stack/links)
- Abaixo: featured posts + featured projects (cards simples).

## 5) Componentes essenciais (MVP)
### Navegação
- Navbar minimal (texto + bordas)
- ⌘K (Command) destacado como primário
- Indicador “Você está em /blog”

### Cards (posts e projetos)
- Título + data + tags
- Hover: aumento mínimo de contraste + borda
- Sem sombras fortes; sombras só para separar camadas.

### Post layout
- Sumário fixo (desktop) ou colapsável (mobile)
- “TL;DR” no topo
- Blocos de alerta: Note / Warning / Decision
- Código com highlight + botão copy
- “Backlinks” opcional (fase 2)

### Projetos (case study)
- “Resultados” em primeiro plano (métricas)
- “Arquitetura” com diagrama (Mermaid)
- “Trade-offs” como tabela/lista curta
- Links: repo/demo/post

## 6) Assinatura visual (detalhes que dão “conceito”)
- **Separadores** em formato “timeline / log line”: `—` ou `│`.
- **Badges** (tags) em estilo “label de terminal”: borda 1px.
- **Background grid** opcional (toggle em /about): linhas finas 1px com alpha 0.06.
- **Diagrama textual** em ASCII em seções curtas (mas não em excesso).

## 7) Acessibilidade
- Foco sempre visível (outline claro + offset).
- Contraste do texto em fundo: priorizar AA/AAA.
- Navegação por teclado: ⌘K, links, headings, toggles.


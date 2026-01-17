# 01 — BRIEFING (v1 torres)

## 1) O que este site precisa ser
**Um único produto** que funciona como: **blog + portfólio + cartão de visitas**, com estética e UX que “parecem front-end de produto”, mas com a **raiz técnica** explícita: ML/IA, econometria, dados, infra, arquitetura, cloud, DevOps.

### Objetivos (prioridade)
1. **Autoridade técnica**: textos e projetos com densidade, mas acessíveis.
2. **Sofisticação de UX**: navegação fluida, microinterações, tipografia forte, performance real.
3. **Identidade**: minimalista (P&B/cinza), com linguagem de terminal/diagramas.
4. **Sustentável**: fácil publicar (MDX), custo baixo, deploy simples, observável.

### Não-objetivos (evitar escopo infinito)
- CMS pesado, painel admin, login, comentários nativos, “dashboard social”.
- Animações chamativas, “neon hacker”, ruído visual.
- Overengineering de infra para uma página estática.

## 2) Marca e naming
### Lockup (definido)
- **Logo:** `v1`
- **Nome:** `v1 torres`
- **Sub:** `v1 dev — vinícius torres`

### Implicações de branding
- “v1” é memorável e diferencial.
- “v1dev” sozinho pode confundir (parece “version 1 dev” ou “V1” genérico).
- **Recomendação prática:** usar domínio com **nome + v1**, e “v1 dev” como subtítulo/posição.

## 3) Domínio (sugestões)
Sem checar disponibilidade (isso muda a cada minuto), lista por clareza:
- **v1torres.dev** (preferido: técnico, claro, curto)
- **v1torres.com** (universal)
- **viniciustorres.dev** (formal, longo)
- **v1torres.ai** (posiciona IA; pode soar “marketing” se exagerar)
- **v1t.dev** / **v1tr.es** (curtos; risco de confusão)
E-mail: **hi@v1torres.dev** ou **contato@v1torres.dev**.

## 4) Público-alvo e tom
### Públicos
1) Tech leaders / engenheiros / cientistas de dados (avaliam profundidade e clareza).
2) Gestores e founders (avaliam impacto, métricas, trade-offs, entrega).
3) Recrutadores/partners (avaliam narrativa e prova social rápida).

### Tom (padrão)
- Direto, técnico, com números e trade-offs.
- Sem “hype” de IA; **determinístico, reprodutível, auditável**.
- Postagens com “o que eu faria em produção” + “por que”.

## 5) Informação e navegação (IA do site)
### IA (Information Architecture) — mínimo viável
Navbar:
- **/blog** (artigos longos)
- **/projects** (case studies)
- **/notes** (pílulas técnicas, snippets, leituras)
- **/about** (bio técnica + stack + contato)
- **/now** (o que estou fazendo/estudando)

Home:
- Hero + tagline (1 frase) + 3 CTAs: *Ler*, *Ver projetos*, *Contato*
- “Featured” (3 posts + 3 projetos)
- “Stack & princípios” (curto: produção, custo, observabilidade, dados auditáveis)
- Rodapé com links e RSS.

### UX de navegação (diferencial)
- **Command palette (⌘K)** para buscar posts/projetos/notas.
- **Tags** e **séries** (ex.: “System Design”, “MLOps”, “Econometria”).
- **Leitura progressiva**: TL;DR + “Detalhes” (disclosure) + anexos.
- **Linkagem interna** forte (backlinks opcionais no futuro).

## 6) Conteúdo: tipos e templates
### Tipos
1) **Artigos (Blog):** 8–15 min, com código/diagramas.
2) **Case studies (Projects):** problema → arquitetura → trade-offs → resultados → lições.
3) **Notas (Notes):** 1–3 min; checklists, snippets, heurísticas.
4) **Snippets/Receitas:** padrões reutilizáveis (ex.: “pgvector + HNSW em Postgres”).
5) **Leituras:** “o que aprendi / resumos” (com citações e opinião clara).

### Template de Case Study (padrão)
- Contexto e objetivo
- Restrições (custo, latência, dados, time)
- Arquitetura (diagrama + componentes)
- Dados e qualidade (contratos, lineage, checks)
- Operação (SLO/SLI, logs, alarmes)
- Resultados (métricas)
- Decisões e trade-offs
- Próximos passos

## 7) Critérios de qualidade do produto (Definition of Done)
- Lighthouse: **Performance ≥ 95**, Accessibility ≥ 95 (desktop).
- **TBT baixo**, carregamento rápido, sem JS desnecessário.
- **RSS**, sitemap, metadata/OG.
- **Busca** (client-side index) + ⌘K.
- MDX com:
  - código com highlight
  - blocos de aviso (*Note/Warning*)
  - suporte a KaTeX/LaTeX e Mermaid
- Design consistente (tokens) e acessível (contraste, foco visível).

## 8) Entregas por fase
### Fase 0 — Setup (1 dia)
- domínio + DNS + repo
- design tokens + tipografia
- scaffold do projeto + CI básico

### Fase 1 — MVP (3–5 dias)
- home + blog + project + about
- MDX pipeline
- command palette
- RSS + OG images
- 2 posts + 2 projetos publicados

### Fase 2 — Diferenciais (1–2 semanas)
- “notes” + “now”
- diagrama interativo (1 post exemplar)
- página de “snippets”
- otimizações finas: perf, animações, acessibilidade

### Fase 3 — Conteúdo contínuo
- 1 post/semana (alternar deep dive e nota curta)
- 1 projeto/mês (case study bem escrito)

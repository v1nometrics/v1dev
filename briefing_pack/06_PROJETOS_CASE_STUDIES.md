# 06 — PROJETOS (Case Studies sugeridos)

> Objetivo: você ter 4–6 “provas” fortes no /projects.  
> Cada projeto deve ter: problema real, arquitetura, trade-offs, métricas e operação.

---

## Projeto 1 — SAEP (matchmaking semântico em emendas parlamentares)
**Pitch:** “Busca e classificação semântica em escala com embeddings + Postgres.”

### Problema
- Triar diariamente ~35k emendas com descrições complexas e detectar oportunidades aderentes.

### Arquitetura (alto nível)
- Coleta automatizada (bot SIOP / pipeline diário)
- ETL + higienização
- Vetorização (Sentence Transformers)
- Armazenamento e busca vetorial (PostgreSQL + pgvector + HNSW)
- Ensemble de regras + scores para classificação final
- Frontend Next.js com filtros e exportações

### Métricas para destacar
- Latência de busca (sub-500ms)
- Precisão/qualidade (ex.: >90% em categorias)
- Custo otimizado após migração cloud

### Trade-offs explícitos
- Por que embeddings (discriminativo) vs LLM generativo
- Índice aproximado (HNSW) vs exato
- Pré-processamento diário (batch) vs online

---

## Projeto 2 — NEXUS (geo + estratégia + rotas)
**Pitch:** “Produto geoespacial com camadas, cache e exportação de dados.”

### Problema
- Planejar oportunidades e rotas entre municípios, polos e periferias, com UX de produto.

### Arquitetura
- Bases GeoJSON/Parquet em S3 (partição temporal quando fizer sentido)
- Next.js + MapLibre (ou Google Maps, conforme requisito)
- Cache hierárquico (memória/localStorage/S3) + revalidação (SWR)
- Exportação (XLSX/CSV/PDF)

### Diferenciais
- Regras de negócio (polo/periferia)
- Otimização de payload e loading
- Alarmes de custo (APIs externas)

---

## Projeto 3 — Admin Console (RBAC + trilha de auditoria)
**Pitch:** “Governança de acessos por território com UX decente.”

### Problema
- Controlar acesso a plataformas e territórios (UF/município), evitando conflitos.

### Arquitetura
- Postgres (RDS) como fonte única de identidade e permissões
- NextAuth + middlewares
- Trilha de auditoria (quem mudou, quando)
- Visualização georreferenciada de acessos

### Métricas
- Redução de trabalho manual
- Menos incidentes de acesso indevido

---

## Projeto 4 — Migração para AWS VPC (Fase 1/2)
**Pitch:** “Infra real: VPC, RDS, EC2 ARM64, ECR, deploy com imagens.”

### O que mostrar
- Desenho VPC, subnets, SGs, endpoints
- RDS PostgreSQL
- Deploy via Docker → ECR → EC2 ARM64
- Runbook de deploy/rollback
- Observabilidade (CloudWatch + alertas)

### Por que isso importa no portfólio
- Prova de produção: custo, segurança, operação.

---

## Projeto 5 — Automação (URA WABA + ManyChat + DocuSign)
**Pitch:** “Automação ponta-a-ponta com integrações e governança.”

### O que mostrar
- Fluxo de eventos, idempotência, logs
- Armazenamento em S3
- Evitar vazamento de dados e segredos

---

## Projeto 6 — “Explorable post” (1 showcase)
Um post/projeto híbrido com visualização:
- “HNSW explicado” ou “cosine similarity e geometria”
- “Cache hierárquico + SWR” com diagrama e simulação
- “ETL em camadas (Bronze/Silver/Gold)”

**Regra:** é o seu “cartão de visita” de front-end + didática.

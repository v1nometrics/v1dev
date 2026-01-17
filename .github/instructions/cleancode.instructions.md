# Instruction: Revisão Meticulosa + Refatoração Clean (Sem Redundâncias)

## Objetivo
Analise **tudo o que foi desenvolvido/implementado até agora** no projeto (código, configs, scripts, docs, pipelines). Garanta que o resultado fique **o mais clean, simples e consistente possível**, removendo **redundâncias**, **complexidade acidental** e **dívida técnica desnecessária**, mantendo **comportamento e interfaces** estáveis (a menos que eu peça o contrário).

## Princípios (ordem de prioridade)
1. **Correção e segurança** > 2. **Clareza** > 3. **Consistência** > 4. **Simplicidade** > 5. **Performance**
- Prefira **código óbvio** a código “esperto”.
- Se não conseguir justificar a existência de algo, provavelmente deve ser removido ou simplificado.
- Menos linhas ≠ melhor. Melhor = **menos conceitos, menos caminhos, menos duplicação, mais legibilidade**.

## Escopo do que revisar
- Arquitetura e boundaries (módulos, camadas, responsabilidades).
- Padrões e consistência (naming, estrutura de pastas, estilo).
- Redundâncias e duplicações (código, lógica, utilitários, configs).
- Qualidade (tratamento de erros, validações, edge cases).
- Testes (cobertura efetiva, confiabilidade, flakiness).
- Observabilidade (logs, métricas, tracing quando aplicável).
- Performance (hot paths, I/O, alocação, N+1, cache).
- Segurança (inputs, secrets, permissões, dependências, SSRF/XSS/SQLi conforme stack).
- Dependências (versões, duplicidade, libs desnecessárias, riscos).
- CI/CD e automações (lint, format, build, test, quality gates).

## Como conduzir a análise (processo)
1. **Mapeie o sistema**: principais fluxos, componentes, dependências e pontos críticos.
2. **Identifique problemas** por categoria:
   - Duplicação / DRY
   - Complexidade ciclomática / ramificações
   - Responsabilidades misturadas
   - Nomes ruins / ambiguidade
   - Erros silenciosos / exceções genéricas
   - APIs internas inconsistentes
   - Código morto / feature flags abandonadas
   - Acoplamento desnecessário
3. **Proponha mudanças** com foco em:
   - Remover redundâncias
   - Simplificar fluxos
   - Tornar invariantes explícitas
   - Reduzir estado compartilhado
   - Melhorar legibilidade e testabilidade
4. **Execute refatorações seguras**:
   - Pequenas mudanças por vez
   - Preservando comportamento
   - Com testes e/ou checks garantindo regressão mínima
5. **Valide**: lint/format, testes, build, e revise impacto.

## Regras de Clean Code / Boas práticas (checklist)
### Redundância e duplicação
- [ ] Remover funções/arquivos duplicados (ou consolidar).
- [ ] Extrair lógica comum para um único lugar **quando fizer sentido** (evitar “utils god”).
- [ ] Eliminar parâmetros/flags redundantes; preferir contratos claros.
- [ ] Remover código morto, comentários óbvios, TODOs antigos, imports não usados.

### Legibilidade e consistência
- [ ] Nomes descritivos e consistentes (domínio > técnico).
- [ ] Funções pequenas com responsabilidade única.
- [ ] Evitar efeitos colaterais ocultos.
- [ ] Manter estilo consistente com formatter/linter do projeto.
- [ ] Evitar “mágica”: preferir configurações explícitas e defaults claros.

### Arquitetura
- [ ] Boundaries claros entre camadas (ex.: domínio, infra, interface).
- [ ] Dependências apontando no sentido correto (evitar inversão acidental).
- [ ] Minimizar acoplamento e maximizar coesão.
- [ ] Remover abstrações prematuras; manter abstrações necessárias e justificadas.

### Robustez
- [ ] Erros tratados de forma consistente (mensagens úteis, sem swallow).
- [ ] Validação de inputs nas bordas do sistema.
- [ ] Edge cases críticos cobertos (nulls, vazios, timeouts, retries).
- [ ] Idempotência quando aplicável.

### Performance
- [ ] Identificar hotspots reais (não otimizar no escuro).
- [ ] Reduzir I/O desnecessário, N+1, loops custosos.
- [ ] Cache só quando houver motivo e invalidação clara.

### Segurança e dependências
- [ ] Secrets fora do código; configs seguras.
- [ ] Sanitização/validação conforme superfície de ataque.
- [ ] Dependências atualizadas e minimizadas; remover libs não usadas.
- [ ] Checar licenças/riscos quando relevante.

### Testes e qualidade
- [ ] Testes cobrindo comportamento (não implementação).
- [ ] Evitar testes frágeis e flakey; preferir determinismo.
- [ ] Melhorar naming e organização de testes.
- [ ] Adicionar testes onde mudanças introduzirem risco.

## Restrições
- Não alterar contratos públicos/semântica sem indicar explicitamente.
- Não introduzir novas dependências sem justificativa clara.
- Não aumentar complexidade para “possíveis usos futuros”.

## Formato da entrega (obrigatório)
Produza a resposta em seções **curtas, objetivas e verificáveis**:

### 1) Diagnóstico (visão geral)
- Principais pontos fortes
- Principais problemas (top 5–10), com impacto

### 2) Achados detalhados (por categoria)
Para cada achado, inclua:
- **Local** (arquivo/pasta/módulo)
- **Problema**
- **Por que importa**
- **Proposta** (ação concreta)
- **Risco** (baixo/médio/alto)
- **Como validar** (teste/check específico)

### 3) Plano de refatoração (priorizado)
- P0 (agora) / P1 (próximo) / P2 (depois)
- Sequência sugerida para evitar retrabalho

### 4) Mudanças recomendadas (quando aplicável)
- Sugestões de patch/diff ou trechos concretos
- Ajustes de lint/format/config
- Remoções (código morto, dependências, duplicações)

### 5) Validação
- Checklist final do que rodar (build/test/lint)
- Cenários manuais mínimos (se necessário)

## Profundidade (“ultrathinking”)
- Seja **metódico e rigoroso**: justifique decisões com critérios técnicos.
- Explique **trade-offs** de forma curta e direta.
- Prefira evidências (ex.: repetição de padrões, riscos claros, inconsistências reais).
- Evite linguagem vaga; cada sugestão deve ser **acionável**.

## Saída esperada
Uma revisão que deixe o projeto:
- Mais simples de entender e manter
- Mais consistente e previsível
- Com menos duplicação e menos ruído
- Com melhores garantias via testes e checks


## Você é terminantemente proibido de utilizar emojis no código para toda finalidade. Sempre utilize materiais de bibliotecas, ou SVGs, qualquer elemento profissional para representar icones visualente, mas NUNCA utilize emojis, nem para documentação, pois soa extremamente amador.


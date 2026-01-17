# 10 — SEGURANÇA E PRIVACIDADE (padrão de engenheiro)

## Princípios
- Sem segredos no frontend.
- Dependências mínimas.
- Headers básicos.
- Analytics privacy-first.

## Checklist
- [ ] Dependabot / npm audit
- [ ] CSP (sem exagero para não quebrar MDX)
- [ ] Rate-limit em qualquer endpoint server-side (se existir)
- [ ] `.env.example` sem chaves reais
- [ ] Sem coletar e armazenar dados pessoais sem necessidade

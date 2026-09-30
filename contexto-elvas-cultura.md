# Contexto — Elvas Cultura

Agenda cultural do concelho de Elvas. Site público em português de Portugal (`pt-PT`), datas e horas em `Europe/Lisbon`.

## Estado atual

- **Fase 0 (em curso / concluída nesta entrega):** fundação Next.js (App Router, TypeScript, Tailwind v4), tokens de design, layout (cabeçalho, rodapé), documentação e `.env.example`.
- **Fase 1:** pendente — Sanity CMS, documento `evento`, Studio em `/studio`.
- **Fase 2 do produto:** pendente — Home completa, Sobre, Agenda, detalhe do evento, SEO.
- **Fase 3:** pendente — Fala connosco, privacidade, Resend.
- **Fase 4:** pendente — stub de templates sociais, README final, acessibilidade.
- **Fase 2 futura (redes):** não implementar agora — gerar imagem de post a partir de um evento.

## Decisões

- Logótipo temporário: ícone geométrico (cubo em wireframe) + wordmark serifado.
- Sanity e URLs das redes: só variáveis de ambiente; se Instagram/Facebook estiverem vazias, o rodapé omite os ícones.
- Sem base de dados própria (não usar Supabase).
- Tokens de cor e fonte num único sítio: `src/app/globals.css` (`:root` + `@theme`). Tailwind v4 não usa `tailwind.config.ts` por omissão.
- Tipografia: títulos `Cormorant Garamond` (serif); corpo `Source Sans 3` (sans).
- Paleta: fundo branco, tinta quase preta, cabeçalho preto, acento teal `#2f6f73`.
- Textos legais e Sobre: provisórios, claramente marcados para edição.

## Estrutura (Fase 0)

- `src/app` — App Router
- `src/components` — Header, Footer, Logo
- `src/lib/site.ts` — nome, slogan, descrição, URL
- `src/lib/datetime.ts` — formatação `pt-PT` / `Europe/Lisbon`

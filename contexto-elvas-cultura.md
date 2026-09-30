# Contexto — Elvas Cultura

Agenda cultural do concelho de Elvas. Site público em português de Portugal (`pt-PT`), datas e horas em `Europe/Lisbon`.

## Estado atual

- **Fase 0:** concluída — fundação Next.js, tokens, layout, documentação.
- **Fase 1:** concluída — schema `evento`, Studio em `/studio`, cliente GROQ em `src/sanity/lib`.
- **Fase 2 do produto:** concluída — Home, Sobre, Agenda com filtros na URL, detalhe SEO (JSON-LD e Open Graph), sitemap e robots.
- **Fase 3:** concluída — Fala connosco, privacidade, Resend, honeypot e limite por IP.
- **Fase 4:** concluída — stub `/api/social-template/[slug]`, README de deploy, revisão de acessibilidade.
- **Fase 2 futura (redes):** estrutura pronta, geração de imagem ainda não implementada (a rota responde 501).

## Decisões

- Logótipo temporário: ícone geométrico (cubo em wireframe) + wordmark serifado.
- Sanity e URLs das redes: só variáveis de ambiente; se Instagram/Facebook estiverem vazias, o rodapé omite os ícones.
- Sem base de dados própria (não usar Supabase).
- Tokens de cor e fonte num único sítio: `src/app/globals.css` (`:root` + `@theme`). Tailwind v4 não usa `tailwind.config.ts` por omissão.
- Tipografia: títulos `Cormorant Garamond` (serif); corpo `Source Sans 3` (sans).
- Paleta: fundo branco, tinta quase preta, cabeçalho preto, acento teal `#1e5a5e` (contraste AA).
- Textos legais e Sobre: provisórios, claramente marcados para edição (`src/lib/content.ts`).
- Anti-spam do formulário: honeypot `website` + limite de 5 pedidos/hora por IP em memória (best-effort na Vercel).
- Build de produção com webpack (`next build --webpack`) porque o Turbopack do Next 16 falha a empacotar o Studio Sanity.

## Estrutura

- `src/app/(site)` — páginas públicas (cabeçalho e rodapé)
- `src/app/studio` — Studio Sanity embebido
- `src/app/api/contacto` — POST do formulário
- `src/app/api/social-template/[slug]` — stub da Fase 2 futura
- `src/sanity` — env, schema, cliente, queries
- `src/components` — Header, Footer, Logo, cartão de evento, filtros, formulário
- `src/lib/site.ts` — nome, slogan, descrição, URL
- `src/lib/datetime.ts` — formatação `pt-PT` / `Europe/Lisbon`
- `src/lib/categories.ts` — categorias da agenda

## Queries de eventos

- Publicados (`publicado == true`).
- Agenda por omissão: `coalesce(dataFim, dataInicio) >= agora`.
- Filtros `categoria`, `mes` e `ano` na query string; mês/ano só com valores presentes nos dados.
- Home: eventos com `destaque`; se não houver, os próximos.

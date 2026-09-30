# Elvas Cultura

Agenda cultural do concelho de Elvas. «A cultura mais perto de ti!»

Stack: Next.js (App Router), TypeScript, Tailwind CSS, Sanity CMS (Studio em `/studio`), Resend. Deploy na Vercel. Sem base de dados própria nesta fase.

## Requisitos

- Node.js 20 ou superior
- npm
- Uma conta [Sanity](https://www.sanity.io/) (para gerir eventos)
- Uma conta [Resend](https://resend.com/) (para o formulário de contacto)
- (Opcional) projeto na [Vercel](https://vercel.com/)

## Instalação

```bash
npm install
cp .env.example .env.local
```

Preenche as variáveis em `.env.local` (ver tabela abaixo). Depois:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000). O Studio fica em [http://localhost:3000/studio](http://localhost:3000/studio).

## Variáveis de ambiente

Copia `.env.example` e define. Nunca commits ficheiros `.env` com segredos.

| Variável | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública (metadata, sitemap, Open Graph) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | ID do projeto Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset (ex.: `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Versão da API Sanity (ex.: `2024-10-01`) |
| `SANITY_API_READ_TOKEN` | Token de leitura (opcional; rascunhos) |
| `RESEND_API_KEY` | Chave da API Resend |
| `RESEND_FROM_EMAIL` | Remetente verificado no Resend |
| `CONTACT_TO_EMAIL` | Destinatário do formulário «Fala connosco» |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Instagram Elvas Cultura (opcional; se vazio, o ícone não aparece) |
| `NEXT_PUBLIC_FACEBOOK_URL` | Facebook Elvas Cultura (opcional; se vazio, o ícone não aparece) |

## Sanity

1. Cria um projeto em [sanity.io/manage](https://www.sanity.io/manage) (dataset `production`).
2. Copia o Project ID para `NEXT_PUBLIC_SANITY_PROJECT_ID`.
3. Em **API → CORS origins**, adiciona `http://localhost:3000` e o domínio de produção.
4. Entra em `/studio`, autentica-te e cria documentos **Evento**.
5. Só eventos com **Publicado** aparecem no site. Sem data de fim, o evento sai da agenda quando a data de início passa; com data de fim, quando esta passa.

O schema vive em `src/sanity/schemaTypes/evento.ts` e a configuração em `sanity.config.ts`.

## Deploy (Vercel)

1. Liga o repositório à Vercel.
2. Define as mesmas variáveis no painel do projeto (Production e Preview).
3. `NEXT_PUBLIC_SITE_URL` deve ser o domínio final (ex.: `https://www.elvascultura.pt`).
4. Adiciona o domínio de produção às origens CORS do Sanity.
5. Verifica o remetente no Resend (domínio ou endereço autorizado).

## Scripts

- `npm run dev` — desenvolvimento
- `npm run build` — build de produção (`next build --webpack`; o Turbopack do Next 16 entra em conflito com o Studio Sanity)
- `npm run start` — servidor de produção
- `npm run lint` — ESLint

## Estrutura útil

- `src/app/(site)` — páginas públicas
- `src/app/studio` — Studio embebido
- `src/app/api/contacto` — envio do formulário
- `src/app/api/social-template/[slug]` — stub da geração de imagens para redes (Fase 2 futura)
- `src/app/globals.css` — tokens de cor e tipografia
- `src/lib/content.ts` — textos provisórios (Sobre, contacto, privacidade)

Decisões de produto e estado do projeto: [contexto-elvas-cultura.md](contexto-elvas-cultura.md).

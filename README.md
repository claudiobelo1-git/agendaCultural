# Elvas Cultura

Agenda cultural do concelho de Elvas. «A cultura mais perto de ti!»

Stack: Next.js (App Router), TypeScript, Tailwind CSS, Sanity CMS, Resend. Deploy na Vercel.

## Requisitos

- Node.js 20 ou superior
- npm

## Instalação

```bash
npm install
cp .env.example .env.local
```

Preenche as variáveis em `.env.local` (ver abaixo). Depois:

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Variáveis de ambiente

Copia `.env.example` e define:

| Variável | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública (metadata, sitemap, Open Graph) |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Projeto Sanity |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset (ex.: `production`) |
| `NEXT_PUBLIC_SANITY_API_VERSION` | Versão da API Sanity |
| `SANITY_API_READ_TOKEN` | Token de leitura (rascunhos, se necessário) |
| `RESEND_API_KEY` | Envio de emails |
| `RESEND_FROM_EMAIL` | Remetente verificado no Resend |
| `CONTACT_TO_EMAIL` | Destinatário do formulário |
| `NEXT_PUBLIC_INSTAGRAM_URL` | Instagram Elvas Cultura (opcional) |
| `NEXT_PUBLIC_FACEBOOK_URL` | Facebook Elvas Cultura (opcional) |

Nunca commits ficheiros `.env` com segredos.

## Deploy (Vercel)

1. Liga o repositório à Vercel.
2. Define as mesmas variáveis no painel do projeto.
3. O Studio Sanity ficará em `/studio` após a Fase 1.

## Scripts

- `npm run dev` — desenvolvimento
- `npm run build` — build de produção
- `npm run start` — servidor de produção
- `npm run lint` — ESLint

Decisões de produto e estado do projeto: [contexto-elvas-cultura.md](contexto-elvas-cultura.md).

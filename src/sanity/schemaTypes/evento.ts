import { defineField, defineType } from "sanity";
import { CATEGORIAS } from "@/lib/categories";

export const evento = defineType({
  name: "evento",
  title: "Evento",
  type: "document",
  fields: [
    defineField({
      name: "titulo",
      title: "Título",
      type: "string",
      description: "Nome da iniciativa, como aparece na agenda e no cartão.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      description: "Identificador na URL (/agenda/slug). Gerado a partir do título.",
      options: { source: "titulo", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cartaz",
      title: "Cartaz",
      type: "image",
      description: "Imagem principal do evento. Usa o hotspot para definir o recorte.",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          title: "Texto alternativo",
          type: "string",
          description: "Descrição da imagem para leitores de ecrã e SEO.",
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "sinopse",
      title: "Sinopse",
      type: "text",
      rows: 6,
      description: "Texto de apresentação da iniciativa, para a página de detalhe.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "local",
      title: "Local",
      type: "string",
      description: "Espaço ou morada onde decorre o evento.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "dataInicio",
      title: "Data e hora de início",
      type: "datetime",
      description: "Início do evento no fuso de Lisboa. Define a ordenação na agenda.",
      options: { timeFormat: "HH:mm" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "dataFim",
      title: "Data e hora de fim",
      type: "datetime",
      description: "Opcional. Se existir, o evento deixa a agenda quando esta data passar.",
      options: { timeFormat: "HH:mm" },
    }),
    defineField({
      name: "organizacao",
      title: "Organização",
      type: "string",
      description: "Entidade responsável pela iniciativa.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "categoria",
      title: "Categoria",
      type: "string",
      description: "Uma das categorias da agenda (usada nos filtros).",
      options: {
        list: CATEGORIAS.map((item) => ({ title: item.title, value: item.value })),
        layout: "dropdown",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "linkBilhetes",
      title: "Ligação para bilhetes",
      type: "url",
      description: "Opcional. Se preenchido, aparece o botão de bilhetes no detalhe.",
    }),
    defineField({
      name: "linkExtra",
      title: "Ligação extra",
      type: "url",
      description: "Opcional. Página do organizador, Facebook do evento, etc.",
    }),
    defineField({
      name: "destaque",
      title: "Destaque na página inicial",
      type: "boolean",
      description: "Marca o evento para a secção de destaques da home.",
      initialValue: false,
    }),
    defineField({
      name: "publicado",
      title: "Publicado",
      type: "boolean",
      description: "Só eventos publicados aparecem no site.",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "titulo",
      media: "cartaz",
      date: "dataInicio",
      local: "local",
      publicado: "publicado",
    },
    prepare({ title, media, date, local, publicado }) {
      const when = date
        ? new Intl.DateTimeFormat("pt-PT", {
            day: "numeric",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            timeZone: "Europe/Lisbon",
          }).format(new Date(date))
        : "sem data";

      return {
        title: title || "Sem título",
        subtitle: `${publicado ? "Publicado" : "Rascunho"} · ${when} · ${local || "sem local"}`,
        media,
      };
    },
  },
  orderings: [
    {
      title: "Data de início, mais próximos",
      name: "dataInicioAsc",
      by: [{ field: "dataInicio", direction: "asc" }],
    },
    {
      title: "Data de início, mais recentes",
      name: "dataInicioDesc",
      by: [{ field: "dataInicio", direction: "desc" }],
    },
  ],
});

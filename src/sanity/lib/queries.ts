import type { Categoria } from "@/lib/categories";

export type SanityCartaz = {
  alt?: string;
  asset?: { _ref: string; _type: string };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
};

export type Evento = {
  _id: string;
  titulo: string;
  slug: string;
  cartaz: SanityCartaz | null;
  sinopse: string;
  local: string;
  dataInicio: string;
  dataFim: string | null;
  organizacao: string;
  categoria: Categoria;
  linkBilhetes: string | null;
  linkExtra: string | null;
  destaque: boolean;
};

const eventoProjection = `
  _id,
  titulo,
  "slug": slug.current,
  cartaz,
  sinopse,
  local,
  dataInicio,
  dataFim,
  organizacao,
  categoria,
  linkBilhetes,
  linkExtra,
  destaque
`;

export const upcomingEventosQuery = `*[_type == "evento" && publicado == true && coalesce(dataFim, dataInicio) >= $now] | order(dataInicio asc) {${eventoProjection}}`;

export const highlightedEventosQuery = `*[_type == "evento" && publicado == true && destaque == true && coalesce(dataFim, dataInicio) >= $now] | order(dataInicio asc)[0...6] {${eventoProjection}}`;

export const allPublishedEventosQuery = `*[_type == "evento" && publicado == true] | order(dataInicio asc) {${eventoProjection}}`;

export const eventoBySlugQuery = `*[_type == "evento" && publicado == true && slug.current == $slug][0] {${eventoProjection}}`;

export const eventoSlugsQuery = `*[_type == "evento" && publicado == true && defined(slug.current)]{ "slug": slug.current }`;

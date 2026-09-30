import { sanityClient } from "@/sanity/lib/client";
import {
  allPublishedEventosQuery,
  eventoBySlugQuery,
  eventoSlugsQuery,
  highlightedEventosQuery,
  upcomingEventosQuery,
  type Evento,
} from "@/sanity/lib/queries";

function nowIso() {
  return new Date().toISOString();
}

export async function getUpcomingEventos(): Promise<Evento[]> {
  if (!sanityClient) return [];
  return sanityClient.fetch<Evento[]>(upcomingEventosQuery, { now: nowIso() });
}

export async function getHighlightedEventos(): Promise<Evento[]> {
  if (!sanityClient) return [];
  const highlighted = await sanityClient.fetch<Evento[]>(highlightedEventosQuery, {
    now: nowIso(),
  });
  if (highlighted.length > 0) return highlighted;
  const upcoming = await getUpcomingEventos();
  return upcoming.slice(0, 6);
}

export async function getAllPublishedEventos(): Promise<Evento[]> {
  if (!sanityClient) return [];
  return sanityClient.fetch<Evento[]>(allPublishedEventosQuery);
}

export async function getEventoBySlug(slug: string): Promise<Evento | null> {
  if (!sanityClient) return null;
  return sanityClient.fetch<Evento | null>(eventoBySlugQuery, { slug });
}

export async function getEventoSlugs(): Promise<string[]> {
  if (!sanityClient) return [];
  const rows = await sanityClient.fetch<{ slug: string }[]>(eventoSlugsQuery);
  return rows.map((row) => row.slug);
}

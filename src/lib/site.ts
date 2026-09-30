export const site = {
  name: "Elvas Cultura",
  slogan: "A cultura mais perto de ti!",
  description:
    "Agenda Cultural de Elvas. Todos os eventos, atividades e iniciativas do concelho num único espaço. Descobre e aproveita o que Elvas tem para ti!",
  footerBlurb:
    "Agenda Cultural de Elvas. Eventos, atividades e iniciativas do concelho",
  locale: "pt-PT",
  timeZone: "Europe/Lisbon",
} as const;

export function getSiteUrl(): string {
  return process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "http://localhost:3000";
}

export function getInstagramUrl(): string | undefined {
  const url = process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim();
  return url || undefined;
}

export function getFacebookUrl(): string | undefined {
  const url = process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim();
  return url || undefined;
}

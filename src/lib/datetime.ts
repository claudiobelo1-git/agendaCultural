import { site } from "@/lib/site";

const dateFormatter = new Intl.DateTimeFormat(site.locale, {
  timeZone: site.timeZone,
  day: "numeric",
  month: "long",
  year: "numeric",
});

const dateShortFormatter = new Intl.DateTimeFormat(site.locale, {
  timeZone: site.timeZone,
  day: "numeric",
  month: "short",
  year: "numeric",
});

const timeFormatter = new Intl.DateTimeFormat(site.locale, {
  timeZone: site.timeZone,
  hour: "2-digit",
  minute: "2-digit",
});

const monthYearFormatter = new Intl.DateTimeFormat(site.locale, {
  timeZone: site.timeZone,
  month: "long",
  year: "numeric",
});

export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

export function formatDateShort(iso: string): string {
  return dateShortFormatter.format(new Date(iso));
}

export function formatTime(iso: string): string {
  return timeFormatter.format(new Date(iso));
}

export function formatDateTime(iso: string): string {
  return `${formatDate(iso)}, ${formatTime(iso)}`;
}

export function formatDateRange(startIso: string, endIso?: string | null): string {
  if (!endIso) {
    return formatDateTime(startIso);
  }

  const startDay = formatDate(startIso);
  const endDay = formatDate(endIso);

  if (startDay === endDay) {
    return `${startDay}, ${formatTime(startIso)} – ${formatTime(endIso)}`;
  }

  return `${formatDateTime(startIso)} – ${formatDateTime(endIso)}`;
}

export function formatMonthYear(iso: string): string {
  return monthYearFormatter.format(new Date(iso));
}

export function getLisbonParts(iso: string): { year: number; month: number } {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: site.timeZone,
    year: "numeric",
    month: "numeric",
  }).formatToParts(new Date(iso));

  const year = Number(parts.find((part) => part.type === "year")?.value);
  const month = Number(parts.find((part) => part.type === "month")?.value);

  return { year, month };
}

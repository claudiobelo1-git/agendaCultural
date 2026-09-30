import { isCategoria, type Categoria } from "@/lib/categories";
import { getLisbonParts } from "@/lib/datetime";
import type { Evento } from "@/sanity/lib/queries";

export type AgendaFilters = {
  categoria?: Categoria;
  mes?: number;
  ano?: number;
};

export function parseAgendaFilters(searchParams: {
  categoria?: string;
  mes?: string;
  ano?: string;
}): AgendaFilters {
  const categoria =
    searchParams.categoria && isCategoria(searchParams.categoria)
      ? searchParams.categoria
      : undefined;
  const mes = toPositiveInt(searchParams.mes, 1, 12);
  const ano = toPositiveInt(searchParams.ano, 2000, 2100);

  return { categoria, mes, ano };
}

function toPositiveInt(value: string | undefined, min: number, max: number) {
  if (!value) return undefined;
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < min || parsed > max) return undefined;
  return parsed;
}

function eventEndMs(evento: Evento) {
  return new Date(evento.dataFim || evento.dataInicio).getTime();
}

export function filterEventos(eventos: Evento[], filters: AgendaFilters): Evento[] {
  const hasDateFilter = Boolean(filters.mes || filters.ano);
  const now = Date.now();

  return eventos.filter((evento) => {
    if (filters.categoria && evento.categoria !== filters.categoria) {
      return false;
    }

    const { year, month } = getLisbonParts(evento.dataInicio);

    if (filters.ano && year !== filters.ano) return false;
    if (filters.mes && month !== filters.mes) return false;

    if (!hasDateFilter && eventEndMs(evento) < now) {
      return false;
    }

    return true;
  });
}

export function availableYears(eventos: Evento[], mes?: number): number[] {
  const years = new Set<number>();
  for (const evento of eventos) {
    const parts = getLisbonParts(evento.dataInicio);
    if (mes && parts.month !== mes) continue;
    years.add(parts.year);
  }
  return [...years].sort((a, b) => a - b);
}

export function availableMonths(eventos: Evento[], ano?: number): number[] {
  const months = new Set<number>();
  for (const evento of eventos) {
    const parts = getLisbonParts(evento.dataInicio);
    if (ano && parts.year !== ano) continue;
    months.add(parts.month);
  }
  return [...months].sort((a, b) => a - b);
}

export function monthLabel(month: number): string {
  return new Intl.DateTimeFormat("pt-PT", { month: "long" }).format(
    new Date(Date.UTC(2024, month - 1, 1)),
  );
}

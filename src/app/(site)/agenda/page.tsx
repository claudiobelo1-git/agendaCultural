import type { Metadata } from "next";
import { Suspense } from "react";
import { AgendaFilters } from "@/components/AgendaFilters";
import { EventCard } from "@/components/EventCard";
import {
  availableMonths,
  availableYears,
  filterEventos,
  parseAgendaFilters,
} from "@/lib/agenda";
import { getAllPublishedEventos } from "@/sanity/lib/fetch";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Agenda",
  description:
    "Próximos eventos, atividades e iniciativas em Elvas. Filtra por categoria, mês e ano.",
};

type SearchParams = Promise<{
  categoria?: string;
  mes?: string;
  ano?: string;
}>;

export default async function AgendaPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const filters = parseAgendaFilters(params);
  const all = await getAllPublishedEventos();
  const eventos = filterEventos(all, filters);
  const years = availableYears(all, filters.mes);
  const months = availableMonths(all, filters.ano);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <p className="text-xs uppercase tracking-[0.18em] text-accent">Agenda</p>
      <h1 className="mt-3 font-serif text-4xl sm:text-5xl">O que se passa em Elvas</h1>
      <p className="mt-4 max-w-2xl text-ink-muted">
        Por omissão mostramos os próximos eventos. Usa os filtros para explorar por
        categoria, mês ou ano — a ligação da página pode ser partilhada.
      </p>

      <div className="mt-10">
        <Suspense fallback={null}>
          <AgendaFilters months={months} years={years} />
        </Suspense>
      </div>

      {eventos.length === 0 ? (
        <p className="mt-12 text-ink-muted">
          Não há eventos para estes filtros. Experimenta limpar a seleção.
        </p>
      ) : (
        <ul className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {eventos.map((evento) => (
            <li key={evento._id}>
              <EventCard evento={evento} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

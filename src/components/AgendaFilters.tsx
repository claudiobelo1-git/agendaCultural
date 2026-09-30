"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CATEGORIAS } from "@/lib/categories";
import { monthLabel } from "@/lib/agenda";

type Props = {
  months: number[];
  years: number[];
};

export function AgendaFilters({ months, years }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const categoria = searchParams.get("categoria") ?? "";
  const mes = searchParams.get("mes") ?? "";
  const ano = searchParams.get("ano") ?? "";

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const query = params.toString();
    router.push(query ? `${pathname}?${query}` : pathname);
  }

  function clear() {
    router.push(pathname);
  }

  const hasFilters = Boolean(categoria || mes || ano);

  return (
    <form
      className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:flex-wrap sm:items-end"
      onSubmit={(event) => event.preventDefault()}
    >
      <label className="flex min-w-40 flex-1 flex-col gap-2 text-xs uppercase tracking-[0.14em] text-ink-muted">
        Categoria
        <select
          className="border border-line bg-bg px-3 py-2 text-sm normal-case tracking-normal text-ink"
          value={categoria}
          onChange={(event) => update("categoria", event.target.value)}
        >
          <option value="">Todas</option>
          {CATEGORIAS.map((item) => (
            <option key={item.value} value={item.value}>
              {item.title}
            </option>
          ))}
        </select>
      </label>
      <label className="flex min-w-32 flex-1 flex-col gap-2 text-xs uppercase tracking-[0.14em] text-ink-muted">
        Mês
        <select
          className="border border-line bg-bg px-3 py-2 text-sm normal-case tracking-normal text-ink"
          value={mes}
          onChange={(event) => update("mes", event.target.value)}
        >
          <option value="">Todos</option>
          {months.map((month) => (
            <option key={month} value={String(month)}>
              {monthLabel(month)}
            </option>
          ))}
        </select>
      </label>
      <label className="flex min-w-28 flex-1 flex-col gap-2 text-xs uppercase tracking-[0.14em] text-ink-muted">
        Ano
        <select
          className="border border-line bg-bg px-3 py-2 text-sm normal-case tracking-normal text-ink"
          value={ano}
          onChange={(event) => update("ano", event.target.value)}
        >
          <option value="">Todos</option>
          {years.map((year) => (
            <option key={year} value={String(year)}>
              {year}
            </option>
          ))}
        </select>
      </label>
      {hasFilters ? (
        <button
          type="button"
          onClick={clear}
          className="text-sm text-accent underline-offset-4 hover:underline"
        >
          Limpar filtros
        </button>
      ) : null}
    </form>
  );
}

import Link from "next/link";
import { EventCard } from "@/components/EventCard";
import { homeSobreTeaser, sobreContent } from "@/lib/content";
import { getHighlightedEventos } from "@/sanity/lib/fetch";
import { site } from "@/lib/site";

export const revalidate = 60;

export default async function HomePage() {
  const destaques = await getHighlightedEventos();

  return (
    <div>
      <section className="border-b border-line">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm uppercase tracking-[0.22em] text-accent">{site.name}</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight text-ink sm:text-6xl">
            {site.slogan}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-muted">
            {site.description}
          </p>
          <Link
            href="/agenda"
            className="mt-10 inline-flex border border-ink bg-ink px-6 py-3 text-sm uppercase tracking-[0.14em] text-bg transition-colors hover:bg-transparent hover:text-ink"
          >
            Ver agenda
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-serif text-3xl sm:text-4xl">Próximos eventos</h2>
          <Link href="/agenda" className="text-sm uppercase tracking-[0.14em] text-accent">
            Toda a agenda
          </Link>
        </div>
        {destaques.length === 0 ? (
          <p className="mt-8 text-ink-muted">
            Ainda não há eventos publicados. Quando o CMS estiver ligado, os destaques
            aparecem aqui.
          </p>
        ) : (
          <ul className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {destaques.map((evento) => (
              <li key={evento._id}>
                <EventCard evento={evento} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="border-t border-line bg-bg-subtle">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <p className="text-xs uppercase tracking-[0.18em] text-accent">Sobre</p>
          <h2 className="mt-3 font-serif text-3xl">{sobreContent.title}</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-muted">{homeSobreTeaser}</p>
          <Link
            href="/sobre"
            className="mt-6 inline-block text-sm uppercase tracking-[0.14em] text-ink"
          >
            Ler mais
          </Link>
        </div>
      </section>
    </div>
  );
}

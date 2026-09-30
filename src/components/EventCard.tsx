import Image from "next/image";
import Link from "next/link";
import { categoriaLabels } from "@/lib/categories";
import { formatDateShort } from "@/lib/datetime";
import { urlForImage } from "@/sanity/lib/image";
import type { Evento } from "@/sanity/lib/queries";

export function EventCard({ evento }: { evento: Evento }) {
  const imageUrl = evento.cartaz
    ? urlForImage(evento.cartaz)?.width(900).height(900).fit("crop").url()
    : null;
  const alt = evento.cartaz?.alt || evento.titulo;

  return (
    <article className="flex h-full flex-col border border-line bg-bg">
      <Link
        href={`/agenda/${evento.slug}`}
        className="flex h-full flex-col focus-visible:outline-none"
      >
        <div className="relative aspect-square bg-bg-subtle">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={alt}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center text-sm text-ink-muted">
              Sem cartaz
            </div>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2 bg-bg px-4 py-4">
          <h2 className="font-serif text-xl leading-snug text-ink sm:text-2xl">
            {evento.titulo}
          </h2>
          <p className="text-sm text-ink-muted">{evento.local}</p>
          <p className="text-sm text-ink">{formatDateShort(evento.dataInicio)}</p>
          <p className="mt-auto pt-2 text-xs uppercase tracking-[0.16em] text-accent">
            {categoriaLabels[evento.categoria]}
          </p>
        </div>
      </Link>
    </article>
  );
}

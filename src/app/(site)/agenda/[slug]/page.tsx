import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { categoriaLabels } from "@/lib/categories";
import { formatDateRange } from "@/lib/datetime";
import { getSiteUrl, site } from "@/lib/site";
import { getEventoBySlug, getEventoSlugs } from "@/sanity/lib/fetch";
import { urlForImage } from "@/sanity/lib/image";

export const revalidate = 60;

type Params = Promise<{ slug: string }>;

export async function generateStaticParams() {
  const slugs = await getEventoSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { slug } = await params;
  const evento = await getEventoBySlug(slug);
  if (!evento) {
    return { title: "Evento" };
  }

  const image = evento.cartaz
    ? urlForImage(evento.cartaz)?.width(1200).height(630).fit("crop").url()
    : undefined;

  return {
    title: evento.titulo,
    description: evento.sinopse,
    openGraph: {
      title: evento.titulo,
      description: evento.sinopse,
      type: "article",
      locale: "pt_PT",
      images: image ? [{ url: image, alt: evento.cartaz?.alt || evento.titulo }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: evento.titulo,
      description: evento.sinopse,
      images: image ? [image] : undefined,
    },
  };
}

export default async function EventoPage({ params }: { params: Params }) {
  const { slug } = await params;
  const evento = await getEventoBySlug(slug);
  if (!evento) notFound();

  const imageUrl = evento.cartaz
    ? urlForImage(evento.cartaz)?.width(1600).height(1600).fit("max").url()
    : null;
  const ogImage = evento.cartaz
    ? urlForImage(evento.cartaz)?.width(1200).height(630).fit("crop").url()
    : undefined;
  const pageUrl = `${getSiteUrl()}/agenda/${evento.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: evento.titulo,
    description: evento.sinopse,
    startDate: evento.dataInicio,
    endDate: evento.dataFim || evento.dataInicio,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    image: ogImage ? [ogImage] : undefined,
    url: pageUrl,
    location: {
      "@type": "Place",
      name: evento.local,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Elvas",
        addressCountry: "PT",
      },
    },
    organizer: {
      "@type": "Organization",
      name: evento.organizacao,
    },
    offers: evento.linkBilhetes
      ? {
          "@type": "Offer",
          url: evento.linkBilhetes,
          availability: "https://schema.org/InStock",
        }
      : undefined,
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/agenda"
        className="text-sm uppercase tracking-[0.14em] text-ink-muted"
      >
        Voltar à agenda
      </Link>
      <p className="mt-8 text-xs uppercase tracking-[0.18em] text-accent">
        {categoriaLabels[evento.categoria]}
      </p>
      <h1 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">
        {evento.titulo}
      </h1>
      <dl className="mt-8 grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="uppercase tracking-[0.14em] text-ink-muted">Data e hora</dt>
          <dd className="mt-1 text-ink">
            {formatDateRange(evento.dataInicio, evento.dataFim)}
          </dd>
        </div>
        <div>
          <dt className="uppercase tracking-[0.14em] text-ink-muted">Local</dt>
          <dd className="mt-1 text-ink">{evento.local}</dd>
        </div>
        <div>
          <dt className="uppercase tracking-[0.14em] text-ink-muted">Organização</dt>
          <dd className="mt-1 text-ink">{evento.organizacao}</dd>
        </div>
      </dl>

      {imageUrl ? (
        <div className="relative mt-10 aspect-square overflow-hidden bg-bg-subtle">
          <Image
            src={imageUrl}
            alt={evento.cartaz?.alt || evento.titulo}
            fill
            priority
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
          />
        </div>
      ) : null}

      <div className="mt-10 space-y-4 text-lg leading-relaxed text-ink">
        {evento.sinopse.split("\n").map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        {evento.linkBilhetes ? (
          <a
            href={evento.linkBilhetes}
            rel="noopener noreferrer"
            target="_blank"
            className="inline-flex border border-ink bg-ink px-6 py-3 text-sm uppercase tracking-[0.14em] text-bg"
          >
            Bilhetes
          </a>
        ) : null}
        {evento.linkExtra ? (
          <a
            href={evento.linkExtra}
            rel="noopener noreferrer"
            target="_blank"
            className="inline-flex border border-ink px-6 py-3 text-sm uppercase tracking-[0.14em] text-ink"
          >
            Mais informação
          </a>
        ) : null}
      </div>
      <p className="sr-only">{site.name}</p>
    </article>
  );
}

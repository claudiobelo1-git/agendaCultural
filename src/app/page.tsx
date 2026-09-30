import Link from "next/link";
import { site } from "@/lib/site";

export default function HomePage() {
  return (
    <div>
      <section className="border-b border-line">
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-28">
          <p className="text-sm uppercase tracking-[0.22em] text-accent">
            {site.name}
          </p>
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
    </div>
  );
}

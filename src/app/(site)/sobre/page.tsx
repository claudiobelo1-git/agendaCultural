import type { Metadata } from "next";
import { sobreContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Sobre",
  description:
    "O Elvas Cultura é a agenda cultural do concelho de Elvas: eventos, atividades e iniciativas num único espaço.",
};

export default function SobrePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="text-xs uppercase tracking-[0.18em] text-accent">
        {sobreContent.kicker}
      </p>
      <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">
        {sobreContent.title}
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-ink">{sobreContent.intro}</p>
      {sobreContent.paragraphs.map((paragraph) => (
        <p key={paragraph} className="mt-5 leading-relaxed text-ink-muted">
          {paragraph}
        </p>
      ))}
    </article>
  );
}

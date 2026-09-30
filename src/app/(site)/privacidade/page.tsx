import type { Metadata } from "next";
import { privacyContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Como o Elvas Cultura trata os dados pessoais recolhidos no site.",
};

export default function PrivacidadePage() {
  return (
    <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="text-xs uppercase tracking-[0.18em] text-accent">
        {privacyContent.kicker}
      </p>
      <h1 className="mt-4 font-serif text-4xl sm:text-5xl">{privacyContent.title}</h1>
      <p className="mt-4 text-sm text-ink-muted">{privacyContent.updated}</p>
      {privacyContent.paragraphs.map((paragraph) => (
        <p key={paragraph} className="mt-5 leading-relaxed text-ink-muted">
          {paragraph}
        </p>
      ))}
    </article>
  );
}

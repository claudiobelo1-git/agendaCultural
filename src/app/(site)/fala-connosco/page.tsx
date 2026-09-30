import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { contactContent } from "@/lib/content";

export const metadata: Metadata = {
  title: "Fala connosco",
  description:
    "Publica atividades na agenda de Elvas, apoia o projeto ou fala connosco sobre publicidade.",
};

export default function FalaConnoscoPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
      <p className="text-xs uppercase tracking-[0.18em] text-accent">
        {contactContent.kicker}
      </p>
      <h1 className="mt-4 font-serif text-4xl sm:text-5xl">{contactContent.title}</h1>

      <section className="mt-12">
        <h2 className="font-serif text-2xl">{contactContent.publish.title}</h2>
        <p className="mt-3 leading-relaxed text-ink-muted">{contactContent.publish.body}</p>
      </section>
      <section className="mt-10">
        <h2 className="font-serif text-2xl">{contactContent.advertising.title}</h2>
        <p className="mt-3 leading-relaxed text-ink-muted">
          {contactContent.advertising.body}
        </p>
      </section>

      <ContactForm />
    </div>
  );
}

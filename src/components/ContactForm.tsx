"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { contactSchema, contactTypes } from "@/lib/contact-schema";

const empty = {
  nome: "",
  email: "",
  telemovel: "",
  quantidade: "",
  descricao: "",
  tipo: "",
  consentimento: false,
  website: "",
};

export function ContactForm() {
  const [values, setValues] = useState(empty);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    const parsed = contactSchema.safeParse({
      ...values,
      quantidade: values.quantidade === "" ? undefined : Number(values.quantidade),
      descricao: values.descricao || undefined,
      tipo: values.tipo || undefined,
      consentimento: values.consentimento ? true : undefined,
    });

    if (!parsed.success) {
      setFieldErrors(parsed.error.flatten().fieldErrors);
      setStatus("error");
      setMessage("Revisa os campos assinalados.");
      return;
    }

    setFieldErrors({});

    try {
      const response = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, website: values.website }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        fieldErrors?: Record<string, string[]>;
      };

      if (!response.ok || !data.ok) {
        if (data.fieldErrors) setFieldErrors(data.fieldErrors);
        setStatus("error");
        setMessage(data.message || "Não foi possível enviar a mensagem.");
        return;
      }

      setStatus("success");
      setMessage("Mensagem enviada. Obrigado pelo contacto — respondemos assim que possível.");
      setValues(empty);
    } catch {
      setStatus("error");
      setMessage("Ocorreu um erro de rede. Tenta novamente.");
    }
  }

  return (
    <form className="mt-10 space-y-5" onSubmit={onSubmit} noValidate>
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(event) =>
              setValues((current) => ({ ...current, website: event.target.value }))
            }
          />
        </label>
      </div>

      <Field label="Nome" error={fieldErrors.nome?.[0]}>
        <input
          name="nome"
          autoComplete="name"
          required
          value={values.nome}
          onChange={(event) => setValues((current) => ({ ...current, nome: event.target.value }))}
          className={inputClass}
        />
      </Field>
      <Field label="Email" error={fieldErrors.email?.[0]}>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          value={values.email}
          onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
          className={inputClass}
        />
      </Field>
      <Field label="Telemóvel" error={fieldErrors.telemovel?.[0]}>
        <input
          name="telemovel"
          type="tel"
          autoComplete="tel"
          required
          value={values.telemovel}
          onChange={(event) =>
            setValues((current) => ({ ...current, telemovel: event.target.value }))
          }
          className={inputClass}
        />
      </Field>
      <Field
        label="Quantidade de atividades que queres colocar"
        error={fieldErrors.quantidade?.[0]}
      >
        <input
          name="quantidade"
          type="number"
          min={0}
          max={500}
          required
          value={values.quantidade}
          onChange={(event) =>
            setValues((current) => ({ ...current, quantidade: event.target.value }))
          }
          className={inputClass}
        />
      </Field>
      <Field label="Descrição (opcional)" error={fieldErrors.descricao?.[0]}>
        <textarea
          name="descricao"
          rows={5}
          value={values.descricao}
          onChange={(event) =>
            setValues((current) => ({ ...current, descricao: event.target.value }))
          }
          className={inputClass}
        />
      </Field>
      <Field label="Tipo de contacto" error={fieldErrors.tipo?.[0]}>
        <select
          name="tipo"
          required
          value={values.tipo}
          onChange={(event) => setValues((current) => ({ ...current, tipo: event.target.value }))}
          className={inputClass}
        >
          <option value="">Seleciona…</option>
          {contactTypes.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </Field>
      <div>
        <label className="flex items-start gap-3 text-sm leading-relaxed text-ink">
          <input
            type="checkbox"
            className="mt-1"
            checked={values.consentimento}
            onChange={(event) =>
              setValues((current) => ({ ...current, consentimento: event.target.checked }))
            }
          />
          <span>
            Li e aceito a{" "}
            <Link href="/privacidade" className="text-accent underline underline-offset-2">
              política de privacidade
            </Link>
            .
          </span>
        </label>
        {fieldErrors.consentimento?.[0] ? (
          <p className="mt-1 text-sm text-red-700">{fieldErrors.consentimento[0]}</p>
        ) : null}
      </div>

      {message ? (
        <p
          role="status"
          className={status === "success" ? "text-sm text-accent" : "text-sm text-red-700"}
        >
          {message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status === "loading"}
        className="border border-ink bg-ink px-6 py-3 text-sm uppercase tracking-[0.14em] text-bg disabled:opacity-60"
      >
        {status === "loading" ? "A enviar…" : "Enviar"}
      </button>
    </form>
  );
}

const inputClass =
  "w-full border border-line bg-bg px-3 py-2 text-base text-ink";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-2">
      <span className="text-xs uppercase tracking-[0.14em] text-ink-muted">{label}</span>
      {children}
      {error ? <span className="block text-sm text-red-700">{error}</span> : null}
    </label>
  );
}

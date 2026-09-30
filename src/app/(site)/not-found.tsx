import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <h1 className="font-serif text-4xl">Página não encontrada</h1>
      <p className="mt-4 text-ink-muted">
        Esta ligação não existe ou o evento já não está publicado.
      </p>
      <Link href="/agenda" className="mt-8 inline-block text-sm uppercase tracking-[0.14em]">
        Ir para a agenda
      </Link>
    </div>
  );
}

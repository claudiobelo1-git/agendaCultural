import Link from "next/link";
import { Logo } from "@/components/Logo";

const nav = [
  { href: "/agenda", label: "Agenda" },
  { href: "/sobre", label: "Sobre" },
  { href: "/fala-connosco", label: "Fala connosco" },
] as const;

export function Header() {
  return (
    <header className="bg-header text-header-fg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-5 sm:px-6">
        <Link href="/" className="rounded-sm focus-visible:outline-none">
          <Logo />
          <span className="sr-only">Elvas Cultura — início</span>
        </Link>
        <nav aria-label="Principal">
          <ul className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 text-xs font-medium uppercase tracking-[0.16em] sm:text-sm">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-header-fg/90 transition-colors hover:text-header-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}

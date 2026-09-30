import Link from "next/link";
import { Logo } from "@/components/Logo";
import { NavLinks } from "@/components/NavLinks";

export function Header() {
  return (
    <header className="bg-header text-header-fg">
      <a
        href="#conteudo"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:left-4 focus-visible:top-4 focus-visible:z-50 focus-visible:bg-bg focus-visible:px-3 focus-visible:py-2 focus-visible:text-ink"
      >
        Saltar para o conteúdo
      </a>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-5 sm:px-6">
        <Link href="/" className="rounded-sm">
          <Logo />
          <span className="sr-only">Elvas Cultura — início</span>
        </Link>
        <NavLinks />
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/agenda", label: "Agenda" },
  { href: "/sobre", label: "Sobre" },
  { href: "/fala-connosco", label: "Fala connosco" },
] as const;

export function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Principal">
      <ul className="flex flex-wrap items-center justify-end gap-x-6 gap-y-2 text-xs font-medium uppercase tracking-[0.16em] sm:text-sm">
        {nav.map((item) => {
          const current =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={
                  current
                    ? "text-header-fg"
                    : "text-header-fg/90 transition-colors hover:text-header-fg"
                }
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

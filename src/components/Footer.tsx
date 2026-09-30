import Link from "next/link";
import { getFacebookUrl, getInstagramUrl, site } from "@/lib/site";

export function Footer() {
  const instagram = getInstagramUrl();
  const facebook = getFacebookUrl();

  return (
    <footer className="mt-auto bg-header text-header-fg">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p className="max-w-md text-sm leading-relaxed text-header-muted">
          {site.footerBlurb}
        </p>
        <div className="flex flex-col items-start gap-4 sm:items-end">
          {(instagram || facebook) && (
            <ul className="flex items-center gap-4" aria-label="Redes sociais">
              {facebook ? (
                <li>
                  <a
                    href={facebook}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-sm uppercase tracking-wider"
                  >
                    Facebook
                    <span className="sr-only"> Elvas Cultura (abre numa nova janela)</span>
                  </a>
                </li>
              ) : null}
              {instagram ? (
                <li>
                  <a
                    href={instagram}
                    rel="noopener noreferrer"
                    target="_blank"
                    className="text-sm uppercase tracking-wider"
                  >
                    Instagram
                    <span className="sr-only"> Elvas Cultura (abre numa nova janela)</span>
                  </a>
                </li>
              ) : null}
            </ul>
          )}
          <Link href="/privacidade" className="text-sm text-header-muted">
            Política de privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}

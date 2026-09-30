export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <svg
        aria-hidden="true"
        viewBox="0 0 48 48"
        className="h-10 w-10 shrink-0 text-header-fg"
      >
        <g fill="none" stroke="currentColor" strokeWidth="1.4">
          <path d="M24 6 42 16v16L24 42 6 32V16Z" />
          <path d="M24 6v36M6 16l18 10 18-10M6 32l18-10 18 10" />
        </g>
      </svg>
      <span className="flex flex-col leading-tight">
        <span className="font-serif text-lg tracking-wide text-header-fg sm:text-xl">
          Elvas Cultura
        </span>
        <span className="text-[0.65rem] font-sans uppercase tracking-[0.18em] text-header-muted">
          Agenda cultural
        </span>
      </span>
    </span>
  );
}

import type { ReactNode } from "react";

interface PageHeaderProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  children?: ReactNode;
}

/** Cabeçalho comum das quatro áreas, baseado em Referências Visuais. */
export function PageHeader({ eyebrow, title, description, children }: PageHeaderProps) {
  return (
    <header className="pt-1 pb-4 flex flex-col lg:flex-row lg:items-end justify-between gap-4 border-b border-outline-variant/20">
      <div className="min-w-0 space-y-1.5">
        <div className="flex items-center gap-2">
          <span className="size-2 shrink-0 rounded-full bg-secondary" aria-hidden="true" />
          <span className="font-body-md text-xs text-secondary font-semibold uppercase tracking-wider">{eyebrow}</span>
        </div>
        <h1 className="font-headline-md text-2xl sm:text-3xl text-on-surface font-bold tracking-tight">{title}</h1>
        <p className="editorial-body max-w-2xl">{description}</p>
      </div>
      {children && <div className="flex flex-wrap items-center gap-2.5 lg:max-w-sm shrink-0">{children}</div>}
    </header>
  );
}

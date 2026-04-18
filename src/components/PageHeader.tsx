import { Breadcrumbs, type BreadcrumbItem } from './Breadcrumbs'

type PageHeaderProps = {
  breadcrumbItems: BreadcrumbItem[]
  title: string
  description: string
  eyebrow?: string
  metaLine?: string
}

export function PageHeader({
  breadcrumbItems,
  title,
  description,
  eyebrow,
  metaLine,
}: PageHeaderProps) {
  return (
    <header className="relative overflow-hidden rounded-2xl border border-surface-panel-border bg-surface-panel p-5 shadow-sm shadow-fume-950/10 dark:shadow-none sm:p-6 lg:p-7">
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-500/30 to-transparent"
        aria-hidden
      />
      <div className="relative space-y-5">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex gap-3 sm:gap-4">
          <span
            className="mt-0.5 w-1 shrink-0 self-stretch min-h-[2.5rem] rounded-full bg-gradient-to-b from-gold-400 via-gold-500 to-gold-700/55"
            aria-hidden
          />
          <div className="min-w-0 flex-1 space-y-2">
            {eyebrow ? (
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-gold-600 dark:text-gold-400">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="text-balance text-2xl font-bold tracking-tight text-gold-950 dark:text-gold-200 sm:text-[1.65rem] sm:leading-snug">
              {title}
            </h1>
            {metaLine ? (
              <p className="text-sm text-fume-600 dark:text-fume-400">{metaLine}</p>
            ) : null}
            <p className="max-w-2xl text-sm leading-relaxed text-fume-600 dark:text-fume-400">
              {description}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}

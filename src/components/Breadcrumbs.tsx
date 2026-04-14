import { Link } from 'react-router-dom'

export type BreadcrumbItem = {
  label: string
  to?: string
}

type BreadcrumbsProps = {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className = '' }: BreadcrumbsProps) {
  if (items.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-x-1 gap-y-1 text-sm text-fume-500 dark:text-fume-400">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {index > 0 ? (
                <span className="text-fume-300 dark:text-fume-600" aria-hidden>
                  /
                </span>
              ) : null}
              {item.to && !isLast ? (
                <Link
                  to={item.to}
                  className="font-medium text-fume-700 underline-offset-4 hover:text-gold-700 hover:underline dark:text-fume-300 dark:hover:text-gold-400"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  className={
                    isLast
                      ? 'font-medium text-fume-900 dark:text-fume-100'
                      : undefined
                  }
                  aria-current={isLast ? 'page' : undefined}
                >
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

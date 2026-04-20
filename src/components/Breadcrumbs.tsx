import { Link } from 'react-router-dom'
import {
  breadcrumbCurrentClass,
  breadcrumbLinkClass,
  breadcrumbListClass,
  breadcrumbSeparatorClass,
} from './breadcrumbStyles'

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
      <ol className={breadcrumbListClass}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-1">
              {index > 0 ? (
                <span className={breadcrumbSeparatorClass} aria-hidden>
                  /
                </span>
              ) : null}
              {item.to && !isLast ? (
                <Link to={item.to} className={breadcrumbLinkClass}>
                  {item.label}
                </Link>
              ) : (
                <span
                  className={isLast ? breadcrumbCurrentClass : undefined}
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

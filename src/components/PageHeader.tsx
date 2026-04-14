import { Breadcrumbs, type BreadcrumbItem } from './Breadcrumbs'

type PageHeaderProps = {
  breadcrumbItems: BreadcrumbItem[]
  title: string
  description: string
}

export function PageHeader({
  breadcrumbItems,
  title,
  description,
}: PageHeaderProps) {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbItems} />
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-fume-950 dark:text-fume-50">
          {title}
        </h2>
        <p className="mt-1 text-sm text-fume-600 dark:text-fume-400">
          {description}
        </p>
      </div>
    </div>
  )
}

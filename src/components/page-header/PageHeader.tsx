import { Breadcrumbs, type BreadcrumbItem } from '../breadcrumbs/Breadcrumbs'
import {
  pageHeaderAccentBarClass,
  pageHeaderBottomGlowClass,
  pageHeaderDescriptionClass,
  pageHeaderEyebrowClass,
  pageHeaderInnerClass,
  pageHeaderMetaLineClass,
  pageHeaderShellClass,
  pageHeaderTextBlockClass,
  pageHeaderTitleClass,
  pageHeaderTitleRowClass,
} from './pageHeaderStyles'

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
    <header className={pageHeaderShellClass}>
      <div className={pageHeaderBottomGlowClass} aria-hidden />
      <div className={pageHeaderInnerClass}>
        <Breadcrumbs items={breadcrumbItems} />
        <div className={pageHeaderTitleRowClass}>
          <span className={pageHeaderAccentBarClass} aria-hidden />
          <div className={pageHeaderTextBlockClass}>
            {eyebrow ? <p className={pageHeaderEyebrowClass}>{eyebrow}</p> : null}
            <h1 className={pageHeaderTitleClass}>{title}</h1>
            {metaLine ? <p className={pageHeaderMetaLineClass}>{metaLine}</p> : null}
            <p className={pageHeaderDescriptionClass}>{description}</p>
          </div>
        </div>
      </div>
    </header>
  )
}

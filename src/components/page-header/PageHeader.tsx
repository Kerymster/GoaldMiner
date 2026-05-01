import type { ReactNode } from 'react'
import { Breadcrumbs, type BreadcrumbItem } from '../breadcrumbs/Breadcrumbs'
import {
  pageHeaderAccentBarClass,
  pageHeaderAfterTitleSlotClass,
  pageHeaderBottomGlowClass,
  pageHeaderDescriptionClass,
  pageHeaderEyebrowClass,
  pageHeaderHeroEndClass,
  pageHeaderHeroMainClass,
  pageHeaderHeroSplitRowClass,
  pageHeaderInnerClass,
  pageHeaderMetaLineClass,
  pageHeaderShellClass,
  pageHeaderTextBlockClass,
  pageHeaderTitleClass,
  pageHeaderTitleRowClass,
  pageHeaderTopGlowClass,
} from './pageHeaderStyles'

type PageHeaderProps = {
  breadcrumbItems: BreadcrumbItem[]
  title: string
  description: string
  eyebrow?: string
  metaLine?: string
  /** Rendered under the title, before `metaLine` — for compact status / metadata rows. */
  afterTitle?: ReactNode
  /** Trailing column on large screens (e.g. record summary card). Omit for default single-column title row. */
  end?: ReactNode
}

export function PageHeader({
  breadcrumbItems,
  title,
  description,
  eyebrow,
  metaLine,
  afterTitle,
  end,
}: PageHeaderProps) {
  const titleStack = (
    <>
      {eyebrow ? <p className={pageHeaderEyebrowClass}>{eyebrow}</p> : null}
      <h1 className={pageHeaderTitleClass}>{title}</h1>
      {afterTitle ? <div className={pageHeaderAfterTitleSlotClass}>{afterTitle}</div> : null}
      {metaLine ? <p className={pageHeaderMetaLineClass}>{metaLine}</p> : null}
      <p className={pageHeaderDescriptionClass}>{description}</p>
    </>
  )

  return (
    <header className={pageHeaderShellClass}>
      <div className={pageHeaderTopGlowClass} aria-hidden />
      <div className={pageHeaderBottomGlowClass} aria-hidden />
      <div className={pageHeaderInnerClass}>
        <Breadcrumbs items={breadcrumbItems} />
        {end ? (
          <div className={pageHeaderHeroSplitRowClass}>
            <div className={pageHeaderHeroMainClass}>
              <span className={pageHeaderAccentBarClass} aria-hidden />
              <div className={pageHeaderTextBlockClass}>{titleStack}</div>
            </div>
            <div className={pageHeaderHeroEndClass}>{end}</div>
          </div>
        ) : (
          <div className={pageHeaderTitleRowClass}>
            <span className={pageHeaderAccentBarClass} aria-hidden />
            <div className={pageHeaderTextBlockClass}>{titleStack}</div>
          </div>
        )}
      </div>
    </header>
  )
}

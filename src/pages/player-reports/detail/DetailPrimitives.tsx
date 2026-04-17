import type { ReactNode } from 'react'
import {
  detailSectionCard,
  detailSectionTitle,
  detailSectionTitleAccent,
  detailSectionTitleLabel,
  detailSubTitle,
  detailSubTitleMark,
  detailRowLabel,
  detailRowValue,
} from './detailStyles'

export function DetailSection({
  title,
  children,
  id,
}: {
  title: string
  children: ReactNode
  id?: string
}) {
  return (
    <section id={id} className={detailSectionCard}>
      <h2 className={detailSectionTitle}>
        <span className={detailSectionTitleAccent} aria-hidden />
        <span className={detailSectionTitleLabel}>{title}</span>
      </h2>
      <div className="pt-5">{children}</div>
    </section>
  )
}

export function DetailSubheading({ children }: { children: ReactNode }) {
  return (
    <h3 className={detailSubTitle}>
      <span className={detailSubTitleMark} aria-hidden />
      {children}
    </h3>
  )
}

export function DetailRow({ label, value }: { label: string; value: string }) {
  const v = value.trim()
  if (!v) return null
  return (
    <div>
      <p className={detailRowLabel}>{label}</p>
      <p className={`${detailRowValue} whitespace-pre-wrap`}>{v}</p>
    </div>
  )
}

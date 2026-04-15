import type { ReactNode } from 'react'
import {
  detailSectionCard,
  detailSectionTitle,
  detailSubTitle,
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
      <h2 className={detailSectionTitle}>{title}</h2>
      <div className="pt-4">{children}</div>
    </section>
  )
}

export function DetailSubheading({ children }: { children: ReactNode }) {
  return <h3 className={detailSubTitle}>{children}</h3>
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

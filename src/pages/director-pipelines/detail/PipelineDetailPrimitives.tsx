import type { ReactNode } from 'react'
import type { DirectorPipelineStatus } from '../../../types/directorPipeline'
import {
  pipelineDetailViewBodyClass,
  pipelineDetailViewCalloutClass,
  pipelineDetailViewCardClass,
  pipelineDetailViewInsetClass,
  pipelineDetailViewMutedClass,
  pipelineDetailViewRowLabelClass,
  pipelineDetailViewRowValueClass,
  pipelineDetailViewStatusActiveClass,
  pipelineDetailViewStatusArchivedClass,
  pipelineDetailViewSubheadingClass,
  pipelineDetailViewTitleAccentClass,
  pipelineDetailViewTitleLabelClass,
  pipelineDetailViewTitleRowClass,
} from '../directorPipelineStyles'

export function PipelineDetailSection({
  title,
  children,
  id,
}: {
  title: string
  children: ReactNode
  id?: string
}) {
  return (
    <section id={id} className={pipelineDetailViewCardClass}>
      <h2 className={pipelineDetailViewTitleRowClass}>
        <span className={pipelineDetailViewTitleAccentClass} aria-hidden />
        <span className={pipelineDetailViewTitleLabelClass}>{title}</span>
      </h2>
      <div className={pipelineDetailViewBodyClass}>{children}</div>
    </section>
  )
}

export function PipelineDetailSubheading({ children }: { children: ReactNode }) {
  return <h3 className={pipelineDetailViewSubheadingClass}>{children}</h3>
}

export function PipelineDetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className={pipelineDetailViewRowLabelClass}>{label}</p>
      <p className={`${pipelineDetailViewRowValueClass} whitespace-pre-wrap`}>{value}</p>
    </div>
  )
}

export function PipelineDetailStatus({ status }: { status: DirectorPipelineStatus }) {
  const label = status === 'active' ? 'Active' : 'Archived'
  const cls = status === 'active' ? pipelineDetailViewStatusActiveClass : pipelineDetailViewStatusArchivedClass
  return <span className={cls}>{label}</span>
}

/** M EUR helper or similar short callout inside a section. */
export function PipelineDetailCallout({ children }: { children: ReactNode }) {
  return <p className={pipelineDetailViewCalloutClass}>{children}</p>
}

/**
 * Free-text block with optional bullet styling when every non-empty line starts with “-”.
 */
export function PipelineDetailMultiline({ label, text }: { label: string; text: string }) {
  const raw = (text ?? '').trim()
  return (
    <div className="mt-8 first:mt-0">
      <PipelineDetailSubheading>{label}</PipelineDetailSubheading>
      <div className={`mt-3 ${pipelineDetailViewInsetClass}`}>
        <MultilineBody raw={raw} />
      </div>
    </div>
  )
}

function MultilineBody({ raw }: { raw: string }) {
  if (!raw) {
    return <p className={pipelineDetailViewMutedClass}>—</p>
  }
  const lines = raw.split(/\r?\n/).map((l) => l.trim()).filter(Boolean)
  const bulletPattern = /^\s*-\s*/
  const allBullets = lines.length > 0 && lines.every((l) => bulletPattern.test(l))
  if (allBullets) {
    return (
      <ul className="space-y-2.5">
        {lines.map((line, i) => (
          <li
            key={i}
            className="flex gap-3 text-sm leading-relaxed text-fume-800 dark:text-fume-200"
          >
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-500 dark:bg-gold-400"
              aria-hidden
            />
            <span>{line.replace(bulletPattern, '')}</span>
          </li>
        ))}
      </ul>
    )
  }
  return <p className={`${pipelineDetailViewRowValueClass} whitespace-pre-wrap`}>{raw}</p>
}

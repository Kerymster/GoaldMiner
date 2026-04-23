import type { DirectorPipeline } from '../../../types/directorPipeline'
import {
  pipelineDetailHeaderRecordFieldLabelClass,
  pipelineDetailHeaderRecordPanelClass,
  pipelineDetailHeaderRecordPanelTitleClass,
  pipelineDetailHeaderRecordValueEmphasisClass,
  pipelineDetailViewRowValueClass,
} from '../directorPipelineStyles'
import { PipelineDetailStatus } from './PipelineDetailPrimitives'

function fallback(value: string | number | null | undefined): string {
  if (value == null || value === '') return '—'
  return String(value)
}

function formatUpdatedAt(iso: string): string {
  try {
    return new Date(iso).toLocaleString('en-US', { dateStyle: 'medium', timeStyle: 'short' })
  } catch {
    return iso
  }
}

type Props = {
  pipeline: DirectorPipeline
  /** Same string as the page `<h1>` (title or club fallback). */
  headingTitle: string
}

/**
 * Right-rail summary in the pipeline detail `PageHeader` — status, timestamps, saved title when it adds information.
 */
export function PipelineDetailHeaderRecord({ pipeline, headingTitle }: Props) {
  const saved = pipeline.title?.trim() ?? ''
  const savedTitleRedundant = saved.length > 0 && saved === headingTitle

  return (
    <aside className={pipelineDetailHeaderRecordPanelClass} aria-label="Pipeline record">
      <p className={pipelineDetailHeaderRecordPanelTitleClass}>Pipeline record</p>
      <dl className="mt-3.5 space-y-4">
        <div>
          <dt className={pipelineDetailHeaderRecordFieldLabelClass}>Status</dt>
          <dd className="mt-2">
            <PipelineDetailStatus status={pipeline.status} />
          </dd>
        </div>
        <div>
          <dt className={pipelineDetailHeaderRecordFieldLabelClass}>Last updated</dt>
          <dd className={pipelineDetailHeaderRecordValueEmphasisClass}>{formatUpdatedAt(pipeline.updatedAt)}</dd>
        </div>
        {!savedTitleRedundant ? (
          <div>
            <dt className={pipelineDetailHeaderRecordFieldLabelClass}>Saved title</dt>
            <dd className={`${pipelineDetailViewRowValueClass} mt-1.5 break-words`}>
              {fallback(pipeline.title ?? undefined)}
            </dd>
          </div>
        ) : null}
      </dl>
    </aside>
  )
}

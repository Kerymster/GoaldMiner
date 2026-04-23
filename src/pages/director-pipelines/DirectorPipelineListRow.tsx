import { Link } from 'react-router-dom'
import { buildMandateBrief, type DirectorPipeline } from '../../types/directorPipeline'
import { formatPipelineListDate } from './directorPipelineListFormat'
import {
  pipelineCardClass,
  pipelineDangerButtonClass,
  pipelinePrimaryButtonClass,
  pipelineSecondaryButtonClass,
} from './directorPipelineStyles'

type Props = {
  row: DirectorPipeline
  onRequestArchive: () => void
  onRequestActivate: () => void
  onRequestDelete: () => void
}

export function DirectorPipelineListRow({
  row,
  onRequestArchive,
  onRequestActivate,
  onRequestDelete,
}: Props) {
  return (
    <li className={pipelineCardClass}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-fume-900 dark:text-fume-100">
            {row.title?.trim() || row.context.club.clubName}
          </p>
          <p className="text-xs text-fume-500 dark:text-fume-400">
            {row.status.toUpperCase()} · Updated {formatPipelineListDate(row.updatedAt)}
          </p>
          <p className="text-xs text-fume-600 dark:text-fume-300">{buildMandateBrief(row.context)}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to={`/director-pipelines/${encodeURIComponent(row.id)}`}
            className={pipelineSecondaryButtonClass}
          >
            View
          </Link>
          <Link
            to={`/director-pipelines/edit?id=${encodeURIComponent(row.id)}`}
            className={pipelineSecondaryButtonClass}
          >
            Edit
          </Link>
          {row.status === 'active' ? (
            <button type="button" onClick={onRequestArchive} className={pipelineSecondaryButtonClass}>
              Archive
            </button>
          ) : (
            <>
              <button type="button" onClick={onRequestActivate} className={pipelinePrimaryButtonClass}>
                Activate
              </button>
              <button type="button" onClick={onRequestDelete} className={pipelineDangerButtonClass}>
                Delete
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  )
}

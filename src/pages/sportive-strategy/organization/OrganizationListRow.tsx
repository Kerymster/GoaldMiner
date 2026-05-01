import { Link } from 'react-router-dom'
import type { OrganizationRecord } from '../../../types/organization'
import { formatOrganizationListDate, organizationListRowTitle } from './organizationListFormat'
import {
  pipelineCardClass,
  pipelineDangerButtonClass,
  pipelinePrimaryButtonClass,
  pipelineSecondaryButtonClass,
  pipelineSuccessButtonClass,
} from '../playing-style/playingStyleStyles'

type Props = {
  row: OrganizationRecord
  onRequestArchive: () => void
  onRequestActivate: () => void
  onRequestDelete: () => void
}

export function OrganizationListRow({
  row,
  onRequestArchive,
  onRequestActivate,
  onRequestDelete,
}: Props) {
  const summary =
    row.payload.governance?.clubContext?.trim() || row.payload.governance?.criticalRolesSummary?.trim() || ''
  return (
    <li className={pipelineCardClass}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gold-800 dark:text-gold-300">{organizationListRowTitle(row)}</p>
          <p className="text-xs text-fume-500 dark:text-fume-400">
            {row.status.toUpperCase()} · Stage {row.stage} · Updated {formatOrganizationListDate(row.updatedAt)}
          </p>
          {summary ? (
            <p className="line-clamp-2 text-xs text-fume-600 dark:text-fume-300">{summary}</p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to={`/sportive-strategy/organization/${encodeURIComponent(row.id)}`}
            className={pipelinePrimaryButtonClass}
          >
            View
          </Link>
          <Link
            to={`/sportive-strategy/organization/edit?id=${encodeURIComponent(row.id)}`}
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
              <button type="button" onClick={onRequestActivate} className={pipelineSuccessButtonClass}>
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

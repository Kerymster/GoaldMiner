import { Link } from 'react-router-dom'
import type { PlayingStyleRecord } from '../../../types/playingStyle'
import { formatPlayingStyleListDate, playingStyleListRowTitle } from './playingStyleListFormat'
import {
  pipelineCardClass,
  pipelineDangerButtonClass,
  pipelinePrimaryButtonClass,
  pipelineSecondaryButtonClass,
  pipelineSuccessButtonClass,
} from './playingStyleStyles'

type Props = {
  row: PlayingStyleRecord
  onRequestArchive: () => void
  onRequestActivate: () => void
  onRequestDelete: () => void
}

export function PlayingStyleListRow({
  row,
  onRequestArchive,
  onRequestActivate,
  onRequestDelete,
}: Props) {
  const summary = row.context.identity.styleStatement?.trim() || row.context.identity.threeYearVision?.trim() || ''
  return (
    <li className={pipelineCardClass}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-gold-800 dark:text-gold-300">{playingStyleListRowTitle(row)}</p>
          <p className="text-xs text-fume-500 dark:text-fume-400">
            {row.status.toUpperCase()} · Stage {row.stage} · Updated {formatPlayingStyleListDate(row.updatedAt)}
          </p>
          {summary ? (
            <p className="line-clamp-2 text-xs text-fume-600 dark:text-fume-300">{summary}</p>
          ) : null}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            to={`/sportive-strategy/playing-style/${encodeURIComponent(row.id)}`}
            className={pipelinePrimaryButtonClass}
          >
            View
          </Link>
          <Link
            to={`/sportive-strategy/playing-style/edit?id=${encodeURIComponent(row.id)}`}
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

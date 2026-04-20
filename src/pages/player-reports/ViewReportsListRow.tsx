import { Link } from 'react-router-dom'
import type { PlayerScoutReportRow } from '../../api/players'
import { formatStaffRatingCompact } from '../../utils/formatStaffRating'

const linkClass =
  'flex flex-col gap-2 px-4 py-4 transition-colors hover:bg-fume-50/90 dark:hover:bg-surface-panel-hover/45 sm:flex-row sm:items-start sm:justify-between sm:px-5'

function formatListDate(iso: string) {
  if (!iso) return '—'
  const d = new Date(`${iso}T12:00:00`)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function excerpt(text: string, max = 140) {
  const t = text.trim()
  if (!t) return '—'
  return t.length <= max ? t : `${t.slice(0, max)}…`
}

type ViewReportsListRowProps = {
  playerId: string
  row: PlayerScoutReportRow
  variant?: 'view' | 'edit'
}

export function ViewReportsListRow({
  playerId,
  row,
  variant = 'view',
}: ViewReportsListRowProps) {
  const { id, form } = row
  const base = `/player-reports/players/${encodeURIComponent(playerId)}/reports/${encodeURIComponent(id)}`
  const to = variant === 'edit' ? `${base}/edit` : base

  return (
    <li>
      <Link to={to} className={linkClass}>
        <div className="min-w-0 space-y-1">
          <p className="text-sm font-semibold text-fume-900 dark:text-fume-50">
            {formatListDate(form.reportDate)}
            <span className="font-normal text-fume-500 dark:text-fume-400">
              {' '}
              · {form.playerInformation.club || 'Club —'}
              {form.teamFit.ratingOutOfFive != null
                ? ` · ${formatStaffRatingCompact(form.teamFit.ratingOutOfFive)}`
                : ''}
            </span>
          </p>
          <p className="text-xs text-fume-600 dark:text-fume-300">
            {excerpt(form.executiveSummary.narrative)}
          </p>
        </div>
        <span className="flex shrink-0 flex-col items-end gap-1 sm:items-end">
          <span className="text-[10px] font-medium uppercase tracking-wide text-fume-400 dark:text-fume-500">
            {id}
          </span>
          <span className="text-xs font-semibold text-gold-700 dark:text-gold-400">
            {variant === 'edit' ? 'Edit →' : 'Open →'}
          </span>
        </span>
      </Link>
    </li>
  )
}

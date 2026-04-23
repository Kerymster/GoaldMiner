import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import type { StoredScoutReportDraft } from '../../api/scoutReportDrafts'
import { EmptyState } from '../../components/empty-state/EmptyState'
import { PageHeader } from '../../components/page-header/PageHeader'
import { proseErrorSm, proseMutedSm } from '../../components/styles/pageChromeStyles'
import { selectDraftReportsListBundle } from '../../features/draftReports/draftReportsSelectors'
import { loadDraftReports } from '../../features/draftReports/draftReportsSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { playerListSurface } from '../players/all-players/playerListStyles'

type DraftReportsListProps = {
  title: string
  description: string
  rowActionLabel: string
  breadcrumbLabel: string
}

function formatListDate(iso: string) {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatDraftTitle(row: StoredScoutReportDraft): string {
  if (row.title?.trim()) return row.title.trim()
  if (row.draft.playerInformation?.name?.trim()) {
    return `${row.draft.playerInformation.name.trim()} draft`
  }
  return 'Untitled draft'
}

export function DraftReportsList({
  title,
  description,
  rowActionLabel,
  breadcrumbLabel,
}: DraftReportsListProps) {
  const dispatch = useAppDispatch()
  const { status, error, items: rows } = useAppSelector(selectDraftReportsListBundle)

  useEffect(() => {
    if (status === 'idle') {
      void dispatch(loadDraftReports())
    }
  }, [dispatch, status])

  return (
    <div className="space-y-6">
      <PageHeader breadcrumbItems={[{ label: breadcrumbLabel }]} title={title} description={description} />

      {status === 'loading' ? <p className={proseMutedSm}>Loading drafts…</p> : null}
      {status === 'failed' ? <p className={proseErrorSm}>{error}</p> : null}

      {status === 'succeeded' && rows.length === 0 ? (
        <EmptyState
          title="No drafts yet"
          description="Start a draft and add sections whenever you like."
          helper="Published drafts appear on the player’s report list."
          icon="fileCheck"
        />
      ) : null}

      {rows.length > 0 ? (
        <ul className={`${playerListSurface} overflow-hidden`}>
          {rows.map((row) => (
            <li key={row.id}>
              <Link
                to={`/draft-reports/${encodeURIComponent(row.id)}/edit`}
                className="flex flex-col gap-2 px-4 py-4 transition-colors hover:bg-fume-50/90 dark:hover:bg-surface-panel-hover/45 sm:flex-row sm:items-start sm:justify-between sm:px-5"
              >
                <div className="min-w-0 space-y-1">
                  <p className="text-sm font-semibold text-fume-900 dark:text-fume-50">
                    {formatDraftTitle(row)}
                    <span className="font-normal text-fume-500 dark:text-fume-400">
                      {' '}
                      · Updated {formatListDate(row.updatedAt)}
                    </span>
                  </p>
                  <p className="text-xs text-fume-600 dark:text-fume-300">
                    {row.playerId ? 'Linked to an existing player' : 'No player linked yet'}
                  </p>
                </div>
                <span className="flex shrink-0 flex-col items-end gap-1 sm:items-end">
                  <span className="text-[10px] font-medium uppercase tracking-wide text-fume-400 dark:text-fume-500">
                    {row.id}
                  </span>
                  <span className="text-xs font-semibold text-gold-700 dark:text-gold-400">
                    {rowActionLabel} →
                  </span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}

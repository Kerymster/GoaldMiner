import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../../components/PageHeader'
import { reportsForPlayerName } from '../../mocks/scoutReportsMock'
import { playerListSurface } from '../players/playerListStyles'
import {
  ViewReportsPlayerSearch,
  type ViewReportsSelectedPlayer,
} from './ViewReportsPlayerSearch'

const BREADCRUMB = [{ label: 'Player Reports' as const }]
const TITLE = 'View reports'
const DESCRIPTION =
  'Search like the top bar, then pick a player. Demo: two mock reports for Marco Ruiz — use “Demo reports on file” if the roster returns no match. Open a row for the full report.'

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

export function ViewReportsPage() {
  const [selectedPlayer, setSelectedPlayer] = useState<ViewReportsSelectedPlayer | null>(null)

  const reports = useMemo(
    () => (selectedPlayer ? reportsForPlayerName(selectedPlayer.name) : []),
    [selectedPlayer],
  )

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumbItems={BREADCRUMB}
        title={TITLE}
        description={DESCRIPTION}
      />

      <ViewReportsPlayerSearch
        selectedPlayer={selectedPlayer}
        onSelectPlayer={setSelectedPlayer}
        onClearSelection={() => setSelectedPlayer(null)}
      />

      {selectedPlayer ? (
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-fume-900 dark:text-fume-100">
            Reports for {selectedPlayer.name}
          </h2>
          {reports.length === 0 ? (
            <p className="text-sm text-fume-600 dark:text-fume-400">
              No mock reports are stored under this exact player name. Try a demo name from the
              search list (e.g. Marco Ruiz) or pick a player whose name matches your saved mock
              data.
            </p>
          ) : (
            <ul className={`${playerListSurface} overflow-hidden`}>
              {reports.map(({ id, form }) => (
                <li key={id}>
                  <Link
                    to={`/player-reports/report/${id}`}
                    className="flex flex-col gap-2 px-4 py-4 transition-colors hover:bg-fume-50/90 dark:hover:bg-fume-800/50 sm:flex-row sm:items-start sm:justify-between sm:px-5"
                  >
                    <div className="min-w-0 space-y-1">
                      <p className="text-sm font-semibold text-fume-900 dark:text-fume-50">
                        {formatListDate(form.reportDate)}
                        <span className="font-normal text-fume-500 dark:text-fume-400">
                          {' '}
                          · {form.playerInformation.club || 'Club —'}
                          {form.teamFit.ratingOutOfFive != null
                            ? ` · ${form.teamFit.ratingOutOfFive}/5`
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
                        Open →
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p className="max-w-xl text-sm text-fume-600 dark:text-fume-400">
          Choose a player from search to see their mock report list here.
        </p>
      )}
    </div>
  )
}

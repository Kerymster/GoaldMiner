import { useEffect, useState } from 'react'
import { loadScoutReportsForPlayer } from '../../features/scoutReports/scoutReportsSlice'
import { selectScoutReportsForPlayer } from '../../features/scoutReports/scoutReportsSelectors'
import { PageHeader } from '../../components/PageHeader'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { playerListSurface } from '../players/playerListStyles'
import { ViewReportsListRow } from './ViewReportsListRow'
import {
  ViewReportsPlayerSearch,
  type ViewReportsSelectedPlayer,
} from './ViewReportsPlayerSearch'

const BREADCRUMB = [{ label: 'Player Reports' as const }]
const TITLE = 'View reports'
const DESCRIPTION =
  'Search the roster, pick a player, then open a report. Lists are loaded from the API and cached in the app store; each report link includes the player id.'

export function ViewReportsPage() {
  const dispatch = useAppDispatch()
  const [selectedPlayer, setSelectedPlayer] = useState<ViewReportsSelectedPlayer | null>(null)

  const { status, error, items: reports } = useAppSelector((s) =>
    selectScoutReportsForPlayer(s, selectedPlayer?.id),
  )

  useEffect(() => {
    if (!selectedPlayer) return
    void dispatch(loadScoutReportsForPlayer(selectedPlayer.id))
  }, [dispatch, selectedPlayer])

  const reportsLoading = Boolean(selectedPlayer) && status === 'loading'
  const reportsError = status === 'failed' ? error : null

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
          {reportsLoading ? (
            <p className="text-sm text-fume-600 dark:text-fume-400">Loading reports…</p>
          ) : reportsError ? (
            <p className="text-sm text-red-600 dark:text-red-400">{reportsError}</p>
          ) : reports.length === 0 ? (
            <p className="text-sm text-fume-600 dark:text-fume-400">
              No scout reports were returned for this player.
            </p>
          ) : (
            <ul className={`${playerListSurface} overflow-hidden`}>
              {reports.map((row) => (
                <ViewReportsListRow key={row.id} playerId={selectedPlayer.id} row={row} />
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p className="max-w-xl text-sm text-fume-600 dark:text-fume-400">
          Choose a player from search to see their report list here.
        </p>
      )}
    </div>
  )
}

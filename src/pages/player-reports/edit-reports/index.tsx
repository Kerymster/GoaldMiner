import { useEffect, useState } from 'react'
import { loadScoutReportsForPlayer } from '../../../features/scoutReports/scoutReportsSlice'
import { selectScoutReportsForPlayer } from '../../../features/scoutReports/scoutReportsSelectors'
import { PageHeader } from '../../../components/PageHeader'
import {
  pageHintNarrow,
  pageStack,
  proseErrorSm,
  proseMutedSm,
} from '../../../components/pageChromeStyles'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { playerListSurface } from '../../players/playerListStyles'
import { ViewReportsListRow } from '../ViewReportsListRow'
import {
  ViewReportsPlayerSearch,
  type ViewReportsSelectedPlayer,
} from '../ViewReportsPlayerSearch'

const BREADCRUMB = [{ label: 'Player Reports' as const }]
const TITLE = 'Edit reports'
const DESCRIPTION =
  'Search the roster, pick a player, then open a report to edit. The same multi-step form as create is used, with your changes saved to the existing report.'

export function EditReportsPage() {
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
    <div className={pageStack}>
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
            <p className={proseMutedSm}>Loading reports…</p>
          ) : reportsError ? (
            <p className={proseErrorSm}>{reportsError}</p>
          ) : reports.length === 0 ? (
            <p className={proseMutedSm}>No scout reports were returned for this player.</p>
          ) : (
            <ul className={`${playerListSurface} overflow-hidden`}>
              {reports.map((row) => (
                <ViewReportsListRow
                  key={row.id}
                  playerId={selectedPlayer.id}
                  row={row}
                  variant="edit"
                />
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p className={pageHintNarrow}>Choose a player from search to see reports you can edit here.</p>
      )}
    </div>
  )
}

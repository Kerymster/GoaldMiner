import { useEffect, useState } from 'react'
import { loadScoutReportsForPlayer } from '../../../features/scoutReports/scoutReportsSlice'
import { selectScoutReportsForPlayer } from '../../../features/scoutReports/scoutReportsSelectors'
import { PageHeader } from '../../../components/page-header/PageHeader'
import {
  pageStack,
  proseErrorSm,
  proseMutedSm,
} from '../../../components/styles/pageChromeStyles'
import { useAppDispatch, useAppSelector } from '../../../store/hooks'
import { playerListSurface } from '../../players/all-players/playerListStyles'
import { ViewReportsListRow } from '../ViewReportsListRow'
import {
  ViewReportsPlayerSearch,
  type ViewReportsSelectedPlayer,
} from '../ViewReportsPlayerSearch'
import { EmptyState } from '../../../components/empty-state/EmptyState'

const BREADCRUMB = [{ label: 'Player Reports' as const }]
const TITLE = 'Edit reports'
const DESCRIPTION = 'Find a player and open one of their reports to edit it.'

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
            <EmptyState
              title="No editable reports found"
              description={`There are no scout reports to edit for ${selectedPlayer.name} yet.`}
              helper="Pick another player or create a first report, then return here to update it."
              icon="circleHelp"
            />
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
        <EmptyState
          title="Choose a player to start editing"
          description="Search by player or club, pick them from the list, then choose a report to update."
          helper="New reports are created from the Create report flow."
          icon="fileCheck"
        />
      )}
    </div>
  )
}


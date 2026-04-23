import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
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
import { getPlayerById } from '../../../api/players'
import { EmptyState } from '../../../components/empty-state/EmptyState'

const BREADCRUMB = [{ label: 'Player Reports' as const }]
const TITLE = 'View reports'
const DESCRIPTION = 'Find a player, then open any of their scout reports.'

export function ViewReportsPage() {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const [selectedPlayer, setSelectedPlayer] = useState<ViewReportsSelectedPlayer | null>(() => {
    return (
      (location.state as { selectedPlayer?: ViewReportsSelectedPlayer } | null)?.selectedPlayer ??
      null
    )
  })

  const { status, error, items: reports } = useAppSelector((s) =>
    selectScoutReportsForPlayer(s, selectedPlayer?.id),
  )

  useEffect(() => {
    if (selectedPlayer) return
    const playerId = searchParams.get('playerId')
    if (!playerId) return

    let cancelled = false
    ;(async () => {
      try {
        const player = await getPlayerById(playerId)
        if (cancelled) return
        setSelectedPlayer({
          id: player.id,
          name: player.name,
          team: player.team,
          position: player.position,
        })
      } catch {
        // Keep empty state if player cannot be resolved.
      }
    })()

    return () => {
      cancelled = true
    }
  }, [searchParams, selectedPlayer])

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
              title="No reports available yet"
              description={`We couldn't find scout reports for ${selectedPlayer.name} right now.`}
              helper="Try another player, or check back after new reports are added."
              icon="circleHelp"
            />
          ) : (
            <ul className={`${playerListSurface} overflow-hidden`}>
              {reports.map((row) => (
                <ViewReportsListRow key={row.id} playerId={selectedPlayer.id} row={row} />
              ))}
            </ul>
          )}
        </div>
      ) : (
        <EmptyState
          title="Pick a player to see reports"
          description="Search by player or club. When you choose someone, their saved reports appear below."
          helper="Searching by club can be quicker for large squads."
          icon="search"
        />
      )}
    </div>
  )
}


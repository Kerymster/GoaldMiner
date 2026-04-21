import { useEffect, useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
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
import { playerListSurface } from '../../players/all-players/playerListStyles'
import { ViewReportsListRow } from '../ViewReportsListRow'
import {
  ViewReportsPlayerSearch,
  type ViewReportsSelectedPlayer,
} from '../ViewReportsPlayerSearch'
import { getPlayerById } from '../../../api/players'

const BREADCRUMB = [{ label: 'Player Reports' as const }]
const TITLE = 'View reports'
const DESCRIPTION =
  'Search the roster, pick a player, then open a report. Lists are loaded from the API and cached in the app store; each report link includes the player id.'

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
            <p className={proseMutedSm}>No scout reports were returned for this player.</p>
          ) : (
            <ul className={`${playerListSurface} overflow-hidden`}>
              {reports.map((row) => (
                <ViewReportsListRow key={row.id} playerId={selectedPlayer.id} row={row} />
              ))}
            </ul>
          )}
        </div>
      ) : (
        <p className={pageHintNarrow}>Choose a player from search to see their report list here.</p>
      )}
    </div>
  )
}

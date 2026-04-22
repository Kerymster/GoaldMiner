import type { PlayerScoutReportRow } from '../../api/players'
import type { RootState } from '../../store/store'
import type { ScoutReportsForPlayerState } from './scoutReportsSlice'

const EMPTY_PLAYER_SCOUT_REPORTS: ScoutReportsForPlayerState = {
  status: 'idle',
  error: null,
  items: [],
}

export function selectScoutReportsForPlayer(
  state: RootState,
  playerId: string | undefined,
): ScoutReportsForPlayerState {
  if (!playerId) return EMPTY_PLAYER_SCOUT_REPORTS
  return state.scoutReports.byPlayerId[playerId] ?? EMPTY_PLAYER_SCOUT_REPORTS
}

export function selectScoutReportRow(
  state: RootState,
  playerId: string | undefined,
  reportId: string | undefined,
): PlayerScoutReportRow | undefined {
  if (!playerId || !reportId) return undefined
  return state.scoutReports.byPlayerId[playerId]?.items.find((r) => r.id === reportId)
}

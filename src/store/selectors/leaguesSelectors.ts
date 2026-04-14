import type { RootState } from '../store'

export const selectLeaguesItems = (s: RootState) => s.leagues.items
export const selectLeaguesStatus = (s: RootState) => s.leagues.status
export const selectLeaguesError = (s: RootState) => s.leagues.error
export const selectLeaguesMeta = (s: RootState) => s.leagues.meta

export function selectLeagueMetaById(s: RootState, leagueId: string | undefined) {
  if (!leagueId) return undefined
  return s.leagues.items.find((l) => l.leagueId === leagueId)
}

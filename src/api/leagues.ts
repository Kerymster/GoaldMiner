import { fetchJson } from './client'
import { endpoints } from './endpoints'
import type { LeagueMeta, LeaguesListResponse } from '../types/api'

export async function getLeaguesList(): Promise<LeaguesListResponse> {
  return fetchJson<LeaguesListResponse>(endpoints.leagues)
}

export async function getLeagueById(leagueId: string): Promise<LeagueMeta> {
  return fetchJson<LeagueMeta>(
    `${endpoints.leagues}/${encodeURIComponent(leagueId)}`,
  )
}

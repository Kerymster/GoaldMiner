import { fetchJson } from './client'
import type { LeagueMeta, LeaguesListResponse } from '../types/api'

export async function getLeaguesList(): Promise<LeaguesListResponse> {
  return fetchJson<LeaguesListResponse>('/api/leagues')
}

export async function getLeagueById(leagueId: string): Promise<LeagueMeta> {
  return fetchJson<LeagueMeta>(
    `/api/leagues/${encodeURIComponent(leagueId)}`,
  )
}

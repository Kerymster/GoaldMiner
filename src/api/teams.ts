import { fetchJson } from './client'
import type {
  PaginatedTeamsResponse,
  TeamRow,
  TeamsSort,
} from '../types/api'

export type TeamsQuery = {
  q?: string
  leagueId?: string
  countryId?: string
  sort?: TeamsSort
  page?: number
  pageSize?: number
}

function toSearchParams(q: TeamsQuery): string {
  const p = new URLSearchParams()
  if (q.q?.trim()) p.set('q', q.q.trim())
  if (q.leagueId?.trim()) p.set('leagueId', q.leagueId.trim())
  if (q.countryId?.trim()) p.set('countryId', q.countryId.trim())
  if (q.sort) p.set('sort', q.sort)
  if (q.page != null) p.set('page', String(q.page))
  if (q.pageSize != null) p.set('pageSize', String(q.pageSize))
  const s = p.toString()
  return s ? `?${s}` : ''
}

export async function getTeams(
  query: TeamsQuery,
): Promise<PaginatedTeamsResponse> {
  return fetchJson<PaginatedTeamsResponse>(
    `/api/teams${toSearchParams(query)}`,
  )
}

export async function getTeamById(id: string): Promise<TeamRow> {
  return fetchJson<TeamRow>(`/api/teams/${encodeURIComponent(id)}`)
}

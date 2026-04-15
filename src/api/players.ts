import { fetchJson } from './client'
import { endpoints } from './endpoints'
import type {
  PaginatedResponse,
  Player,
  PlayersSort,
} from '../types/api'

export type PlayersQuery = {
  q?: string
  leagueId?: string
  teamId?: string
  countryId?: string
  minRating?: number
  maxRating?: number
  minUnderrated?: number
  maxUnderrated?: number
  sort?: PlayersSort
  page?: number
  pageSize?: number
}

function toSearchParams(q: PlayersQuery): string {
  const p = new URLSearchParams()
  if (q.q?.trim()) p.set('q', q.q.trim())
  if (q.leagueId?.trim()) p.set('leagueId', q.leagueId.trim())
  if (q.teamId?.trim()) p.set('teamId', q.teamId.trim())
  if (q.countryId?.trim()) p.set('countryId', q.countryId.trim())
  if (q.minRating != null && Number.isFinite(q.minRating)) {
    p.set('minRating', String(q.minRating))
  }
  if (q.maxRating != null && Number.isFinite(q.maxRating)) {
    p.set('maxRating', String(q.maxRating))
  }
  if (q.minUnderrated != null && Number.isFinite(q.minUnderrated)) {
    p.set('minUnderrated', String(q.minUnderrated))
  }
  if (q.maxUnderrated != null && Number.isFinite(q.maxUnderrated)) {
    p.set('maxUnderrated', String(q.maxUnderrated))
  }
  if (q.sort) p.set('sort', q.sort)
  if (q.page != null) p.set('page', String(q.page))
  if (q.pageSize != null) p.set('pageSize', String(q.pageSize))
  const s = p.toString()
  return s ? `?${s}` : ''
}

export async function getPlayers(
  query: PlayersQuery,
): Promise<PaginatedResponse<Player>> {
  return fetchJson<PaginatedResponse<Player>>(
    `${endpoints.players}${toSearchParams(query)}`,
  )
}

export async function getPlayerById(id: string): Promise<Player> {
  return fetchJson<Player>(
    `${endpoints.players}/${encodeURIComponent(id)}`,
  )
}

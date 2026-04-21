import { fetchJson } from './client'
import { endpoints, playerById } from './endpoints'
import type { ScoutReportForm } from '../types/scoutReportForm'
import type {
  PaginatedResponse,
  Player,
  PlayersSort,
} from '../types/api'

export type PlayerScoutReportRow = {
  id: string
  form: ScoutReportForm
}

export type PlayersQuery = {
  q?: string
  minRating?: number
  maxRating?: number
  minUnderrated?: number
  maxUnderrated?: number
  sort?: PlayersSort
  page?: number
  pageSize?: number
}

export type CreatePlayerInput = Omit<Player, 'id' | 'rating' | 'underratedScore'>
export type UpdatePlayerInput = Partial<CreatePlayerInput>

function toSearchParams(q: PlayersQuery): string {
  const p = new URLSearchParams()
  if (q.q?.trim()) p.set('q', q.q.trim())
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
  return fetchJson<Player>(playerById(id))
}

/** Creates a roster player without requiring a scout report. */
export async function createPlayer(input: CreatePlayerInput): Promise<Player> {
  return fetchJson<Player>(endpoints.players, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
}

/** Partially updates player profile fields (`PATCH /api/players/:id`). */
export async function updatePlayer(
  id: string,
  input: UpdatePlayerInput,
): Promise<Player> {
  return fetchJson<Player>(playerById(id), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
}

/** Response from `GET /api/players/:id/scout-reports` — each row exposes the form as `report`. */
type ApiPlayerScoutReportsResponse = {
  playerId?: string
  total?: number
  items?: Array<{
    id: string
    report: ScoutReportForm
  }>
}

/** List scout reports for a roster player (`GET /api/players/:id/scout-reports`). */
export async function getPlayerScoutReports(
  playerId: string,
): Promise<PlayerScoutReportRow[]> {
  const path = `${playerById(playerId)}/scout-reports`
  const body = await fetchJson<ApiPlayerScoutReportsResponse>(path)
  return (body.items ?? []).map((row) => ({ id: row.id, form: row.report }))
}

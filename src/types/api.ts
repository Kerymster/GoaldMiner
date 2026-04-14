/** 400 / 404 JSON body */
export type ApiErrorBody = {
  error: string
}

export type PaginatedResponse<T> = {
  items: T[]
  page: number
  pageSize: number
  total: number
  totalPages: number
}

export type Player = {
  id: string
  name: string
  team: string
  teamId: string
  position: string
  rating?: number
  underratedScore?: number
  note?: string
  leagueId?: string
  countryId?: string
}

export type TeamRow = {
  id: string
  name: string
  shortName?: string
  countryId: string
  leagueId: string
  note?: string
  logoUrl?: string
}

export type TeamsFileMeta = {
  description: string
  season: string
}

export type PaginatedTeamsResponse = PaginatedResponse<TeamRow> & {
  meta?: TeamsFileMeta
}

export type LeagueMeta = {
  leagueId: string
  countryId: string
  countryName: string
  name: string
  nameLocal: string
  tier: number
}

export type LeaguesListResponse = {
  items: LeagueMeta[]
  meta?: TeamsFileMeta
}

export type PlayersSort =
  | 'underratedScore_desc'
  | 'underratedScore_asc'
  | 'rating_desc'
  | 'rating_asc'
  | 'name_asc'

export type TeamsSort = 'name_asc' | 'name_desc' | 'shortName_asc'

export type ApiErr = {
  kind: 'ApiErr'
  status: number
  message: string
}

export function createApiErr(status: number, message: string): ApiErr {
  return { kind: 'ApiErr', status, message }
}

export function isApiErr(e: unknown): e is ApiErr {
  return (
    typeof e === 'object' &&
    e !== null &&
    'kind' in e &&
    (e as { kind: unknown }).kind === 'ApiErr'
  )
}

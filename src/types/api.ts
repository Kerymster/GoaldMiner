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
  nationality?: string
  position: string
  rating?: number
  underratedScore?: number
  note?: string
}

export type PlayersSort =
  | 'underratedScore_desc'
  | 'underratedScore_asc'
  | 'rating_desc'
  | 'rating_asc'
  | 'name_asc'

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

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
  ageOrDob?: string
  heightCm?: number
  weightKg?: number
  preferredFoot?: string
  position: string
  secondaryPosition?: string
  mostlyUsedRole?: string
  otherRoles?: string
  /** Contract end date when known (ISO `YYYY-MM-DD`). */
  contractIfKnown?: string
  overallRating?: number
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
  /** Present on some 400 responses (e.g. validation `issues` from the API). */
  issues?: unknown
}

export function createApiErr(
  status: number,
  message: string,
  issues?: unknown,
): ApiErr {
  return { kind: 'ApiErr', status, message, issues }
}

/** Turns API `issues` (array of strings or { path, message }) into display text. */
export function formatApiIssuesSummary(issues: unknown): string {
  if (!Array.isArray(issues) || issues.length === 0) return ''
  return issues
    .map((item) => {
      if (typeof item === 'string') return item
      if (item && typeof item === 'object') {
        const o = item as { path?: unknown; message?: unknown }
        const path = typeof o.path === 'string' ? o.path : null
        const message = typeof o.message === 'string' ? o.message : null
        if (path && message) return `${path}: ${message}`
        if (message) return message
      }
      try {
        return JSON.stringify(item)
      } catch {
        return String(item)
      }
    })
    .join('\n')
}

export function isApiErr(e: unknown): e is ApiErr {
  return (
    typeof e === 'object' &&
    e !== null &&
    'kind' in e &&
    (e as { kind: unknown }).kind === 'ApiErr'
  )
}

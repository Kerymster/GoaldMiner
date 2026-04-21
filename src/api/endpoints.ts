/**
 * REST path prefixes (relative to API origin, see `getApiBaseUrl()`).
 */
export const endpoints = {
  players: '/api/players',
  /** POST body: `ScoutReportForm` JSON — wire when backend exists */
  scoutReports: '/api/scout-reports',
  nationalities: '/api/nationalities',
} as const

/** `PATCH/PUT /api/scout-reports/:id` — must match upf-be. */
export function scoutReportById(id: string): string {
  return `${endpoints.scoutReports}/${encodeURIComponent(id)}`
}

/** `GET/PATCH /api/players/:id` — canonical player path helper. */
export function playerById(id: string): string {
  return `${endpoints.players}/${encodeURIComponent(id)}`
}

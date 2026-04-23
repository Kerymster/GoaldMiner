/**
 * REST path prefixes (relative to API origin, see `getApiBaseUrl()`).
 */
export const endpoints = {
  players: '/api/players',
  /** POST body: `ScoutReportForm` JSON — wire when backend exists */
  scoutReports: '/api/scout-reports',
  scoutReportDrafts: '/api/scout-reports/drafts',
  directorPipelines: '/api/director/pipelines',
  nationalities: '/api/nationalities',
} as const

/** `PATCH/PUT /api/scout-reports/:id` — must match upf-be. */
export function scoutReportById(id: string): string {
  return `${endpoints.scoutReports}/${encodeURIComponent(id)}`
}

/** `GET/PATCH/DELETE /api/scout-reports/drafts/:id` helper. */
export function scoutReportDraftById(id: string): string {
  return `${endpoints.scoutReportDrafts}/${encodeURIComponent(id)}`
}

/** `GET/PATCH /api/players/:id` — canonical player path helper. */
export function playerById(id: string): string {
  return `${endpoints.players}/${encodeURIComponent(id)}`
}

/** `GET/PATCH/DELETE /api/director/pipelines/:id` helper. */
export function directorPipelineById(id: string): string {
  return `${endpoints.directorPipelines}/${encodeURIComponent(id)}`
}

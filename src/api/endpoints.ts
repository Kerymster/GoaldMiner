/**
 * REST path prefixes (relative to API origin, see `getApiBaseUrl()`).
 */
export const endpoints = {
  players: '/api/players',
  /** POST body: `ScoutReportForm` JSON — wire when backend exists */
  scoutReports: '/api/scout-reports',
  nationalities: '/api/nationalities',
} as const

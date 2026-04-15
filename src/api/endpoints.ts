/**
 * REST path prefixes (relative to API origin, see `getApiBaseUrl()`).
 */
export const endpoints = {
  players: '/api/players',
  teams: '/api/teams',
  leagues: '/api/leagues',
  /** POST body: `ScoutReportForm` JSON — wire when backend exists */
  scoutReports: '/api/scout-reports',
} as const

import type { ScoutReportForm } from '../types/scoutReportForm'
import { fetchJson } from './client'
import { endpoints } from './endpoints'

export type CreateScoutReportResponse = {
  id: string
}

/**
 * Persists a completed scout report. Requires `POST /api/scout-reports` on the API.
 */
export async function createScoutReport(
  payload: ScoutReportForm,
): Promise<CreateScoutReportResponse> {
  return fetchJson<CreateScoutReportResponse>(endpoints.scoutReports, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

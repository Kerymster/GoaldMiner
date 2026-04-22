import type { ScoutReportForm } from '../types/scoutReportForm'
import { fetchJson } from './client'
import { endpoints, scoutReportById } from './endpoints'

function parseScoutReportFromPatchResponse(body: unknown): ScoutReportForm {
  if (body == null || typeof body !== 'object') {
    throw new Error('Invalid scout report response from server.')
  }
  const o = body as Record<string, unknown>
  if ('report' in o && o.report != null && typeof o.report === 'object') {
    return o.report as ScoutReportForm
  }
  return body as ScoutReportForm
}

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

/**
 * Updates an existing scout report (`PATCH /api/scout-reports/:id`).
 * Body matches POST; response is the updated report JSON (or `{ report }` wrapper).
 */
export async function updateScoutReport(
  reportId: string,
  payload: ScoutReportForm,
  options?: {
    syncPlayer?: boolean
  },
): Promise<ScoutReportForm> {
  const query = new URLSearchParams()
  if (options?.syncPlayer != null) {
    query.set('syncPlayer', String(options.syncPlayer))
  }
  const path = query.size > 0 ? `${scoutReportById(reportId)}?${query.toString()}` : scoutReportById(reportId)
  const body = await fetchJson<unknown>(path, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (body == null) return payload
  return parseScoutReportFromPatchResponse(body)
}

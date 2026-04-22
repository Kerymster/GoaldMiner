import type { ScoutReportForm } from '../types/scoutReportForm'
import { fetchJson } from './client'
import { endpoints, scoutReportDraftById } from './endpoints'

export type StoredScoutReportDraft = {
  id: string
  title: string | null
  playerId: string | null
  draft: Partial<ScoutReportForm>
  createdAt: string
  updatedAt: string
}

type ScoutReportDraftListResponse = {
  items?: StoredScoutReportDraft[]
  total?: number
}

type CreateScoutReportDraftInput = {
  title?: string | null
  playerId?: string | null
  draft: Partial<ScoutReportForm>
}

type UpdateScoutReportDraftInput = {
  title?: string | null
  playerId?: string | null
  draft?: Partial<ScoutReportForm>
}

type PublishScoutReportDraftInput = {
  playerId?: string
}

function parseDraft(body: unknown): StoredScoutReportDraft {
  if (body == null || typeof body !== 'object') {
    throw new Error('Invalid draft response from server.')
  }
  const o = body as Record<string, unknown>
  if ('draft' in o && o.draft != null && typeof o.draft === 'object' && 'id' in (o.draft as Record<string, unknown>)) {
    return o.draft as StoredScoutReportDraft
  }
  return body as StoredScoutReportDraft
}

export async function getScoutReportDrafts(): Promise<{
  items: StoredScoutReportDraft[]
  total: number
}> {
  const body = await fetchJson<ScoutReportDraftListResponse>(endpoints.scoutReportDrafts)
  return {
    items: body.items ?? [],
    total: body.total ?? (body.items?.length ?? 0),
  }
}

export async function createScoutReportDraft(
  input: CreateScoutReportDraftInput,
): Promise<StoredScoutReportDraft> {
  const body = await fetchJson<unknown>(endpoints.scoutReportDrafts, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  return parseDraft(body)
}

export async function getScoutReportDraftById(id: string): Promise<StoredScoutReportDraft> {
  const body = await fetchJson<unknown>(scoutReportDraftById(id))
  return parseDraft(body)
}

export async function updateScoutReportDraft(
  id: string,
  input: UpdateScoutReportDraftInput,
): Promise<StoredScoutReportDraft> {
  const body = await fetchJson<unknown>(scoutReportDraftById(id), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  return parseDraft(body)
}

export async function deleteScoutReportDraft(id: string): Promise<void> {
  await fetchJson<unknown>(scoutReportDraftById(id), {
    method: 'DELETE',
  })
}

export async function publishScoutReportDraft(
  id: string,
  input?: PublishScoutReportDraftInput,
): Promise<void> {
  await fetchJson<unknown>(`${scoutReportDraftById(id)}/publish`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input ?? {}),
  })
}

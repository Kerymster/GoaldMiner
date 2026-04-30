import type {
  PlayingStyleRecord,
  PlayingStyleRecordCreateBody,
  PlayingStyleRecordPatchBody,
} from '../types/playingStyle'
import { fetchJson } from './client'
import { endpoints, playingStyleById } from './endpoints'

type PlayingStyleListResponse = {
  items?: PlayingStyleRecord[]
  total?: number
}

type ListStatus = 'active' | 'archived' | 'all'

export async function listPlayingStyles(status: ListStatus = 'all'): Promise<PlayingStyleRecord[]> {
  const qs = new URLSearchParams({ status }).toString()
  const body = await fetchJson<PlayingStyleListResponse>(`${endpoints.playingStyle}?${qs}`)
  return body.items ?? []
}

export async function getActivePlayingStyle(): Promise<PlayingStyleRecord | null> {
  return fetchJson<PlayingStyleRecord | null>(`${endpoints.playingStyle}/active`)
}

export async function getPlayingStyle(id: string): Promise<PlayingStyleRecord> {
  return fetchJson<PlayingStyleRecord>(playingStyleById(id))
}

export async function createPlayingStyle(payload: PlayingStyleRecordCreateBody): Promise<PlayingStyleRecord> {
  return fetchJson<PlayingStyleRecord>(endpoints.playingStyle, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

export async function patchPlayingStyle(
  id: string,
  payload: PlayingStyleRecordPatchBody,
): Promise<PlayingStyleRecord> {
  return fetchJson<PlayingStyleRecord>(playingStyleById(id), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

export async function archivePlayingStyle(id: string): Promise<PlayingStyleRecord> {
  return fetchJson<PlayingStyleRecord>(`${playingStyleById(id)}/archive`, {
    method: 'POST',
  })
}

export async function activatePlayingStyle(id: string): Promise<PlayingStyleRecord> {
  return fetchJson<PlayingStyleRecord>(`${playingStyleById(id)}/activate`, {
    method: 'POST',
  })
}

export async function deletePlayingStyle(id: string): Promise<void> {
  await fetchJson<unknown>(playingStyleById(id), {
    method: 'DELETE',
  })
}

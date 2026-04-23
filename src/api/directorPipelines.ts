import type {
  DirectorPipeline,
  DirectorPipelineCreateBody,
  DirectorPipelinePatchBody,
  DirectorPipelineStatus,
} from '../types/directorPipeline'
import { fetchJson } from './client'
import { directorPipelineById, endpoints } from './endpoints'

type DirectorPipelineListResponse = {
  items?: DirectorPipeline[]
}

type DirectorPipelineEntityResponse = {
  pipeline?: DirectorPipeline | null
}

type ListStatus = DirectorPipelineStatus | 'all'

function normalizePipelineEntity(body: unknown): DirectorPipeline | null {
  if (body == null) return null
  if (typeof body !== 'object') {
    throw new Error('Invalid pipeline response from server.')
  }
  const data = body as DirectorPipelineEntityResponse & DirectorPipeline
  if ('pipeline' in data) {
    return data.pipeline ?? null
  }
  return data as DirectorPipeline
}

export async function listDirectorPipelines(status: ListStatus = 'all'): Promise<DirectorPipeline[]> {
  const qs = new URLSearchParams({ status }).toString()
  const body = await fetchJson<DirectorPipelineListResponse>(`${endpoints.directorPipelines}?${qs}`)
  return body.items ?? []
}

export async function getActiveDirectorPipeline(): Promise<DirectorPipeline | null> {
  const body = await fetchJson<unknown>(`${endpoints.directorPipelines}/active`)
  return normalizePipelineEntity(body)
}

export async function getDirectorPipeline(id: string): Promise<DirectorPipeline> {
  const body = await fetchJson<unknown>(directorPipelineById(id))
  const normalized = normalizePipelineEntity(body)
  if (!normalized) {
    throw new Error('Pipeline could not be loaded.')
  }
  return normalized
}

export async function createDirectorPipeline(
  payload: DirectorPipelineCreateBody,
): Promise<DirectorPipeline> {
  const body = await fetchJson<unknown>(endpoints.directorPipelines, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const normalized = normalizePipelineEntity(body)
  if (!normalized) {
    throw new Error('Pipeline could not be created.')
  }
  return normalized
}

export async function patchDirectorPipeline(
  id: string,
  payload: DirectorPipelinePatchBody,
): Promise<DirectorPipeline> {
  const body = await fetchJson<unknown>(directorPipelineById(id), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const normalized = normalizePipelineEntity(body)
  if (!normalized) {
    throw new Error('Pipeline could not be updated.')
  }
  return normalized
}

export async function archiveDirectorPipeline(id: string): Promise<DirectorPipeline> {
  const body = await fetchJson<unknown>(`${directorPipelineById(id)}/archive`, {
    method: 'POST',
  })
  const normalized = normalizePipelineEntity(body)
  if (!normalized) {
    throw new Error('Pipeline could not be archived.')
  }
  return normalized
}

export async function activateDirectorPipeline(id: string): Promise<DirectorPipeline> {
  const body = await fetchJson<unknown>(`${directorPipelineById(id)}/activate`, {
    method: 'POST',
  })
  const normalized = normalizePipelineEntity(body)
  if (!normalized) {
    throw new Error('Pipeline could not be activated.')
  }
  return normalized
}

export async function deleteDirectorPipeline(id: string): Promise<void> {
  await fetchJson<unknown>(directorPipelineById(id), {
    method: 'DELETE',
  })
}

import type {
  OrganizationRecord,
  OrganizationRecordCreateBody,
  OrganizationRecordPatchBody,
} from '../types/organization'
import { fetchJson } from './client'
import { endpoints, organizationById } from './endpoints'

type OrganizationListResponse = {
  items?: OrganizationRecord[]
  total?: number
}

type ListStatus = 'active' | 'archived' | 'all'

export async function listOrganizations(status: ListStatus = 'all'): Promise<OrganizationRecord[]> {
  const qs = new URLSearchParams({ status }).toString()
  const body = await fetchJson<OrganizationListResponse>(`${endpoints.organization}?${qs}`)
  return body.items ?? []
}

export async function getActiveOrganization(): Promise<OrganizationRecord | null> {
  return fetchJson<OrganizationRecord | null>(`${endpoints.organization}/active`)
}

export async function getOrganization(id: string): Promise<OrganizationRecord> {
  return fetchJson<OrganizationRecord>(organizationById(id))
}

export async function createOrganization(payload: OrganizationRecordCreateBody): Promise<OrganizationRecord> {
  return fetchJson<OrganizationRecord>(endpoints.organization, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

export async function patchOrganization(
  id: string,
  payload: OrganizationRecordPatchBody,
): Promise<OrganizationRecord> {
  return fetchJson<OrganizationRecord>(organizationById(id), {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

export async function archiveOrganization(id: string): Promise<OrganizationRecord> {
  return fetchJson<OrganizationRecord>(`${organizationById(id)}/archive`, {
    method: 'POST',
  })
}

export async function activateOrganization(id: string): Promise<OrganizationRecord> {
  return fetchJson<OrganizationRecord>(`${organizationById(id)}/activate`, {
    method: 'POST',
  })
}

export async function deleteOrganization(id: string): Promise<void> {
  await fetchJson<unknown>(organizationById(id), {
    method: 'DELETE',
  })
}

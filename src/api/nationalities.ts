import type { NationalitiesListResponse } from '../types/nationalities'
import { fetchJson } from './client'
import { endpoints } from './endpoints'

export async function getNationalities(): Promise<NationalitiesListResponse> {
  return fetchJson<NationalitiesListResponse>(endpoints.nationalities)
}

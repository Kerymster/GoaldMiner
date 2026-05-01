import type { OrganizationRecord } from '../../../types/organization'
import { formatPlayingStyleListDate } from '../playing-style/playingStyleListFormat'

export function organizationListRowTitle(row: OrganizationRecord): string {
  return row.title?.trim() || 'Untitled organization blueprint'
}

export function formatOrganizationListDate(iso: string): string {
  return formatPlayingStyleListDate(iso)
}

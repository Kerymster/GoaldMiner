import type { DirectorPipeline } from '../../types/directorPipeline'

/** Display title for list rows, compare UI, and confirmation modals. */
export function pipelineListRowTitle(row: DirectorPipeline): string {
  return row.title?.trim() || row.context.club.clubName || 'Untitled pipeline'
}

export function formatPipelineListDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString()
}

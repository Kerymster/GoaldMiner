import type { PlayingStyleRecord } from '../../../types/playingStyle'

export function playingStyleListRowTitle(row: PlayingStyleRecord): string {
  return row.title?.trim() || 'Untitled playing style'
}

export function formatPlayingStyleListDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  return d.toLocaleString()
}

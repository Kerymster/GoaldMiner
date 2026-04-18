import type { Player } from '../types/api'

/** Lowercase trim for substring checks (player name + team only). */
function norm(s: string): string {
  return s.trim().toLowerCase()
}

export function playerMatchesNameOrTeam(player: Player, query: string): boolean {
  const q = norm(query)
  if (!q) return false
  return norm(player.name).includes(q) || norm(player.team).includes(q)
}

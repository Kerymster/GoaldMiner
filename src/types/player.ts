export type Player = {
  id: string
  name: string
  /** Resolved display name; source of truth for roster is `teamId` */
  team: string
  teamId: string
  position: string
  rating: number
  underratedScore: number
  note: string
}

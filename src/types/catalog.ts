export type Country = {
  id: string
  name: string
  /** ISO 3166-1 alpha-2, for future flags / APIs */
  code: string
}

export type League = {
  id: string
  name: string
  countryId: string
  /** 1 = top flight, 2 = second tier, etc. */
  tier: number
}

export type Team = {
  id: string
  name: string
  leagueId: string
}

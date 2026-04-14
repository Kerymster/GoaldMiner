import type { Country, League, Team } from '../types/catalog'

export const countries: Country[] = [
  { id: 'fr', name: 'France', code: 'FR' },
  { id: 'pt', name: 'Portugal', code: 'PT' },
]

export const leagues: League[] = [
  {
    id: 'fr-ligue-2',
    name: 'Ligue 2',
    countryId: 'fr',
    tier: 2,
  },
  {
    id: 'pt-liga-portugal-2',
    name: 'Liga Portugal 2',
    countryId: 'pt',
    tier: 2,
  },
]

export const teams: Team[] = [
  { id: 'paris-fc', name: 'Paris FC', leagueId: 'fr-ligue-2' },
  { id: 'ea-guingamp', name: 'En Avant Guingamp', leagueId: 'fr-ligue-2' },
  { id: 'santa-clara', name: 'Santa Clara', leagueId: 'pt-liga-portugal-2' },
  { id: 'leixoes', name: 'Leixões SC', leagueId: 'pt-liga-portugal-2' },
]

const countryById = new Map(countries.map((c) => [c.id, c]))
const leagueById = new Map(leagues.map((l) => [l.id, l]))
const teamById = new Map(teams.map((t) => [t.id, t]))

export function getCountryById(id: string): Country | undefined {
  return countryById.get(id)
}

export function getLeagueById(id: string): League | undefined {
  return leagueById.get(id)
}

export function getTeamById(id: string): Team | undefined {
  return teamById.get(id)
}

export function getLeaguesByCountryId(countryId: string): League[] {
  return leagues.filter((l) => l.countryId === countryId)
}

export function getTeamsByLeagueId(leagueId: string): Team[] {
  return teams.filter((t) => t.leagueId === leagueId)
}

export function getTeamWithLeague(teamId: string):
  | { team: Team; league: League; country: Country }
  | undefined {
  const team = getTeamById(teamId)
  if (!team) return undefined
  const league = getLeagueById(team.leagueId)
  if (!league) return undefined
  const country = getCountryById(league.countryId)
  if (!country) return undefined
  return { team, league, country }
}

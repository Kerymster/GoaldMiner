import { Link } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import {
  countries,
  getLeaguesByCountryId,
  getTeamsByLeagueId,
} from '../data/catalog'

export function TeamsPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Teams' }]} />
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Teams</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Browse squads by country and league, then open a player profile.
        </p>
      </div>
      <div className="space-y-10">
        {countries.map((country) => {
          const countryLeagues = getLeaguesByCountryId(country.id)
          if (countryLeagues.length === 0) return null
          return (
            <section key={country.id}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-zinc-500">
                {country.name}
              </h3>
              <div className="mt-4 space-y-8">
                {countryLeagues.map((league) => {
                  const leagueTeams = getTeamsByLeagueId(league.id)
                  return (
                    <div key={league.id}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
                          {league.name}
                        </h4>
                        <Link
                          to={`/leagues/${league.id}`}
                          className="text-xs font-medium text-emerald-600 hover:underline dark:text-emerald-400"
                        >
                          League page
                        </Link>
                      </div>
                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {leagueTeams.map((team) => (
                          <li key={team.id}>
                            <Link
                              to={`/teams/${team.id}`}
                              className="block rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm font-medium transition-colors hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/40"
                            >
                              {team.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </section>
          )
        })}
      </div>
    </div>
  )
}

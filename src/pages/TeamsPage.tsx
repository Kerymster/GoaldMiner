import { Link } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import {
  countries,
  getLeaguesByCountryId,
  getTeamsByLeagueId,
} from '../data/catalog'

const teamTile =
  'block rounded-lg border border-fume-200/90 bg-white px-4 py-3 text-sm font-medium shadow-sm shadow-fume-950/5 transition-all hover:border-gold-400/40 hover:bg-gold-500/[0.06] dark:border-fume-800 dark:bg-fume-900/45 dark:shadow-none dark:hover:border-gold-500/30 dark:hover:bg-fume-800/50'

export function TeamsPage() {
  return (
    <div className="space-y-8">
      <Breadcrumbs items={[{ label: 'Teams' }]} />
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-fume-950 dark:text-fume-50">
          Teams
        </h2>
        <p className="mt-1 text-sm text-fume-600 dark:text-fume-400">
          Browse squads by country and league, then open a player profile.
        </p>
      </div>
      <div className="space-y-10">
        {countries.map((country) => {
          const countryLeagues = getLeaguesByCountryId(country.id)
          if (countryLeagues.length === 0) return null
          return (
            <section key={country.id}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-fume-500">
                {country.name}
              </h3>
              <div className="mt-4 space-y-8">
                {countryLeagues.map((league) => {
                  const leagueTeams = getTeamsByLeagueId(league.id)
                  return (
                    <div key={league.id}>
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <h4 className="text-base font-semibold text-fume-900 dark:text-fume-100">
                          {league.name}
                        </h4>
                        <Link
                          to={`/leagues/${league.id}`}
                          className="text-xs font-medium text-gold-700 hover:text-gold-600 hover:underline dark:text-gold-400 dark:hover:text-gold-300"
                        >
                          League page
                        </Link>
                      </div>
                      <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                        {leagueTeams.map((team) => (
                          <li key={team.id}>
                            <Link to={`/teams/${team.id}`} className={teamTile}>
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

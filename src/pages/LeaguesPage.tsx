import { Link } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { leagues } from '../data/catalog'
import { getCountryById } from '../data/catalog'
import { getTeamsByLeagueId } from '../data/catalog'

const leagueCard =
  'block rounded-xl border border-fume-200/90 bg-white p-5 shadow-sm shadow-fume-950/5 transition-all duration-200 hover:border-gold-400/45 hover:shadow-md hover:shadow-gold-900/10 dark:border-fume-800 dark:bg-fume-900/45 dark:shadow-none dark:hover:border-gold-500/35 dark:hover:bg-fume-900/70'

export function LeaguesPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Leagues' }]} />
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-fume-950 dark:text-fume-50">
          Leagues
        </h2>
        <p className="mt-1 text-sm text-fume-600 dark:text-fume-400">
          Second-tier competitions in France and Portugal — one step below the top
          flight.
        </p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-2">
        {leagues.map((league) => {
          const country = getCountryById(league.countryId)
          const teamCount = getTeamsByLeagueId(league.id).length
          return (
            <li key={league.id}>
              <Link to={`/leagues/${league.id}`} className={leagueCard}>
                <p className="text-xs font-medium uppercase tracking-wide text-fume-500">
                  {country?.name ?? league.countryId} · Tier {league.tier}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">
                  {league.name}
                </h3>
                <p className="mt-2 text-sm text-fume-600 dark:text-fume-400">
                  {teamCount} teams in catalog
                </p>
              </Link>
            </li>
          )
        })}
      </ul>
      <p className="text-xs text-fume-500 dark:text-fume-400">
        Countries are grouped in the side menu; a dedicated Countries hub can be
        added when the dataset grows.
      </p>
    </div>
  )
}

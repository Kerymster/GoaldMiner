import { Link } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { leagues } from '../data/catalog'
import { getCountryById } from '../data/catalog'
import { getTeamsByLeagueId } from '../data/catalog'

export function LeaguesPage() {
  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Leagues' }]} />
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Leagues</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
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
              <Link
                to={`/leagues/${league.id}`}
                className="block rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-zinc-300 hover:bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-900/40 dark:hover:border-zinc-700 dark:hover:bg-zinc-900/80"
              >
                <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
                  {country?.name ?? league.countryId} · Tier {league.tier}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">
                  {league.name}
                </h3>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {teamCount} teams in catalog
                </p>
              </Link>
            </li>
          )
        })}
      </ul>
      <p className="text-xs text-zinc-500 dark:text-zinc-400">
        Countries are grouped in the side menu; a dedicated Countries hub can be
        added when the dataset grows.
      </p>
    </div>
  )
}

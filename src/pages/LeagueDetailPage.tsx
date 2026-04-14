import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import {
  getCountryById,
  getLeagueById,
  getTeamsByLeagueId,
} from '../data/catalog'

export function LeagueDetailPage() {
  const { leagueId } = useParams<{ leagueId: string }>()
  const league = leagueId ? getLeagueById(leagueId) : undefined

  if (!league) {
    return (
      <div className="space-y-4">
        <p className="text-zinc-600 dark:text-zinc-400">League not found.</p>
        <Link
          to="/leagues"
          className="text-sm font-medium text-emerald-600 underline-offset-4 hover:underline dark:text-emerald-400"
        >
          All leagues
        </Link>
      </div>
    )
  }

  const country = getCountryById(league.countryId)
  const teams = getTeamsByLeagueId(league.id)

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Leagues', to: '/leagues' },
          { label: league.name },
        ]}
      />
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          {country?.name} · Tier {league.tier}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">
          {league.name}
        </h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Open a team to see its roster and jump to player profiles.
        </p>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Teams
        </h3>
        <ul className="mt-3 divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/40">
          {teams.map((team) => (
            <li key={team.id}>
              <Link
                to={`/teams/${team.id}`}
                className="flex items-center justify-between gap-4 px-4 py-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              >
                <span className="font-medium">{team.name}</span>
                <span className="text-sm text-zinc-500">View roster →</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

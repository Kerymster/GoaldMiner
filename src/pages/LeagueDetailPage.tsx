import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import {
  getCountryById,
  getLeagueById,
  getTeamsByLeagueId,
} from '../data/catalog'

const listSurface =
  'divide-y divide-fume-200 rounded-xl border border-fume-200/90 bg-white shadow-sm shadow-fume-950/5 dark:divide-fume-800 dark:border-fume-800 dark:bg-fume-900/45 dark:shadow-none'

export function LeagueDetailPage() {
  const { leagueId } = useParams<{ leagueId: string }>()
  const league = leagueId ? getLeagueById(leagueId) : undefined

  if (!league) {
    return (
      <div className="space-y-4">
        <p className="text-fume-600 dark:text-fume-400">League not found.</p>
        <Link
          to="/leagues"
          className="text-sm font-medium text-gold-700 underline-offset-4 hover:text-gold-600 hover:underline dark:text-gold-400 dark:hover:text-gold-300"
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
        <p className="text-xs font-medium uppercase tracking-wide text-fume-500">
          {country?.name} · Tier {league.tier}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-fume-950 dark:text-fume-50">
          {league.name}
        </h2>
        <p className="mt-1 text-sm text-fume-600 dark:text-fume-400">
          Open a team to see its roster and jump to player profiles.
        </p>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-fume-900 dark:text-fume-100">
          Teams
        </h3>
        <ul className={`mt-3 ${listSurface}`}>
          {teams.map((team) => (
            <li key={team.id}>
              <Link
                to={`/teams/${team.id}`}
                className="flex items-center justify-between gap-4 px-4 py-4 transition-colors hover:bg-gold-500/[0.07] dark:hover:bg-fume-800/55"
              >
                <span className="font-medium">{team.name}</span>
                <span className="text-sm text-gold-700 dark:text-gold-500">
                  View roster →
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

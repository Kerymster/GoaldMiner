import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { getTeamWithLeague } from '../data/catalog'
import { useAppSelector } from '../store/hooks'
import { selectPlayersList } from '../store/selectors/playersSelectors'

const cardSurface =
  'rounded-2xl border border-fume-200/90 bg-white p-6 shadow-sm shadow-fume-950/5 dark:border-fume-800 dark:bg-fume-900/45 dark:shadow-none'

const listSurface =
  'divide-y divide-fume-200 rounded-xl border border-fume-200/90 bg-white shadow-sm shadow-fume-950/5 dark:divide-fume-800 dark:border-fume-800 dark:bg-fume-900/45 dark:shadow-none'

export function TeamDetailPage() {
  const { teamId } = useParams<{ teamId: string }>()
  const ctx = teamId ? getTeamWithLeague(teamId) : undefined
  const players = useAppSelector(selectPlayersList)
  const roster = ctx
    ? players.filter((p) => p.teamId === ctx.team.id)
    : []

  if (!ctx) {
    return (
      <div className="space-y-4">
        <p className="text-fume-600 dark:text-fume-400">Team not found.</p>
        <Link
          to="/teams"
          className="text-sm font-medium text-gold-700 underline-offset-4 hover:text-gold-600 hover:underline dark:text-gold-400 dark:hover:text-gold-300"
        >
          All teams
        </Link>
      </div>
    )
  }

  const { team, league, country } = ctx

  return (
    <div className="space-y-8">
      <Breadcrumbs
        items={[
          { label: 'Leagues', to: '/leagues' },
          { label: league.name, to: `/leagues/${league.id}` },
          { label: team.name },
        ]}
      />
      <div className={cardSurface}>
        <p className="text-xs font-medium uppercase tracking-wide text-fume-500">
          {country.name} · {league.name}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-fume-950 dark:text-fume-50">
          {team.name}
        </h2>
        <p className="mt-1 text-sm text-fume-600 dark:text-fume-400">
          {roster.length} players in catalog
        </p>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-fume-900 dark:text-fume-100">
          Roster
        </h3>
        <ul className={`mt-3 ${listSurface}`}>
          {roster.map((player) => (
            <li key={player.id}>
              <Link
                to={`/players/${player.id}`}
                className="flex items-center justify-between gap-4 px-4 py-4 transition-colors hover:bg-gold-500/[0.07] dark:hover:bg-fume-800/55"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{player.name}</p>
                  <p className="truncate text-sm text-fume-500 dark:text-fume-400">
                    {player.position}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-semibold tabular-nums text-gold-700 dark:text-gold-400">
                    {player.underratedScore}
                  </p>
                  <p className="text-xs text-fume-500 dark:text-fume-400">
                    underrated
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        {roster.length === 0 ? (
          <p className="mt-3 text-sm text-fume-500 dark:text-fume-400">
            No players linked to this team yet.
          </p>
        ) : null}
      </div>
    </div>
  )
}

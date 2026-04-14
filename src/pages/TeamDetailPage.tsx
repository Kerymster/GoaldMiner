import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { getTeamWithLeague } from '../data/catalog'
import { useAppSelector } from '../store/hooks'
import { selectPlayersList } from '../store/selectors/playersSelectors'

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
        <p className="text-zinc-600 dark:text-zinc-400">Team not found.</p>
        <Link
          to="/teams"
          className="text-sm font-medium text-emerald-600 underline-offset-4 hover:underline dark:text-emerald-400"
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
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          {country.name} · {league.name}
        </p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight">{team.name}</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {roster.length} players in catalog
        </p>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Roster
        </h3>
        <ul className="mt-3 divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/40">
          {roster.map((player) => (
            <li key={player.id}>
              <Link
                to={`/players/${player.id}`}
                className="flex items-center justify-between gap-4 px-4 py-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{player.name}</p>
                  <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
                    {player.position}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-medium tabular-nums">
                    {player.underratedScore}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    underrated
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        {roster.length === 0 ? (
          <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
            No players linked to this team yet.
          </p>
        ) : null}
      </div>
    </div>
  )
}

import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { getTeamWithLeague } from '../data/catalog'
import { useAppSelector } from '../store/hooks'
import { selectPlayerById } from '../store/selectors/playersSelectors'

export function PlayerDetailPage() {
  const { id } = useParams<{ id: string }>()
  const player = useAppSelector((state) => selectPlayerById(state, id))
  const ctx = player ? getTeamWithLeague(player.teamId) : undefined

  if (!player) {
    return (
      <div className="space-y-4">
        <p className="text-zinc-600 dark:text-zinc-400">Player not found.</p>
        <Link
          to="/players"
          className="text-sm font-medium text-emerald-600 underline-offset-4 hover:underline dark:text-emerald-400"
        >
          Back to players
        </Link>
      </div>
    )
  }

  const breadcrumbItems = ctx
    ? [
        { label: 'Leagues', to: '/leagues' },
        { label: ctx.league.name, to: `/leagues/${ctx.league.id}` },
        { label: ctx.team.name, to: `/teams/${ctx.team.id}` },
        { label: player.name },
      ]
    : [
        { label: 'Players', to: '/players' },
        { label: player.name },
      ]

  return (
    <div className="space-y-8">
      <Breadcrumbs items={breadcrumbItems} />
      <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">
              {player.name}
            </h2>
            <p className="mt-1 text-zinc-600 dark:text-zinc-400">
              {ctx ? (
                <>
                  <Link
                    to={`/teams/${ctx.team.id}`}
                    className="font-medium text-emerald-700 underline-offset-4 hover:underline dark:text-emerald-400"
                  >
                    {ctx.team.name}
                  </Link>
                  {' · '}
                  {ctx.league.name} · {player.position}
                </>
              ) : (
                <>
                  {player.team} · {player.position}
                </>
              )}
            </p>
          </div>
          <div className="rounded-xl bg-emerald-500/10 px-4 py-3 text-center dark:bg-emerald-500/15">
            <p className="text-2xl font-semibold tabular-nums text-emerald-700 dark:text-emerald-400">
              {player.underratedScore}
            </p>
            <p className="text-xs font-medium uppercase tracking-wide text-emerald-700/80 dark:text-emerald-400/80">
              score
            </p>
          </div>
        </div>
        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Rating
            </dt>
            <dd className="mt-1 text-lg tabular-nums">{player.rating}</dd>
          </div>
          <div className="sm:text-right">
            <dt className="text-xs font-medium uppercase tracking-wide text-zinc-500">
              Underrated score
            </dt>
            <dd className="mt-1 text-lg tabular-nums">
              {player.underratedScore}
            </dd>
          </div>
        </dl>
        <p className="mt-8 border-t border-zinc-100 pt-6 text-sm leading-relaxed text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
          {player.note}
        </p>
      </div>
      <Link
        to="/players"
        className="inline-flex text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200"
      >
        ← All players
      </Link>
    </div>
  )
}

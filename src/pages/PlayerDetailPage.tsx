import { Link, useParams } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { getTeamWithLeague } from '../data/catalog'
import { useAppSelector } from '../store/hooks'
import { selectPlayerById } from '../store/selectors/playersSelectors'

const cardSurface =
  'rounded-2xl border border-fume-200/90 bg-white p-6 shadow-sm shadow-fume-950/5 dark:border-fume-800 dark:bg-fume-900/45 dark:shadow-none'

export function PlayerDetailPage() {
  const { id } = useParams<{ id: string }>()
  const player = useAppSelector((state) => selectPlayerById(state, id))
  const ctx = player ? getTeamWithLeague(player.teamId) : undefined

  if (!player) {
    return (
      <div className="space-y-4">
        <p className="text-fume-600 dark:text-fume-400">Player not found.</p>
        <Link
          to="/players"
          className="text-sm font-medium text-gold-700 underline-offset-4 hover:text-gold-600 hover:underline dark:text-gold-400 dark:hover:text-gold-300"
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
      <div className={cardSurface}>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-fume-950 dark:text-fume-50">
              {player.name}
            </h2>
            <p className="mt-1 text-fume-600 dark:text-fume-400">
              {ctx ? (
                <>
                  <Link
                    to={`/teams/${ctx.team.id}`}
                    className="font-medium text-gold-700 underline-offset-4 hover:text-gold-600 hover:underline dark:text-gold-400 dark:hover:text-gold-300"
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
          <div className="rounded-xl border border-gold-500/30 bg-gold-500/10 px-4 py-3 text-center dark:bg-gold-400/10">
            <p className="text-2xl font-semibold tabular-nums text-gold-800 dark:text-gold-300">
              {player.underratedScore}
            </p>
            <p className="text-xs font-medium uppercase tracking-wide text-gold-700/90 dark:text-gold-400/90">
              score
            </p>
          </div>
        </div>
        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wide text-fume-500">
              Rating
            </dt>
            <dd className="mt-1 text-lg tabular-nums">{player.rating}</dd>
          </div>
          <div className="sm:text-right">
            <dt className="text-xs font-medium uppercase tracking-wide text-fume-500">
              Underrated score
            </dt>
            <dd className="mt-1 text-lg tabular-nums text-gold-700 dark:text-gold-400">
              {player.underratedScore}
            </dd>
          </div>
        </dl>
        <p className="mt-8 border-t border-fume-100 pt-6 text-sm leading-relaxed text-fume-600 dark:border-fume-800 dark:text-fume-400">
          {player.note}
        </p>
      </div>
      <Link
        to="/players"
        className="inline-flex text-sm font-medium text-fume-500 hover:text-gold-700 dark:text-fume-400 dark:hover:text-gold-400"
      >
        ← All players
      </Link>
    </div>
  )
}

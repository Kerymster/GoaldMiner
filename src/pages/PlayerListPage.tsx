import { Link } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { getTeamWithLeague } from '../data/catalog'
import { useAppSelector } from '../store/hooks'
import { selectPlayersList } from '../store/selectors/playersSelectors'

const listSurface =
  'divide-y divide-fume-200 rounded-xl border border-fume-200/90 bg-white shadow-sm shadow-fume-950/5 dark:divide-fume-800 dark:border-fume-800 dark:bg-fume-900/45 dark:shadow-none'

export function PlayerListPage() {
  const players = useAppSelector(selectPlayersList)

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Players' }]} />
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-fume-950 dark:text-fume-50">
          Players
        </h2>
        <p className="mt-1 text-sm text-fume-600 dark:text-fume-400">
          Spotlight on performers who punch above their headline attention.
        </p>
      </div>
      <ul className={listSurface}>
        {players.map((player) => {
          const ctx = getTeamWithLeague(player.teamId)
          return (
            <li key={player.id}>
              <Link
                to={`/players/${player.id}`}
                className="flex items-center justify-between gap-4 px-4 py-4 transition-colors hover:bg-gold-500/[0.07] dark:hover:bg-fume-800/55"
              >
                <div className="min-w-0">
                  <p className="truncate font-medium">{player.name}</p>
                  <p className="truncate text-sm text-fume-500 dark:text-fume-400">
                    {ctx
                      ? `${player.team} · ${ctx.league.name} · ${player.position}`
                      : `${player.team} · ${player.position}`}
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
          )
        })}
      </ul>
    </div>
  )
}

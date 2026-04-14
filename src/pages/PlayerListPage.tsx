import { Link } from 'react-router-dom'
import { useAppSelector } from '../store/hooks'
import { selectPlayersList } from '../store/selectors/playersSelectors'

export function PlayerListPage() {
  const players = useAppSelector(selectPlayersList)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Players</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Spotlight on performers who punch above their headline attention.
        </p>
      </div>
      <ul className="divide-y divide-zinc-200 rounded-xl border border-zinc-200 bg-white dark:divide-zinc-800 dark:border-zinc-800 dark:bg-zinc-900/40">
        {players.map((player) => (
          <li key={player.id}>
            <Link
              to={`/players/${player.id}`}
              className="flex items-center justify-between gap-4 px-4 py-4 transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50"
            >
              <div className="min-w-0">
                <p className="truncate font-medium">{player.name}</p>
                <p className="truncate text-sm text-zinc-500 dark:text-zinc-400">
                  {player.team} · {player.position}
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
    </div>
  )
}

import { Link } from 'react-router-dom'
import type { Player } from '../../types/api'

type TeamRosterRowProps = {
  player: Player
}

export function TeamRosterRow({ player }: TeamRosterRowProps) {
  return (
    <li>
      <Link
        to={`/players/${player.id}`}
        className="flex items-center justify-between gap-4 px-4 py-4 transition-colors hover:bg-gold-500/[0.07] dark:hover:bg-surface-panel-hover/55"
      >
        <div className="min-w-0">
          <p className="truncate font-medium">{player.name}</p>
          <p className="truncate text-sm text-fume-500 dark:text-fume-400">
            {player.position}
          </p>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-sm font-semibold tabular-nums text-gold-700 dark:text-gold-400">
            {player.underratedScore ?? '—'}
          </p>
          <p className="text-xs text-fume-500 dark:text-fume-400">Ledger</p>
        </div>
      </Link>
    </li>
  )
}

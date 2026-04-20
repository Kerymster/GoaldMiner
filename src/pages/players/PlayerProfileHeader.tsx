import type { Player } from '../../types/api'
import { PlayerRankCard } from './PlayerRankCard'

type PlayerProfileHeaderProps = {
  player: Player
}

export function PlayerProfileHeader({ player }: PlayerProfileHeaderProps) {
  const parts = [player.team, player.nationality, player.position].filter(Boolean)

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h2 className="text-2xl font-semibold tracking-tight text-fume-950 dark:text-fume-50">
          {player.name}
        </h2>
        <p className="mt-1 text-fume-600 dark:text-fume-400">{parts.join(' · ')}</p>
      </div>
      <PlayerRankCard underratedScore={player.underratedScore} />
    </div>
  )
}

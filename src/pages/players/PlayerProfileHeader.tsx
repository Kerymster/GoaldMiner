import { Link } from 'react-router-dom'
import type { Player } from '../../types/api'
import { PlayerRankCard } from './PlayerRankCard'

type PlayerProfileHeaderProps = {
  player: Player
  /** Display name for league (from Redux or fallback to id). */
  leagueDisplayName: string | undefined
}

export function PlayerProfileHeader({
  player,
  leagueDisplayName,
}: PlayerProfileHeaderProps) {
  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
      <div className="min-w-0">
        <h2 className="text-2xl font-semibold tracking-tight text-fume-950 dark:text-fume-50">
          {player.name}
        </h2>
        <p className="mt-1 text-fume-600 dark:text-fume-400">
          <Link
            to={`/teams/${player.teamId}`}
            className="font-medium text-gold-700 underline-offset-4 hover:text-gold-600 hover:underline dark:text-gold-400 dark:hover:text-gold-300"
          >
            {player.team}
          </Link>
          {leagueDisplayName ? (
            <>
              {' · '}
              {player.leagueId ? (
                <Link
                  to={`/leagues/${player.leagueId}`}
                  className="text-gold-700 underline-offset-4 hover:text-gold-600 hover:underline dark:text-gold-400 dark:hover:text-gold-300"
                >
                  {leagueDisplayName}
                </Link>
              ) : (
                leagueDisplayName
              )}
            </>
          ) : null}
          {' · '}
          {player.position}
        </p>
      </div>
      <PlayerRankCard underratedScore={player.underratedScore} />
    </div>
  )
}

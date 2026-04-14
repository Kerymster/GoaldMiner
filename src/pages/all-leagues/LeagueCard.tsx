import { Link } from 'react-router-dom'
import type { LeagueMeta } from '../../types/api'
import { leagueCardClass } from './leaguesListStyles'

type LeagueCardProps = {
  league: LeagueMeta
}

export function LeagueCard({ league }: LeagueCardProps) {
  return (
    <li>
      <Link
        to={`/leagues/${league.leagueId}`}
        className={leagueCardClass}
      >
        <p className="text-xs font-medium uppercase tracking-wide text-fume-500">
          {league.countryName} · Tier {league.tier}
        </p>
        <h3 className="mt-2 text-lg font-semibold tracking-tight">
          {league.name}
        </h3>
        {league.nameLocal !== league.name ? (
          <p className="mt-1 text-sm text-fume-600 dark:text-fume-400">
            {league.nameLocal}
          </p>
        ) : null}
      </Link>
    </li>
  )
}

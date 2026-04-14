import type { LeagueMeta } from '../../types/api'

type LeagueDetailHeroProps = {
  league: LeagueMeta
}

export function LeagueDetailHero({ league }: LeagueDetailHeroProps) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-fume-500">
        {league.countryName} · Tier {league.tier}
      </p>
      <h2 className="mt-2 text-2xl font-semibold tracking-tight text-fume-950 dark:text-fume-50">
        {league.name}
      </h2>
      {league.nameLocal !== league.name ? (
        <p className="mt-1 text-sm text-fume-600 dark:text-fume-400">
          {league.nameLocal}
        </p>
      ) : null}
      <p className="mt-1 text-sm text-fume-600 dark:text-fume-400">
        Open a team to see its roster and jump to player profiles.
      </p>
    </div>
  )
}

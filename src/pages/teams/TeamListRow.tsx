import { Link } from 'react-router-dom'
import { TeamLogo } from '../../components/TeamLogo'
import type { TeamRow } from '../../types/api'

type TeamListRowProps = {
  team: TeamRow
}

export function TeamListRow({ team }: TeamListRowProps) {
  return (
    <li>
      <Link
        to={`/teams/${team.id}`}
        className="flex flex-wrap items-center justify-between gap-4 px-4 py-4 transition-colors hover:bg-gold-500/[0.07] dark:hover:bg-fume-800/55"
      >
        <TeamLogo
          key={`${team.id}-${team.logoUrl ?? ''}`}
          name={team.name}
          logoUrl={team.logoUrl}
          size="sm"
        />
        <div className="min-w-0 flex-1">
          <p className="font-medium">{team.name}</p>
          <p className="text-sm text-fume-500 dark:text-fume-400">
            {team.shortName ? `${team.shortName} · ` : null}
            {team.leagueId} · {team.countryId}
          </p>
        </div>
        <span className="text-sm text-gold-700 dark:text-gold-500">View →</span>
      </Link>
    </li>
  )
}

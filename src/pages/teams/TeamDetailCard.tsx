import { TeamLogo } from '../../components/TeamLogo'
import type { LeagueMeta, PaginatedResponse, Player, TeamRow } from '../../types/api'
import { teamDetailCardClass } from './teamsPageStyles'

type TeamDetailCardProps = {
  team: TeamRow
  leagueMeta: LeagueMeta | undefined
  leagueName: string
  rosterRes: PaginatedResponse<Player> | null
  rosterLoading: boolean
}

export function TeamDetailCard({
  team,
  leagueMeta,
  leagueName,
  rosterRes,
  rosterLoading,
}: TeamDetailCardProps) {
  return (
    <div className={teamDetailCardClass}>
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <TeamLogo
          key={`${team.id}-${team.logoUrl ?? ''}`}
          name={team.name}
          logoUrl={team.logoUrl}
          size="lg"
        />
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-fume-500">
            {leagueMeta?.countryName ?? team.countryId}
            {leagueName ? ` · ${leagueName}` : ''}
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-fume-950 dark:text-fume-50">
            {team.name}
          </h2>
        </div>
      </div>
      {team.note ? (
        <p className="mt-6 text-sm text-fume-600 dark:text-fume-400">{team.note}</p>
      ) : null}
      <p className="mt-3 text-sm text-fume-600 dark:text-fume-400">
        {rosterRes
          ? `${rosterRes.total} players · showing page ${rosterRes.page} of ${rosterRes.totalPages}`
          : rosterLoading
            ? 'Loading roster…'
            : null}
      </p>
    </div>
  )
}

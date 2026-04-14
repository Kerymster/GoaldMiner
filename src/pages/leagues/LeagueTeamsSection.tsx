import type { Dispatch, SetStateAction } from 'react'
import type { PaginatedTeamsResponse, TeamRow } from '../../types/api'
import { TeamListRow } from '../teams/TeamListRow'
import { TeamsPagination } from '../teams/TeamsPagination'
import { listSurface } from '../teams/teamsPageStyles'

type LeagueTeamsSectionProps = {
  teams: TeamRow[]
  teamsRes: PaginatedTeamsResponse | null
  teamsPage: number
  setTeamsPage: Dispatch<SetStateAction<number>>
  teamsLoading: boolean
  error: string | null
}

export function LeagueTeamsSection({
  teams,
  teamsRes,
  teamsPage,
  setTeamsPage,
  teamsLoading,
  error,
}: LeagueTeamsSectionProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-fume-900 dark:text-fume-100">
        Teams
      </h3>
      {teamsLoading && !teamsRes ? (
        <p className="mt-2 text-sm text-fume-500 dark:text-fume-400">
          Loading teams…
        </p>
      ) : null}
      {error ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : null}
      {!teamsLoading || teamsRes ? (
        <p className="mt-1 text-xs text-fume-500 dark:text-fume-400">
          {teamsRes
            ? `Page ${teamsRes.page} of ${teamsRes.totalPages} (${teamsRes.total} teams)`
            : null}
        </p>
      ) : null}
      <ul className={`mt-3 ${listSurface}`}>
        {teams.map((team) => (
          <TeamListRow key={team.id} team={team} />
        ))}
      </ul>
      {teamsRes && teams.length === 0 ? (
        <p className="mt-3 text-sm text-fume-500 dark:text-fume-400">
          No teams returned for this league.
        </p>
      ) : null}
      <TeamsPagination
        page={teamsPage}
        setPage={setTeamsPage}
        data={teamsRes}
        loading={teamsLoading}
        className="mt-4"
      />
    </div>
  )
}

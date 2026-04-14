import type { Dispatch, SetStateAction } from 'react'
import { ListPagination } from '../../components/ListPagination'
import type { PaginatedResponse, Player } from '../../types/api'
import { TeamRosterRow } from './TeamRosterRow'
import { listSurface } from './teamsPageStyles'

type TeamRosterSectionProps = {
  roster: Player[]
  rosterRes: PaginatedResponse<Player> | null
  rosterPage: number
  setRosterPage: Dispatch<SetStateAction<number>>
  rosterLoading: boolean
  error: string | null
}

export function TeamRosterSection({
  roster,
  rosterRes,
  rosterPage,
  setRosterPage,
  rosterLoading,
  error,
}: TeamRosterSectionProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-fume-900 dark:text-fume-100">
        Roster
      </h3>
      {error ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : null}
      <ul className={`mt-3 ${listSurface}`}>
        {roster.map((player) => (
          <TeamRosterRow key={player.id} player={player} />
        ))}
      </ul>
      {rosterRes && roster.length === 0 ? (
        <p className="mt-3 text-sm text-fume-500 dark:text-fume-400">
          No players returned for this team.
        </p>
      ) : null}
      <ListPagination
        page={rosterPage}
        setPage={setRosterPage}
        data={rosterRes}
        loading={rosterLoading}
        className="mt-4"
      />
    </div>
  )
}

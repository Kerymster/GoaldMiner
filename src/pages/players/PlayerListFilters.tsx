import type { LeagueMeta, PlayersSort } from '../../types/api'
import { playerListInputClass } from './playerListStyles'

type PlayerListFiltersProps = {
  leagues: LeagueMeta[]
  leagueId: string
  onLeagueIdChange: (value: string) => void
  sort: PlayersSort
  onSortChange: (value: PlayersSort) => void
}

export function PlayerListFilters({
  leagues,
  leagueId,
  onLeagueIdChange,
  sort,
  onSortChange,
}: PlayerListFiltersProps) {
  return (
    <div className="flex flex-wrap items-end gap-3">
      <label className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-fume-500">
        League
        <select
          value={leagueId}
          onChange={(e) => onLeagueIdChange(e.target.value)}
          className={`${playerListInputClass} min-w-[10rem]`}
        >
          <option value="">All</option>
          {leagues.map((l) => (
            <option key={l.leagueId} value={l.leagueId}>
              {l.name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-fume-500">
        Sort
        <select
          value={sort}
          onChange={(e) => onSortChange(e.target.value as PlayersSort)}
          className={`${playerListInputClass} min-w-[12rem]`}
        >
          <option value="underratedScore_desc">Ledger score (high → low)</option>
          <option value="underratedScore_asc">Ledger score (low → high)</option>
          <option value="rating_desc">Rating (high → low)</option>
          <option value="rating_asc">Rating (low → high)</option>
          <option value="name_asc">Name (A–Z)</option>
        </select>
      </label>
    </div>
  )
}

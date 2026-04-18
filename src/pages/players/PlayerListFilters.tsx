import { OverlaySelect } from '../../components/OverlaySelect'
import type { LeagueMeta, PlayersSort } from '../../types/api'

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
  const leagueOptions = [
    { value: '', label: 'All' },
    ...leagues.map((l) => ({ value: l.leagueId, label: l.name })),
  ]

  const sortOptions: { value: PlayersSort; label: string }[] = [
    { value: 'underratedScore_desc', label: 'Ledger score (high → low)' },
    { value: 'underratedScore_asc', label: 'Ledger score (low → high)' },
    { value: 'rating_desc', label: 'Rating (high → low)' },
    { value: 'rating_asc', label: 'Rating (low → high)' },
    { value: 'name_asc', label: 'Name (A–Z)' },
  ]

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-fume-500 dark:text-fume-400">
        <span>League</span>
        <OverlaySelect
          value={leagueId}
          onChange={onLeagueIdChange}
          options={leagueOptions}
          placeholder="All"
          triggerClassName="min-w-[10rem]"
        />
      </div>
      <div className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-fume-500 dark:text-fume-400">
        <span>Sort</span>
        <OverlaySelect
          value={sort}
          onChange={(v) => onSortChange(v as PlayersSort)}
          options={sortOptions}
          triggerClassName="min-w-[12rem]"
        />
      </div>
    </div>
  )
}

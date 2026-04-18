import { OverlaySelect } from '../../components/OverlaySelect'
import type { LeagueMeta, TeamsSort } from '../../types/api'

type TeamsFiltersProps = {
  countries: [string, string][]
  leagues: LeagueMeta[]
  countryId: string
  onCountryIdChange: (value: string) => void
  leagueId: string
  onLeagueIdChange: (value: string) => void
  sort: TeamsSort
  onSortChange: (value: TeamsSort) => void
}

export function TeamsFilters({
  countries,
  leagues,
  countryId,
  onCountryIdChange,
  leagueId,
  onLeagueIdChange,
  sort,
  onSortChange,
}: TeamsFiltersProps) {
  const countryOptions = [
    { value: '', label: 'All' },
    ...countries.map(([cid, name]) => ({ value: cid, label: name })),
  ]

  const leagueOptions = [
    { value: '', label: 'All' },
    ...leagues.map((l) => ({ value: l.leagueId, label: l.name })),
  ]

  const sortOptions: { value: TeamsSort; label: string }[] = [
    { value: 'name_asc', label: 'Name (A–Z)' },
    { value: 'name_desc', label: 'Name (Z–A)' },
    { value: 'shortName_asc', label: 'Short name (A–Z)' },
  ]

  const triggerMin = 'min-w-[10rem]'

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-fume-500 dark:text-fume-400">
        <span>Country</span>
        <OverlaySelect
          value={countryId}
          onChange={onCountryIdChange}
          options={countryOptions}
          placeholder="All"
          triggerClassName={triggerMin}
        />
      </div>
      <div className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-fume-500 dark:text-fume-400">
        <span>League</span>
        <OverlaySelect
          value={leagueId}
          onChange={onLeagueIdChange}
          options={leagueOptions}
          placeholder="All"
          triggerClassName={triggerMin}
        />
      </div>
      <div className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-fume-500 dark:text-fume-400">
        <span>Sort</span>
        <OverlaySelect
          value={sort}
          onChange={(v) => onSortChange(v as TeamsSort)}
          options={sortOptions}
          triggerClassName={triggerMin}
        />
      </div>
    </div>
  )
}

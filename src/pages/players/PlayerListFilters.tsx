import { OverlaySelect } from '../../components/OverlaySelect'
import type { NationalityItem } from '../../types/nationalities'
import type { PlayersSort } from '../../types/api'
import { playerListInputClass } from './playerListStyles'

type PlayerListFiltersProps = {
  nationalities: NationalityItem[]
  q: string
  onQChange: (value: string) => void
  countryId: string
  onCountryIdChange: (value: string) => void
  sort: PlayersSort
  onSortChange: (value: PlayersSort) => void
}

export function PlayerListFilters({
  nationalities,
  q,
  onQChange,
  countryId,
  onCountryIdChange,
  sort,
  onSortChange,
}: PlayerListFiltersProps) {
  const countryOptions = [
    { value: '', label: 'All countries' },
    ...[...nationalities]
      .sort((a, b) => a.country.localeCompare(b.country))
      .map((n) => ({ value: n.code, label: n.country })),
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
      <label className="flex min-w-[12rem] flex-col gap-1 text-xs font-medium uppercase tracking-wide text-fume-500 dark:text-fume-400">
        <span>Search</span>
        <input
          type="search"
          value={q}
          onChange={(e) => onQChange(e.target.value)}
          placeholder="Name or club…"
          autoComplete="off"
          className={`${playerListInputClass} min-h-[2.25rem] min-w-0 font-normal normal-case tracking-normal placeholder:text-fume-500 dark:placeholder:text-fume-500`}
        />
      </label>
      <div className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-fume-500 dark:text-fume-400">
        <span>Country</span>
        <OverlaySelect
          value={countryId}
          onChange={onCountryIdChange}
          options={countryOptions}
          placeholder="All countries"
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

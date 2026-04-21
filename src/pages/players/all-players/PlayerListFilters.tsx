import { OverlaySelect } from '../../../components/OverlaySelect'
import type { PlayersSort } from '../../../types/api'
import { playerListInputClass } from './playerListStyles'

type PlayerListFiltersProps = {
  q: string
  onQChange: (value: string) => void
  minRating: string
  onMinRatingChange: (value: string) => void
  maxRating: string
  onMaxRatingChange: (value: string) => void
  minUnderrated: string
  onMinUnderratedChange: (value: string) => void
  maxUnderrated: string
  onMaxUnderratedChange: (value: string) => void
  sort: PlayersSort
  onSortChange: (value: PlayersSort) => void
}

export function PlayerListFilters({
  q,
  onQChange,
  minRating,
  onMinRatingChange,
  maxRating,
  onMaxRatingChange,
  minUnderrated,
  onMinUnderratedChange,
  maxUnderrated,
  onMaxUnderratedChange,
  sort,
  onSortChange,
}: PlayerListFiltersProps) {
  const sortOptions: { value: PlayersSort; label: string }[] = [
    { value: 'underratedScore_desc', label: 'Ledger score (high → low)' },
    { value: 'underratedScore_asc', label: 'Ledger score (low → high)' },
    { value: 'rating_desc', label: 'Rating (high → low)' },
    { value: 'rating_asc', label: 'Rating (low → high)' },
    { value: 'name_asc', label: 'Name (A–Z)' },
  ]

  const numFieldClass = `${playerListInputClass} min-h-[2.25rem] w-full min-w-0 max-w-[5.5rem] font-normal normal-case tracking-normal tabular-nums`

  return (
    <div className="flex flex-col gap-4">
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
          <span>Sort</span>
          <OverlaySelect
            value={sort}
            onChange={(v) => onSortChange(v as PlayersSort)}
            options={sortOptions}
            triggerClassName="min-w-[12rem]"
          />
        </div>
      </div>
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-fume-500 dark:text-fume-400">
          <span>Min rating</span>
          <input
            type="number"
            inputMode="decimal"
            value={minRating}
            onChange={(e) => onMinRatingChange(e.target.value)}
            placeholder="—"
            className={numFieldClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-fume-500 dark:text-fume-400">
          <span>Max rating</span>
          <input
            type="number"
            inputMode="decimal"
            value={maxRating}
            onChange={(e) => onMaxRatingChange(e.target.value)}
            placeholder="—"
            className={numFieldClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-fume-500 dark:text-fume-400">
          <span>Min ledger</span>
          <input
            type="number"
            inputMode="decimal"
            value={minUnderrated}
            onChange={(e) => onMinUnderratedChange(e.target.value)}
            placeholder="—"
            className={numFieldClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-fume-500 dark:text-fume-400">
          <span>Max ledger</span>
          <input
            type="number"
            inputMode="decimal"
            value={maxUnderrated}
            onChange={(e) => onMaxUnderratedChange(e.target.value)}
            placeholder="—"
            className={numFieldClass}
          />
        </label>
      </div>
    </div>
  )
}

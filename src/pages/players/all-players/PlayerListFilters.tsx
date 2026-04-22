import { OverlaySelect } from '../../../components/overlay-select/OverlaySelect'
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

const playerFiltersPanelClass =
  'rounded-2xl border border-surface-panel-border bg-surface-panel p-4 shadow-md shadow-fume-950/12 ring-1 ring-fume-900/5 dark:shadow-none dark:ring-0 sm:p-5'
const playerFiltersHeaderClass = 'flex items-center justify-between gap-3 border-b border-surface-divider pb-3'
const playerFiltersTitleClass =
  'text-[11px] font-semibold uppercase tracking-[0.16em] text-gold-700 dark:text-gold-400'
const playerFiltersHintClass = 'text-xs text-fume-500 dark:text-fume-400'
const playerFiltersGroupClass = 'rounded-xl border border-surface-divider bg-surface-inset/45 p-3'
const playerFiltersGroupTitleClass =
  'mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-fume-500 dark:text-fume-400'

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
  const labelClass =
    'flex flex-col gap-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-fume-500 dark:text-fume-400'

  return (
    <section className={playerFiltersPanelClass}>
      <div className={playerFiltersHeaderClass}>
        <p className={playerFiltersTitleClass}>Filters</p>
        <p className={playerFiltersHintClass}>Refine list by identity and scoring band</p>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-[1.2fr_1fr]">
        <div className={playerFiltersGroupClass}>
          <p className={playerFiltersGroupTitleClass}>Search & sort</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <label className={`${labelClass} min-w-0`}>
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
            <div className={labelClass}>
              <span>Sort</span>
              <OverlaySelect
                value={sort}
                onChange={(v) => onSortChange(v as PlayersSort)}
                options={sortOptions}
                triggerClassName="min-h-[2.25rem] min-w-[12rem] py-2 font-normal normal-case tracking-normal"
              />
            </div>
          </div>
        </div>

        <div className={playerFiltersGroupClass}>
          <p className={playerFiltersGroupTitleClass}>Range filters</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <label className={labelClass}>
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
            <label className={labelClass}>
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
            <label className={labelClass}>
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
            <label className={labelClass}>
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
      </div>
    </section>
  )
}


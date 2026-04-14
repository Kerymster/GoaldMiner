import type { LeagueMeta, TeamsSort } from '../../types/api'
import { inputClass } from './teamsPageStyles'

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
  return (
    <div className="flex flex-wrap items-end gap-3">
      <label className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-fume-500">
        Country
        <select
          value={countryId}
          onChange={(e) => onCountryIdChange(e.target.value)}
          className={`${inputClass} min-w-[10rem]`}
        >
          <option value="">All</option>
          {countries.map(([cid, name]) => (
            <option key={cid} value={cid}>
              {name}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-fume-500">
        League
        <select
          value={leagueId}
          onChange={(e) => onLeagueIdChange(e.target.value)}
          className={`${inputClass} min-w-[10rem]`}
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
          onChange={(e) => onSortChange(e.target.value as TeamsSort)}
          className={`${inputClass} min-w-[10rem]`}
        >
          <option value="name_asc">Name (A–Z)</option>
          <option value="name_desc">Name (Z–A)</option>
          <option value="shortName_asc">Short name (A–Z)</option>
        </select>
      </label>
    </div>
  )
}

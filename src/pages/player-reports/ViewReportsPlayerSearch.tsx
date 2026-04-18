import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { getPlayers } from '../../api/players'
import type { Player } from '../../types/api'
import { overlayAutocompletePanelClass } from '../../components/overlayDropdownStyles'
import { IconSearch } from '../../components/icons'
import { useDebouncedSearchQuery } from '../../hooks/useDebouncedSearchQuery'
import { playerMatchesNameOrTeam } from '../../utils/playerNameTeamSearch'

export type ViewReportsSelectedPlayer = {
  id: string
  name: string
  team: string
  position: string
}

const searchInputClass =
  'w-full rounded-lg border border-surface-field-border bg-surface-field py-2 pl-9 pr-3 text-sm text-fume-900 shadow-sm placeholder:text-fume-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/25 dark:text-fume-100 dark:placeholder:text-fume-500'

const panelClass = `${overlayAutocompletePanelClass} py-1`

type ViewReportsPlayerSearchProps = {
  selectedPlayer: ViewReportsSelectedPlayer | null
  onSelectPlayer: (player: ViewReportsSelectedPlayer) => void
  onClearSelection: () => void
}

export function ViewReportsPlayerSearch({
  selectedPlayer,
  onSelectPlayer,
  onClearSelection,
}: ViewReportsPlayerSearchProps) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedSearchQuery(query)
  const [searchOpen, setSearchOpen] = useState(false)
  const [highlight, setHighlight] = useState(0)
  const [apiHits, setApiHits] = useState<Player[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!debouncedQuery) {
      setApiHits([])
      setSearchLoading(false)
      return
    }
    let cancelled = false
    ;(async () => {
      setSearchLoading(true)
      if (!cancelled) setApiHits([])
      try {
        const r = await getPlayers({
          q: debouncedQuery,
          page: 1,
          pageSize: 48,
          sort: 'name_asc',
        })
        if (!cancelled) {
          setApiHits(r.items.filter((p) => playerMatchesNameOrTeam(p, debouncedQuery)))
        }
      } catch {
        if (!cancelled) setApiHits([])
      } finally {
        if (!cancelled) setSearchLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [debouncedQuery])

  useEffect(() => {
    setHighlight(0)
  }, [debouncedQuery, apiHits.length])

  const rows = apiHits
  const displayIndex = rows.length === 0 ? 0 : Math.min(highlight, rows.length - 1)

  const pickPlayer = useCallback(
    (p: Player) => {
      onSelectPlayer({
        id: p.id,
        name: p.name,
        team: p.team,
        position: p.position,
      })
      setQuery('')
      setApiHits([])
      setSearchOpen(false)
    },
    [onSelectPlayer],
  )

  const onSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!searchOpen || rows.length === 0) {
      if (e.key === 'Escape') setQuery('')
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight((i) => (i + 1) % rows.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((i) => (i - 1 + rows.length) % rows.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const p = rows[displayIndex]
      if (p) pickPlayer(p)
    } else if (e.key === 'Escape') {
      setSearchOpen(false)
      inputRef.current?.blur()
    }
  }

  const showPanel = searchOpen && query.trim().length > 0
  const showEmptyPanel =
    showPanel && !searchLoading && apiHits.length === 0 && debouncedQuery.length > 0

  return (
    <div className="space-y-3">
      <div className="relative max-w-xl">
        <label className="relative block">
          <span className="sr-only">Search players for reports</span>
          <IconSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-fume-400" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value)
              setHighlight(0)
              setSearchOpen(true)
            }}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => {
              window.setTimeout(() => setSearchOpen(false), 180)
            }}
            onKeyDown={onSearchKeyDown}
            placeholder="Search by player or team…"
            autoComplete="off"
            role="combobox"
            aria-expanded={showPanel}
            aria-controls="view-reports-search-results"
            className={searchInputClass}
          />
        </label>
        {showPanel ? (
          <div id="view-reports-search-results" role="listbox" className={panelClass}>
            {searchLoading ? (
              <p className="border-b border-surface-divider px-4 py-2 text-sm text-fume-500 dark:text-fume-400">
                Searching roster…
              </p>
            ) : null}
            {showEmptyPanel ? (
              <p className="px-4 py-3 text-sm text-fume-500 dark:text-fume-400">
                No players match your search.
              </p>
            ) : null}
            {apiHits.length > 0 ? (
              <>
                <p className="px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-fume-400">
                  From roster
                </p>
                {apiHits.map((p, i) => {
                  const idx = i
                  return (
                    <button
                      key={p.id}
                      type="button"
                      role="option"
                      aria-selected={idx === displayIndex}
                      onMouseDown={(e) => e.preventDefault()}
                      onMouseEnter={() => setHighlight(idx)}
                      onClick={() => pickPlayer(p)}
                      className={[
                        'flex w-full cursor-pointer flex-col gap-0.5 px-4 py-2.5 text-left text-sm transition-colors',
                        idx === displayIndex
                          ? 'bg-gold-500/12 dark:bg-gold-500/15'
                          : 'hover:bg-fume-100 dark:hover:bg-surface-panel/85',
                      ].join(' ')}
                    >
                      <span className="flex items-center gap-2">
                        <span className="rounded bg-fume-200/90 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-fume-600 dark:bg-fume-800 dark:text-fume-400">
                          Player
                        </span>
                        <span className="font-medium text-fume-900 dark:text-fume-100">
                          {p.name}
                        </span>
                      </span>
                      <span className="pl-0.5 text-xs text-fume-500 dark:text-fume-400">
                        {p.team}
                      </span>
                    </button>
                  )
                })}
              </>
            ) : null}
          </div>
        ) : null}
      </div>

      {selectedPlayer ? (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-fume-500 dark:text-fume-400">Selected:</span>
          <span className="inline-flex items-center gap-2 rounded-lg border border-surface-field-border bg-fume-50 px-3 py-1.5 text-sm font-medium text-fume-900 dark:bg-surface-panel/55 dark:text-fume-100">
            {selectedPlayer.name}
            <span className="font-normal text-fume-500 dark:text-fume-400">
              · {selectedPlayer.team} · {selectedPlayer.position}
            </span>
          </span>
          <button
            type="button"
            onClick={onClearSelection}
            className="cursor-pointer text-xs font-medium text-gold-700 underline-offset-2 hover:underline dark:text-gold-400"
          >
            Clear
          </button>
        </div>
      ) : null}
    </div>
  )
}

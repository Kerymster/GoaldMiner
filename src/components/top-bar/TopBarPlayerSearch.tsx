import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { getPlayers } from '../../api/players'
import { isApiErr, type Player } from '../../types/api'
import { IconSearch } from '../icons'

type SearchHit = {
  id: string
  title: string
  subtitle: string
  to: string
}

function playersToHits(players: Player[]): SearchHit[] {
  return players.map((p) => ({
    id: p.id,
    title: p.name,
    subtitle: `${p.team} · ${p.position}`,
    to: `/players/${p.id}`,
  }))
}

export function TopBarPlayerSearch() {
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [highlight, setHighlight] = useState(0)
  const [hits, setHits] = useState<SearchHit[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const t = window.setTimeout(() => setDebouncedQuery(query.trim()), 300)
    return () => window.clearTimeout(t)
  }, [query])

  useEffect(() => {
    if (!debouncedQuery) {
      setHits([])
      setSearchLoading(false)
      return
    }
    let cancelled = false
    ;(async () => {
      setSearchLoading(true)
      try {
        const r = await getPlayers({
          q: debouncedQuery,
          page: 1,
          pageSize: 12,
          sort: 'name_asc',
        })
        if (!cancelled) setHits(playersToHits(r.items))
      } catch (e) {
        if (!cancelled) {
          if (isApiErr(e)) setHits([])
          else setHits([])
        }
      } finally {
        if (!cancelled) setSearchLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [debouncedQuery])

  const displayIndex =
    hits.length === 0 ? 0 : Math.min(highlight, hits.length - 1)

  const goHit = useCallback(
    (h: SearchHit) => {
      navigate(h.to)
      setQuery('')
      setDebouncedQuery('')
      setHits([])
      setSearchOpen(false)
    },
    [navigate],
  )

  const onSearchKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!searchOpen || hits.length === 0) {
      if (e.key === 'Escape') setQuery('')
      return
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight((i) => (i + 1) % hits.length)
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight((i) => (i - 1 + hits.length) % hits.length)
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const h = hits[displayIndex]
      if (h) goHit(h)
    } else if (e.key === 'Escape') {
      setSearchOpen(false)
      inputRef.current?.blur()
    }
  }

  const showPanel = searchOpen && query.trim().length > 0

  return (
    <div className="relative w-full max-w-xl">
      <label className="relative block">
        <span className="sr-only">Search players</span>
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
          placeholder="Search players…"
          autoComplete="off"
          role="combobox"
          aria-expanded={showPanel}
          aria-controls="topbar-search-results"
          aria-activedescendant={
            showPanel && hits[displayIndex]
              ? `search-hit-${hits[displayIndex].id}`
              : undefined
          }
          className="w-full rounded-lg border border-fume-200/90 bg-white/90 py-2 pl-9 pr-3 text-sm text-fume-900 shadow-sm placeholder:text-fume-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/25 dark:border-fume-700 dark:bg-fume-900/70 dark:text-fume-100 dark:placeholder:text-fume-500"
        />
      </label>
      {showPanel ? (
        <div
          id="topbar-search-results"
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-80 overflow-auto rounded-xl border border-fume-200/90 bg-white py-1 shadow-lg shadow-fume-950/15 dark:border-fume-700 dark:bg-fume-900"
        >
          {searchLoading ? (
            <p className="px-4 py-3 text-sm text-fume-500 dark:text-fume-400">
              Searching…
            </p>
          ) : hits.length === 0 ? (
            <p className="px-4 py-3 text-sm text-fume-500 dark:text-fume-400">
              No players match. Try another name.
            </p>
          ) : (
            hits.map((h, i) => (
              <button
                key={h.id}
                id={`search-hit-${h.id}`}
                type="button"
                role="option"
                aria-selected={i === displayIndex}
                onMouseDown={(e) => e.preventDefault()}
                onMouseEnter={() => setHighlight(i)}
                onClick={() => goHit(h)}
                className={[
                  'flex w-full cursor-pointer flex-col gap-0.5 px-4 py-2.5 text-left text-sm transition-colors',
                  i === displayIndex
                    ? 'bg-gold-500/12 dark:bg-gold-500/15'
                    : 'hover:bg-fume-100 dark:hover:bg-fume-800/80',
                ].join(' ')}
              >
                <span className="flex items-center gap-2">
                  <span className="rounded bg-fume-200/90 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-fume-600 dark:bg-fume-800 dark:text-fume-400">
                    Player
                  </span>
                  <span className="font-medium text-fume-900 dark:text-fume-100">
                    {h.title}
                  </span>
                </span>
                <span className="pl-0.5 text-xs text-fume-500 dark:text-fume-400">
                  {h.subtitle}
                </span>
              </button>
            ))
          )}
        </div>
      ) : null}
    </div>
  )
}

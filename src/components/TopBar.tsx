import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type SVGProps,
} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getPlayers } from '../api/players'
import { isApiErr, type Player } from '../types/api'

function titleFromPath(pathname: string): { title: string; subtitle?: string } {
  if (pathname === '/players' || pathname === '/') {
    return { title: 'Players', subtitle: 'Browse underrated picks' }
  }
  if (pathname.startsWith('/players/')) {
    return { title: 'Player profile', subtitle: 'Stats and notes' }
  }
  if (pathname === '/compare') {
    return { title: 'Compare', subtitle: 'Side-by-side view' }
  }
  if (pathname === '/leagues') {
    return { title: 'Leagues', subtitle: 'Second-tier focus' }
  }
  if (pathname.startsWith('/leagues/')) {
    return { title: 'League', subtitle: 'Teams and context' }
  }
  if (pathname === '/teams') {
    return { title: 'Teams', subtitle: 'By country and league' }
  }
  if (pathname.startsWith('/teams/')) {
    return { title: 'Team', subtitle: 'Roster' }
  }
  return { title: 'Overview' }
}

type SearchHit = {
  id: string
  title: string
  subtitle: string
  to: string
}

function IconSearch(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 110-15 7.5 7.5 0 010 15z"
      />
    </svg>
  )
}

function IconBell(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  )
}

function IconChevronDown(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 9l-7 7-7-7"
      />
    </svg>
  )
}

function TopBarActions({
  menuOpen,
  setMenuOpen,
}: {
  menuOpen: boolean
  setMenuOpen: (v: boolean | ((b: boolean) => boolean)) => void
}) {
  return (
    <div className="flex shrink-0 items-center gap-1">
      <button
        type="button"
        title="Notifications (mock)"
        className="rounded-lg p-2 text-fume-500 transition-colors hover:bg-fume-200/80 hover:text-fume-800 dark:text-fume-400 dark:hover:bg-fume-800 dark:hover:text-fume-100"
      >
        <IconBell className="h-5 w-5" />
      </button>

      <div className="relative">
        <button
          type="button"
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-haspopup="menu"
          className="flex items-center gap-2 rounded-lg py-1.5 pl-1.5 pr-2 transition-colors hover:bg-fume-200/80 dark:hover:bg-fume-800"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-600 text-xs font-bold text-fume-950 shadow-sm">
            GM
          </span>
          <IconChevronDown
            className={`hidden h-4 w-4 text-fume-500 transition-transform sm:block ${menuOpen ? 'rotate-180' : ''}`}
          />
        </button>
        {menuOpen ? (
          <>
            <button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-40 cursor-default bg-transparent"
              onClick={() => setMenuOpen(false)}
            />
            <div
              role="menu"
              className="absolute right-0 z-50 mt-2 w-52 rounded-xl border border-fume-200/90 bg-white py-1 shadow-lg shadow-fume-950/10 dark:border-fume-700 dark:bg-fume-900"
            >
              <button
                type="button"
                role="menuitem"
                className="flex w-full px-4 py-2.5 text-left text-sm text-fume-700 hover:bg-fume-100 dark:text-fume-200 dark:hover:bg-fume-800"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </button>
              <button
                type="button"
                role="menuitem"
                className="flex w-full px-4 py-2.5 text-left text-sm text-fume-700 hover:bg-fume-100 dark:text-fume-200 dark:hover:bg-fume-800"
                onClick={() => setMenuOpen(false)}
              >
                Settings
              </button>
              <div className="my-1 h-px bg-fume-200 dark:bg-fume-700" />
              <button
                type="button"
                role="menuitem"
                className="flex w-full px-4 py-2.5 text-left text-sm text-gold-800 hover:bg-gold-500/10 dark:text-gold-400 dark:hover:bg-gold-500/10"
                onClick={() => setMenuOpen(false)}
              >
                Log out
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  )
}

function playersToHits(players: Player[]): SearchHit[] {
  return players.map((p) => ({
    id: p.id,
    title: p.name,
    subtitle: `${p.team} · ${p.position}`,
    to: `/players/${p.id}`,
  }))
}

export function TopBar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState('')
  const [searchOpen, setSearchOpen] = useState(false)
  const [highlight, setHighlight] = useState(0)
  const [hits, setHits] = useState<SearchHit[]>([])
  const [searchLoading, setSearchLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { title, subtitle } = titleFromPath(pathname)

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
    <header className="sticky top-0 z-30 border-b border-fume-200/90 bg-fume-100/85 backdrop-blur-md dark:border-fume-800 dark:bg-fume-950/85">
      <div className="flex w-full flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center justify-between gap-3 sm:flex-1 sm:basis-0 sm:justify-start">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-fume-900 dark:text-fume-100">
              {title}
            </p>
            <p className="truncate text-xs text-fume-500 dark:text-fume-400">
              {subtitle ? `${subtitle} · ` : null}
              <span className="text-fume-600 dark:text-fume-400">Signed in as </span>
              <span className="font-medium text-fume-800 dark:text-fume-200">
                demo@goaldminer.app
              </span>
            </p>
          </div>
          <div className="shrink-0 sm:hidden">
            <TopBarActions menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          </div>
        </div>

        <div className="flex w-full min-w-0 justify-center sm:flex-[1.65] sm:min-w-[12rem]">
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
                        'flex w-full flex-col gap-0.5 px-4 py-2.5 text-left text-sm transition-colors',
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
        </div>

        <div className="hidden shrink-0 sm:flex sm:flex-1 sm:basis-0 sm:justify-end">
          <TopBarActions menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </div>
      </div>
    </header>
  )
}

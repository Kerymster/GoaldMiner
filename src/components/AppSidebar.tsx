import { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { IconChevronDown } from './icons'
import { navLinkClass, navSublinkClass } from './navStyles'
import { useAppSelector } from '../store/hooks'
import {
  selectLeaguesItems,
  selectLeaguesStatus,
} from '../store/selectors/leaguesSelectors'

export function AppSidebar() {
  const items = useAppSelector(selectLeaguesItems)
  const status = useAppSelector(selectLeaguesStatus)

  const grouped = useMemo(() => {
    const map = new Map<string, typeof items>()
    for (const L of items) {
      const key = L.countryName || L.countryId || 'Other'
      if (!map.has(key)) map.set(key, [])
      map.get(key)!.push(L)
    }
    for (const arr of map.values()) {
      arr.sort((a, b) => a.name.localeCompare(b.name))
    }
    return [...map.entries()].sort(([a], [b]) => a.localeCompare(b))
  }, [items])

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-fume-800/80 bg-fume-900 md:w-60 md:border-r md:border-b-0 md:min-h-dvh md:shadow-[4px_0_24px_-4px_rgba(0,0,0,0.35)]">
      <div className="flex flex-col gap-1 p-3 md:sticky md:top-0 md:max-h-dvh md:overflow-y-auto">
        <div className="mb-3 border-b border-fume-800/80 px-2 pb-3">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold-400">
            Underrated
          </p>
          <p className="mt-1 text-sm font-semibold tracking-tight text-fume-100">
            Player finder
          </p>
          <p className="mt-2 h-px w-8 bg-gradient-to-r from-gold-500 to-transparent" />
        </div>

        <NavLink to="/players" className={navLinkClass}>
          Players
        </NavLink>
        <NavLink to="/compare" className={navLinkClass}>
          Compare
        </NavLink>

        <NavLink to="/teams" className={navLinkClass}>
          Teams
        </NavLink>

        <NavLink to="/leagues" className={navLinkClass} end>
          All leagues
        </NavLink>

        <div className="mt-3 border-t border-fume-800/80 pt-3">
          <p className="px-2 pb-2 text-[10px] font-semibold uppercase tracking-wider text-fume-500">
            By country
          </p>
          {status === 'loading' ? (
            <p className="px-2 text-xs text-fume-500">Loading leagues…</p>
          ) : null}
          {status === 'failed' ? (
            <p className="px-2 text-xs text-fume-500">Leagues unavailable</p>
          ) : null}
          <ul className="space-y-1">
            {grouped.map(([countryLabel, leagues]) => (
              <li key={countryLabel}>
                <details className="group rounded-lg" open>
                  <summary className="cursor-pointer list-none rounded-md px-2 py-1.5 text-xs font-semibold text-fume-400 transition-colors marker:hidden hover:bg-fume-800/50 hover:text-fume-200 [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-2">
                      {countryLabel}
                      <IconChevronDown className="h-3.5 w-3.5 shrink-0 text-fume-500 transition-transform group-open:rotate-180" />
                    </span>
                  </summary>
                  <ul className="mt-1 space-y-0.5 border-l border-gold-600/25 pl-2.5">
                    {leagues.map((league) => (
                      <li key={league.leagueId}>
                        <NavLink
                          to={`/leagues/${league.leagueId}`}
                          className={navSublinkClass}
                        >
                          {league.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </details>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </aside>
  )
}

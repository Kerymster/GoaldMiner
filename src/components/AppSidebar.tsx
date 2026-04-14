import { NavLink } from 'react-router-dom'
import { countries } from '../data/catalog'
import { getLeaguesByCountryId } from '../data/catalog'
import { navLinkClass, navSublinkClass } from './navStyles'

export function AppSidebar() {
  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/90 md:w-56 md:border-r md:border-b-0 md:min-h-dvh">
      <div className="flex flex-col gap-1 p-3 md:sticky md:top-0 md:max-h-dvh md:overflow-y-auto">
        <div className="mb-2 px-2 pb-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Underrated
          </p>
          <p className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Player finder
          </p>
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

        <div className="mt-2 border-t border-zinc-200 pt-2 dark:border-zinc-800">
          <p className="px-2 pb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
            By country
          </p>
          <ul className="space-y-1">
            {countries.map((country) => {
              const countryLeagues = getLeaguesByCountryId(country.id)
              if (countryLeagues.length === 0) return null
              return (
                <li key={country.id}>
                  <details
                    className="group rounded-lg"
                    open
                  >
                    <summary className="cursor-pointer list-none px-2 py-1 text-xs font-semibold text-zinc-500 marker:hidden dark:text-zinc-400 [&::-webkit-details-marker]:hidden">
                      <span className="flex items-center justify-between gap-2">
                        {country.name}
                        <svg
                          className="h-3.5 w-3.5 shrink-0 text-zinc-400 transition-transform group-open:rotate-180 dark:text-zinc-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    </summary>
                    <ul className="mt-1 space-y-0.5 border-l border-zinc-200 pl-2 dark:border-zinc-700">
                      {countryLeagues.map((league) => (
                        <li key={league.id}>
                          <NavLink
                            to={`/leagues/${league.id}`}
                            className={navSublinkClass}
                          >
                            {league.name}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  </details>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </aside>
  )
}

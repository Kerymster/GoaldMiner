import { NavLink } from 'react-router-dom'
import { countries } from '../data/catalog'
import { getLeaguesByCountryId } from '../data/catalog'
import { navLinkClass, navSublinkClass } from './navStyles'

export function AppSidebar() {
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
          <ul className="space-y-1">
            {countries.map((country) => {
              const countryLeagues = getLeaguesByCountryId(country.id)
              if (countryLeagues.length === 0) return null
              return (
                <li key={country.id}>
                  <details className="group rounded-lg" open>
                    <summary className="cursor-pointer list-none rounded-md px-2 py-1.5 text-xs font-semibold text-fume-400 transition-colors marker:hidden hover:bg-fume-800/50 hover:text-fume-200 [&::-webkit-details-marker]:hidden">
                      <span className="flex items-center justify-between gap-2">
                        {country.name}
                        <svg
                          className="h-3.5 w-3.5 shrink-0 text-fume-500 transition-transform group-open:rotate-180"
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
                    <ul className="mt-1 space-y-0.5 border-l border-gold-600/25 pl-2.5">
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

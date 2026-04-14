import { Link } from 'react-router-dom'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { loadLeagues } from '../features/leagues/leaguesSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  selectLeaguesError,
  selectLeaguesItems,
  selectLeaguesStatus,
} from '../store/selectors/leaguesSelectors'

const leagueCard =
  'block rounded-xl border border-fume-200/90 bg-white p-5 shadow-sm shadow-fume-950/5 transition-all duration-200 hover:border-gold-400/45 hover:shadow-md hover:shadow-gold-900/10 dark:border-fume-800 dark:bg-fume-900/45 dark:shadow-none dark:hover:border-gold-500/35 dark:hover:bg-fume-900/70'

export function LeaguesPage() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectLeaguesItems)
  const status = useAppSelector(selectLeaguesStatus)
  const error = useAppSelector(selectLeaguesError)

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Leagues' }]} />
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-fume-950 dark:text-fume-50">
          Leagues
        </h2>
        <p className="mt-1 text-sm text-fume-600 dark:text-fume-400">
          Second-tier and regional competitions — browse teams from the sidebar
          or open a league below.
        </p>
      </div>

      {status === 'loading' ? (
        <p className="text-sm text-fume-500 dark:text-fume-400">Loading…</p>
      ) : null}

      {status === 'failed' && error ? (
        <div className="space-y-2">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          <button
            type="button"
            onClick={() => void dispatch(loadLeagues())}
            className="rounded-lg border border-fume-200 px-3 py-1.5 text-sm font-medium dark:border-fume-700"
          >
            Retry
          </button>
        </div>
      ) : null}

      {status === 'succeeded' ? (
        <ul className="grid gap-4 sm:grid-cols-2">
          {items.map((league) => (
            <li key={league.leagueId}>
              <Link
                to={`/leagues/${league.leagueId}`}
                className={leagueCard}
              >
                <p className="text-xs font-medium uppercase tracking-wide text-fume-500">
                  {league.countryName} · Tier {league.tier}
                </p>
                <h3 className="mt-2 text-lg font-semibold tracking-tight">
                  {league.name}
                </h3>
                {league.nameLocal !== league.name ? (
                  <p className="mt-1 text-sm text-fume-600 dark:text-fume-400">
                    {league.nameLocal}
                  </p>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}

      <p className="text-xs text-fume-500 dark:text-fume-400">
        Countries are grouped in the side menu.
      </p>
    </div>
  )
}

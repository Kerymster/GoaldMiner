import { PageHeader } from '../../components/PageHeader'
import { loadLeagues } from '../../features/leagues/leaguesSlice'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import {
  selectLeaguesError,
  selectLeaguesItems,
  selectLeaguesStatus,
} from '../../store/selectors/leaguesSelectors'
import { LeagueCard } from './LeagueCard'

const BREADCRUMB = [{ label: 'Leagues' as const }]
const TITLE = 'Leagues'
const DESCRIPTION =
  'Second-tier and regional competitions — browse teams from the sidebar or open a league below.'

export function AllLeaguesPage() {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectLeaguesItems)
  const status = useAppSelector(selectLeaguesStatus)
  const error = useAppSelector(selectLeaguesError)

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumbItems={BREADCRUMB}
        title={TITLE}
        description={DESCRIPTION}
      />

      {status === 'loading' ? (
        <p className="text-sm text-fume-500 dark:text-fume-400">Loading…</p>
      ) : null}

      {status === 'failed' && error ? (
        <div className="space-y-2">
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          <button
            type="button"
            onClick={() => void dispatch(loadLeagues())}
            className="cursor-pointer rounded-lg border border-fume-200 px-3 py-1.5 text-sm font-medium dark:border-fume-700"
          >
            Retry
          </button>
        </div>
      ) : null}

      {status === 'succeeded' ? (
        <ul className="grid gap-4 sm:grid-cols-2">
          {items.map((league) => (
            <LeagueCard key={league.leagueId} league={league} />
          ))}
        </ul>
      ) : null}

    </div>
  )
}

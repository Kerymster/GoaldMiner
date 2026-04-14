import { useTeamsList } from '../../hooks/useTeamsList'
import { useAppSelector } from '../../store/hooks'
import { selectLeaguesItems } from '../../store/selectors/leaguesSelectors'
import { PageHeader } from './PageHeader'
import { TeamListRow } from './TeamListRow'
import { TeamsFilters } from './TeamsFilters'
import { TeamsPagination } from './TeamsPagination'
import { listSurface } from './teamsPageStyles'

export function TeamsPage() {
  const leagues = useAppSelector(selectLeaguesItems)
  const countries = useAppSelector((s) => {
    const set = new Map<string, string>()
    for (const l of s.leagues.items) {
      set.set(l.countryId, l.countryName || l.countryId)
    }
    return [...set.entries()].sort((a, b) => a[1].localeCompare(b[1]))
  })

  const {
    page,
    setPage,
    leagueId,
    setLeagueId,
    countryId,
    setCountryId,
    sort,
    setSort,
    data,
    loading,
    error,
    items,
  } = useTeamsList()

  return (
    <div className="space-y-8">
      <PageHeader
        breadcrumbItems={[{ label: 'Teams' }]}
        title="Teams"
        description="Filter by league or country. Open a team to see its roster."
      />

      <TeamsFilters
        countries={countries}
        leagues={leagues}
        countryId={countryId}
        onCountryIdChange={(v) => {
          setCountryId(v)
          setPage(1)
        }}
        leagueId={leagueId}
        onLeagueIdChange={(v) => {
          setLeagueId(v)
          setPage(1)
        }}
        sort={sort}
        onSortChange={(v) => {
          setSort(v)
          setPage(1)
        }}
      />

      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : null}
      {loading ? (
        <p className="text-sm text-fume-500 dark:text-fume-400">Loading…</p>
      ) : null}

      {!loading && !error ? (
        <>
          <ul className={listSurface}>
            {items.map((team) => (
              <TeamListRow key={team.id} team={team} />
            ))}
          </ul>
          <TeamsPagination page={page} setPage={setPage} data={data} />
        </>
      ) : null}
    </div>
  )
}

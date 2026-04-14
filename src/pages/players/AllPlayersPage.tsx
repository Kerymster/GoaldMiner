import { PageHeader } from '../../components/PageHeader'
import { ListPagination } from '../../components/ListPagination'
import { usePlayersList } from '../../hooks/usePlayersList'
import type { LeagueMeta, Player } from '../../types/api'
import { useAppSelector } from '../../store/hooks'
import { selectLeaguesItems } from '../../store/selectors/leaguesSelectors'
import { PlayerListFilters } from './PlayerListFilters'
import { PlayerListRow } from './PlayerListRow'
import { playerListSurface } from './playerListStyles'

const BREADCRUMB = [{ label: 'Players' as const }]
const TITLE = 'Players'
const DESCRIPTION =
  'Spotlight on performers who punch above their headline attention.'

function leagueLabelForPlayer(player: Player, leagues: LeagueMeta[]): string {
  const league = leagues.find((l) => l.leagueId === player.leagueId)
  return league?.name ?? player.leagueId ?? ''
}

export function AllPlayersPage() {
  const leagues = useAppSelector(selectLeaguesItems)
  const {
    page,
    setPage,
    leagueId,
    setLeagueId,
    sort,
    setSort,
    data,
    loading,
    error,
    items,
  } = usePlayersList()

  return (
    <div className="space-y-6">
      <PageHeader
        breadcrumbItems={BREADCRUMB}
        title={TITLE}
        description={DESCRIPTION}
      />

      <PlayerListFilters
        leagues={leagues}
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
          <ul className={playerListSurface}>
            {items.map((player) => (
              <PlayerListRow
                key={player.id}
                player={player}
                leagueLabel={leagueLabelForPlayer(player, leagues)}
              />
            ))}
          </ul>
          <ListPagination page={page} setPage={setPage} data={data} />
        </>
      ) : null}
    </div>
  )
}

import { PageHeader } from '../../../components/PageHeader'
import { pageStack, proseErrorSm } from '../../../components/pageChromeStyles'
import { ListPagination } from '../../../components/ListPagination'
import { usePlayersList } from '../../../hooks/usePlayersList'
import { PlayerListFilters } from './PlayerListFilters'
import { PlayerListRow } from './PlayerListRow'
import { playerListSurface } from './playerListStyles'

const BREADCRUMB = [{ label: 'Players' as const }]
const TITLE = 'Players'
const DESCRIPTION =
  'Spotlight on performers who punch above their headline attention.'

export function AllPlayersPage() {
  const {
    page,
    setPage,
    q,
    setQ,
    sort,
    setSort,
    minRating,
    setMinRating,
    maxRating,
    setMaxRating,
    minUnderrated,
    setMinUnderrated,
    maxUnderrated,
    setMaxUnderrated,
    data,
    loading,
    error,
    items,
  } = usePlayersList()

  return (
    <div className={pageStack}>
      <PageHeader
        breadcrumbItems={BREADCRUMB}
        title={TITLE}
        description={DESCRIPTION}
      />

      <PlayerListFilters
        q={q}
        onQChange={setQ}
        minRating={minRating}
        onMinRatingChange={setMinRating}
        maxRating={maxRating}
        onMaxRatingChange={setMaxRating}
        minUnderrated={minUnderrated}
        onMinUnderratedChange={setMinUnderrated}
        maxUnderrated={maxUnderrated}
        onMaxUnderratedChange={setMaxUnderrated}
        sort={sort}
        onSortChange={setSort}
      />

      {error ? <p className={proseErrorSm}>{error}</p> : null}
      {loading ? (
        <p className="text-sm text-fume-500 dark:text-fume-400">Loading…</p>
      ) : null}

      {!loading && !error ? (
        <>
          <ul className={playerListSurface}>
            {items.map((player) => (
              <PlayerListRow key={player.id} player={player} />
            ))}
          </ul>
          <ListPagination page={page} setPage={setPage} data={data} />
        </>
      ) : null}
    </div>
  )
}

import { PageHeader } from '../../../components/PageHeader'
import { Link } from 'react-router-dom'
import { pageStack, proseErrorSm } from '../../../components/pageChromeStyles'
import { ListPagination } from '../../../components/ListPagination'
import { usePlayersList } from '../../../hooks/usePlayersList'
import { PlayerListFilters } from './PlayerListFilters'
import { PlayerListRow } from './PlayerListRow'
import {
  playerListEmptyStateClass,
  playerListAddActionClass,
  playerListActionsRowClass,
  playerListResultsDividerClass,
  playerListResultsDividerLabelClass,
  playerListResultsDividerLineClass,
  playerListSurface,
} from './playerListStyles'

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

      <div className={playerListActionsRowClass}>
        <Link to="/players/new" className={playerListAddActionClass}>
          Add player
        </Link>
      </div>

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
          <div className={playerListResultsDividerClass}>
            <span className={playerListResultsDividerLabelClass}>
              Results {typeof data?.total === 'number' ? `(${data.total})` : ''}
            </span>
            <span className={playerListResultsDividerLineClass} aria-hidden />
          </div>
          {items.length > 0 ? (
            <>
              <ul className={playerListSurface}>
                {items.map((player) => (
                  <PlayerListRow key={player.id} player={player} />
                ))}
              </ul>
              <ListPagination page={page} setPage={setPage} data={data} />
            </>
          ) : (
            <p className={playerListEmptyStateClass}>
              No players found for the current filters. Try broadening your search.
            </p>
          )}
        </>
      ) : null}
    </div>
  )
}

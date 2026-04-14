import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getPlayers } from '../api/players'
import { Breadcrumbs } from '../components/Breadcrumbs'
import { isApiErr, type PaginatedResponse, type Player, type PlayersSort } from '../types/api'
import { useAppSelector } from '../store/hooks'
import { selectLeaguesItems } from '../store/selectors/leaguesSelectors'

const listSurface =
  'divide-y divide-fume-200 rounded-xl border border-fume-200/90 bg-white shadow-sm shadow-fume-950/5 dark:divide-fume-800 dark:border-fume-800 dark:bg-fume-900/45 dark:shadow-none'

const inputClass =
  'rounded-lg border border-fume-200 bg-white px-3 py-2 text-sm text-fume-900 shadow-sm focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/25 dark:border-fume-700 dark:bg-fume-900 dark:text-fume-100'

const PAGE_SIZE = 20

export function PlayerListPage() {
  const leagues = useAppSelector(selectLeaguesItems)
  const [page, setPage] = useState(1)
  const [leagueId, setLeagueId] = useState('')
  const [sort, setSort] = useState<PlayersSort>('underratedScore_desc')
  const [data, setData] = useState<PaginatedResponse<Player> | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await getPlayers({
          page,
          pageSize: PAGE_SIZE,
          leagueId: leagueId || undefined,
          sort,
        })
        if (!cancelled) setData(res)
      } catch (e) {
        if (!cancelled) {
          setError(isApiErr(e) ? e.message : 'Could not load players')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [page, leagueId, sort])

  const items = data?.items ?? []

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Players' }]} />
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-fume-950 dark:text-fume-50">
          Players
        </h2>
        <p className="mt-1 text-sm text-fume-600 dark:text-fume-400">
          Spotlight on performers who punch above their headline attention.
        </p>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-fume-500">
          League
          <select
            value={leagueId}
            onChange={(e) => {
              setLeagueId(e.target.value)
              setPage(1)
            }}
            className={`${inputClass} min-w-[10rem]`}
          >
            <option value="">All</option>
            {leagues.map((l) => (
              <option key={l.leagueId} value={l.leagueId}>
                {l.name}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-xs font-medium uppercase tracking-wide text-fume-500">
          Sort
          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value as PlayersSort)
              setPage(1)
            }}
            className={`${inputClass} min-w-[12rem]`}
          >
            <option value="underratedScore_desc">Underrated (high → low)</option>
            <option value="underratedScore_asc">Underrated (low → high)</option>
            <option value="rating_desc">Rating (high → low)</option>
            <option value="rating_asc">Rating (low → high)</option>
            <option value="name_asc">Name (A–Z)</option>
          </select>
        </label>
      </div>

      {error ? (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      ) : null}
      {loading ? (
        <p className="text-sm text-fume-500 dark:text-fume-400">Loading…</p>
      ) : null}

      {!loading && !error ? (
        <>
          <ul className={listSurface}>
            {items.map((player) => {
              const league = leagues.find((l) => l.leagueId === player.leagueId)
              const leagueLabel = league?.name ?? player.leagueId ?? ''
              return (
                <li key={player.id}>
                  <Link
                    to={`/players/${player.id}`}
                    className="flex items-center justify-between gap-4 px-4 py-4 transition-colors hover:bg-gold-500/[0.07] dark:hover:bg-fume-800/55"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium">{player.name}</p>
                      <p className="truncate text-sm text-fume-500 dark:text-fume-400">
                        {leagueLabel
                          ? `${player.team} · ${leagueLabel} · ${player.position}`
                          : `${player.team} · ${player.position}`}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-semibold tabular-nums text-gold-700 dark:text-gold-400">
                        {player.underratedScore ?? '—'}
                      </p>
                      <p className="text-xs text-fume-500 dark:text-fume-400">
                        underrated
                      </p>
                    </div>
                  </Link>
                </li>
              )
            })}
          </ul>
          {data && data.totalPages > 1 ? (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-lg border border-fume-200 px-3 py-1.5 font-medium disabled:opacity-40 dark:border-fume-700"
              >
                Previous
              </button>
              <span className="text-fume-600 dark:text-fume-400">
                Page {data.page} of {data.totalPages} ({data.total} total)
              </span>
              <button
                type="button"
                disabled={page >= data.totalPages}
                onClick={() =>
                  setPage((p) => Math.min(data.totalPages, p + 1))
                }
                className="rounded-lg border border-fume-200 px-3 py-1.5 font-medium disabled:opacity-40 dark:border-fume-700"
              >
                Next
              </button>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  )
}

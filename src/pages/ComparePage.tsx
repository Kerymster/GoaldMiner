import { useEffect, useMemo, useState } from 'react'
import { getPlayers } from '../api/players'
import { Breadcrumbs } from '../components/Breadcrumbs'
import {
  setComparePlayerA,
  setComparePlayerB,
} from '../features/compare/compareSlice'
import { isApiErr, type Player } from '../types/api'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  selectComparePlayerAId,
  selectComparePlayerBId,
} from '../store/selectors/compareSelectors'

const selectClass =
  'w-full rounded-lg border border-fume-200 bg-white px-3 py-2.5 text-sm text-fume-900 shadow-sm transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/25 dark:border-fume-700 dark:bg-fume-900 dark:text-fume-100'

const tableWrap =
  'overflow-hidden rounded-xl border border-fume-200/90 bg-white shadow-sm shadow-fume-950/5 dark:border-fume-800 dark:bg-fume-900/45 dark:shadow-none'

export function ComparePage() {
  const dispatch = useAppDispatch()
  const aId = useAppSelector(selectComparePlayerAId)
  const bId = useAppSelector(selectComparePlayerBId)

  const [pool, setPool] = useState<Player[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const r = await getPlayers({ page: 1, pageSize: 50, sort: 'name_asc' })
        if (!cancelled) setPool(r.items)
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
  }, [])

  useEffect(() => {
    if (pool.length < 2 || loading) return
    if (!aId) dispatch(setComparePlayerA(pool[0].id))
  }, [pool, loading, aId, dispatch])

  useEffect(() => {
    if (pool.length < 2 || loading) return
    const curA = aId || pool[0].id
    if (!bId || bId === curA) {
      const alt = pool.find((p) => p.id !== curA)
      if (alt) dispatch(setComparePlayerB(alt.id))
    }
  }, [pool, loading, aId, bId, dispatch])

  const a = useMemo(() => pool.find((p) => p.id === aId), [pool, aId])
  const b = useMemo(() => pool.find((p) => p.id === bId), [pool, bId])

  if (loading) {
    return <p className="text-fume-600 dark:text-fume-400">Loading…</p>
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Breadcrumbs items={[{ label: 'Compare' }]} />
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    )
  }

  if (pool.length < 2) {
    return (
      <div className="space-y-4">
        <Breadcrumbs items={[{ label: 'Compare' }]} />
        <p className="text-fume-600 dark:text-fume-400">
          Need at least two players in the API to compare.
        </p>
      </div>
    )
  }

  if (!a || !b) {
    return <p className="text-fume-600 dark:text-fume-400">Loading…</p>
  }

  const rows: { label: string; a: string; b: string }[] = [
    { label: 'Team', a: a.team, b: b.team },
    { label: 'Position', a: a.position, b: b.position },
    { label: 'Rating', a: String(a.rating ?? '—'), b: String(b.rating ?? '—') },
    {
      label: 'Underrated',
      a: String(a.underratedScore ?? '—'),
      b: String(b.underratedScore ?? '—'),
    },
  ]

  return (
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Compare' }]} />
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-fume-950 dark:text-fume-50">
          Compare
        </h2>
        <p className="mt-1 text-sm text-fume-600 dark:text-fume-400">
          Pick two players from the first page of results (up to 50).
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-xs font-medium uppercase tracking-wide text-fume-500">
            Player A
          </span>
          <select
            value={aId}
            onChange={(e) => dispatch(setComparePlayerA(e.target.value))}
            className={selectClass}
          >
            {pool.map((p) => (
              <option key={p.id} value={p.id} disabled={p.id === bId}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-2">
          <span className="text-xs font-medium uppercase tracking-wide text-fume-500">
            Player B
          </span>
          <select
            value={bId}
            onChange={(e) => dispatch(setComparePlayerB(e.target.value))}
            className={selectClass}
          >
            {pool.map((p) => (
              <option key={p.id} value={p.id} disabled={p.id === aId}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className={tableWrap}>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-fume-200 bg-fume-50/80 dark:border-fume-800 dark:bg-fume-900">
              <th className="px-4 py-3 font-medium text-fume-500"></th>
              <th className="px-4 py-3 font-medium text-fume-900 dark:text-fume-100">
                {a.name}
              </th>
              <th className="px-4 py-3 font-medium text-fume-900 dark:text-fume-100">
                {b.name}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-fume-100 dark:divide-fume-800">
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="px-4 py-3 text-fume-500">{row.label}</td>
                <td className="px-4 py-3 tabular-nums text-fume-800 dark:text-fume-200">
                  {row.label === 'Underrated' ? (
                    <span className="font-semibold text-gold-700 dark:text-gold-400">
                      {row.a}
                    </span>
                  ) : (
                    row.a
                  )}
                </td>
                <td className="px-4 py-3 tabular-nums text-fume-800 dark:text-fume-200">
                  {row.label === 'Underrated' ? (
                    <span className="font-semibold text-gold-700 dark:text-gold-400">
                      {row.b}
                    </span>
                  ) : (
                    row.b
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

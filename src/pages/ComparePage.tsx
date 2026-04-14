import { useMemo } from 'react'
import { setComparePlayerA, setComparePlayerB } from '../features/compare/compareSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  selectComparePlayerAId,
  selectComparePlayerBId,
} from '../store/selectors/compareSelectors'
import { selectPlayersList } from '../store/selectors/playersSelectors'

export function ComparePage() {
  const dispatch = useAppDispatch()
  const players = useAppSelector(selectPlayersList)
  const aId = useAppSelector(selectComparePlayerAId)
  const bId = useAppSelector(selectComparePlayerBId)

  const a = useMemo(() => players.find((p) => p.id === aId), [players, aId])
  const b = useMemo(() => players.find((p) => p.id === bId), [players, bId])

  if (!a || !b) {
    return <p className="text-zinc-600 dark:text-zinc-400">Not enough data.</p>
  }

  const rows: { label: string; a: string; b: string }[] = [
    { label: 'Team', a: a.team, b: b.team },
    { label: 'Position', a: a.position, b: b.position },
    { label: 'Rating', a: String(a.rating), b: String(b.rating) },
    {
      label: 'Underrated',
      a: String(a.underratedScore),
      b: String(b.underratedScore),
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight">Compare</h2>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Pick two players to contrast side by side.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block space-y-2">
          <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Player A
          </span>
          <select
            value={aId}
            onChange={(e) => dispatch(setComparePlayerA(e.target.value))}
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          >
            {players.map((p) => (
              <option key={p.id} value={p.id} disabled={p.id === bId}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-2">
          <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
            Player B
          </span>
          <select
            value={bId}
            onChange={(e) => dispatch(setComparePlayerB(e.target.value))}
            className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
          >
            {players.map((p) => (
              <option key={p.id} value={p.id} disabled={p.id === aId}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900/40">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900">
              <th className="px-4 py-3 font-medium text-zinc-500"></th>
              <th className="px-4 py-3 font-medium">{a.name}</th>
              <th className="px-4 py-3 font-medium">{b.name}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {rows.map((row) => (
              <tr key={row.label}>
                <td className="px-4 py-3 text-zinc-500">{row.label}</td>
                <td className="px-4 py-3 tabular-nums">{row.a}</td>
                <td className="px-4 py-3 tabular-nums">{row.b}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

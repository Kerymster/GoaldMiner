import { useMemo } from 'react'
import type { Player } from '../../types/api'

const compareTableWrap =
  'overflow-hidden rounded-xl border border-surface-panel-border bg-surface-panel shadow-sm shadow-fume-950/10 dark:shadow-none'

type CompareStatsTableProps = {
  playerA: Player
  playerB: Player
}

type StatRow = { label: string; a: string; b: string }

export function CompareStatsTable({ playerA, playerB }: CompareStatsTableProps) {
  const rows: StatRow[] = useMemo(
    () => [
      { label: 'Team', a: playerA.team, b: playerB.team },
      { label: 'Position', a: playerA.position, b: playerB.position },
      {
        label: 'Rating',
        a: String(playerA.rating ?? '—'),
        b: String(playerB.rating ?? '—'),
      },
      {
        label: 'Ledger',
        a: String(playerA.underratedScore ?? '—'),
        b: String(playerB.underratedScore ?? '—'),
      },
    ],
    [playerA, playerB],
  )

  return (
    <div className={compareTableWrap}>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-surface-list-divider bg-fume-50/80 dark:bg-surface-panel-hover">
            <th className="px-4 py-3 font-medium text-fume-500"></th>
            <th className="px-4 py-3 font-medium text-fume-900 dark:text-fume-100">
              {playerA.name}
            </th>
            <th className="px-4 py-3 font-medium text-fume-900 dark:text-fume-100">
              {playerB.name}
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-list-divider">
          {rows.map((row) => (
            <tr key={row.label}>
              <td className="px-4 py-3 text-fume-500">{row.label}</td>
              <td className="px-4 py-3 tabular-nums text-fume-800 dark:text-fume-200">
                {row.label === 'Ledger' ? (
                  <span className="font-semibold text-gold-700 dark:text-gold-400">
                    {row.a}
                  </span>
                ) : (
                  row.a
                )}
              </td>
              <td className="px-4 py-3 tabular-nums text-fume-800 dark:text-fume-200">
                {row.label === 'Ledger' ? (
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
  )
}

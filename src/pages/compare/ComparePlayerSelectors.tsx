import { useMemo } from 'react'
import { OverlaySelect } from '../../components/OverlaySelect'
import type { Player } from '../../types/api'

type ComparePlayerSelectorsProps = {
  pool: Player[]
  playerAId: string
  playerBId: string
  onPlayerAChange: (id: string) => void
  onPlayerBChange: (id: string) => void
}

export function ComparePlayerSelectors({
  pool,
  playerAId,
  playerBId,
  onPlayerAChange,
  onPlayerBChange,
}: ComparePlayerSelectorsProps) {
  const optionsA = useMemo(
    () =>
      pool.map((p) => ({
        value: p.id,
        label: p.name,
        disabled: p.id === playerBId,
      })),
    [pool, playerBId],
  )

  const optionsB = useMemo(
    () =>
      pool.map((p) => ({
        value: p.id,
        label: p.name,
        disabled: p.id === playerAId,
      })),
    [pool, playerAId],
  )

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="block space-y-2">
        <span className="text-xs font-medium uppercase tracking-wide text-fume-500 dark:text-fume-400">
          Player A
        </span>
        <OverlaySelect
          value={playerAId}
          onChange={onPlayerAChange}
          options={optionsA}
          placeholder="Select player"
        />
      </div>
      <div className="block space-y-2">
        <span className="text-xs font-medium uppercase tracking-wide text-fume-500 dark:text-fume-400">
          Player B
        </span>
        <OverlaySelect
          value={playerBId}
          onChange={onPlayerBChange}
          options={optionsB}
          placeholder="Select player"
        />
      </div>
    </div>
  )
}

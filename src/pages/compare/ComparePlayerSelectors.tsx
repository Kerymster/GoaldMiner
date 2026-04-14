import type { Player } from '../../types/api'
import { compareSelectClass } from './comparePageStyles'

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
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="block space-y-2">
        <span className="text-xs font-medium uppercase tracking-wide text-fume-500">
          Player A
        </span>
        <select
          value={playerAId}
          onChange={(e) => onPlayerAChange(e.target.value)}
          className={compareSelectClass}
        >
          {pool.map((p) => (
            <option key={p.id} value={p.id} disabled={p.id === playerBId}>
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
          value={playerBId}
          onChange={(e) => onPlayerBChange(e.target.value)}
          className={compareSelectClass}
        >
          {pool.map((p) => (
            <option key={p.id} value={p.id} disabled={p.id === playerAId}>
              {p.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}

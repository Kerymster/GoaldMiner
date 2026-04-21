import type { Player } from '../../../types/api'
import {
  playerStatsCardClass,
  playerStatsGridClass,
  playerStatsLabelClass,
  playerStatsRolesCardClass,
  playerStatsValueDefaultClass,
  playerStatsValueStrongClass,
} from './playerDetailStyles'

type PlayerStatsGridProps = {
  player: Player
}

function formatDobLabel(ageOrDob: string | undefined): string {
  if (!ageOrDob) return '—'
  const asDate = new Date(ageOrDob)
  if (Number.isNaN(asDate.getTime())) return ageOrDob
  return asDate.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export function PlayerStatsGrid({ player }: PlayerStatsGridProps) {
  const rating = player.overallRating ?? player.rating
  const physical = [player.heightCm ? `${player.heightCm} cm` : null, player.weightKg ? `${player.weightKg} kg` : null]
    .filter(Boolean)
    .join(' / ')
  const roles = [player.mostlyUsedRole, player.otherRoles].filter(Boolean).join(' · ')

  const items = [
    {
      label: 'Overall rating',
      value: rating ?? '—',
      emphasize: true,
      valueClassName: 'text-gold-800 dark:text-gold-300',
    },
    { label: 'Date of birth', value: formatDobLabel(player.ageOrDob) },
    { label: 'Preferred foot', value: player.preferredFoot || '—' },
    { label: 'Physical', value: physical || '—' },
    { label: 'Contract (End date)', value: formatDobLabel(player.contractIfKnown) },
  ]

  return (
    <dl className={playerStatsGridClass}>
      {items.map((item) => (
        <div key={item.label} className={playerStatsCardClass}>
          <dt className={playerStatsLabelClass}>{item.label}</dt>
          <dd
            className={`mt-1 ${
              item.emphasize
                ? playerStatsValueStrongClass
                : playerStatsValueDefaultClass
            } ${item.valueClassName ?? ''}`}
          >
            {item.value}
          </dd>
        </div>
      ))}
      <div className={playerStatsRolesCardClass}>
        <dt className={playerStatsLabelClass}>Roles</dt>
        <dd className={`mt-1 ${playerStatsValueDefaultClass}`}>{roles || '—'}</dd>
      </div>
    </dl>
  )
}

import { proseMuted } from '../../../components/styles/pageChromeStyles'
import type { Player } from '../../../types/api'
import { PlayerRankCard } from './PlayerRankCard'
import {
  playerProfileAgeBadgeClass,
  playerProfileBadgeRowClass,
  playerProfileHeaderWrapClass,
  playerProfileNameClass,
  playerProfilePositionBadgeClass,
  playerProfileRoleBadgeClass,
  playerProfileTitleRowClass,
} from './playerDetailStyles'

type PlayerProfileHeaderProps = {
  player: Player
}

function getAgeFromDob(ageOrDob: string | undefined): number | null {
  if (!ageOrDob) return null
  const dob = new Date(ageOrDob)
  if (Number.isNaN(dob.getTime())) return null

  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const monthDiff = today.getMonth() - dob.getMonth()
  const hadBirthday =
    monthDiff > 0 || (monthDiff === 0 && today.getDate() >= dob.getDate())

  if (!hadBirthday) age -= 1
  return age >= 0 ? age : null
}

export function PlayerProfileHeader({ player }: PlayerProfileHeaderProps) {
  const profileParts = [player.team, player.nationality].filter(Boolean)
  const positionParts = [player.position, player.secondaryPosition].filter(Boolean)
  const role = player.mostlyUsedRole || player.otherRoles
  const age = getAgeFromDob(player.ageOrDob)

  return (
    <div className={playerProfileHeaderWrapClass}>
      <div className="min-w-0">
        <div className={playerProfileTitleRowClass}>
          <h2 className={playerProfileNameClass}>{player.name}</h2>
          {age != null ? (
            <span className={playerProfileAgeBadgeClass}>{age} yrs</span>
          ) : null}
        </div>
        <p className={`mt-1 ${proseMuted}`}>{profileParts.join(' · ')}</p>
        <div className={playerProfileBadgeRowClass}>
          {positionParts.length ? (
            <span className={playerProfilePositionBadgeClass}>{positionParts.join(' / ')}</span>
          ) : null}
          {role ? (
            <span className={playerProfileRoleBadgeClass}>{role}</span>
          ) : null}
        </div>
      </div>
      <PlayerRankCard underratedScore={player.underratedScore} />
    </div>
  )
}


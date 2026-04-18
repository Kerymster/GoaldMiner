/**
 * Football Manager–style position codes and allowed role names per primary position.
 */

export const POSITION_CODES = [
  'GK',
  'DL',
  'DR',
  'DC',
  'DCL',
  'DCR',
  'WBL',
  'WBR',
  'DM',
  'MCL',
  'MCR',
  'MC',
  'AML',
  'AMR',
  'AMC',
  'ST',
] as const

export type PositionCode = (typeof POSITION_CODES)[number]

export const POSITION_ROLES: Record<PositionCode, readonly string[]> = {
  GK: ['Goalkeeper', 'Sweeper Keeper'],
  DL: [
    'Full Back',
    'Wing Back',
    'Inverted Wing Back',
    'Complete Wing Back',
    'No-Nonsense Full Back',
  ],
  DR: [
    'Full Back',
    'Wing Back',
    'Inverted Wing Back',
    'Complete Wing Back',
    'No-Nonsense Full Back',
  ],
  DC: ['Central Defender', 'Ball Playing Defender', 'No-Nonsense Centre Back', 'Libero'],
  DCL: ['Central Defender', 'Ball Playing Defender', 'No-Nonsense Centre Back', 'Libero'],
  DCR: ['Central Defender', 'Ball Playing Defender', 'No-Nonsense Centre Back', 'Libero'],
  WBL: ['Wing Back', 'Complete Wing Back', 'Inverted Wing Back'],
  WBR: ['Wing Back', 'Complete Wing Back', 'Inverted Wing Back'],
  DM: [
    'Defensive Midfielder',
    'Deep Lying Playmaker',
    'Ball Winning Midfielder',
    'Half Back',
    'Anchor Man',
    'Segundo Volante',
    'Regista',
  ],
  MCL: [
    'Central Midfielder',
    'Box to Box Midfielder',
    'Advanced Playmaker',
    'Deep Lying Playmaker',
    'Mezzala',
    'Carrilero',
    'Ball Winning Midfielder',
    'Roaming Playmaker',
  ],
  MCR: [
    'Central Midfielder',
    'Box to Box Midfielder',
    'Advanced Playmaker',
    'Deep Lying Playmaker',
    'Mezzala',
    'Carrilero',
    'Ball Winning Midfielder',
    'Roaming Playmaker',
  ],
  MC: [
    'Central Midfielder',
    'Box to Box Midfielder',
    'Advanced Playmaker',
    'Deep Lying Playmaker',
    'Mezzala',
    'Carrilero',
    'Ball Winning Midfielder',
    'Roaming Playmaker',
  ],
  AML: [
    'Winger',
    'Inside Forward',
    'Inverted Winger',
    'Advanced Playmaker',
    'Wide Playmaker',
    'Raumdeuter',
  ],
  AMR: [
    'Winger',
    'Inside Forward',
    'Inverted Winger',
    'Advanced Playmaker',
    'Wide Playmaker',
    'Raumdeuter',
  ],
  AMC: [
    'Attacking Midfielder',
    'Advanced Playmaker',
    'Shadow Striker',
    'Enganche',
    'Trequartista',
  ],
  ST: [
    'Advanced Forward',
    'Poacher',
    'Target Forward',
    'Deep Lying Forward',
    'Pressing Forward',
    'Complete Forward',
    'False Nine',
  ],
}

export function isPositionCode(value: string): value is PositionCode {
  return (POSITION_CODES as readonly string[]).includes(value)
}

export function getRolesForPosition(positionCode: string): string[] {
  if (!isPositionCode(positionCode)) return []
  return [...POSITION_ROLES[positionCode]]
}

/** When primary position changes: keep current role if still valid, else first role for the code. */
export function resolveMostlyUsedRoleForPosition(
  positionCode: string,
  previousRole: string,
): string {
  const roles = getRolesForPosition(positionCode)
  if (roles.length === 0) return ''
  if (previousRole && roles.includes(previousRole)) return previousRole
  return roles[0] ?? ''
}

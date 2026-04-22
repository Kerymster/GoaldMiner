import { POSITION_CODES } from '../../../../../data/positionRoles'
import { SCOUT_PREFERRED_FOOT_OPTIONS } from '../../../../../types/scoutReportForm'
import type { OverlaySelectOption } from '../../../../../components/overlay-select/OverlaySelect'

export const PREFERRED_FOOT_SELECT_OPTIONS: OverlaySelectOption[] =
  SCOUT_PREFERRED_FOOT_OPTIONS.map((v) => ({
    value: v,
    label: v,
  }))

export const POSITION_SELECT_OPTIONS: OverlaySelectOption[] = POSITION_CODES.map((c) => ({
  value: c,
  label: c,
}))

export const SECONDARY_POSITION_SELECT_OPTIONS: OverlaySelectOption[] = [
  { value: '', label: 'None' },
  ...POSITION_CODES.map((c) => ({ value: c, label: c })),
]

export function parseOptionalRoundedInt(raw: string): number | null {
  if (raw === '') return null
  const n = Number(raw)
  return Number.isFinite(n) ? Math.round(n) : null
}


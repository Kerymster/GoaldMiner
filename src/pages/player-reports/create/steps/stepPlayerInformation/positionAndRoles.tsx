import { useMemo } from 'react'
import type { Dispatch, SetStateAction } from 'react'
import {
  getRolesForPosition,
  resolveMostlyUsedRoleForPosition,
} from '../../../../../data/positionRoles'
import type { ScoutReportForm } from '../../../../../types/scoutReportForm'
import type { ScoutReportStepErrors } from '../../scoutReportStepValidation'
import { OverlaySelect } from '../../../../../components/overlay-select/OverlaySelect'
import { FieldError, ScoutReportField } from '../../ScoutReportField'
import { reportFieldErrorClass, reportLabelClass } from '../../reportFormStyles'
import { LabeledOverlaySelectField } from './LabeledOverlaySelectField'
import {
  POSITION_SELECT_OPTIONS,
  SECONDARY_POSITION_SELECT_OPTIONS,
} from './constants'

type PositionAndRolesProps = {
  form: ScoutReportForm
  setForm: Dispatch<SetStateAction<ScoutReportForm>>
  errors: ScoutReportStepErrors
}

export function PositionAndRoles({ form, setForm, errors }: PositionAndRolesProps) {
  const pi = form.playerInformation

  const roleSelectOptions = useMemo(() => {
    const code = pi.position
    if (!code) return []
    return getRolesForPosition(code).map((r) => ({ value: r, label: r }))
  }, [pi.position])

  return (
    <>
      <LabeledOverlaySelectField
        label="Position"
        value={pi.position}
        onChange={(position) =>
          setForm((f) => {
            const p = f.playerInformation
            return {
              ...f,
              playerInformation: {
                ...p,
                position,
                mostlyUsedRole: resolveMostlyUsedRoleForPosition(position, p.mostlyUsedRole),
              },
            }
          })
        }
        options={POSITION_SELECT_OPTIONS}
        placeholder="Select position…"
        error={errors.position}
      />
      <LabeledOverlaySelectField
        label="Mostly used role"
        value={pi.mostlyUsedRole}
        onChange={(mostlyUsedRole) =>
          setForm((f) => ({
            ...f,
            playerInformation: { ...f.playerInformation, mostlyUsedRole },
          }))
        }
        options={roleSelectOptions}
        placeholder={pi.position ? 'Select role…' : 'Select position first…'}
        disabled={!pi.position}
        error={errors.mostlyUsedRole}
      />
      <label className={reportLabelClass}>
        Secondary position
        <OverlaySelect
          value={pi.secondaryPosition ?? ''}
          onChange={(secondaryPosition) =>
            setForm((f) => ({
              ...f,
              playerInformation: { ...f.playerInformation, secondaryPosition },
            }))
          }
          options={SECONDARY_POSITION_SELECT_OPTIONS}
          placeholder="None"
          aria-invalid={Boolean(errors.secondaryPosition)}
          triggerClassName={errors.secondaryPosition ? reportFieldErrorClass : ''}
        />
        <FieldError message={errors.secondaryPosition} />
      </label>
      <ScoutReportField
        label="Other roles"
        value={pi.otherRoles ?? ''}
        onChange={(otherRoles) =>
          setForm((f) => ({
            ...f,
            playerInformation: { ...f.playerInformation, otherRoles },
          }))
        }
      />
    </>
  )
}


import { useMemo } from 'react'
import { OverlaySelect } from '../../../../components/OverlaySelect'
import {
  POSITION_CODES,
  getRolesForPosition,
  resolveMostlyUsedRoleForPosition,
} from '../../../../data/positionRoles'
import { SCOUT_PREFERRED_FOOT_OPTIONS } from '../../../../types/scoutReportForm'
import { FieldError, ScoutReportField } from '../ScoutReportField'
import { ScoutReportNationalityField } from '../ScoutReportNationalityField'
import {
  reportFieldClass,
  reportFieldErrorClass,
  reportLabelClass,
} from '../reportFormStyles'
import {
  HEIGHT_CM_MAX,
  HEIGHT_CM_MIN,
  WEIGHT_KG_MAX,
  WEIGHT_KG_MIN,
} from '../scoutReportStepValidation'
import type { ScoutReportStepProps } from './stepProps'

const PREFERRED_FOOT_SELECT_OPTIONS = SCOUT_PREFERRED_FOOT_OPTIONS.map((v) => ({
  value: v,
  label: v,
}))

const POSITION_SELECT_OPTIONS = POSITION_CODES.map((c) => ({
  value: c,
  label: c,
}))

const SECONDARY_POSITION_SELECT_OPTIONS = [
  { value: '', label: 'None' },
  ...POSITION_CODES.map((c) => ({ value: c, label: c })),
]

export function StepPlayerInformation({ form, setForm, errors }: ScoutReportStepProps) {
  const roleSelectOptions = useMemo(() => {
    const code = form.playerInformation.position
    if (!code) return []
    return getRolesForPosition(code).map((r) => ({ value: r, label: r }))
  }, [form.playerInformation.position])

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className={`${reportLabelClass} sm:col-span-2`}>
        Report date
        <span className="text-[11px] font-normal normal-case tracking-normal text-fume-500 dark:text-fume-500">
          When this scouting note was recorded
        </span>
        <input
          type="date"
          value={form.reportDate}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              reportDate: e.target.value,
            }))
          }
          aria-invalid={Boolean(errors.reportDate)}
          className={`${reportFieldClass} ${errors.reportDate ? reportFieldErrorClass : ''}`}
        />
        <FieldError message={errors.reportDate} />
      </label>
      <ScoutReportField
        label="Name"
        value={form.playerInformation.name}
        error={errors.name}
        onChange={(name) =>
          setForm((f) => ({
            ...f,
            playerInformation: { ...f.playerInformation, name },
          }))
        }
      />
      <label className={reportLabelClass}>
        Date of Birth
        <input
          type="date"
          value={form.playerInformation.ageOrDob}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              playerInformation: {
                ...f.playerInformation,
                ageOrDob: e.target.value,
              },
            }))
          }
          aria-invalid={Boolean(errors.ageOrDob)}
          className={[
            reportFieldClass,
            errors.ageOrDob ? reportFieldErrorClass : '',
            !form.playerInformation.ageOrDob
              ? 'text-fume-500 dark:text-fume-400 [&::-webkit-datetime-edit]:text-fume-500 dark:[&::-webkit-datetime-edit]:text-fume-400 [&::-webkit-datetime-edit-fields-wrapper]:text-fume-500 dark:[&::-webkit-datetime-edit-fields-wrapper]:text-fume-400'
              : '',
          ]
            .filter(Boolean)
            .join(' ')}
        />
        <FieldError message={errors.ageOrDob} />
      </label>
      <ScoutReportNationalityField
        value={form.playerInformation.nationality}
        error={errors.nationality}
        onChange={(nationality) =>
          setForm((f) => ({
            ...f,
            playerInformation: { ...f.playerInformation, nationality },
          }))
        }
      />
      <div className="flex flex-col gap-1">
        <span className={reportLabelClass}>Preferred foot</span>
        <OverlaySelect
          value={form.playerInformation.preferredFoot}
          onChange={(preferredFoot) =>
            setForm((f) => ({
              ...f,
              playerInformation: { ...f.playerInformation, preferredFoot },
            }))
          }
          options={PREFERRED_FOOT_SELECT_OPTIONS}
          placeholder="Select preferred foot…"
          aria-invalid={Boolean(errors.preferredFoot)}
          triggerClassName={errors.preferredFoot ? reportFieldErrorClass : ''}
        />
        <FieldError message={errors.preferredFoot} />
      </div>
      <label className={reportLabelClass}>
        Height (cm)
        <input
          type="number"
          inputMode="numeric"
          min={HEIGHT_CM_MIN}
          max={HEIGHT_CM_MAX}
          step={1}
          value={form.playerInformation.heightCm ?? ''}
          onChange={(e) => {
            const raw = e.target.value
            setForm((f) => ({
              ...f,
              playerInformation: {
                ...f.playerInformation,
                heightCm:
                  raw === ''
                    ? null
                    : (() => {
                        const n = Number(raw)
                        return Number.isFinite(n) ? Math.round(n) : null
                      })(),
              },
            }))
          }}
          aria-invalid={Boolean(errors.heightCm)}
          className={`${reportFieldClass} ${errors.heightCm ? reportFieldErrorClass : ''}`}
        />
        <FieldError message={errors.heightCm} />
      </label>
      <label className={reportLabelClass}>
        Weight (kg)
        <input
          type="number"
          inputMode="numeric"
          min={WEIGHT_KG_MIN}
          max={WEIGHT_KG_MAX}
          step={1}
          value={form.playerInformation.weightKg ?? ''}
          onChange={(e) => {
            const raw = e.target.value
            setForm((f) => ({
              ...f,
              playerInformation: {
                ...f.playerInformation,
                weightKg:
                  raw === ''
                    ? null
                    : (() => {
                        const n = Number(raw)
                        return Number.isFinite(n) ? Math.round(n) : null
                      })(),
              },
            }))
          }}
          aria-invalid={Boolean(errors.weightKg)}
          className={`${reportFieldClass} ${errors.weightKg ? reportFieldErrorClass : ''}`}
        />
        <FieldError message={errors.weightKg} />
      </label>
      <div className="flex flex-col gap-1">
        <span className={reportLabelClass}>Position</span>
        <OverlaySelect
          value={form.playerInformation.position}
          onChange={(position) =>
            setForm((f) => {
              const pi = f.playerInformation
              return {
                ...f,
                playerInformation: {
                  ...pi,
                  position,
                  mostlyUsedRole: resolveMostlyUsedRoleForPosition(position, pi.mostlyUsedRole),
                },
              }
            })
          }
          options={POSITION_SELECT_OPTIONS}
          placeholder="Select position…"
          aria-invalid={Boolean(errors.position)}
          triggerClassName={errors.position ? reportFieldErrorClass : ''}
        />
        <FieldError message={errors.position} />
      </div>
      <label className={reportLabelClass}>
        Secondary position
        <OverlaySelect
          value={form.playerInformation.secondaryPosition ?? ''}
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
      <div className="flex flex-col gap-1">
        <span className={reportLabelClass}>Mostly used role</span>
        <OverlaySelect
          value={form.playerInformation.mostlyUsedRole}
          onChange={(mostlyUsedRole) =>
            setForm((f) => ({
              ...f,
              playerInformation: { ...f.playerInformation, mostlyUsedRole },
            }))
          }
          options={roleSelectOptions}
          placeholder={
            form.playerInformation.position
              ? 'Select role…'
              : 'Select position first…'
          }
          disabled={!form.playerInformation.position}
          aria-invalid={Boolean(errors.mostlyUsedRole)}
          triggerClassName={errors.mostlyUsedRole ? reportFieldErrorClass : ''}
        />
        <FieldError message={errors.mostlyUsedRole} />
      </div>
      <ScoutReportField
        label="Other roles"
        value={form.playerInformation.otherRoles ?? ''}
        onChange={(otherRoles) =>
          setForm((f) => ({
            ...f,
            playerInformation: { ...f.playerInformation, otherRoles },
          }))
        }
      />
      <ScoutReportField
        label="Club"
        value={form.playerInformation.club}
        error={errors.club}
        onChange={(club) =>
          setForm((f) => ({
            ...f,
            playerInformation: { ...f.playerInformation, club },
          }))
        }
      />
      <ScoutReportField
        label="Contract (if known)"
        value={form.playerInformation.contractIfKnown}
        onChange={(contractIfKnown) =>
          setForm((f) => ({
            ...f,
            playerInformation: { ...f.playerInformation, contractIfKnown },
          }))
        }
      />
    </div>
  )
}

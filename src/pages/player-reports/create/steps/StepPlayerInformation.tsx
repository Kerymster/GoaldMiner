import { OverlaySelect } from '../../../../components/OverlaySelect'
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

export function StepPlayerInformation({ form, setForm, errors }: ScoutReportStepProps) {
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
      <ScoutReportField
        label="Position"
        value={form.playerInformation.position}
        error={errors.position}
        onChange={(position) =>
          setForm((f) => ({
            ...f,
            playerInformation: { ...f.playerInformation, position },
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
        error={errors.contractIfKnown}
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

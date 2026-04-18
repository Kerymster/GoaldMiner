import { FieldError, ScoutReportField } from '../ScoutReportField'
import { ScoutReportNationalityField } from '../ScoutReportNationalityField'
import {
  reportFieldClass,
  reportFieldErrorClass,
  reportLabelClass,
} from '../reportFormStyles'
import type { ScoutReportStepProps } from './stepProps'

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
          className={`${reportFieldClass} ${errors.ageOrDob ? reportFieldErrorClass : ''}`}
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
      <ScoutReportField
        label="Height / weight"
        value={form.playerInformation.heightWeight}
        error={errors.heightWeight}
        onChange={(heightWeight) =>
          setForm((f) => ({
            ...f,
            playerInformation: { ...f.playerInformation, heightWeight },
          }))
        }
      />
      <ScoutReportField
        label="Preferred foot"
        value={form.playerInformation.preferredFoot}
        error={errors.preferredFoot}
        onChange={(preferredFoot) =>
          setForm((f) => ({
            ...f,
            playerInformation: { ...f.playerInformation, preferredFoot },
          }))
        }
      />
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

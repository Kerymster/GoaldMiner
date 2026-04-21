import { ScoutReportField } from '../../ScoutReportField'
import { ScoutReportNationalityField } from '../../ScoutReportNationalityField'
import type { ScoutReportStepProps } from '../stepProps'
import { ContractEndDateField, DateOfBirthField, ReportDateField } from './dateFields'
import { PhysicalMeasurements } from './physicalMeasurements'
import { PositionAndRoles } from './positionAndRoles'

export function StepPlayerInformation({ form, setForm, errors }: ScoutReportStepProps) {
  const pi = form.playerInformation

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <ReportDateField
        value={form.reportDate}
        onChange={(reportDate) =>
          setForm((f) => ({
            ...f,
            reportDate,
          }))
        }
        error={errors.reportDate}
      />
      <ScoutReportField
        label="Name"
        value={pi.name}
        error={errors.name}
        onChange={(name) =>
          setForm((f) => ({
            ...f,
            playerInformation: { ...f.playerInformation, name },
          }))
        }
      />
      <DateOfBirthField
        value={pi.ageOrDob}
        onChange={(ageOrDob) =>
          setForm((f) => ({
            ...f,
            playerInformation: {
              ...f.playerInformation,
              ageOrDob,
            },
          }))
        }
        error={errors.ageOrDob}
      />
      <ScoutReportNationalityField
        value={pi.nationality}
        error={errors.nationality}
        onChange={(nationality) =>
          setForm((f) => ({
            ...f,
            playerInformation: { ...f.playerInformation, nationality },
          }))
        }
      />
      <PhysicalMeasurements form={form} setForm={setForm} errors={errors} />
      <PositionAndRoles form={form} setForm={setForm} errors={errors} />
      <ScoutReportField
        label="Club"
        value={pi.club}
        error={errors.club}
        onChange={(club) =>
          setForm((f) => ({
            ...f,
            playerInformation: { ...f.playerInformation, club },
          }))
        }
      />
      <ContractEndDateField
        value={pi.contractIfKnown}
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

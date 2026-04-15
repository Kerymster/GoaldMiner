import { ScoutReportField } from '../ScoutReportField'
import type { ScoutReportStepProps } from './stepProps'

export function StepPlayerInformation({ form, setForm }: ScoutReportStepProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <ScoutReportField
        label="Name"
        value={form.playerInformation.name}
        onChange={(name) =>
          setForm((f) => ({
            ...f,
            playerInformation: { ...f.playerInformation, name },
          }))
        }
      />
      <ScoutReportField
        label="Age / DOB"
        value={form.playerInformation.ageOrDob}
        onChange={(ageOrDob) =>
          setForm((f) => ({
            ...f,
            playerInformation: { ...f.playerInformation, ageOrDob },
          }))
        }
      />
      <ScoutReportField
        label="Nationality"
        value={form.playerInformation.nationality}
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

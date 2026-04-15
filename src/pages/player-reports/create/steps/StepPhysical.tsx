import { ScoutReportField } from '../ScoutReportField'
import type { ScoutReportStepProps } from './stepProps'

export function StepPhysical({ form, setForm }: ScoutReportStepProps) {
  return (
    <div className="space-y-4">
      <ScoutReportField
        label="Pace (acceleration / sprint)"
        value={form.physical.paceAccelerationSprint}
        onChange={(paceAccelerationSprint) =>
          setForm((f) => ({
            ...f,
            physical: { ...f.physical, paceAccelerationSprint },
          }))
        }
        multiline
      />
      <ScoutReportField
        label="Stamina"
        value={form.physical.stamina}
        onChange={(stamina) =>
          setForm((f) => ({
            ...f,
            physical: { ...f.physical, stamina },
          }))
        }
        multiline
      />
      <ScoutReportField
        label="Strength"
        value={form.physical.strength}
        onChange={(strength) =>
          setForm((f) => ({
            ...f,
            physical: { ...f.physical, strength },
          }))
        }
        multiline
      />
      <ScoutReportField
        label="Balance"
        value={form.physical.balance}
        onChange={(balance) =>
          setForm((f) => ({
            ...f,
            physical: { ...f.physical, balance },
          }))
        }
        multiline
      />
    </div>
  )
}

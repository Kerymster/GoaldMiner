import { ScoutReportField } from '../ScoutReportField'
import type { ScoutReportStepProps } from './stepProps'

export function StepPhysical({ form, setForm, errors }: ScoutReportStepProps) {
  return (
    <div className="space-y-4">
      <ScoutReportField
        label="Pace (acceleration / sprint)"
        value={form.physical.paceAccelerationSprint}
        error={errors.paceAccelerationSprint}
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
        error={errors.stamina}
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
        error={errors.strength}
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
        error={errors.balance}
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

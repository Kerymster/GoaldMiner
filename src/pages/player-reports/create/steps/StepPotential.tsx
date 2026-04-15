import { ScoutReportField } from '../ScoutReportField'
import type { ScoutReportStepProps } from './stepProps'

export function StepPotential({ form, setForm, errors }: ScoutReportStepProps) {
  return (
    <div className="space-y-4">
      <ScoutReportField
        label="Ceiling"
        value={form.potential.ceiling}
        error={errors.ceiling}
        onChange={(ceiling) =>
          setForm((f) => ({
            ...f,
            potential: { ...f.potential, ceiling },
          }))
        }
        multiline
      />
      <ScoutReportField
        label="Development areas"
        value={form.potential.developmentAreas}
        error={errors.developmentAreas}
        onChange={(developmentAreas) =>
          setForm((f) => ({
            ...f,
            potential: { ...f.potential, developmentAreas },
          }))
        }
        multiline
      />
      <ScoutReportField
        label="Risk factors"
        value={form.potential.riskFactors}
        error={errors.riskFactors}
        onChange={(riskFactors) =>
          setForm((f) => ({
            ...f,
            potential: { ...f.potential, riskFactors },
          }))
        }
        multiline
      />
    </div>
  )
}

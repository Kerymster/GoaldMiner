import { ScoutReportField } from '../ScoutReportField'
import type { ScoutReportStepProps } from './stepProps'

export function StepPotential({ form, setForm }: ScoutReportStepProps) {
  return (
    <div className="space-y-4">
      <ScoutReportField
        label="Ceiling"
        value={form.potential.ceiling}
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

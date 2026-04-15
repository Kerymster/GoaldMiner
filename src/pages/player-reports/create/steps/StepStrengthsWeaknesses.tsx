import { ScoutReportField } from '../ScoutReportField'
import type { ScoutReportStepProps } from './stepProps'

export function StepStrengthsWeaknesses({ form, setForm }: ScoutReportStepProps) {
  return (
    <div className="space-y-4">
      <ScoutReportField
        label="Strengths"
        hint="Concrete, observable strengths"
        value={form.strengthsWeaknesses.strengths}
        onChange={(strengths) =>
          setForm((f) => ({
            ...f,
            strengthsWeaknesses: { ...f.strengthsWeaknesses, strengths },
          }))
        }
        multiline
      />
      <ScoutReportField
        label="Weaknesses"
        value={form.strengthsWeaknesses.weaknesses}
        onChange={(weaknesses) =>
          setForm((f) => ({
            ...f,
            strengthsWeaknesses: { ...f.strengthsWeaknesses, weaknesses },
          }))
        }
        multiline
      />
    </div>
  )
}

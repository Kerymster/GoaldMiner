import { ScoutReportField } from '../ScoutReportField'
import type { ScoutReportStepProps } from './stepProps'

export function StepMental({ form, setForm, errors }: ScoutReportStepProps) {
  return (
    <div className="space-y-4">
      <ScoutReportField
        label="Decision-making"
        value={form.mental.decisionMaking}
        error={errors.decisionMaking}
        onChange={(decisionMaking) =>
          setForm((f) => ({
            ...f,
            mental: { ...f.mental, decisionMaking },
          }))
        }
        multiline
      />
      <ScoutReportField
        label="Game intelligence"
        value={form.mental.gameIntelligence}
        error={errors.gameIntelligence}
        onChange={(gameIntelligence) =>
          setForm((f) => ({
            ...f,
            mental: { ...f.mental, gameIntelligence },
          }))
        }
        multiline
      />
      <ScoutReportField
        label="Discipline"
        value={form.mental.discipline}
        error={errors.discipline}
        onChange={(discipline) =>
          setForm((f) => ({
            ...f,
            mental: { ...f.mental, discipline },
          }))
        }
        multiline
      />
      <ScoutReportField
        label="Confidence"
        value={form.mental.confidence}
        error={errors.confidence}
        onChange={(confidence) =>
          setForm((f) => ({
            ...f,
            mental: { ...f.mental, confidence },
          }))
        }
        multiline
      />
      <ScoutReportField
        label="Performance under pressure"
        value={form.mental.performanceUnderPressure}
        error={errors.performanceUnderPressure}
        onChange={(performanceUnderPressure) =>
          setForm((f) => ({
            ...f,
            mental: { ...f.mental, performanceUnderPressure },
          }))
        }
        multiline
      />
    </div>
  )
}

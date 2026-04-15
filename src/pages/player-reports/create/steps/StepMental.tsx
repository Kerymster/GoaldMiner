import { ScoutReportField } from '../ScoutReportField'
import type { ScoutReportStepProps } from './stepProps'

export function StepMental({ form, setForm }: ScoutReportStepProps) {
  return (
    <div className="space-y-4">
      <ScoutReportField
        label="Decision-making"
        value={form.mental.decisionMaking}
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

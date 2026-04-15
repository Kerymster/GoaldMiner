import { ScoutReportField } from '../ScoutReportField'
import type { ScoutReportStepProps } from './stepProps'

export function StepComparison({ form, setForm }: ScoutReportStepProps) {
  return (
    <div className="space-y-4">
      <p className="text-sm text-fume-600 dark:text-fume-400">
        Optional — compare playing style and level to reference players.
      </p>
      <ScoutReportField
        label="Playing-style comparison"
        value={form.comparison.playingStyleComparison}
        onChange={(playingStyleComparison) =>
          setForm((f) => ({
            ...f,
            comparison: { ...f.comparison, playingStyleComparison },
          }))
        }
        multiline
      />
      <ScoutReportField
        label="Level comparison"
        value={form.comparison.levelComparison}
        onChange={(levelComparison) =>
          setForm((f) => ({
            ...f,
            comparison: { ...f.comparison, levelComparison },
          }))
        }
        multiline
      />
    </div>
  )
}

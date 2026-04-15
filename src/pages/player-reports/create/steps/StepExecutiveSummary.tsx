import { ScoutReportField } from '../ScoutReportField'
import type { ScoutReportStepProps } from './stepProps'

export function StepExecutiveSummary({ form, setForm }: ScoutReportStepProps) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-fume-600 dark:text-fume-400">
        After filling the sections above, synthesize in{' '}
        <strong className="font-medium text-fume-800 dark:text-fume-200">4–5 sentences</strong>
        : what kind of player they are, strongest trait, biggest risk, and whether you would
        transfer them.
      </p>
      <ScoutReportField
        label="Executive summary"
        hint="Example tone: modern full-back with strong offensive contribution; defensive positioning inconsistent; fits possession sides."
        value={form.executiveSummary.narrative}
        onChange={(narrative) =>
          setForm((f) => ({
            ...f,
            executiveSummary: { ...f.executiveSummary, narrative },
          }))
        }
        multiline
      />
    </div>
  )
}

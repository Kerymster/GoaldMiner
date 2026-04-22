import { pageStackCompact, proseMutedSm } from '../../../../components/styles/pageChromeStyles'
import { ScoutReportField } from '../ScoutReportField'
import type { ScoutReportStepProps } from './stepProps'

export function StepComparison({ form, setForm, errors }: ScoutReportStepProps) {
  return (
    <div className={pageStackCompact}>
      <p className={proseMutedSm}>
        Optional — compare playing style and level to reference players.
      </p>
      <ScoutReportField
        label="Playing-style comparison"
        value={form.comparison.playingStyleComparison}
        error={errors.playingStyleComparison}
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
        error={errors.levelComparison}
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


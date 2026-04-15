import { reportFieldClass, reportLabelClass } from '../reportFormStyles'
import { ScoutReportField } from '../ScoutReportField'
import type { ScoutReportStepProps } from './stepProps'

export function StepTeamFit({ form, setForm }: ScoutReportStepProps) {
  return (
    <div className="space-y-6">
      <ScoutReportField
        label="Which clubs / profiles fit?"
        value={form.teamFit.whichTeams}
        onChange={(whichTeams) =>
          setForm((f) => ({
            ...f,
            teamFit: { ...f.teamFit, whichTeams },
          }))
        }
        multiline
      />
      <ScoutReportField
        label="Which systems does he shine in?"
        value={form.teamFit.whichSystems}
        onChange={(whichSystems) =>
          setForm((f) => ({
            ...f,
            teamFit: { ...f.teamFit, whichSystems },
          }))
        }
        multiline
      />
      <ScoutReportField
        label="Transfer recommendation"
        value={form.teamFit.transferRecommendation}
        onChange={(transferRecommendation) =>
          setForm((f) => ({
            ...f,
            teamFit: { ...f.teamFit, transferRecommendation },
          }))
        }
        multiline
      />
      <ScoutReportField
        label="Final verdict"
        value={form.teamFit.finalVerdict}
        onChange={(finalVerdict) =>
          setForm((f) => ({
            ...f,
            teamFit: { ...f.teamFit, finalVerdict },
          }))
        }
        multiline
      />
      <label className={reportLabelClass}>
        Overall rating (1–5)
        <select
          value={form.teamFit.ratingOutOfFive ?? ''}
          onChange={(e) => {
            const v = e.target.value
            setForm((f) => ({
              ...f,
              teamFit: {
                ...f.teamFit,
                ratingOutOfFive: v === '' ? null : Number(v),
              },
            }))
          }}
          className={reportFieldClass}
        >
          <option value="">Not set</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </label>
    </div>
  )
}

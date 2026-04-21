import { OverlaySelect } from '../../../../components/OverlaySelect'
import { pageStack } from '../../../../components/pageChromeStyles'
import {
  STAFF_RATING_MAX,
  STAFF_RATING_MIN,
} from '../../../../types/scoutReportForm'
import { overallRatingOverlayOptions } from '../../../../utils/overallRatingSelectOptions'
import { FieldError, ScoutReportField } from '../ScoutReportField'
import { reportFieldErrorClass, reportLabelClass } from '../reportFormStyles'
import type { ScoutReportStepProps } from './stepProps'

const RATING_OPTIONS = overallRatingOverlayOptions()

export function StepTeamFit({ form, setForm, errors }: ScoutReportStepProps) {
  return (
    <div className={pageStack}>
      <ScoutReportField
        label="Which clubs / profiles fit?"
        value={form.teamFit.whichTeams}
        error={errors.whichTeams}
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
        error={errors.whichSystems}
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
        error={errors.transferRecommendation}
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
        error={errors.finalVerdict}
        onChange={(finalVerdict) =>
          setForm((f) => ({
            ...f,
            teamFit: { ...f.teamFit, finalVerdict },
          }))
        }
        multiline
      />
      <label className={reportLabelClass}>
        Overall rating ({STAFF_RATING_MIN}–{STAFF_RATING_MAX})
        <OverlaySelect
          value={
            form.teamFit.ratingOutOfFive == null ? '' : String(form.teamFit.ratingOutOfFive)
          }
          onChange={(v) =>
            setForm((f) => ({
              ...f,
              teamFit: {
                ...f.teamFit,
                ratingOutOfFive: v === '' ? null : Number(v),
              },
            }))
          }
          options={RATING_OPTIONS}
          placeholder="Not set"
          aria-invalid={Boolean(errors.ratingOutOfFive)}
          triggerClassName={errors.ratingOutOfFive ? reportFieldErrorClass : ''}
        />
        <FieldError message={errors.ratingOutOfFive} />
      </label>
    </div>
  )
}

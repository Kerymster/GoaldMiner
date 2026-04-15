import { reportSectionTitleClass } from '../reportFormStyles'
import { ScoutReportField } from '../ScoutReportField'
import type { ScoutReportStepProps } from './stepProps'

export function StepTechnical({ form, setForm }: ScoutReportStepProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className={reportSectionTitleClass}>Ball control</p>
        <ScoutReportField
          label="First touch"
          value={form.technical.ballControl.firstTouch}
          onChange={(firstTouch) =>
            setForm((f) => ({
              ...f,
              technical: {
                ...f.technical,
                ballControl: { ...f.technical.ballControl, firstTouch },
              },
            }))
          }
          multiline
        />
        <ScoutReportField
          label="Quality in tight spaces"
          value={form.technical.ballControl.tightSpaceQuality}
          onChange={(tightSpaceQuality) =>
            setForm((f) => ({
              ...f,
              technical: {
                ...f.technical,
                ballControl: {
                  ...f.technical.ballControl,
                  tightSpaceQuality,
                },
              },
            }))
          }
          multiline
        />
      </div>
      <div className="space-y-3">
        <p className={reportSectionTitleClass}>Passing</p>
        <ScoutReportField
          label="Short / long passing"
          value={form.technical.passing.shortAndLong}
          onChange={(shortAndLong) =>
            setForm((f) => ({
              ...f,
              technical: {
                ...f.technical,
                passing: { ...f.technical.passing, shortAndLong },
              },
            }))
          }
          multiline
        />
        <ScoutReportField
          label="Creativity"
          value={form.technical.passing.creativity}
          onChange={(creativity) =>
            setForm((f) => ({
              ...f,
              technical: {
                ...f.technical,
                passing: { ...f.technical.passing, creativity },
              },
            }))
          }
          multiline
        />
      </div>
      <div className="space-y-3">
        <p className={reportSectionTitleClass}>Dribbling</p>
        <ScoutReportField
          label="1v1 success"
          value={form.technical.dribbling.oneVsOne}
          onChange={(oneVsOne) =>
            setForm((f) => ({
              ...f,
              technical: {
                ...f.technical,
                dribbling: { ...f.technical.dribbling, oneVsOne },
              },
            }))
          }
          multiline
        />
        <ScoutReportField
          label="Change of direction with the ball"
          value={form.technical.dribbling.changeOfDirection}
          onChange={(changeOfDirection) =>
            setForm((f) => ({
              ...f,
              technical: {
                ...f.technical,
                dribbling: {
                  ...f.technical.dribbling,
                  changeOfDirection,
                },
              },
            }))
          }
          multiline
        />
      </div>
      <div className="space-y-3">
        <p className={reportSectionTitleClass}>Finishing (if relevant)</p>
        <ScoutReportField
          label="Shot quality"
          value={form.technical.finishing.shotQuality}
          onChange={(shotQuality) =>
            setForm((f) => ({
              ...f,
              technical: {
                ...f.technical,
                finishing: { ...f.technical.finishing, shotQuality },
              },
            }))
          }
          multiline
        />
        <ScoutReportField
          label="Penalty-area effectiveness"
          value={form.technical.finishing.penaltyAreaEffectiveness}
          onChange={(penaltyAreaEffectiveness) =>
            setForm((f) => ({
              ...f,
              technical: {
                ...f.technical,
                finishing: {
                  ...f.technical.finishing,
                  penaltyAreaEffectiveness,
                },
              },
            }))
          }
          multiline
        />
      </div>
    </div>
  )
}

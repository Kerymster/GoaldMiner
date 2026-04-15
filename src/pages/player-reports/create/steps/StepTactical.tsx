import { reportSectionTitleClass } from '../reportFormStyles'
import { ScoutReportField } from '../ScoutReportField'
import type { ScoutReportStepProps } from './stepProps'

export function StepTactical({ form, setForm }: ScoutReportStepProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <p className={reportSectionTitleClass}>Positioning</p>
        <ScoutReportField
          label="In the right places?"
          value={form.tactical.positioning.rightPlace}
          onChange={(rightPlace) =>
            setForm((f) => ({
              ...f,
              tactical: {
                ...f.tactical,
                positioning: { ...f.tactical.positioning, rightPlace },
              },
            }))
          }
          multiline
        />
        <ScoutReportField
          label="Finding space"
          value={form.tactical.positioning.findingSpace}
          onChange={(findingSpace) =>
            setForm((f) => ({
              ...f,
              tactical: {
                ...f.tactical,
                positioning: { ...f.tactical.positioning, findingSpace },
              },
            }))
          }
          multiline
        />
      </div>
      <div className="space-y-3">
        <p className={reportSectionTitleClass}>Off-ball movement</p>
        <ScoutReportField
          label="Runs without the ball"
          value={form.tactical.offBallMovement.runsWithoutBall}
          onChange={(runsWithoutBall) =>
            setForm((f) => ({
              ...f,
              tactical: {
                ...f.tactical,
                offBallMovement: {
                  ...f.tactical.offBallMovement,
                  runsWithoutBall,
                },
              },
            }))
          }
          multiline
        />
        <ScoutReportField
          label="Creating space for others"
          value={form.tactical.offBallMovement.creatingSpace}
          onChange={(creatingSpace) =>
            setForm((f) => ({
              ...f,
              tactical: {
                ...f.tactical,
                offBallMovement: {
                  ...f.tactical.offBallMovement,
                  creatingSpace,
                },
              },
            }))
          }
          multiline
        />
      </div>
      <div className="space-y-3">
        <p className={reportSectionTitleClass}>Defensive contribution</p>
        <ScoutReportField
          label="Pressing"
          value={form.tactical.defensiveContribution.pressing}
          onChange={(pressing) =>
            setForm((f) => ({
              ...f,
              tactical: {
                ...f.tactical,
                defensiveContribution: {
                  ...f.tactical.defensiveContribution,
                  pressing,
                },
              },
            }))
          }
          multiline
        />
        <ScoutReportField
          label="Tracking back"
          value={form.tactical.defensiveContribution.trackingBack}
          onChange={(trackingBack) =>
            setForm((f) => ({
              ...f,
              tactical: {
                ...f.tactical,
                defensiveContribution: {
                  ...f.tactical.defensiveContribution,
                  trackingBack,
                },
              },
            }))
          }
          multiline
        />
        <ScoutReportField
          label="Tackle / duel timing"
          value={form.tactical.defensiveContribution.tackleTiming}
          onChange={(tackleTiming) =>
            setForm((f) => ({
              ...f,
              tactical: {
                ...f.tactical,
                defensiveContribution: {
                  ...f.tactical.defensiveContribution,
                  tackleTiming,
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

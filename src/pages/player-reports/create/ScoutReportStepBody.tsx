import type { Dispatch, SetStateAction } from 'react'
import type { ScoutReportForm } from '../../../types/scoutReportForm'
import type { ScoutReportStepErrors } from './scoutReportStepValidation'
import { StepComparison } from './steps/StepComparison'
import { StepExecutiveSummary } from './steps/StepExecutiveSummary'
import { StepMental } from './steps/StepMental'
import { StepPhysical } from './steps/StepPhysical'
import { StepPlayerInformation } from './steps/stepPlayerInformation/StepPlayerInformation'
import { StepPlayingStyle } from './steps/StepPlayingStyle'
import { StepPotential } from './steps/StepPotential'
import { StepStatistical } from './steps/StepStatistical'
import { StepStrengthsWeaknesses } from './steps/StepStrengthsWeaknesses'
import { StepTactical } from './steps/StepTactical'
import { StepTeamFit } from './steps/StepTeamFit'
import { StepTechnical } from './steps/StepTechnical'

type ScoutReportStepBodyProps = {
  step: number
  form: ScoutReportForm
  setForm: Dispatch<SetStateAction<ScoutReportForm>>
  errors: ScoutReportStepErrors
}

/** `step` indices map 1:1 to `SCOUT_REPORT_STEPS` in `scoutReportForm.ts`. */
export function ScoutReportStepBody({
  step,
  form,
  setForm,
  errors,
}: ScoutReportStepBodyProps) {
  const p = { form, setForm, errors }

  switch (step) {
    case 0:
      return <StepPlayerInformation {...p} />
    case 1:
      return <StepPlayingStyle {...p} />
    case 2:
      return <StepTechnical {...p} />
    case 3:
      return <StepTactical {...p} />
    case 4:
      return <StepPhysical {...p} />
    case 5:
      return <StepMental {...p} />
    case 6:
      return <StepStatistical {...p} />
    case 7:
      return <StepStrengthsWeaknesses {...p} />
    case 8:
      return <StepPotential {...p} />
    case 9:
      return <StepComparison {...p} />
    case 10:
      return <StepTeamFit {...p} />
    case 11:
      return <StepExecutiveSummary {...p} />
    default:
      return null
  }
}

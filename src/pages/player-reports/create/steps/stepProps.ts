import type { Dispatch, SetStateAction } from 'react'
import type { ScoutReportForm } from '../../../../types/scoutReportForm'
import type { ScoutReportStepErrors } from '../scoutReportStepValidation'

export type ScoutReportStepProps = {
  form: ScoutReportForm
  setForm: Dispatch<SetStateAction<ScoutReportForm>>
  errors: ScoutReportStepErrors
}

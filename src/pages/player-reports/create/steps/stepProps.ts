import type { Dispatch, SetStateAction } from 'react'
import type { ScoutReportForm } from '../../../../types/scoutReportForm'

export type ScoutReportStepProps = {
  form: ScoutReportForm
  setForm: Dispatch<SetStateAction<ScoutReportForm>>
}

import type { Dispatch, SetStateAction } from 'react'
import type { ScoutReportForm } from '../../../../../types/scoutReportForm'
import type { ScoutReportStepErrors } from '../../scoutReportStepValidation'
import {
  HEIGHT_CM_MAX,
  HEIGHT_CM_MIN,
  WEIGHT_KG_MAX,
  WEIGHT_KG_MIN,
} from '../../scoutReportStepValidation'
import { LabeledOverlaySelectField } from './LabeledOverlaySelectField'
import { NullableBoundedNumberField } from './NullableBoundedNumberField'
import { PREFERRED_FOOT_SELECT_OPTIONS } from './constants'

type PhysicalMeasurementsProps = {
  form: ScoutReportForm
  setForm: Dispatch<SetStateAction<ScoutReportForm>>
  errors: ScoutReportStepErrors
}

export function PhysicalMeasurements({ form, setForm, errors }: PhysicalMeasurementsProps) {
  const pi = form.playerInformation

  return (
    <>
      <LabeledOverlaySelectField
        label="Preferred foot"
        value={pi.preferredFoot}
        onChange={(preferredFoot) =>
          setForm((f) => ({
            ...f,
            playerInformation: { ...f.playerInformation, preferredFoot },
          }))
        }
        options={PREFERRED_FOOT_SELECT_OPTIONS}
        placeholder="Select preferred foot…"
        error={errors.preferredFoot}
      />
      <NullableBoundedNumberField
        label="Height (cm)"
        value={pi.heightCm}
        onChange={(heightCm) =>
          setForm((f) => ({
            ...f,
            playerInformation: { ...f.playerInformation, heightCm },
          }))
        }
        min={HEIGHT_CM_MIN}
        max={HEIGHT_CM_MAX}
        error={errors.heightCm}
      />
      <NullableBoundedNumberField
        label="Weight (kg)"
        value={pi.weightKg}
        onChange={(weightKg) =>
          setForm((f) => ({
            ...f,
            playerInformation: { ...f.playerInformation, weightKg },
          }))
        }
        min={WEIGHT_KG_MIN}
        max={WEIGHT_KG_MAX}
        error={errors.weightKg}
      />
    </>
  )
}

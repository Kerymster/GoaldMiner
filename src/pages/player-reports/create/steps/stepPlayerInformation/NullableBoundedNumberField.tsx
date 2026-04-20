import { FieldError } from '../../ScoutReportField'
import { reportFieldClass, reportFieldErrorClass, reportLabelClass } from '../../reportFormStyles'
import { parseOptionalRoundedInt } from './constants'

type NullableBoundedNumberFieldProps = {
  label: string
  value: number | null
  onChange: (value: number | null) => void
  min: number
  max: number
  error?: string
}

export function NullableBoundedNumberField({
  label,
  value,
  onChange,
  min,
  max,
  error,
}: NullableBoundedNumberFieldProps) {
  return (
    <label className={reportLabelClass}>
      {label}
      <input
        type="number"
        inputMode="numeric"
        min={min}
        max={max}
        step={1}
        value={value ?? ''}
        onChange={(e) => onChange(parseOptionalRoundedInt(e.target.value))}
        aria-invalid={Boolean(error)}
        className={`${reportFieldClass} ${error ? reportFieldErrorClass : ''}`}
      />
      <FieldError message={error} />
    </label>
  )
}

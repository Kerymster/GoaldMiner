import { OverlaySelect, type OverlaySelectOption } from '../../../../../components/overlay-select/OverlaySelect'
import { FieldError } from '../../ScoutReportField'
import { reportFieldErrorClass, reportLabelClass } from '../../reportFormStyles'

type LabeledOverlaySelectFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  options: OverlaySelectOption[]
  placeholder: string
  error?: string
  disabled?: boolean
}

export function LabeledOverlaySelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
  error,
  disabled = false,
}: LabeledOverlaySelectFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className={reportLabelClass}>{label}</span>
      <OverlaySelect
        value={value}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        triggerClassName={error ? reportFieldErrorClass : ''}
      />
      <FieldError message={error} />
    </div>
  )
}


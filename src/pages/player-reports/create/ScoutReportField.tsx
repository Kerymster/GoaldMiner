import {
  reportFieldClass,
  reportFieldErrorClass,
  reportLabelClass,
  reportSubLabelClass,
  reportTextareaClass,
  reportValidationMessageClass,
} from './reportFormStyles'

export function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return (
    <p className={`mt-1 ${reportValidationMessageClass}`} role="alert">
      {message}
    </p>
  )
}

export function ScoutReportField({
  label,
  hint,
  value,
  onChange,
  multiline,
  error,
}: {
  label: string
  hint?: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
  error?: string
}) {
  const Input = multiline ? 'textarea' : 'input'
  const stateClass = error ? reportFieldErrorClass : ''
  return (
    <label className={reportLabelClass}>
      {label}
      {hint ? <span className={reportSubLabelClass}>{hint}</span> : null}
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={`${multiline ? reportTextareaClass : reportFieldClass} ${stateClass}`}
        rows={multiline ? 4 : undefined}
      />
      <FieldError message={error} />
    </label>
  )
}

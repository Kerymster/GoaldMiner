import {
  reportFieldClass,
  reportLabelClass,
  reportSubLabelClass,
  reportTextareaClass,
} from './reportFormStyles'

export function ScoutReportField({
  label,
  hint,
  value,
  onChange,
  multiline,
}: {
  label: string
  hint?: string
  value: string
  onChange: (v: string) => void
  multiline?: boolean
}) {
  const Input = multiline ? 'textarea' : 'input'
  return (
    <label className={reportLabelClass}>
      {label}
      {hint ? <span className={reportSubLabelClass}>{hint}</span> : null}
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={multiline ? reportTextareaClass : reportFieldClass}
        rows={multiline ? 4 : undefined}
      />
    </label>
  )
}

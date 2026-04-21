import { FieldError } from '../../ScoutReportField'
import { reportFieldClass, reportFieldErrorClass, reportLabelClass } from '../../reportFormStyles'

type ReportDateFieldProps = {
  value: string
  onChange: (value: string) => void
  error?: string
}

export function ReportDateField({ value, onChange, error }: ReportDateFieldProps) {
  return (
    <label className={`${reportLabelClass} sm:col-span-2`}>
      Report date
      <span className="text-[11px] font-normal normal-case tracking-normal text-fume-500 dark:text-fume-500">
        When this scouting note was recorded
      </span>
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={`${reportFieldClass} ${error ? reportFieldErrorClass : ''}`}
      />
      <FieldError message={error} />
    </label>
  )
}

type DateOfBirthFieldProps = {
  value: string
  onChange: (value: string) => void
  error?: string
}

export function DateOfBirthField({ value, onChange, error }: DateOfBirthFieldProps) {
  return (
    <label className={reportLabelClass}>
      Date of Birth
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={[
          reportFieldClass,
          error ? reportFieldErrorClass : '',
          !value
            ? 'text-fume-500 dark:text-fume-400 [&::-webkit-datetime-edit]:text-fume-500 dark:[&::-webkit-datetime-edit]:text-fume-400 [&::-webkit-datetime-edit-fields-wrapper]:text-fume-500 dark:[&::-webkit-datetime-edit-fields-wrapper]:text-fume-400'
            : '',
        ]
          .filter(Boolean)
          .join(' ')}
      />
      <FieldError message={error} />
    </label>
  )
}

type ContractEndDateFieldProps = {
  value: string
  onChange: (value: string) => void
  error?: string
}

/** Optional contract expiry — stored as ISO `YYYY-MM-DD` (same as other date fields). */
export function ContractEndDateField({ value, onChange, error }: ContractEndDateFieldProps) {
  return (
    <label className={reportLabelClass}>
      Contract (End date)
      <input
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={[
          reportFieldClass,
          error ? reportFieldErrorClass : '',
          !value
            ? 'text-fume-500 dark:text-fume-400 [&::-webkit-datetime-edit]:text-fume-500 dark:[&::-webkit-datetime-edit]:text-fume-400 [&::-webkit-datetime-edit-fields-wrapper]:text-fume-500 dark:[&::-webkit-datetime-edit-fields-wrapper]:text-fume-400'
            : '',
        ]
          .filter(Boolean)
          .join(' ')}
      />
      <FieldError message={error} />
    </label>
  )
}

import { useCallback, useState, type SetStateAction } from 'react'
import { createScoutReport } from '../../../api/scoutReports'
import {
  SCOUT_REPORT_STEPS,
  createEmptyScoutReportForm,
  type ScoutReportForm,
} from '../../../types/scoutReportForm'
import { ProTipsPanel } from './ProTipsPanel'
import { reportValidationMessageClass } from './reportFormStyles'
import { ScoutReportStepBody } from './ScoutReportStepBody'
import {
  hasStepErrors,
  validateScoutReportStep,
  type ScoutReportStepErrors,
} from './scoutReportStepValidation'

export function CreateReportForm() {
  const [form, setForm] = useState<ScoutReportForm>(createEmptyScoutReportForm)
  const [stepErrors, setStepErrors] = useState<ScoutReportStepErrors>({})
  const [step, setStep] = useState(0)
  const [saveStatus, setSaveStatus] = useState<
    'idle' | 'saving' | 'success' | 'error'
  >('idle')
  const [saveMessage, setSaveMessage] = useState<string | null>(null)

  const last = step === SCOUT_REPORT_STEPS.length - 1
  const meta = SCOUT_REPORT_STEPS[step]

  const setFormAndClearStepErrors = useCallback(
    (u: SetStateAction<ScoutReportForm>) => {
      setStepErrors({})
      setForm(u)
    },
    [],
  )

  const goBack = useCallback(() => {
    setStepErrors({})
    setStep((s) => Math.max(0, s - 1))
    setSaveStatus('idle')
    setSaveMessage(null)
  }, [])

  const goNext = useCallback(() => {
    const errs = validateScoutReportStep(step, form)
    if (hasStepErrors(errs)) {
      setStepErrors(errs)
      return
    }
    setStepErrors({})
    setStep((s) => Math.min(SCOUT_REPORT_STEPS.length - 1, s + 1))
    setSaveStatus('idle')
    setSaveMessage(null)
  }, [step, form])

  const handleSave = useCallback(async () => {
    const errs = validateScoutReportStep(step, form)
    if (hasStepErrors(errs)) {
      setStepErrors(errs)
      return
    }
    setStepErrors({})
    setSaveStatus('saving')
    setSaveMessage(null)
    try {
      await createScoutReport(form)
      setSaveStatus('success')
      setSaveMessage('Report saved successfully.')
    } catch (e) {
      setSaveStatus('error')
      setSaveMessage(
        e instanceof Error ? e.message : 'Save failed. Check the API and try again.',
      )
    }
  }, [form, step])

  const progress = ((step + 1) / SCOUT_REPORT_STEPS.length) * 100

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,18rem)] lg:items-start">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-fume-500 dark:text-fume-400">
            <span>
              Step {step + 1} of {SCOUT_REPORT_STEPS.length}
            </span>
            <span className="font-medium text-fume-700 dark:text-fume-300">
              {Math.round(progress)}% complete
            </span>
          </div>
          <div
            className="h-1.5 overflow-hidden rounded-full bg-fume-200 dark:bg-fume-800"
            role="progressbar"
            aria-valuenow={step + 1}
            aria-valuemin={1}
            aria-valuemax={SCOUT_REPORT_STEPS.length}
            aria-label="Report progress"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-500 transition-[width] duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="rounded-xl border border-fume-200/90 bg-white p-5 shadow-sm shadow-fume-950/10 dark:border-fume-800 dark:bg-fume-900/45 dark:shadow-none sm:p-6">
          <div className="mb-6 border-b border-fume-100 pb-4 dark:border-fume-800">
            <h3 className="text-lg font-semibold tracking-tight text-fume-950 dark:text-fume-50">
              {meta.title}
            </h3>
            <p className="mt-1 text-sm text-fume-600 dark:text-fume-400">
              {meta.description}
            </p>
            {Object.keys(stepErrors).length > 0 ? (
              <p className={`mt-3 ${reportValidationMessageClass}`} role="alert">
                Fill every field on this step before continuing.
              </p>
            ) : null}
          </div>

          <ScoutReportStepBody
            step={step}
            form={form}
            setForm={setFormAndClearStepErrors}
            errors={stepErrors}
          />

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-fume-100 pt-6 dark:border-fume-800">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 0}
              className="cursor-pointer rounded-lg border border-fume-200 px-4 py-2 text-sm font-medium text-fume-800 transition-colors hover:bg-fume-50 disabled:cursor-not-allowed disabled:opacity-40 dark:border-fume-600 dark:text-fume-200 dark:hover:bg-fume-800/50"
            >
              Back
            </button>
            <div className="flex flex-wrap gap-2">
              {!last ? (
                <button
                  type="button"
                  onClick={goNext}
                  className="cursor-pointer rounded-lg bg-gold-600 px-4 py-2 text-sm font-semibold text-fume-950 shadow-sm transition-colors hover:bg-gold-500"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => void handleSave()}
                  disabled={saveStatus === 'saving'}
                  className="cursor-pointer rounded-lg bg-gold-600 px-4 py-2 text-sm font-semibold text-fume-950 shadow-sm transition-colors hover:bg-gold-500 disabled:cursor-wait disabled:opacity-70"
                >
                  {saveStatus === 'saving' ? 'Saving…' : 'Save report'}
                </button>
              )}
            </div>
          </div>

          {saveMessage ? (
            <p
              className={
                saveStatus === 'success'
                  ? 'mt-4 text-sm text-sea-700 dark:text-sea-400'
                  : `mt-4 ${reportValidationMessageClass}`
              }
              role="status"
            >
              {saveMessage}
            </p>
          ) : null}
        </div>
      </div>

      <ProTipsPanel />
    </div>
  )
}

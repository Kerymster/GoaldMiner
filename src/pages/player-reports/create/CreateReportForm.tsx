import { useCallback, useState, type SetStateAction } from 'react'
import { createScoutReport, updateScoutReport } from '../../../api/scoutReports'
import { Modal } from '../../../components/Modal'
import { loadScoutReportsForPlayer } from '../../../features/scoutReports/scoutReportsSlice'
import { useAppDispatch } from '../../../store/hooks'
import { formatApiIssuesSummary, isApiErr } from '../../../types/api'
import {
  SCOUT_REPORT_STEPS,
  createEmptyScoutReportForm,
  type ScoutReportForm,
} from '../../../types/scoutReportForm'
import {
  pageStack,
  primaryCtaButtonClass,
  proseMutedSm,
  secondaryCtaButtonClass,
} from '../../../components/pageChromeStyles'
import { ProTipsPanel } from './ProTipsPanel'
import { reportStepCardClass, reportValidationMessageClass } from './reportFormStyles'
import { ScoutReportStepBody } from './ScoutReportStepBody'
import {
  findFirstInvalidScoutReportStep,
  hasStepErrors,
  validateScoutReportStep,
  type ScoutReportStepErrors,
} from './scoutReportStepValidation'

export type CreateReportFormProps = {
  mode?: 'create' | 'edit'
  initialForm?: ScoutReportForm
  reportId?: string
  playerId?: string
}

export function CreateReportForm({
  mode = 'create',
  initialForm,
  reportId,
  playerId,
}: CreateReportFormProps = {}) {
  const dispatch = useAppDispatch()
  const [form, setForm] = useState<ScoutReportForm>(() =>
    initialForm ?? createEmptyScoutReportForm(),
  )
  const [stepErrors, setStepErrors] = useState<ScoutReportStepErrors>({})
  const [step, setStep] = useState(0)
  const [saveStatus, setSaveStatus] = useState<
    'idle' | 'saving' | 'success' | 'error'
  >('idle')
  const [saveMessage, setSaveMessage] = useState<string | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

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

  const requestSave = useCallback(() => {
    const invalid = findFirstInvalidScoutReportStep(form)
    if (invalid) {
      setStep(invalid.step)
      setStepErrors(invalid.errors)
      setSaveStatus('idle')
      setSaveMessage(null)
      return
    }
    setStepErrors({})
    setSaveStatus('idle')
    setSaveMessage(null)
    setConfirmOpen(true)
  }, [form])

  const performSave = useCallback(async () => {
    const invalid = findFirstInvalidScoutReportStep(form)
    if (invalid) {
      setStep(invalid.step)
      setStepErrors(invalid.errors)
      setSaveStatus('idle')
      setSaveMessage(null)
      setConfirmOpen(false)
      return
    }
    setStepErrors({})
    setSaveStatus('saving')
    setSaveMessage(null)
    try {
      if (mode === 'edit' && reportId) {
        const updated = await updateScoutReport(reportId, form)
        setForm(updated)
        if (playerId) {
          void dispatch(loadScoutReportsForPlayer(playerId))
        }
        setSaveStatus('success')
        setSaveMessage('Report updated successfully.')
      } else {
        await createScoutReport(form)
        setSaveStatus('success')
        setSaveMessage('Report saved successfully.')
      }
      setConfirmOpen(false)
    } catch (e) {
      setSaveStatus('error')
      if (isApiErr(e) && e.status === 400) {
        const detail = formatApiIssuesSummary(e.issues)
        const base = e.message || 'Request could not be validated.'
        setSaveMessage(detail ? `${base}\n\n${detail}` : base)
      } else {
        setSaveMessage(
          e instanceof Error ? e.message : 'Save failed. Check the API and try again.',
        )
      }
      setConfirmOpen(false)
    }
  }, [dispatch, form, mode, playerId, reportId])

  const progress = ((step + 1) / SCOUT_REPORT_STEPS.length) * 100

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,18rem)] lg:items-start">
      <div className={pageStack}>
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

        <div className={reportStepCardClass}>
          <div className="mb-6 border-b border-surface-divider pb-4">
            <h3 className="text-lg font-semibold tracking-tight text-fume-950 dark:text-fume-50">
              {meta.title}
            </h3>
            <p className={`mt-1 ${proseMutedSm}`}>
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

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-surface-divider pt-6">
            <button
              type="button"
              onClick={goBack}
              disabled={step === 0}
              className={`${secondaryCtaButtonClass} disabled:cursor-not-allowed disabled:opacity-40`}
            >
              Back
            </button>
            <div className="flex flex-wrap justify-end gap-2">
              {!last ? (
                <button type="button" onClick={goNext} className={secondaryCtaButtonClass}>
                  Next
                </button>
              ) : null}
              {mode === 'edit' || last ? (
                <button
                  type="button"
                  onClick={requestSave}
                  disabled={saveStatus === 'saving'}
                  className={primaryCtaButtonClass}
                >
                  {saveStatus === 'saving'
                    ? 'Saving…'
                    : mode === 'edit'
                      ? 'Update report'
                      : 'Save report'}
                </button>
              ) : null}
            </div>
          </div>

          {saveMessage ? (
            <p
              className={
                saveStatus === 'success'
                  ? 'mt-4 text-sm text-sea-700 dark:text-sea-400'
                  : `mt-4 whitespace-pre-line ${reportValidationMessageClass}`
              }
              role="status"
            >
              {saveMessage}
            </p>
          ) : null}
        </div>
      </div>

      <ProTipsPanel />

      <Modal
        isOpen={confirmOpen}
        title={mode === 'edit' ? 'Update this report?' : 'Save this report?'}
        description={
          mode === 'edit'
            ? 'Your latest answers will replace the existing scout report.'
            : 'The full report will be saved and listed with your other reports.'
        }
        confirmLabel={mode === 'edit' ? 'Update report' : 'Save report'}
        isConfirming={saveStatus === 'saving'}
        closeOnBackdrop={saveStatus !== 'saving'}
        onClose={() => {
          if (saveStatus === 'saving') return
          setConfirmOpen(false)
        }}
        onConfirm={() => void performSave()}
      />
    </div>
  )
}

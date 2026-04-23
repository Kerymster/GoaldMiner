import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { createDirectorPipeline, patchDirectorPipeline } from '../../api/directorPipelines'
import { EmptyState } from '../../components/empty-state/EmptyState'
import { Modal } from '../../components/modal/Modal'
import { formatApiIssuesSummary, isApiErr } from '../../types/api'
import {
  validateDirectorPipelineCreateBody,
  type DirectorContext,
  type DirectorPipelineCreateBody,
  type DirectorPipeline,
} from '../../types/directorPipeline'
import {
  createDirectorPipelineFormStepHandlers,
  mandatePatchFromGeneratedBrief,
  mergePlanningBriefDraftIntoMandate,
} from './form/directorPipelineFormUpdateHelpers'
import { getContextFromPipeline, stepOneErrors } from './form/formHelpers'
import { PipelineFormProgressCard } from './form/PipelineFormProgressCard'
import { PIPELINE_FORM_STEPS } from './form/pipelineFormStepsMeta'
import {
  Step0CoreMandate,
  Step1ClubOwnership,
  Step2ObjectivesIdentity,
  Step3FinancialSquad,
  Step4ConstraintsReview,
} from './form/steps'
import {
  pipelineCardClass,
  pipelineErrorClass,
  pipelineFieldLabelClass,
  pipelineHelpClass,
  pipelineInputClass,
  pipelinePrimaryButtonClass,
  pipelineSecondaryButtonClass,
} from './directorPipelineStyles'

type Props = {
  mode: 'create' | 'edit'
  initialPipeline?: DirectorPipeline | null
  hasActivePipeline?: boolean
  onSaved?: (pipeline: DirectorPipeline) => void
}

export function DirectorPipelineForm({ mode, initialPipeline, hasActivePipeline, onSaved }: Props) {
  const [step, setStep] = useState(0)
  const [title, setTitle] = useState(initialPipeline?.title ?? '')
  const [context, setContext] = useState<DirectorContext>(() => getContextFromPipeline(initialPipeline))
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState<string | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const [isDirty, setIsDirty] = useState(false)
  const [replaceMandateOpen, setReplaceMandateOpen] = useState(false)
  const [saveConfirmOpen, setSaveConfirmOpen] = useState(false)

  useEffect(() => {
    setTitle(initialPipeline?.title ?? '')
    setContext(getContextFromPipeline(initialPipeline))
    setStep(0)
    setStatus('idle')
    setMessage(null)
    setErrors([])
    setIsDirty(false)
  }, [initialPipeline])

  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirty) return
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', beforeUnload)
    return () => window.removeEventListener('beforeunload', beforeUnload)
  }, [isDirty])

  const progress = useMemo(() => ((step + 1) / PIPELINE_FORM_STEPS.length) * 100, [step])
  const isLast = step === PIPELINE_FORM_STEPS.length - 1
  const showCreateGuard = mode === 'create' && hasActivePipeline

  const setContextPatch = useCallback((patch: Partial<DirectorContext>) => {
    setIsDirty(true)
    setContext((prev) => ({ ...prev, ...patch }))
    setStatus('idle')
    setMessage(null)
  }, [])

  const stepHandlers = useMemo(
    () => createDirectorPipelineFormStepHandlers(context, setContextPatch),
    [context, setContextPatch],
  )

  function onNext() {
    if (step === 0) {
      const errs = stepOneErrors(context)
      setErrors(errs)
      if (errs.length > 0) return
    }
    setErrors([])
    setStep((s) => Math.min(PIPELINE_FORM_STEPS.length - 1, s + 1))
  }

  async function onSubmit() {
    setStatus('saving')
    setMessage(null)
    setErrors([])
    const payload: DirectorPipelineCreateBody = {
      title: title.trim() || undefined,
      context,
    }
    const validationErrors = validateDirectorPipelineCreateBody(payload)
    if (validationErrors.length > 0) {
      setStatus('error')
      setMessage('Please fix validation errors before saving.')
      setErrors(validationErrors)
      return
    }

    try {
      const saved =
        mode === 'create'
          ? await createDirectorPipeline(payload)
          : await patchDirectorPipeline(initialPipeline?.id ?? '', {
              title: payload.title ?? null,
              context: payload.context,
            })
      setStatus('success')
      setMessage(mode === 'create' ? 'Pipeline created successfully.' : 'Pipeline updated successfully.')
      setIsDirty(false)
      onSaved?.(saved)
    } catch (error) {
      setStatus('error')
      if (isApiErr(error) && error.status === 400) {
        const details = formatApiIssuesSummary(error.issues)
        setMessage(details ? `Validation failed:\n${details}` : error.message)
      } else if (isApiErr(error) && error.status === 409) {
        setMessage(
          'Another active pipeline already exists. Archive the active one before creating or activating another.',
        )
      } else {
        setMessage(error instanceof Error ? error.message : 'Request failed.')
      }
    }
  }

  function onGenerateBrief() {
    setContextPatch(mergePlanningBriefDraftIntoMandate(context))
    setMessage('Planning brief generated. Review and refine the mandate text before saving.')
  }

  if (showCreateGuard) {
    return (
      <EmptyState
        icon="alertTriangle"
        title="Active pipeline already exists"
        description="You can only keep one active pipeline at a time."
        helper="Archive the active one first, or manage statuses from View pipelines."
        extra={
          <Link to="/director-pipelines" className={pipelinePrimaryButtonClass}>
            Go to pipelines
          </Link>
        }
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className={pipelineCardClass}>
        <label className="block">
          <span className={pipelineFieldLabelClass}>Pipeline title (optional)</span>
          <input
            value={title}
            onChange={(event) => {
              setTitle(event.target.value)
              setIsDirty(true)
            }}
            placeholder="Example: Club reset 2026-2029"
            className={pipelineInputClass}
          />
        </label>
      </div>

      <PipelineFormProgressCard step={step} progress={progress} />

      <div className={pipelineCardClass}>
        <h3 className="text-lg font-semibold text-fume-950 dark:text-fume-50">{PIPELINE_FORM_STEPS[step].title}</h3>
        {PIPELINE_FORM_STEPS[step].description ? (
          <p className={`mt-1 ${pipelineHelpClass}`}>{PIPELINE_FORM_STEPS[step].description}</p>
        ) : null}
        {errors.length > 0 ? (
          <ul className="mt-3 list-disc space-y-1 pl-5">
            {errors.map((error) => (
              <li key={error} className={pipelineErrorClass}>
                {error}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-5 space-y-5">
          {step === 0 ? <Step0CoreMandate {...stepHandlers} /> : null}
          {step === 1 ? <Step1ClubOwnership {...stepHandlers} /> : null}
          {step === 2 ? <Step2ObjectivesIdentity {...stepHandlers} /> : null}
          {step === 3 ? <Step3FinancialSquad {...stepHandlers} /> : null}
          {step === 4 ? (
            <Step4ConstraintsReview
              {...stepHandlers}
              onGenerateBrief={onGenerateBrief}
              onRequestReplaceMandate={() => setReplaceMandateOpen(true)}
            />
          ) : null}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-surface-divider pt-5">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className={`${pipelineSecondaryButtonClass} disabled:cursor-not-allowed disabled:opacity-40`}
          >
            Back
          </button>
          <div className="flex flex-wrap gap-2">
            {!isLast ? (
              <button type="button" onClick={onNext} className={pipelineSecondaryButtonClass}>
                Next
              </button>
            ) : null}
            <button
              type="button"
              onClick={() => setSaveConfirmOpen(true)}
              disabled={status === 'saving'}
              className={pipelinePrimaryButtonClass}
            >
              {status === 'saving' ? 'Saving…' : mode === 'create' ? 'Create active pipeline' : 'Save pipeline'}
            </button>
          </div>
        </div>
        {message ? (
          <p
            className={`mt-3 whitespace-pre-line ${status === 'success' ? 'text-sm text-sea-700 dark:text-sea-400' : pipelineErrorClass}`}
          >
            {message}
          </p>
        ) : null}
      </div>

      <Modal
        isOpen={replaceMandateOpen}
        variant="danger"
        title="Replace mandate text?"
        description="Your mandate sentence will be replaced by the generated brief. You can edit it again before saving."
        confirmLabel="Replace mandate"
        cancelLabel="Cancel"
        onClose={() => setReplaceMandateOpen(false)}
        onConfirm={() => {
          setContextPatch(mandatePatchFromGeneratedBrief(context))
          setReplaceMandateOpen(false)
        }}
      />

      <Modal
        isOpen={saveConfirmOpen}
        variant="confirmation"
        title={mode === 'create' ? 'Create active pipeline?' : 'Save pipeline?'}
        description={
          mode === 'create'
            ? 'This becomes your active club vision. You can change it later from the pipelines list.'
            : 'Your title and all fields on this form will replace what is saved for this pipeline.'
        }
        confirmLabel={mode === 'create' ? 'Create active pipeline' : 'Save pipeline'}
        cancelLabel="Cancel"
        isConfirming={status === 'saving'}
        closeOnBackdrop={status !== 'saving'}
        closeOnEscape={status !== 'saving'}
        onClose={() => {
          if (status === 'saving') return
          setSaveConfirmOpen(false)
        }}
        onConfirm={() => {
          void (async () => {
            await onSubmit()
            setSaveConfirmOpen(false)
          })()
        }}
      />
    </div>
  )
}

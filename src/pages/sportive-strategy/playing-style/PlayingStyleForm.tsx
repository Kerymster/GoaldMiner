import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { createPlayingStyle, patchPlayingStyle } from '../../../api/playingStyle'
import { EmptyState } from '../../../components/empty-state/EmptyState'
import { Modal } from '../../../components/modal/Modal'
import { formatApiIssuesSummary, isApiErr } from '../../../types/api'
import {
  createEmptyPlayingStyleContext,
  playingStyleContextFromRecord,
  playingStyleIdentityStepErrors,
  validatePlayingStyleCreateBody,
  type PlayingStyleContext,
  type PlayingStyleRecord,
  type PlayingStyleRecordCreateBody,
} from '../../../types/playingStyle'
import { mergePlayingStyleContext } from './form/playingStyleFormHelpers'
import { PlayingStyleFormProgressCard } from './form/PlayingStyleFormProgressCard'
import { PLAYING_STYLE_FORM_STEPS } from './form/playingStyleFormStepsMeta'
import { PlayingStyleStepBody } from './form/PlayingStyleStepBodies'
import {
  pipelineCardClass,
  pipelineErrorClass,
  pipelineFieldLabelClass,
  pipelineInputClass,
  pipelinePrimaryButtonClass,
  pipelineSecondaryButtonClass,
} from './playingStyleStyles'

function stepIndexFromServerStage(stage: number | undefined | null): number {
  if (stage == null || Number.isNaN(stage)) return 0
  return Math.min(PLAYING_STYLE_FORM_STEPS.length - 1, Math.max(0, Math.floor(stage) - 1))
}

type Props = {
  mode: 'create' | 'edit'
  initialRecord?: PlayingStyleRecord | null
  hasActiveRecord?: boolean
  onSaved?: (record: PlayingStyleRecord) => void
}

export function PlayingStyleForm({ mode, initialRecord, hasActiveRecord, onSaved }: Props) {
  const [step, setStep] = useState(() => stepIndexFromServerStage(initialRecord?.stage))
  const [title, setTitle] = useState(() => initialRecord?.title ?? '')
  const [context, setContext] = useState<PlayingStyleContext>(() =>
    initialRecord ? playingStyleContextFromRecord(initialRecord) : createEmptyPlayingStyleContext(),
  )
  const [status, setStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState<string | null>(null)
  const [errors, setErrors] = useState<string[]>([])
  const [isDirty, setIsDirty] = useState(false)
  const [saveConfirmOpen, setSaveConfirmOpen] = useState(false)

  useEffect(() => {
    const beforeUnload = (event: BeforeUnloadEvent) => {
      if (!isDirty) return
      event.preventDefault()
      event.returnValue = ''
    }
    window.addEventListener('beforeunload', beforeUnload)
    return () => window.removeEventListener('beforeunload', beforeUnload)
  }, [isDirty])

  const progress = useMemo(() => ((step + 1) / PLAYING_STYLE_FORM_STEPS.length) * 100, [step])
  const isLast = step === PLAYING_STYLE_FORM_STEPS.length - 1
  const showCreateGuard = mode === 'create' && hasActiveRecord

  const patchContext = useCallback((patch: Partial<PlayingStyleContext>) => {
    setIsDirty(true)
    setContext((prev) => mergePlayingStyleContext(prev, patch))
    setStatus('idle')
    setMessage(null)
  }, [])

  function onNext() {
    if (step === 0) {
      const errs = playingStyleIdentityStepErrors(context)
      setErrors(errs)
      if (errs.length > 0) return
    }
    setErrors([])
    setStep((s) => Math.min(PLAYING_STYLE_FORM_STEPS.length - 1, s + 1))
  }

  async function onSubmit() {
    setStatus('saving')
    setMessage(null)
    setErrors([])
    const payload: PlayingStyleRecordCreateBody = {
      title: title.trim() || undefined,
      context,
    }
    const validationErrors = validatePlayingStyleCreateBody(payload)
    if (validationErrors.length > 0) {
      setStatus('error')
      setMessage('Please fix validation errors before saving.')
      setErrors(validationErrors)
      return
    }

    const stage = step + 1

    try {
      const saved =
        mode === 'create'
          ? await createPlayingStyle(payload)
          : await patchPlayingStyle(initialRecord?.id ?? '', {
              title: title.trim() || null,
              context,
              stage,
            })
      setStatus('success')
      setMessage(
        mode === 'create' ? 'Playing style created successfully.' : 'Playing style updated successfully.',
      )
      setIsDirty(false)
      onSaved?.(saved)
    } catch (error) {
      setStatus('error')
      if (isApiErr(error) && error.status === 400) {
        const details = formatApiIssuesSummary(error.issues)
        setMessage(details ? `Validation failed:\n${details}` : error.message)
      } else if (isApiErr(error) && error.status === 409) {
        setMessage(
          'Another active playing style already exists. Archive the active one before creating or activating another.',
        )
      } else {
        setMessage(error instanceof Error ? error.message : 'Request failed.')
      }
    }
  }

  if (showCreateGuard) {
    return (
      <EmptyState
        icon="alertTriangle"
        title="Active playing style already exists"
        description="You can only keep one active playing style at a time."
        helper="Archive the active one first, or manage statuses from View playing styles."
        extra={
          <Link to="/sportive-strategy/playing-style" className={pipelinePrimaryButtonClass}>
            View playing styles
          </Link>
        }
      />
    )
  }

  return (
    <div className="space-y-6">
      <div className={pipelineCardClass}>
        <label className="block">
          <span className={pipelineFieldLabelClass}>Title (optional)</span>
          <input
            value={title}
            onChange={(event) => {
              setTitle(event.target.value)
              setIsDirty(true)
            }}
            placeholder="Example: 2026–2029 club game model"
            maxLength={160}
            className={pipelineInputClass}
          />
        </label>
      </div>

      <PlayingStyleFormProgressCard step={step} progress={progress} />

      <div className={pipelineCardClass}>
        <h3 className="text-lg font-semibold text-fume-950 dark:text-fume-50">{PLAYING_STYLE_FORM_STEPS[step].title}</h3>
        {PLAYING_STYLE_FORM_STEPS[step].description ? (
          <p className="mt-1 text-xs text-fume-500 dark:text-fume-400">{PLAYING_STYLE_FORM_STEPS[step].description}</p>
        ) : null}
        {errors.length > 0 ? (
          <ul className="mt-3 list-disc space-y-1 pl-5">
            {errors.map((err) => (
              <li key={err} className={pipelineErrorClass}>
                {err}
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-5 space-y-5">
          <PlayingStyleStepBody step={step} context={context} patchContext={patchContext} />
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
              {status === 'saving' ? 'Saving…' : mode === 'create' ? 'Create active playing style' : 'Save playing style'}
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
        isOpen={saveConfirmOpen}
        variant="confirmation"
        title={mode === 'create' ? 'Create active playing style?' : 'Save playing style?'}
        description={
          mode === 'create'
            ? 'This becomes your active playing style blueprint. You can change it later from the list.'
            : 'Your title and all fields on this form will replace what is saved for this record.'
        }
        confirmLabel={mode === 'create' ? 'Create active playing style' : 'Save playing style'}
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

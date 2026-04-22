import { useCallback, useEffect, useMemo, useState, type SetStateAction } from 'react'
import { useNavigate } from 'react-router-dom'
import type { StoredScoutReportDraft } from '../../api/scoutReportDrafts'
import { getPlayerById } from '../../api/players'
import { Modal } from '../../components/modal/Modal'
import {
  pageStack,
  primaryCtaButtonClass,
  proseMutedSm,
  secondaryCtaButtonClass,
} from '../../components/styles/pageChromeStyles'
import {
  SCOUT_REPORT_STEPS,
  createEmptyScoutReportForm,
  type ScoutReportForm,
} from '../../types/scoutReportForm'
import { formatApiIssuesSummary, isApiErr } from '../../types/api'
import {
  findFirstInvalidScoutReportStep,
  type ScoutReportStepErrors,
} from '../player-reports/create/scoutReportStepValidation'
import {
  deleteDraftReport,
  publishDraftReport,
  saveDraftReport,
} from '../../features/draftReports/draftReportsSlice'
import { useAppDispatch } from '../../store/hooks'
import { ProTipsPanel } from '../player-reports/create/ProTipsPanel'
import {
  reportStepCardClass,
  reportValidationMessageClass,
} from '../player-reports/create/reportFormStyles'
import { ScoutReportStepBody } from '../player-reports/create/ScoutReportStepBody'
import {
  ViewReportsPlayerSearch,
  type ViewReportsSelectedPlayer,
} from '../player-reports/ViewReportsPlayerSearch'

export type DraftReportFormProps = {
  initialDraft?: StoredScoutReportDraft
}

function normalizeDraftTitle(value: string): string | null {
  const trimmed = value.trim()
  return trimmed ? trimmed : null
}

function mergeRecord(base: Record<string, unknown>, patch: unknown): Record<string, unknown> {
  if (patch == null || typeof patch !== 'object' || Array.isArray(patch)) {
    return base
  }
  const incoming = patch as Record<string, unknown>
  const next: Record<string, unknown> = { ...base }
  for (const [key, value] of Object.entries(incoming)) {
    if (value === undefined) continue
    const current = next[key]
    if (
      value != null &&
      typeof value === 'object' &&
      !Array.isArray(value) &&
      current != null &&
      typeof current === 'object' &&
      !Array.isArray(current)
    ) {
      next[key] = mergeRecord(current as Record<string, unknown>, value)
      continue
    }
    next[key] = value
  }
  return next
}

function draftToForm(draft: Partial<ScoutReportForm> | undefined): ScoutReportForm {
  const base = createEmptyScoutReportForm()
  return mergeRecord(base as Record<string, unknown>, draft) as ScoutReportForm
}

export function DraftReportForm({ initialDraft }: DraftReportFormProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [draftId, setDraftId] = useState<string | null>(initialDraft?.id ?? null)
  const [title, setTitle] = useState(initialDraft?.title ?? '')
  const [selectedPlayer, setSelectedPlayer] = useState<ViewReportsSelectedPlayer | null>(null)
  const [form, setForm] = useState<ScoutReportForm>(() => draftToForm(initialDraft?.draft))
  const [stepErrors, setStepErrors] = useState<ScoutReportStepErrors>({})
  const [step, setStep] = useState(0)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'success' | 'error'>('idle')
  const [saveMessage, setSaveMessage] = useState<string | null>(null)
  const [publishOpen, setPublishOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  useEffect(() => {
    setDraftId(initialDraft?.id ?? null)
    setTitle(initialDraft?.title ?? '')
    setForm(draftToForm(initialDraft?.draft))
    setStepErrors({})
    setSaveStatus('idle')
    setSaveMessage(null)
  }, [initialDraft])

  useEffect(() => {
    const playerId = initialDraft?.playerId
    if (!playerId) {
      setSelectedPlayer(null)
      return
    }

    let cancelled = false
    ;(async () => {
      try {
        const player = await getPlayerById(playerId)
        if (cancelled) return
        setSelectedPlayer({
          id: player.id,
          name: player.name,
          team: player.team,
          position: player.position,
        })
      } catch {
        if (!cancelled) setSelectedPlayer(null)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [initialDraft?.playerId])

  const last = step === SCOUT_REPORT_STEPS.length - 1
  const meta = SCOUT_REPORT_STEPS[step]
  const progress = useMemo(() => ((step + 1) / SCOUT_REPORT_STEPS.length) * 100, [step])

  const setFormAndClearStepErrors = useCallback((u: SetStateAction<ScoutReportForm>) => {
    setStepErrors({})
    setForm(u)
  }, [])

  const goBack = useCallback(() => {
    setStepErrors({})
    setStep((s) => Math.max(0, s - 1))
    setSaveStatus('idle')
    setSaveMessage(null)
  }, [])

  const goNext = useCallback(() => {
    setStepErrors({})
    setStep((s) => Math.min(SCOUT_REPORT_STEPS.length - 1, s + 1))
    setSaveStatus('idle')
    setSaveMessage(null)
  }, [])

  const saveDraft = useCallback(async (): Promise<string> => {
    setSaveStatus('saving')
    setSaveMessage(null)
    try {
      const saved = await dispatch(
        saveDraftReport({
          id: draftId ?? undefined,
          title: normalizeDraftTitle(title),
          playerId: selectedPlayer?.id ?? null,
          draft: form,
        }),
      ).unwrap()
      const created = draftId == null
      setDraftId(saved.id)
      setSaveStatus('success')
      setSaveMessage(created ? 'Draft saved successfully.' : 'Draft updated successfully.')
      if (created) {
        navigate(`/draft-reports/${encodeURIComponent(saved.id)}/edit`, { replace: true })
      }
      return saved.id
    } catch (e) {
      setSaveStatus('error')
      if (isApiErr(e) && e.status === 400) {
        const detail = formatApiIssuesSummary(e.issues)
        const base = e.message || 'Draft request could not be validated.'
        setSaveMessage(detail ? `${base}\n\n${detail}` : base)
      } else {
        setSaveMessage(e instanceof Error ? e.message : 'Draft save failed. Try again.')
      }
      throw e
    }
  }, [dispatch, draftId, form, navigate, selectedPlayer?.id, title])

  const requestPublish = useCallback(() => {
    const invalid = findFirstInvalidScoutReportStep(form)
    if (invalid) {
      setStep(invalid.step)
      setStepErrors(invalid.errors)
      setSaveStatus('idle')
      setSaveMessage('Complete every required field before publishing.')
      return
    }
    setStepErrors({})
    setSaveStatus('idle')
    setSaveMessage(null)
    setPublishOpen(true)
  }, [form])

  const performPublish = useCallback(async () => {
    setSaveStatus('saving')
    setSaveMessage(null)
    try {
      const activeId = draftId ?? (await saveDraft())
      await dispatch(
        publishDraftReport({
          id: activeId,
          playerId: selectedPlayer?.id ?? undefined,
        }),
      ).unwrap()
      setPublishOpen(false)
      setSaveStatus('success')
      setSaveMessage('Draft published successfully. Redirecting to report list…')
      window.setTimeout(() => {
        navigate('/player-reports')
      }, 250)
    } catch (e) {
      setSaveStatus('error')
      if (isApiErr(e) && e.status === 400) {
        const detail = formatApiIssuesSummary(e.issues)
        const base = e.message || 'Draft is not ready to publish yet.'
        setSaveMessage(detail ? `${base}\n\n${detail}` : base)
      } else {
        setSaveMessage(e instanceof Error ? e.message : 'Publish failed. Try again.')
      }
      setPublishOpen(false)
    }
  }, [dispatch, draftId, navigate, saveDraft, selectedPlayer?.id])

  const performDelete = useCallback(async () => {
    if (!draftId) return
    setSaveStatus('saving')
    setSaveMessage(null)
    try {
      await dispatch(deleteDraftReport(draftId)).unwrap()
      setDeleteOpen(false)
      navigate('/draft-reports/edit', { replace: true })
    } catch (e) {
      setSaveStatus('error')
      setSaveMessage(e instanceof Error ? e.message : 'Delete failed. Try again.')
      setDeleteOpen(false)
    }
  }, [dispatch, draftId, navigate])

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_minmax(0,18rem)] lg:items-start">
      <div className={pageStack}>
        <div className="rounded-xl border border-surface-field-border bg-surface-panel p-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-fume-500 dark:text-fume-400">
                Draft title (optional)
              </span>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Ex: U21 shortlist - week 4"
                className="w-full rounded-lg border border-surface-field-border bg-surface-field px-3 py-2 text-sm text-fume-900 shadow-sm placeholder:text-fume-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/25 dark:text-fume-100 dark:placeholder:text-fume-500"
              />
            </label>
            <div className="space-y-1.5">
              <span className="text-xs font-semibold uppercase tracking-wide text-fume-500 dark:text-fume-400">
                Link draft to a player (optional)
              </span>
              <ViewReportsPlayerSearch
                selectedPlayer={selectedPlayer}
                onSelectPlayer={setSelectedPlayer}
                onClearSelection={() => setSelectedPlayer(null)}
              />
            </div>
          </div>
        </div>

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
            aria-label="Draft progress"
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
            <p className={`mt-1 ${proseMutedSm}`}>{meta.description}</p>
            {Object.keys(stepErrors).length > 0 ? (
              <p className={`mt-3 ${reportValidationMessageClass}`} role="alert">
                Fill every required field on this step before publishing.
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
              <button
                type="button"
                onClick={() => void saveDraft()}
                disabled={saveStatus === 'saving'}
                className={secondaryCtaButtonClass}
              >
                {saveStatus === 'saving' ? 'Saving…' : draftId ? 'Update draft' : 'Save draft'}
              </button>
              <button
                type="button"
                onClick={requestPublish}
                disabled={saveStatus === 'saving'}
                className={primaryCtaButtonClass}
              >
                Publish report
              </button>
              {draftId ? (
                <button
                  type="button"
                  onClick={() => setDeleteOpen(true)}
                  disabled={saveStatus === 'saving'}
                  className="inline-flex min-h-10 cursor-pointer items-center justify-center rounded-lg border border-rose-600/70 bg-rose-600/10 px-4 py-2 text-sm font-semibold text-rose-700 shadow-sm transition-colors hover:bg-rose-600/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/40 dark:border-rose-500/50 dark:text-rose-300"
                >
                  Delete draft
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
        isOpen={publishOpen}
        title="Publish this draft as a real report?"
        description="If required fields are valid, this draft will become a scout report and the draft entry will be removed."
        confirmLabel="Publish report"
        isConfirming={saveStatus === 'saving'}
        closeOnBackdrop={saveStatus !== 'saving'}
        onClose={() => {
          if (saveStatus === 'saving') return
          setPublishOpen(false)
        }}
        onConfirm={() => void performPublish()}
      />

      <Modal
        isOpen={deleteOpen}
        variant="danger"
        title="Delete this draft?"
        description="This action cannot be undone."
        confirmLabel="Delete draft"
        isConfirming={saveStatus === 'saving'}
        closeOnBackdrop={saveStatus !== 'saving'}
        onClose={() => {
          if (saveStatus === 'saving') return
          setDeleteOpen(false)
        }}
        onConfirm={() => void performDelete()}
      />
    </div>
  )
}

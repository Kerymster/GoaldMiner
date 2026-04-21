import { useCallback, useMemo, useState, type SetStateAction } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  createPlayer,
  type CreatePlayerInput,
  updatePlayer,
  type UpdatePlayerInput,
} from '../../../api/players'
import { Modal } from '../../../components/Modal'
import { OverlaySelect } from '../../../components/OverlaySelect'
import { proseErrorSm, secondaryCtaButtonClass } from '../../../components/pageChromeStyles'
import { FieldError, ScoutReportField } from '../../player-reports/create/ScoutReportField'
import { ScoutReportNationalityField } from '../../player-reports/create/ScoutReportNationalityField'
import {
  reportFieldErrorClass,
  reportLabelClass,
  reportStepCardClass,
  reportSubLabelClass,
  reportValidationMessageClass,
} from '../../player-reports/create/reportFormStyles'
import {
  hasStepErrors,
  validatePlayerInformationStep,
  type ScoutReportStepErrors,
} from '../../player-reports/create/scoutReportStepValidation'
import { ContractEndDateField, DateOfBirthField } from '../../player-reports/create/steps/stepPlayerInformation/dateFields'
import { PhysicalMeasurements } from '../../player-reports/create/steps/stepPlayerInformation/physicalMeasurements'
import { PositionAndRoles } from '../../player-reports/create/steps/stepPlayerInformation/positionAndRoles'
import {
  createEmptyScoutReportForm,
  STAFF_RATING_MAX,
  STAFF_RATING_MIN,
  type ScoutReportForm,
  type ScoutReportPlayerInformation,
} from '../../../types/scoutReportForm'
import { formatApiIssuesSummary, isApiErr, type Player } from '../../../types/api'
import { overallRatingOverlayOptions } from '../../../utils/overallRatingSelectOptions'
import { playerFormActionsRowClass, playerFormShellClass, playerFormSubmitClass } from './playerFormStyles'

type PlayerFormProps = {
  mode: 'create' | 'edit'
  initialPlayer?: Player
}

function playerToPi(p: Player): ScoutReportPlayerInformation {
  return {
    name: p.name,
    ageOrDob: p.ageOrDob ?? '',
    nationality: p.nationality ?? '',
    heightCm: p.heightCm ?? null,
    weightKg: p.weightKg ?? null,
    preferredFoot: p.preferredFoot ?? '',
    position: p.position,
    secondaryPosition: p.secondaryPosition ?? '',
    mostlyUsedRole: p.mostlyUsedRole ?? '',
    otherRoles: p.otherRoles ?? '',
    club: p.team,
    contractIfKnown: p.contractIfKnown ?? '',
  }
}

function buildInitialForm(mode: 'create' | 'edit', initialPlayer?: Player): ScoutReportForm {
  const base = createEmptyScoutReportForm()
  if (mode === 'edit' && initialPlayer) {
    return {
      ...base,
      playerInformation: playerToPi(initialPlayer),
    }
  }
  return base
}

function safeOverallRatingString(value: number | null | undefined): string {
  if (value == null) return ''
  const n = value
  if (Number.isInteger(n) && n >= STAFF_RATING_MIN && n <= STAFF_RATING_MAX) return String(n)
  return ''
}

function parseOptionalOverallRating(value: string): number | undefined {
  const t = value.trim()
  if (!t) return undefined
  const n = Number(t)
  if (!Number.isInteger(n) || n < STAFF_RATING_MIN || n > STAFF_RATING_MAX) return undefined
  return n
}

function validateOptionalOverallRatingStr(e: ScoutReportStepErrors, s: string): void {
  const t = s.trim()
  if (!t) return
  const n = Number(t)
  if (!Number.isInteger(n) || n < STAFF_RATING_MIN || n > STAFF_RATING_MAX) {
    e.overallRating = `Use ${STAFF_RATING_MIN}–${STAFF_RATING_MAX}`
  }
}

function trimOpt(s: string): string | undefined {
  const t = s.trim()
  return t || undefined
}

function piToCreateInput(
  pi: ScoutReportPlayerInformation,
  extras: { overallRatingStr: string; noteStr: string },
): CreatePlayerInput {
  return {
    name: pi.name.trim(),
    team: pi.club.trim(),
    position: pi.position.trim(),
    nationality: trimOpt(pi.nationality),
    ageOrDob: trimOpt(pi.ageOrDob),
    heightCm: pi.heightCm ?? undefined,
    weightKg: pi.weightKg ?? undefined,
    preferredFoot: trimOpt(pi.preferredFoot),
    secondaryPosition: trimOpt(pi.secondaryPosition),
    mostlyUsedRole: trimOpt(pi.mostlyUsedRole),
    otherRoles: trimOpt(pi.otherRoles),
    contractIfKnown: trimOpt(pi.contractIfKnown),
    overallRating: parseOptionalOverallRating(extras.overallRatingStr),
    note: trimOpt(extras.noteStr),
  }
}

function toUpdatePayload(next: CreatePlayerInput, prev: CreatePlayerInput): UpdatePlayerInput {
  const changed: UpdatePlayerInput = {}
  for (const key of Object.keys(next) as Array<keyof CreatePlayerInput>) {
    if (next[key] !== prev[key]) {
      ;(changed as Record<string, unknown>)[key] = next[key]
    }
  }
  return changed
}

export function PlayerForm({ mode, initialPlayer }: PlayerFormProps) {
  const navigate = useNavigate()
  const [form, setForm] = useState<ScoutReportForm>(() => buildInitialForm(mode, initialPlayer))
  const [overallRatingStr, setOverallRatingStr] = useState(() =>
    safeOverallRatingString(initialPlayer?.overallRating),
  )
  const [noteStr, setNoteStr] = useState(() => initialPlayer?.note ?? '')

  const [fieldErrors, setFieldErrors] = useState<ScoutReportStepErrors>({})
  const [saving, setSaving] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const cancelTo = mode === 'edit' && initialPlayer ? `/players/${initialPlayer.id}` : '/players'
  const isEdit = mode === 'edit'

  const initialPayload = useMemo(() => {
    if (!isEdit || !initialPlayer) return null
    return piToCreateInput(playerToPi(initialPlayer), {
      overallRatingStr: safeOverallRatingString(initialPlayer.overallRating),
      noteStr: initialPlayer.note ?? '',
    })
  }, [initialPlayer, isEdit])

  const setFormAndClearFieldErrors = useCallback((u: SetStateAction<ScoutReportForm>) => {
    setFieldErrors({})
    setForm(u)
  }, [])

  const validateForSave = (): boolean => {
    const errs: ScoutReportStepErrors = {}
    validatePlayerInformationStep(errs, form.playerInformation)
    validateOptionalOverallRatingStr(errs, overallRatingStr)
    if (hasStepErrors(errs)) {
      setFieldErrors(errs)
      return false
    }
    setFieldErrors({})
    return true
  }

  const openSaveConfirm = () => {
    setMessage(null)
    setApiError(null)
    if (!validateForSave()) return

    if (isEdit && !initialPlayer) {
      setApiError('Missing player context for edit.')
      return
    }

    if (isEdit && initialPlayer && initialPayload) {
      const currentPayload = piToCreateInput(form.playerInformation, {
        overallRatingStr,
        noteStr,
      })
      const patch = toUpdatePayload(currentPayload, initialPayload)
      if (Object.keys(patch).length === 0) {
        setMessage('No changes to save.')
        return
      }
    }

    setConfirmOpen(true)
  }

  const performSave = async () => {
    setMessage(null)
    setApiError(null)
    if (!validateForSave()) {
      setConfirmOpen(false)
      return
    }

    if (isEdit && !initialPlayer) {
      setApiError('Missing player context for edit.')
      setConfirmOpen(false)
      return
    }

    const currentPayload = piToCreateInput(form.playerInformation, {
      overallRatingStr,
      noteStr,
    })

    setSaving(true)
    try {
      if (isEdit && initialPlayer && initialPayload) {
        const patch = toUpdatePayload(currentPayload, initialPayload)
        if (Object.keys(patch).length === 0) {
          setMessage('No changes to save.')
          setConfirmOpen(false)
          return
        }
        const updated = await updatePlayer(initialPlayer.id, patch)
        navigate(`/players/${updated.id}`)
      } else {
        const created = await createPlayer(currentPayload)
        navigate(`/players/${created.id}`)
      }
    } catch (e) {
      if (isApiErr(e) && e.status === 400) {
        const detail = formatApiIssuesSummary(e.issues)
        const base = e.message || 'Request could not be validated.'
        setApiError(detail ? `${base}\n\n${detail}` : base)
      } else {
        setApiError(e instanceof Error ? e.message : 'Could not save player.')
      }
      setConfirmOpen(false)
    } finally {
      setSaving(false)
    }
  }

  const pi = form.playerInformation
  const showStepValidationBanner = Object.keys(fieldErrors).length > 0

  return (
    <section className={playerFormShellClass}>
      <div className={reportStepCardClass}>
        <div className="mb-6 border-b border-surface-divider pb-4">
          <h3 className="text-lg font-semibold tracking-tight text-fume-950 dark:text-fume-50">
            Player profile
          </h3>
          <p className="mt-1 text-sm text-fume-600 dark:text-fume-400">
            Same required fields and validation as when creating a scout report (Player Information
            step).
          </p>
          {showStepValidationBanner ? (
            <p className={`mt-3 ${reportValidationMessageClass}`} role="alert">
              Fill every field on this step before continuing.
            </p>
          ) : null}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <ScoutReportField
            label="Name"
            value={pi.name}
            error={fieldErrors.name}
            onChange={(name) =>
              setFormAndClearFieldErrors((f) => ({
                ...f,
                playerInformation: { ...f.playerInformation, name },
              }))
            }
          />
          <DateOfBirthField
            value={pi.ageOrDob}
            error={fieldErrors.ageOrDob}
            onChange={(ageOrDob) =>
              setFormAndClearFieldErrors((f) => ({
                ...f,
                playerInformation: { ...f.playerInformation, ageOrDob },
              }))
            }
          />
          <ScoutReportNationalityField
            value={pi.nationality}
            error={fieldErrors.nationality}
            onChange={(nationality) =>
              setFormAndClearFieldErrors((f) => ({
                ...f,
                playerInformation: { ...f.playerInformation, nationality },
              }))
            }
          />
          <PhysicalMeasurements form={form} setForm={setFormAndClearFieldErrors} errors={fieldErrors} />
          <PositionAndRoles form={form} setForm={setFormAndClearFieldErrors} errors={fieldErrors} />
          <ScoutReportField
            label="Team"
            value={pi.club}
            error={fieldErrors.club}
            onChange={(club) =>
              setFormAndClearFieldErrors((f) => ({
                ...f,
                playerInformation: { ...f.playerInformation, club },
              }))
            }
          />
          <ContractEndDateField
            value={pi.contractIfKnown}
            error={fieldErrors.contractIfKnown}
            onChange={(contractIfKnown) =>
              setFormAndClearFieldErrors((f) => ({
                ...f,
                playerInformation: { ...f.playerInformation, contractIfKnown },
              }))
            }
          />
          <label className={reportLabelClass}>
            Overall rating (optional)
            <span className={reportSubLabelClass}>
              Same scale as scout report Team fit ({STAFF_RATING_MIN}–{STAFF_RATING_MAX})
            </span>
            <OverlaySelect
              value={overallRatingStr}
              onChange={(v) => {
                setOverallRatingStr(v)
                setFieldErrors((prev) => {
                  if (!prev.overallRating) return prev
                  const next = { ...prev }
                  delete next.overallRating
                  return next
                })
              }}
              options={overallRatingOverlayOptions()}
              placeholder="Not set"
              popoverPlacement="above"
              aria-invalid={Boolean(fieldErrors.overallRating)}
              triggerClassName={fieldErrors.overallRating ? reportFieldErrorClass : ''}
            />
            <FieldError message={fieldErrors.overallRating} />
          </label>
          <ScoutReportField
            label="Note (optional)"
            value={noteStr}
            multiline
            onChange={(v) => setNoteStr(v)}
          />
        </div>
      </div>

      {apiError ? (
        <p className={`mt-4 whitespace-pre-line ${proseErrorSm}`} role="alert">
          {apiError}
        </p>
      ) : null}
      {message ? <p className="mt-4 text-sm text-fume-600 dark:text-fume-400">{message}</p> : null}

      <div className={playerFormActionsRowClass}>
        <Link to={cancelTo} className={secondaryCtaButtonClass}>
          Cancel
        </Link>
        <button
          type="button"
          className={playerFormSubmitClass}
          onClick={openSaveConfirm}
          disabled={saving}
        >
          {saving ? 'Saving…' : isEdit ? 'Update player' : 'Create player'}
        </button>
      </div>

      <Modal
        isOpen={confirmOpen}
        title={isEdit ? 'Update this player?' : 'Create this player?'}
        description={
          isEdit
            ? 'Your changes will be saved to this profile.'
            : 'This will add a new player profile to the list.'
        }
        confirmLabel={isEdit ? 'Update player' : 'Create player'}
        isConfirming={saving}
        closeOnBackdrop={!saving}
        onClose={() => {
          if (saving) return
          setConfirmOpen(false)
        }}
        onConfirm={() => void performSave()}
      />
    </section>
  )
}

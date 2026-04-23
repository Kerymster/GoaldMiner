import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { createDirectorPipeline, patchDirectorPipeline } from '../../api/directorPipelines'
import { EmptyState } from '../../components/empty-state/EmptyState'
import { Modal } from '../../components/modal/Modal'
import { formatApiIssuesSummary, isApiErr } from '../../types/api'
import {
  academyIntegrationLevels,
  buildMandateBrief,
  createEmptyDirectorContext,
  ffpStatuses,
  labelForOption,
  ownerMandates,
  ownershipModels,
  ownershipTenures,
  playingStyles,
  primaryObjectives,
  requiredStepOneFields,
  transferApproaches,
  coerceContextListFieldToString,
  validateDirectorPipelineCreateBody,
  type DirectorContext,
  type DirectorPipelineCreateBody,
  type DirectorPipeline,
} from '../../types/directorPipeline'
import {
  pipelineCardClass,
  pipelineDangerButtonClass,
  pipelineErrorClass,
  pipelineFieldLabelClass,
  pipelineGridClass,
  pipelineHelpClass,
  pipelineInputClass,
  pipelineMultiLineListClass,
  pipelinePrimaryButtonClass,
  pipelineSectionTitleClass,
  pipelineSecondaryButtonClass,
  pipelineTextareaClass,
} from './directorPipelineStyles'

const steps = [
  { title: 'Core mandate', description: 'Required fields that define the objective window and baseline intent.' },
  { title: 'Club and ownership', description: 'Context around club profile and board logic.' },
  { title: 'Objectives and playing identity', description: 'Sporting direction and on-pitch principles.' },
  { title: 'Financial and squad strategy', description: 'Budget boundaries and squad construction philosophy.' },
  { title: 'Constraints, stakeholders and review', description: 'Risk map, reporting lines, and final mandate summary.' },
] as const

type Props = {
  mode: 'create' | 'edit'
  initialPipeline?: DirectorPipeline | null
  hasActivePipeline?: boolean
  onSaved?: (pipeline: DirectorPipeline) => void
}

function parseInteger(value: string): number | undefined {
  const trimmed = value.trim()
  if (!trimmed) return undefined
  const n = Number(trimmed)
  return Number.isFinite(n) ? Math.trunc(n) : undefined
}

function parseNullableInteger(value: string): number | null | undefined {
  if (!value.trim()) return null
  return parseInteger(value)
}

function parseOptionalNumber(value: string): number | undefined {
  const trimmed = value.trim()
  if (!trimmed) return undefined
  const n = Number(trimmed)
  return Number.isFinite(n) ? n : undefined
}

function stepOneErrors(context: DirectorContext): string[] {
  const errors: string[] = []
  if (!context.club.clubName.trim()) errors.push('Club name is required.')
  if (!context.ownership.model) errors.push('Ownership model is required.')
  if (!context.ownership.mandate) errors.push('Ownership mandate is required.')
  if (!context.objectives.primaryObjective) errors.push('Primary objective is required.')
  if (!context.objectives.timeHorizonYears) errors.push('Time horizon is required.')
  if (!context.mandate.trim()) errors.push('Mandate summary is required.')
  return errors
}

function getContextFromPipeline(p: DirectorPipeline | null | undefined): DirectorContext {
  const base = createEmptyDirectorContext()
  if (!p) return base
  const rawObjectives = p.context.objectives
  const rawPlaying = p.context.playingIdentity
  const rawConstraints = p.context.constraints

  return {
    ...base,
    ...p.context,
    club: { ...base.club, ...p.context.club },
    ownership: { ...base.ownership, ...p.context.ownership },
    objectives: {
      ...base.objectives,
      ...rawObjectives,
      secondaryObjectives: coerceContextListFieldToString(rawObjectives?.secondaryObjectives),
    },
    playingIdentity: {
      ...base.playingIdentity,
      ...(rawPlaying ?? {}),
      preferredFormations: coerceContextListFieldToString(rawPlaying?.preferredFormations),
    },
    financial: {
      ...(base.financial as NonNullable<DirectorContext['financial']>),
      ...(p.context.financial ?? {}),
    },
    squadStrategy: { ...base.squadStrategy, ...(p.context.squadStrategy ?? {}) },
    constraints: {
      ...base.constraints,
      ...(rawConstraints ?? {}),
      items: coerceContextListFieldToString(rawConstraints?.items),
    },
    stakeholders: { ...base.stakeholders, ...(p.context.stakeholders ?? {}) },
  }
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

  const progress = useMemo(() => ((step + 1) / steps.length) * 100, [step])
  const isLast = step === steps.length - 1
  const showCreateGuard = mode === 'create' && hasActivePipeline

  function setContextPatch(patch: Partial<DirectorContext>) {
    setIsDirty(true)
    setContext((prev) => ({ ...prev, ...patch }))
    setStatus('idle')
    setMessage(null)
  }

  function updateClub<K extends keyof DirectorContext['club']>(key: K, value: DirectorContext['club'][K]) {
    setContextPatch({ club: { ...context.club, [key]: value } })
  }

  function updateOwnership<K extends keyof DirectorContext['ownership']>(
    key: K,
    value: DirectorContext['ownership'][K],
  ) {
    setContextPatch({ ownership: { ...context.ownership, [key]: value } })
  }

  function updateObjectives<K extends keyof DirectorContext['objectives']>(
    key: K,
    value: DirectorContext['objectives'][K],
  ) {
    setContextPatch({ objectives: { ...context.objectives, [key]: value } })
  }

  function updatePlayingIdentity<K extends keyof NonNullable<DirectorContext['playingIdentity']>>(
    key: K,
    value: NonNullable<DirectorContext['playingIdentity']>[K],
  ) {
    setContextPatch({ playingIdentity: { ...context.playingIdentity, [key]: value } })
  }

  function updateFinancial<K extends keyof NonNullable<DirectorContext['financial']>>(
    key: K,
    value: NonNullable<DirectorContext['financial']>[K],
  ) {
    const financial =
      (context.financial ??
        createEmptyDirectorContext().financial) as NonNullable<DirectorContext['financial']>
    setContextPatch({ financial: { ...financial, [key]: value } })
  }

  function updateSquad<K extends keyof NonNullable<DirectorContext['squadStrategy']>>(
    key: K,
    value: NonNullable<DirectorContext['squadStrategy']>[K],
  ) {
    setContextPatch({ squadStrategy: { ...context.squadStrategy, [key]: value } })
  }

  function updateConstraints<K extends keyof NonNullable<DirectorContext['constraints']>>(
    key: K,
    value: NonNullable<DirectorContext['constraints']>[K],
  ) {
    setContextPatch({ constraints: { ...context.constraints, [key]: value } })
  }

  function updateStakeholders<K extends keyof NonNullable<DirectorContext['stakeholders']>>(
    key: K,
    value: NonNullable<DirectorContext['stakeholders']>[K],
  ) {
    setContextPatch({ stakeholders: { ...context.stakeholders, [key]: value } })
  }

  function onNext() {
    if (step === 0) {
      const errs = stepOneErrors(context)
      setErrors(errs)
      if (errs.length > 0) return
    }
    setErrors([])
    setStep((s) => Math.min(steps.length - 1, s + 1))
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
    const draft = buildMandateBrief(context)
    setContextPatch({ mandate: context.mandate.trim() ? context.mandate : draft })
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

      <div className={pipelineCardClass}>
        <div className="mb-3 flex items-center justify-between text-xs text-fume-500 dark:text-fume-400">
          <span>
            Step {step + 1} of {steps.length}
          </span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-fume-200 dark:bg-fume-800">
          <div className="h-full rounded-full bg-gradient-to-r from-gold-600 to-gold-500" style={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className={pipelineCardClass}>
        <h3 className="text-lg font-semibold text-fume-950 dark:text-fume-50">{steps[step].title}</h3>
        <p className={`mt-1 ${pipelineHelpClass}`}>{steps[step].description}</p>
        {step === 0 ? <p className={`mt-2 ${pipelineHelpClass}`}>Required: {requiredStepOneFields.join(', ')}</p> : null}
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
          {step === 0 ? (
            <>
              <div className={pipelineGridClass}>
                <label>
                  <span className={pipelineFieldLabelClass}>Club name *</span>
                  <input
                    value={context.club.clubName}
                    onChange={(event) => updateClub('clubName', event.target.value)}
                    className={pipelineInputClass}
                  />
                </label>
                <label>
                  <span className={pipelineFieldLabelClass}>Time horizon years *</span>
                  <input
                    type="number"
                    min={1}
                    max={10}
                    value={context.objectives.timeHorizonYears ?? ''}
                    onChange={(event) => updateObjectives('timeHorizonYears', parseInteger(event.target.value) ?? 3)}
                    className={pipelineInputClass}
                  />
                </label>
              </div>
              <div className={pipelineGridClass}>
                <label>
                  <span className={pipelineFieldLabelClass}>Ownership model *</span>
                  <select
                    value={context.ownership.model}
                    onChange={(event) => updateOwnership('model', event.target.value as (typeof ownershipModels)[number])}
                    className={pipelineInputClass}
                  >
                    {ownershipModels.map((item) => (
                      <option key={item} value={item}>
                        {labelForOption(item)}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className={pipelineFieldLabelClass}>Owner mandate *</span>
                  <select
                    value={context.ownership.mandate}
                    onChange={(event) => updateOwnership('mandate', event.target.value as (typeof ownerMandates)[number])}
                    className={pipelineInputClass}
                  >
                    {ownerMandates.map((item) => (
                      <option key={item} value={item}>
                        {labelForOption(item)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                <span className={pipelineFieldLabelClass}>Primary objective *</span>
                <select
                  value={context.objectives.primaryObjective}
                  onChange={(event) =>
                    updateObjectives('primaryObjective', event.target.value as (typeof primaryObjectives)[number])
                  }
                  className={pipelineInputClass}
                >
                  {primaryObjectives.map((item) => (
                    <option key={item} value={item}>
                      {labelForOption(item)}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span className={pipelineFieldLabelClass}>Mandate sentence *</span>
                <textarea
                  value={context.mandate}
                  onChange={(event) => setContextPatch({ mandate: event.target.value })}
                  className={pipelineTextareaClass}
                  placeholder="In one clear sentence, what are we chasing in this period?"
                />
              </label>
            </>
          ) : null}

          {step === 1 ? (
            <>
              <div className={pipelineGridClass}>
                <label>
                  <span className={pipelineFieldLabelClass}>Club short name</span>
                  <input value={context.club.clubShortName ?? ''} onChange={(event) => updateClub('clubShortName', event.target.value)} className={pipelineInputClass} />
                </label>
                <label>
                  <span className={pipelineFieldLabelClass}>Country</span>
                  <input value={context.club.country ?? ''} onChange={(event) => updateClub('country', event.target.value)} className={pipelineInputClass} />
                </label>
              </div>
              <div className={pipelineGridClass}>
                <label>
                  <span className={pipelineFieldLabelClass}>League</span>
                  <input value={context.club.league ?? ''} onChange={(event) => updateClub('league', event.target.value)} className={pipelineInputClass} />
                </label>
                <label>
                  <span className={pipelineFieldLabelClass}>Season label</span>
                  <input value={context.club.seasonLabel ?? ''} onChange={(event) => updateClub('seasonLabel', event.target.value)} className={pipelineInputClass} />
                </label>
              </div>
              <label>
                <span className={pipelineFieldLabelClass}>League tier (1–6)</span>
                <input
                  type="number"
                  min={1}
                  max={6}
                  value={context.club.leagueTier ?? ''}
                  onChange={(event) => updateClub('leagueTier', parseInteger(event.target.value))}
                  className={pipelineInputClass}
                />
              </label>
              <div className={pipelineGridClass}>
                <label>
                  <span className={pipelineFieldLabelClass}>Ownership display name</span>
                  <input value={context.ownership.displayName ?? ''} onChange={(event) => updateOwnership('displayName', event.target.value)} className={pipelineInputClass} />
                </label>
                <label>
                  <span className={pipelineFieldLabelClass}>Ownership tenure</span>
                  <select
                    value={context.ownership.tenure ?? ''}
                    onChange={(event) =>
                      updateOwnership('tenure', (event.target.value || undefined) as (typeof ownershipTenures)[number] | undefined)
                    }
                    className={pipelineInputClass}
                  >
                    <option value="">Not set</option>
                    {ownershipTenures.map((item) => (
                      <option key={item} value={item}>
                        {labelForOption(item)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                <span className={pipelineFieldLabelClass}>Board expectations</span>
                <textarea value={context.ownership.boardExpectations ?? ''} onChange={(event) => updateOwnership('boardExpectations', event.target.value)} className={pipelineTextareaClass} />
              </label>
            </>
          ) : null}

          {step === 2 ? (
            <>
              <div className={pipelineGridClass}>
                <label className="md:col-span-2">
                  <span className={pipelineFieldLabelClass}>Secondary objectives</span>
                  <textarea
                    value={context.objectives.secondaryObjectives ?? ''}
                    onChange={(event) => updateObjectives('secondaryObjectives', event.target.value)}
                    placeholder="Free text"
                    rows={4}
                    className={pipelineMultiLineListClass}
                  />
                </label>
                <label>
                  <span className={pipelineFieldLabelClass}>Cup ambitions</span>
                  <input value={context.objectives.cupAmbitions ?? ''} onChange={(event) => updateObjectives('cupAmbitions', event.target.value)} className={pipelineInputClass} />
                </label>
              </div>
              <div className={pipelineGridClass}>
                <label>
                  <span className={pipelineFieldLabelClass}>League position from</span>
                  <input type="number" value={context.objectives.targetLeaguePositionFrom ?? ''} onChange={(event) => updateObjectives('targetLeaguePositionFrom', parseInteger(event.target.value))} className={pipelineInputClass} />
                </label>
                <label>
                  <span className={pipelineFieldLabelClass}>League position to</span>
                  <input type="number" value={context.objectives.targetLeaguePositionTo ?? ''} onChange={(event) => updateObjectives('targetLeaguePositionTo', parseInteger(event.target.value))} className={pipelineInputClass} />
                </label>
              </div>
              <div className={pipelineGridClass}>
                <label>
                  <span className={pipelineFieldLabelClass}>Playing style</span>
                  <select
                    value={context.playingIdentity?.style ?? ''}
                    onChange={(event) => updatePlayingIdentity('style', (event.target.value || undefined) as (typeof playingStyles)[number] | undefined)}
                    className={pipelineInputClass}
                  >
                    <option value="">Not set</option>
                    {playingStyles.map((item) => (
                      <option key={item} value={item}>
                        {labelForOption(item)}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className={pipelineFieldLabelClass}>Academy integration</span>
                  <select
                    value={context.playingIdentity?.academyIntegration ?? ''}
                    onChange={(event) =>
                      updatePlayingIdentity(
                        'academyIntegration',
                        (event.target.value || undefined) as (typeof academyIntegrationLevels)[number] | undefined,
                      )
                    }
                    className={pipelineInputClass}
                  >
                    <option value="">Not set</option>
                    {academyIntegrationLevels.map((item) => (
                      <option key={item} value={item}>
                        {labelForOption(item)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                <span className={pipelineFieldLabelClass}>Preferred formations</span>
                <textarea
                  value={context.playingIdentity?.preferredFormations ?? ''}
                  onChange={(event) => updatePlayingIdentity('preferredFormations', event.target.value)}
                  placeholder="Free text"
                  rows={3}
                  className={pipelineMultiLineListClass}
                />
              </label>
              <label>
                <span className={pipelineFieldLabelClass}>Style notes</span>
                <textarea
                  value={context.playingIdentity?.styleNotes ?? ''}
                  onChange={(event) => updatePlayingIdentity('styleNotes', event.target.value)}
                  className={pipelineTextareaClass}
                />
              </label>
              <label>
                <span className={pipelineFieldLabelClass}>Non-negotiables</span>
                <textarea
                  value={context.playingIdentity?.nonNegotiables ?? ''}
                  onChange={(event) => updatePlayingIdentity('nonNegotiables', event.target.value)}
                  className={pipelineTextareaClass}
                />
              </label>
            </>
          ) : null}

          {step === 3 ? (
            <>
              <p className={pipelineHelpClass}>
                Budget amounts below are in millions of EUR (M EUR). Example: 35 means €35m. Percentages and FFP
                status are not in M EUR.
              </p>
              <div className={pipelineGridClass}>
                <label>
                  <span className={pipelineFieldLabelClass}>Currency (reference)</span>
                  <input value={context.financial?.currency ?? 'EUR'} onChange={(event) => updateFinancial('currency', event.target.value.toUpperCase())} className={pipelineInputClass} />
                </label>
                <label>
                  <span className={pipelineFieldLabelClass}>FFP status</span>
                  <select
                    value={context.financial?.ffpStatus ?? ''}
                    onChange={(event) => updateFinancial('ffpStatus', (event.target.value || undefined) as (typeof ffpStatuses)[number] | undefined)}
                    className={pipelineInputClass}
                  >
                    <option value="">Not set</option>
                    {ffpStatuses.map((item) => (
                      <option key={item} value={item}>
                        {labelForOption(item)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className={pipelineGridClass}>
                <label>
                  <span className={pipelineFieldLabelClass}>Season operating budget (M EUR)</span>
                  <input type="number" value={context.financial?.seasonOperatingBudget ?? ''} onChange={(event) => updateFinancial('seasonOperatingBudget', parseNullableInteger(event.target.value))} className={pipelineInputClass} />
                </label>
                <label>
                  <span className={pipelineFieldLabelClass}>Annual wage budget (M EUR)</span>
                  <input type="number" value={context.financial?.annualWageBudget ?? ''} onChange={(event) => updateFinancial('annualWageBudget', parseNullableInteger(event.target.value))} className={pipelineInputClass} />
                </label>
              </div>
              <div className={pipelineGridClass}>
                <label>
                  <span className={pipelineFieldLabelClass}>Transfer budget net (M EUR)</span>
                  <input
                    type="number"
                    value={context.financial?.transferBudgetNet ?? ''}
                    onChange={(event) => updateFinancial('transferBudgetNet', parseNullableInteger(event.target.value))}
                    className={pipelineInputClass}
                  />
                </label>
                <label>
                  <span className={pipelineFieldLabelClass}>Transfer budget gross (M EUR)</span>
                  <input
                    type="number"
                    min={0}
                    value={context.financial?.transferBudgetGross ?? ''}
                    onChange={(event) => updateFinancial('transferBudgetGross', parseNullableInteger(event.target.value))}
                    className={pipelineInputClass}
                  />
                </label>
              </div>
              <div className={pipelineGridClass}>
                <label>
                  <span className={pipelineFieldLabelClass}>Wage / revenue cap (%)</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={context.financial?.wageToRevenueCapPct ?? ''}
                    onChange={(event) => updateFinancial('wageToRevenueCapPct', parseNullableInteger(event.target.value))}
                    className={pipelineInputClass}
                  />
                </label>
                <label>
                  <span className={pipelineFieldLabelClass}>Profit target per season (M EUR)</span>
                  <input
                    type="number"
                    value={context.financial?.profitTargetPerSeason ?? ''}
                    onChange={(event) => updateFinancial('profitTargetPerSeason', parseNullableInteger(event.target.value))}
                    className={pipelineInputClass}
                  />
                </label>
              </div>
              <div className={pipelineGridClass}>
                <label>
                  <span className={pipelineFieldLabelClass}>Transfer approach</span>
                  <select
                    value={context.squadStrategy?.transferApproach ?? ''}
                    onChange={(event) =>
                      updateSquad('transferApproach', (event.target.value || undefined) as (typeof transferApproaches)[number] | undefined)
                    }
                    className={pipelineInputClass}
                  >
                    <option value="">Not set</option>
                    {transferApproaches.map((item) => (
                      <option key={item} value={item}>
                        {labelForOption(item)}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  <span className={pipelineFieldLabelClass}>Target squad size</span>
                  <input type="number" value={context.squadStrategy?.targetSquadSize ?? ''} onChange={(event) => updateSquad('targetSquadSize', parseInteger(event.target.value))} className={pipelineInputClass} />
                </label>
              </div>
              <div className={pipelineGridClass}>
                <label>
                  <span className={pipelineFieldLabelClass}>Foreign player limit</span>
                  <input
                    type="number"
                    min={0}
                    max={40}
                    value={context.squadStrategy?.foreignPlayerLimit ?? ''}
                    onChange={(event) => updateSquad('foreignPlayerLimit', parseNullableInteger(event.target.value))}
                    className={pipelineInputClass}
                  />
                </label>
                <label>
                  <span className={pipelineFieldLabelClass}>Homegrown quota (%)</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={context.squadStrategy?.homegrownQuotaPct ?? ''}
                    onChange={(event) => updateSquad('homegrownQuotaPct', parseNullableInteger(event.target.value))}
                    className={pipelineInputClass}
                  />
                </label>
              </div>
              <label>
                <span className={pipelineFieldLabelClass}>Target average age</span>
                <input
                  type="number"
                  min={17}
                  max={35}
                  step="0.1"
                  value={context.squadStrategy?.targetAverageAge ?? ''}
                  onChange={(event) => updateSquad('targetAverageAge', parseOptionalNumber(event.target.value))}
                  className={pipelineInputClass}
                />
              </label>
            </>
          ) : null}

          {step === 4 ? (
            <>
              <label>
                <span className={pipelineFieldLabelClass}>Constraints</span>
                <textarea
                  value={context.constraints?.items ?? ''}
                  onChange={(event) => updateConstraints('items', event.target.value)}
                  placeholder="Free text"
                  rows={5}
                  className={pipelineMultiLineListClass}
                />
              </label>
              <label>
                <span className={pipelineFieldLabelClass}>Key risks</span>
                <textarea value={context.constraints?.keyRisks ?? ''} onChange={(event) => updateConstraints('keyRisks', event.target.value)} className={pipelineTextareaClass} />
              </label>
              <div className={pipelineGridClass}>
                <label>
                  <span className={pipelineFieldLabelClass}>Owner</span>
                  <input value={context.stakeholders?.ownerName ?? ''} onChange={(event) => updateStakeholders('ownerName', event.target.value)} className={pipelineInputClass} />
                </label>
                <label>
                  <span className={pipelineFieldLabelClass}>CEO</span>
                  <input value={context.stakeholders?.ceoName ?? ''} onChange={(event) => updateStakeholders('ceoName', event.target.value)} className={pipelineInputClass} />
                </label>
              </div>
              <div className={pipelineGridClass}>
                <label>
                  <span className={pipelineFieldLabelClass}>Current head coach</span>
                  <input value={context.stakeholders?.currentHeadCoach ?? ''} onChange={(event) => updateStakeholders('currentHeadCoach', event.target.value)} className={pipelineInputClass} />
                </label>
                <label>
                  <span className={pipelineFieldLabelClass}>Reports to</span>
                  <input value={context.stakeholders?.reportsTo ?? ''} onChange={(event) => updateStakeholders('reportsTo', event.target.value)} className={pipelineInputClass} />
                </label>
              </div>
              <label>
                <span className={pipelineFieldLabelClass}>Director notes</span>
                <textarea value={context.notes ?? ''} onChange={(event) => setContextPatch({ notes: event.target.value })} className={pipelineTextareaClass} />
              </label>
              <div className="rounded-lg border border-surface-field-border bg-surface-soft p-3">
                <p className={pipelineSectionTitleClass}>Review snapshot</p>
                <p className={`mt-2 ${pipelineHelpClass}`}>{buildMandateBrief(context)}</p>
                <p className={`mt-2 ${pipelineHelpClass}`}>Current mandate text: {context.mandate || 'Not written yet.'}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button type="button" onClick={onGenerateBrief} className={pipelineSecondaryButtonClass}>
                    Generate planning brief
                  </button>
                  <button type="button" onClick={() => setReplaceMandateOpen(true)} className={pipelineDangerButtonClass}>
                    Replace mandate with brief
                  </button>
                </div>
              </div>
            </>
          ) : null}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-surface-divider pt-5">
          <button type="button" onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} className={`${pipelineSecondaryButtonClass} disabled:cursor-not-allowed disabled:opacity-40`}>
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
        {message ? <p className={`mt-3 whitespace-pre-line ${status === 'success' ? 'text-sm text-sea-700 dark:text-sea-400' : pipelineErrorClass}`}>{message}</p> : null}
      </div>

      <Modal
        isOpen={replaceMandateOpen}
        variant="danger"
        title="Replace mandate text?"
        description="The current mandate sentence will be overwritten by the auto-generated planning brief. You can still edit it before saving."
        confirmLabel="Replace mandate"
        cancelLabel="Cancel"
        onClose={() => setReplaceMandateOpen(false)}
        onConfirm={() => {
          setContextPatch({ mandate: buildMandateBrief(context) })
          setReplaceMandateOpen(false)
        }}
      />

      <Modal
        isOpen={saveConfirmOpen}
        variant="confirmation"
        title={mode === 'create' ? 'Create active pipeline?' : 'Save pipeline?'}
        description={
          mode === 'create'
            ? 'This will send your club vision context to the server and set this pipeline as the active one. You can archive or edit it later from the pipelines list.'
            : 'This will update the pipeline on the server with your current title and context. Continue?'
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

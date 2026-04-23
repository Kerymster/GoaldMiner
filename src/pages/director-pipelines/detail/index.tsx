import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getDirectorPipeline } from '../../../api/directorPipelines'
import { EmptyState } from '../../../components/empty-state/EmptyState'
import { PageHeader } from '../../../components/page-header/PageHeader'
import { pageStack, proseErrorSm, proseMutedSm } from '../../../components/styles/pageChromeStyles'
import { coerceContextListFieldToString, labelForOption, type DirectorPipeline } from '../../../types/directorPipeline'
import {
  pipelineCardClass,
  pipelineDetailSectionClass,
  pipelinePrimaryButtonClass,
  pipelineSecondaryButtonClass,
  pipelineTabButtonActiveClass,
  pipelineTabButtonClass,
  pipelineTabButtonIdleClass,
  pipelineTabListClass,
} from '../directorPipelineStyles'

type PipelineDetailTab = 'core' | 'clubOwnership' | 'identity' | 'financialSquad' | 'constraintsStakeholders'

function fallback(value: string | number | null | undefined): string {
  if (value == null || value === '') return '—'
  return String(value)
}

function textBlock(value: string | undefined): string {
  const t = (value ?? '').trim()
  return t || '—'
}

export function DirectorPipelineDetailPage() {
  const { pipelineId } = useParams<{ pipelineId: string }>()
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)
  const [pipeline, setPipeline] = useState<DirectorPipeline | null>(null)
  const [tab, setTab] = useState<PipelineDetailTab>('core')

  useEffect(() => {
    if (!pipelineId) return
    let cancelled = false
    ;(async () => {
      setStatus('loading')
      setError(null)
      try {
        const data = await getDirectorPipeline(pipelineId)
        if (cancelled) return
        setPipeline(data)
        setStatus('ready')
      } catch (e) {
        if (cancelled) return
        setStatus('error')
        setError(e instanceof Error ? e.message : 'Pipeline could not be loaded.')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [pipelineId])

  const title = useMemo(
    () => pipeline?.title?.trim() || pipeline?.context.club.clubName || 'Pipeline detail',
    [pipeline],
  )

  const secondaryObjectives = pipeline
    ? coerceContextListFieldToString(pipeline.context.objectives.secondaryObjectives)
    : ''
  const preferredFormations = pipeline
    ? coerceContextListFieldToString(pipeline.context.playingIdentity?.preferredFormations)
    : ''
  const constraintItems = pipeline ? coerceContextListFieldToString(pipeline.context.constraints?.items) : ''

  return (
    <div className={pageStack}>
      <PageHeader
        breadcrumbItems={[
          { label: 'Club Vision Strategy', to: '/director-pipelines' },
          { label: title },
        ]}
        title={title}
        description="Read-only view of the full director pipeline context."
      />

      <div className="flex flex-wrap gap-2">
        <Link to="/director-pipelines" className={pipelineSecondaryButtonClass}>
          Back to pipelines
        </Link>
        {pipeline ? (
          <Link
            to={`/director-pipelines/edit?id=${encodeURIComponent(pipeline.id)}`}
            className={pipelinePrimaryButtonClass}
          >
            Edit pipeline
          </Link>
        ) : null}
      </div>

      {status === 'loading' ? <p className={proseMutedSm}>Loading pipeline details…</p> : null}
      {status === 'error' ? <p className={proseErrorSm}>{error}</p> : null}
      {status === 'ready' && !pipeline ? (
        <EmptyState
          title="Pipeline not found"
          description="This pipeline may have been removed or is not accessible."
        />
      ) : null}

      {pipeline ? (
        <div className="space-y-4">
          <div className="space-y-2">
            <div className={pipelineTabListClass} role="tablist" aria-label="Pipeline detail sections">
              <button
                type="button"
                role="tab"
                id="pipeline-tab-core"
                aria-selected={tab === 'core'}
                aria-controls="pipeline-panel-core"
                onClick={() => setTab('core')}
                className={`${pipelineTabButtonClass} ${tab === 'core' ? pipelineTabButtonActiveClass : pipelineTabButtonIdleClass}`}
              >
                Core mandate
              </button>
              <button
                type="button"
                role="tab"
                id="pipeline-tab-club-ownership"
                aria-selected={tab === 'clubOwnership'}
                aria-controls="pipeline-panel-club-ownership"
                onClick={() => setTab('clubOwnership')}
                className={`${pipelineTabButtonClass} ${tab === 'clubOwnership' ? pipelineTabButtonActiveClass : pipelineTabButtonIdleClass}`}
              >
                Club + ownership
              </button>
              <button
                type="button"
                role="tab"
                id="pipeline-tab-identity"
                aria-selected={tab === 'identity'}
                aria-controls="pipeline-panel-identity"
                onClick={() => setTab('identity')}
                className={`${pipelineTabButtonClass} ${tab === 'identity' ? pipelineTabButtonActiveClass : pipelineTabButtonIdleClass}`}
              >
                Objectives + identity
              </button>
              <button
                type="button"
                role="tab"
                id="pipeline-tab-financial-squad"
                aria-selected={tab === 'financialSquad'}
                aria-controls="pipeline-panel-financial-squad"
                onClick={() => setTab('financialSquad')}
                className={`${pipelineTabButtonClass} ${tab === 'financialSquad' ? pipelineTabButtonActiveClass : pipelineTabButtonIdleClass}`}
              >
                Financial + squad
              </button>
              <button
                type="button"
                role="tab"
                id="pipeline-tab-constraints-stakeholders"
                aria-selected={tab === 'constraintsStakeholders'}
                aria-controls="pipeline-panel-constraints-stakeholders"
                onClick={() => setTab('constraintsStakeholders')}
                className={`${pipelineTabButtonClass} ${tab === 'constraintsStakeholders' ? pipelineTabButtonActiveClass : pipelineTabButtonIdleClass}`}
              >
                Constraints + stakeholders
              </button>
            </div>
            <p className="mt-2 text-xs text-fume-600 dark:text-fume-400">
              Read-only structure mirrors the create stepper.
            </p>
          </div>

          {tab === 'core' ? (
            <div id="pipeline-panel-core" role="tabpanel" aria-labelledby="pipeline-tab-core" className="space-y-4">
              <section className={pipelineDetailSectionClass}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-fume-500">Required fields</h3>
                <div className="mt-2 grid gap-2 text-sm md:grid-cols-2">
                  <p>Club name: {fallback(pipeline.context.club.clubName)}</p>
                  <p>Ownership model: {labelForOption(pipeline.context.ownership.model)}</p>
                  <p>Ownership mandate: {labelForOption(pipeline.context.ownership.mandate)}</p>
                  <p>Primary objective: {labelForOption(pipeline.context.objectives.primaryObjective)}</p>
                  <p>Time horizon: {fallback(pipeline.context.objectives.timeHorizonYears)} years</p>
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm">Mandate sentence: {textBlock(pipeline.context.mandate)}</p>
              </section>
            </div>
          ) : null}

          {tab === 'clubOwnership' ? (
            <div
              id="pipeline-panel-club-ownership"
              role="tabpanel"
              aria-labelledby="pipeline-tab-club-ownership"
              className="space-y-4"
            >
              <section className={pipelineDetailSectionClass}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-fume-500">Club profile</h3>
                <div className="mt-2 grid gap-2 text-sm md:grid-cols-2">
                  <p>Club short name: {fallback(pipeline.context.club.clubShortName)}</p>
                  <p>Country: {fallback(pipeline.context.club.country)}</p>
                  <p>League: {fallback(pipeline.context.club.league)}</p>
                  <p>League tier: {fallback(pipeline.context.club.leagueTier)}</p>
                  <p>Season label: {fallback(pipeline.context.club.seasonLabel)}</p>
                </div>
              </section>
              <section className={pipelineDetailSectionClass}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-fume-500">Ownership details</h3>
                <div className="mt-2 grid gap-2 text-sm md:grid-cols-2">
                  <p>Display name: {fallback(pipeline.context.ownership.displayName)}</p>
                  <p>Tenure: {labelForOption(pipeline.context.ownership.tenure)}</p>
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm">
                  Board expectations: {textBlock(pipeline.context.ownership.boardExpectations)}
                </p>
              </section>
            </div>
          ) : null}

          {tab === 'identity' ? (
            <div id="pipeline-panel-identity" role="tabpanel" aria-labelledby="pipeline-tab-identity" className="space-y-4">
              <section className={pipelineDetailSectionClass}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-fume-500">Sporting objectives</h3>
                <div className="mt-2 grid gap-2 text-sm md:grid-cols-2">
                  <p>Cup ambitions: {fallback(pipeline.context.objectives.cupAmbitions)}</p>
                  <p>Target position from: {fallback(pipeline.context.objectives.targetLeaguePositionFrom)}</p>
                  <p>Target position to: {fallback(pipeline.context.objectives.targetLeaguePositionTo)}</p>
                </div>
                <p className="mt-2 text-sm font-medium text-fume-600 dark:text-fume-400">Secondary objectives</p>
                <p className="mt-1 whitespace-pre-wrap text-sm">{textBlock(secondaryObjectives)}</p>
              </section>
              <section className={pipelineDetailSectionClass}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-fume-500">Playing identity</h3>
                <div className="mt-2 grid gap-2 text-sm md:grid-cols-2">
                  <p>Style: {labelForOption(pipeline.context.playingIdentity?.style)}</p>
                  <p>Academy integration: {labelForOption(pipeline.context.playingIdentity?.academyIntegration)}</p>
                </div>
                <p className="mt-2 text-sm font-medium text-fume-600 dark:text-fume-400">Preferred formations</p>
                <p className="mt-1 whitespace-pre-wrap text-sm">{textBlock(preferredFormations)}</p>
                <p className="mt-2 whitespace-pre-wrap text-sm">
                  Style notes: {textBlock(pipeline.context.playingIdentity?.styleNotes)}
                </p>
                <p className="mt-2 whitespace-pre-wrap text-sm">
                  Non-negotiables: {textBlock(pipeline.context.playingIdentity?.nonNegotiables)}
                </p>
              </section>
            </div>
          ) : null}

          {tab === 'financialSquad' ? (
            <div
              id="pipeline-panel-financial-squad"
              role="tabpanel"
              aria-labelledby="pipeline-tab-financial-squad"
              className="grid gap-4 lg:grid-cols-2"
            >
              <section className={pipelineDetailSectionClass}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-fume-500">Financial framework</h3>
                <div className="mt-2 grid gap-2 text-sm">
                  <p>Currency: {fallback(pipeline.context.financial?.currency)}</p>
                  <p>Season operating budget: {fallback(pipeline.context.financial?.seasonOperatingBudget)}</p>
                  <p>Transfer budget net: {fallback(pipeline.context.financial?.transferBudgetNet)}</p>
                  <p>Transfer budget gross: {fallback(pipeline.context.financial?.transferBudgetGross)}</p>
                  <p>Annual wage budget: {fallback(pipeline.context.financial?.annualWageBudget)}</p>
                  <p>Wage/revenue cap (%): {fallback(pipeline.context.financial?.wageToRevenueCapPct)}</p>
                  <p>FFP status: {labelForOption(pipeline.context.financial?.ffpStatus)}</p>
                  <p>Profit target per season: {fallback(pipeline.context.financial?.profitTargetPerSeason)}</p>
                </div>
              </section>
              <section className={pipelineDetailSectionClass}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-fume-500">Squad strategy</h3>
                <div className="mt-2 grid gap-2 text-sm">
                  <p>Target squad size: {fallback(pipeline.context.squadStrategy?.targetSquadSize)}</p>
                  <p>Foreign player limit: {fallback(pipeline.context.squadStrategy?.foreignPlayerLimit)}</p>
                  <p>Homegrown quota (%): {fallback(pipeline.context.squadStrategy?.homegrownQuotaPct)}</p>
                  <p>Transfer approach: {labelForOption(pipeline.context.squadStrategy?.transferApproach)}</p>
                  <p>Target average age: {fallback(pipeline.context.squadStrategy?.targetAverageAge)}</p>
                </div>
              </section>
            </div>
          ) : null}

          {tab === 'constraintsStakeholders' ? (
            <div
              id="pipeline-panel-constraints-stakeholders"
              role="tabpanel"
              aria-labelledby="pipeline-tab-constraints-stakeholders"
              className="grid gap-4 lg:grid-cols-2"
            >
              <section className={pipelineDetailSectionClass}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-fume-500">Constraints</h3>
                <p className="mt-2 text-sm font-medium text-fume-600 dark:text-fume-400">Items</p>
                <p className="mt-1 whitespace-pre-wrap text-sm">{textBlock(constraintItems)}</p>
                <p className="mt-2 whitespace-pre-wrap text-sm">Key risks: {textBlock(pipeline.context.constraints?.keyRisks)}</p>
              </section>
              <section className={pipelineDetailSectionClass}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-fume-500">Stakeholders</h3>
                <div className="mt-2 grid gap-2 text-sm">
                  <p>Owner: {fallback(pipeline.context.stakeholders?.ownerName)}</p>
                  <p>CEO: {fallback(pipeline.context.stakeholders?.ceoName)}</p>
                  <p>Current head coach: {fallback(pipeline.context.stakeholders?.currentHeadCoach)}</p>
                  <p>Reports to: {fallback(pipeline.context.stakeholders?.reportsTo)}</p>
                </div>
                <p className="mt-2 whitespace-pre-wrap text-sm">Notes: {textBlock(pipeline.context.notes)}</p>
              </section>
            </div>
          ) : null}

          <section className={pipelineCardClass}>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-fume-500">Meta</h3>
            <div className="mt-2 grid gap-2 text-sm md:grid-cols-2">
              <p>Status: {pipeline.status.toUpperCase()}</p>
              <p>Updated: {new Date(pipeline.updatedAt).toLocaleString()}</p>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  )
}

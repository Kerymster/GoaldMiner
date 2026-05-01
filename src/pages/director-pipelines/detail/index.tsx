import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getDirectorPipeline } from '../../../api/directorPipelines'
import { EmptyState } from '../../../components/empty-state/EmptyState'
import { PageHeader } from '../../../components/page-header/PageHeader'
import { pageStack, proseErrorSm, proseMutedSm } from '../../../components/styles/pageChromeStyles'
import { coerceContextListFieldToString, labelForOption, type DirectorPipeline } from '../../../types/directorPipeline'
import {
  pipelineDetailViewGridClass,
  pipelinePrimaryButtonClass,
  pipelineSecondaryButtonClass,
  pipelineTabButtonActiveClass,
  pipelineTabButtonClass,
  pipelineTabButtonIdleClass,
  pipelineTabListClass,
} from '../directorPipelineStyles'
import { PipelineDetailHeaderRecord } from './PipelineDetailHeaderRecord'
import {
  PipelineDetailCallout,
  PipelineDetailMultiline,
  PipelineDetailRow,
  PipelineDetailSection,
} from './PipelineDetailPrimitives'

type PipelineDetailTab = 'core' | 'clubOwnership' | 'identity' | 'financialSquad' | 'constraintsStakeholders'

function fallback(value: string | number | null | undefined): string {
  if (value == null || value === '') return '—'
  return String(value)
}

function formatYears(value: string | number | null | undefined): string {
  const v = fallback(value)
  if (v === '—') return '—'
  return `${v} years`
}

function formatLeaguePositionBand(
  from: string | number | null | undefined,
  to: string | number | null | undefined,
): string {
  const f = fallback(from)
  const t = fallback(to)
  if (f === '—' && t === '—') return '—'
  if (f === '—') return `${t} (upper bound)`
  if (t === '—') return `${f} (lower bound)`
  return `${f} – ${t}`
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
          { label: 'Club Vision', to: '/director-pipelines' },
          { label: title },
        ]}
        title={title}
        description="Summary of this club vision pipeline."
        end={pipeline ? <PipelineDetailHeaderRecord pipeline={pipeline} headingTitle={title} /> : null}
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
        <div className="space-y-5">
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
          </div>

          {tab === 'core' ? (
            <div id="pipeline-panel-core" role="tabpanel" aria-labelledby="pipeline-tab-core" className="space-y-5">
              <PipelineDetailSection title="Core context & mandate">
                <div className={pipelineDetailViewGridClass}>
                  <PipelineDetailRow label="Club name" value={fallback(pipeline.context.club.clubName)} />
                  <PipelineDetailRow label="Ownership model" value={labelForOption(pipeline.context.ownership.model)} />
                  <PipelineDetailRow
                    label="Ownership mandate"
                    value={labelForOption(pipeline.context.ownership.mandate)}
                  />
                  <PipelineDetailRow
                    label="Primary objective"
                    value={labelForOption(pipeline.context.objectives.primaryObjective)}
                  />
                  <PipelineDetailRow label="Time horizon" value={formatYears(pipeline.context.objectives.timeHorizonYears)} />
                </div>
                <PipelineDetailMultiline label="Mandate sentence" text={pipeline.context.mandate ?? ''} />
              </PipelineDetailSection>
            </div>
          ) : null}

          {tab === 'clubOwnership' ? (
            <div
              id="pipeline-panel-club-ownership"
              role="tabpanel"
              aria-labelledby="pipeline-tab-club-ownership"
              className="space-y-5"
            >
              <PipelineDetailSection title="Club profile">
                <div className={pipelineDetailViewGridClass}>
                  <PipelineDetailRow label="Club short name" value={fallback(pipeline.context.club.clubShortName)} />
                  <PipelineDetailRow label="Country" value={fallback(pipeline.context.club.country)} />
                  <PipelineDetailRow label="League" value={fallback(pipeline.context.club.league)} />
                  <PipelineDetailRow label="League tier" value={fallback(pipeline.context.club.leagueTier)} />
                  <PipelineDetailRow label="Season label" value={fallback(pipeline.context.club.seasonLabel)} />
                </div>
              </PipelineDetailSection>
              <PipelineDetailSection title="Ownership">
                <div className={pipelineDetailViewGridClass}>
                  <PipelineDetailRow label="Display name" value={fallback(pipeline.context.ownership.displayName)} />
                  <PipelineDetailRow label="Tenure" value={labelForOption(pipeline.context.ownership.tenure)} />
                </div>
                <PipelineDetailMultiline label="Board expectations" text={pipeline.context.ownership.boardExpectations ?? ''} />
              </PipelineDetailSection>
            </div>
          ) : null}

          {tab === 'identity' ? (
            <div id="pipeline-panel-identity" role="tabpanel" aria-labelledby="pipeline-tab-identity" className="space-y-5">
              <PipelineDetailSection title="Sporting objectives">
                <div className={pipelineDetailViewGridClass}>
                  <PipelineDetailRow label="Cup ambitions" value={fallback(pipeline.context.objectives.cupAmbitions)} />
                  <PipelineDetailRow
                    label="League finish target"
                    value={formatLeaguePositionBand(
                      pipeline.context.objectives.targetLeaguePositionFrom,
                      pipeline.context.objectives.targetLeaguePositionTo,
                    )}
                  />
                </div>
                <PipelineDetailMultiline label="Secondary objectives" text={secondaryObjectives} />
              </PipelineDetailSection>
              <PipelineDetailSection title="Playing identity">
                <div className={pipelineDetailViewGridClass}>
                  <PipelineDetailRow label="Style" value={labelForOption(pipeline.context.playingIdentity?.style)} />
                  <PipelineDetailRow
                    label="Academy integration"
                    value={labelForOption(pipeline.context.playingIdentity?.academyIntegration)}
                  />
                </div>
                <PipelineDetailMultiline label="Preferred formations" text={preferredFormations} />
                <PipelineDetailMultiline label="Style notes" text={pipeline.context.playingIdentity?.styleNotes ?? ''} />
                <PipelineDetailMultiline
                  label="Non-negotiables"
                  text={pipeline.context.playingIdentity?.nonNegotiables ?? ''}
                />
              </PipelineDetailSection>
            </div>
          ) : null}

          {tab === 'financialSquad' ? (
            <div
              id="pipeline-panel-financial-squad"
              role="tabpanel"
              aria-labelledby="pipeline-tab-financial-squad"
              className="grid gap-5 lg:grid-cols-2"
            >
              <PipelineDetailSection title="Financial framework">
                <PipelineDetailCallout>
                  Budget figures in M EUR are millions of euros (e.g. 35 = €35m). Percentages and FFP are not M EUR.
                </PipelineDetailCallout>
                <div className={`mt-4 ${pipelineDetailViewGridClass}`}>
                  <PipelineDetailRow label="Currency (reference)" value={fallback(pipeline.context.financial?.currency)} />
                  <PipelineDetailRow
                    label="Season operating budget (M EUR)"
                    value={fallback(pipeline.context.financial?.seasonOperatingBudget)}
                  />
                  <PipelineDetailRow
                    label="Transfer budget net (M EUR)"
                    value={fallback(pipeline.context.financial?.transferBudgetNet)}
                  />
                  <PipelineDetailRow
                    label="Transfer budget gross (M EUR)"
                    value={fallback(pipeline.context.financial?.transferBudgetGross)}
                  />
                  <PipelineDetailRow
                    label="Annual wage budget (M EUR)"
                    value={fallback(pipeline.context.financial?.annualWageBudget)}
                  />
                  <PipelineDetailRow
                    label="Wage / revenue cap (%)"
                    value={fallback(pipeline.context.financial?.wageToRevenueCapPct)}
                  />
                  <PipelineDetailRow label="FFP status" value={labelForOption(pipeline.context.financial?.ffpStatus)} />
                  <PipelineDetailRow
                    label="Profit target per season (M EUR)"
                    value={fallback(pipeline.context.financial?.profitTargetPerSeason)}
                  />
                </div>
              </PipelineDetailSection>
              <PipelineDetailSection title="Squad strategy">
                <div className={pipelineDetailViewGridClass}>
                  <PipelineDetailRow label="Target squad size" value={fallback(pipeline.context.squadStrategy?.targetSquadSize)} />
                  <PipelineDetailRow
                    label="Foreign player limit"
                    value={fallback(pipeline.context.squadStrategy?.foreignPlayerLimit)}
                  />
                  <PipelineDetailRow
                    label="Homegrown quota (%)"
                    value={fallback(pipeline.context.squadStrategy?.homegrownQuotaPct)}
                  />
                  <PipelineDetailRow
                    label="Transfer approach"
                    value={labelForOption(pipeline.context.squadStrategy?.transferApproach)}
                  />
                  <PipelineDetailRow
                    label="Target average age"
                    value={fallback(pipeline.context.squadStrategy?.targetAverageAge)}
                  />
                </div>
              </PipelineDetailSection>
            </div>
          ) : null}

          {tab === 'constraintsStakeholders' ? (
            <div
              id="pipeline-panel-constraints-stakeholders"
              role="tabpanel"
              aria-labelledby="pipeline-tab-constraints-stakeholders"
              className="grid gap-5 lg:grid-cols-2"
            >
              <PipelineDetailSection title="Constraints">
                <PipelineDetailMultiline label="Items" text={constraintItems} />
                <PipelineDetailMultiline label="Key risks" text={pipeline.context.constraints?.keyRisks ?? ''} />
              </PipelineDetailSection>
              <PipelineDetailSection title="Stakeholders">
                <div className={pipelineDetailViewGridClass}>
                  <PipelineDetailRow label="Owner" value={fallback(pipeline.context.stakeholders?.ownerName)} />
                  <PipelineDetailRow label="CEO" value={fallback(pipeline.context.stakeholders?.ceoName)} />
                  <PipelineDetailRow
                    label="Current head coach"
                    value={fallback(pipeline.context.stakeholders?.currentHeadCoach)}
                  />
                  <PipelineDetailRow label="Reports to" value={fallback(pipeline.context.stakeholders?.reportsTo)} />
                </div>
                <PipelineDetailMultiline label="Notes" text={pipeline.context.notes ?? ''} />
              </PipelineDetailSection>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  )
}

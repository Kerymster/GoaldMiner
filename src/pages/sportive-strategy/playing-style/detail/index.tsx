import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPlayingStyle } from '../../../../api/playingStyle'
import { EmptyState } from '../../../../components/empty-state/EmptyState'
import { PageHeader } from '../../../../components/page-header/PageHeader'
import { pageStack, proseErrorSm, proseMutedSm } from '../../../../components/styles/pageChromeStyles'
import {
  labelForPlayingStyleOption,
  type PlayingStyleRecord,
} from '../../../../types/playingStyle'
import {
  pipelineDetailHeaderRecordPanelClass,
  pipelineDetailHeaderRecordPanelTitleClass,
  pipelineDetailHeaderRecordValueEmphasisClass,
  pipelinePrimaryButtonClass,
  pipelineSecondaryButtonClass,
  pipelineTabButtonActiveClass,
  pipelineTabButtonClass,
  pipelineTabButtonIdleClass,
  pipelineTabListClass,
} from '../../../director-pipelines/directorPipelineStyles'
import {
  PipelineDetailMultiline,
  PipelineDetailRow,
  PipelineDetailSection,
  PipelineDetailStatus,
} from '../../../director-pipelines/detail/PipelineDetailPrimitives'
import { PLAYING_STYLE_FORM_STEPS } from '../form/playingStyleFormStepsMeta'
import { formatPlayingStyleListDate, playingStyleListRowTitle } from '../playingStyleListFormat'

const PLAYING_STYLE_DETAIL_TABS = [
  'identity',
  'inPossession',
  'offensiveTransition',
  'finishing',
  'outOfPossession',
  'defensiveTransition',
  'setPieces',
  'playerProfiles',
  'matchManagement',
  'kpiTargets',
  'implementationRoadmap',
  'governance',
] as const

type PlayingStyleDetailTab = (typeof PLAYING_STYLE_DETAIL_TABS)[number]

function fallback(value: string | number | null | undefined): string {
  if (value == null || value === '') return '—'
  return String(value)
}

export function PlayingStyleDetailPage() {
  const { playingStyleId } = useParams<{ playingStyleId: string }>()
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)
  const [record, setRecord] = useState<PlayingStyleRecord | null>(null)
  const [tab, setTab] = useState<PlayingStyleDetailTab>('identity')

  useEffect(() => {
    if (!playingStyleId) return
    let cancelled = false
    ;(async () => {
      setStatus('loading')
      setError(null)
      try {
        const data = await getPlayingStyle(playingStyleId)
        if (cancelled) return
        setRecord(data)
        setStatus('ready')
      } catch (e) {
        if (cancelled) return
        setStatus('error')
        setError(e instanceof Error ? e.message : 'Playing style could not be loaded.')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [playingStyleId])

  useEffect(() => {
    setTab('identity')
  }, [playingStyleId])

  const title = useMemo(
    () => (record ? playingStyleListRowTitle(record) : 'Playing style'),
    [record],
  )

  if (!playingStyleId) {
    return (
      <div className={pageStack}>
        <EmptyState title="Missing id" description="No playing style id was provided in the URL." icon="circleHelp" />
      </div>
    )
  }

  if (status === 'loading') {
    return (
      <div className={pageStack}>
        <p className={proseMutedSm}>Loading playing style…</p>
      </div>
    )
  }

  if (status === 'error') {
    return (
      <div className={pageStack}>
        <p className={proseErrorSm}>{error}</p>
      </div>
    )
  }

  if (!record) {
    return null
  }

  const c = record.context
  const idn = c.identity
  const ip = c.inPossession ?? {}
  const ot = c.offensiveTransition ?? {}
  const fin = c.finishing ?? {}
  const oop = c.outOfPossession ?? {}
  const dt = c.defensiveTransition ?? {}
  const sp = c.setPieces ?? {}
  const pp = c.playerProfiles ?? {}
  const mm = c.matchManagement ?? {}
  const kpi = c.kpiTargets ?? {}
  const road = c.implementationRoadmap ?? {}
  const gov = c.governance ?? {}

  return (
    <div className={pageStack}>
      <PageHeader
        breadcrumbItems={[
          { label: 'Sportive Strategy', to: '/sportive-strategy/playing-style' },
          { label: 'Playing Style', to: '/sportive-strategy/playing-style' },
          { label: title },
        ]}
        title={title}
        description="Read-only summary of the saved playing style blueprint."
        end={
          <aside className={pipelineDetailHeaderRecordPanelClass}>
            <p className={pipelineDetailHeaderRecordPanelTitleClass}>Record</p>
            <p className={pipelineDetailHeaderRecordValueEmphasisClass}>
              <PipelineDetailStatus status={record.status} />
              {' · '}
              Stage {record.stage}
            </p>
            <p className="mt-2 text-xs text-fume-600 dark:text-fume-300">
              Updated {formatPlayingStyleListDate(record.updatedAt)}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                to={`/sportive-strategy/playing-style/edit?id=${encodeURIComponent(record.id)}`}
                className={pipelinePrimaryButtonClass}
              >
                Edit
              </Link>
              <Link to="/sportive-strategy/playing-style" className={pipelineSecondaryButtonClass}>
                Back to list
              </Link>
            </div>
          </aside>
        }
      />

      <div className="space-y-5">
        <div className="space-y-2">
          <div className={pipelineTabListClass} role="tablist" aria-label="Playing style detail sections">
            {PLAYING_STYLE_DETAIL_TABS.map((tabId, index) => {
              const label = PLAYING_STYLE_FORM_STEPS[index]?.title ?? tabId
              const tabSlug = tabId.replace(/([A-Z])/g, '-$1').replace(/^-/, '').toLowerCase()
              const tabDomId = `playing-style-tab-${tabSlug}`
              const panelDomId = `playing-style-panel-${tabSlug}`
              return (
                <button
                  key={tabId}
                  type="button"
                  role="tab"
                  id={tabDomId}
                  aria-selected={tab === tabId}
                  aria-controls={panelDomId}
                  onClick={() => setTab(tabId)}
                  className={`${pipelineTabButtonClass} ${tab === tabId ? pipelineTabButtonActiveClass : pipelineTabButtonIdleClass}`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {tab === 'identity' ? (
          <div
            id="playing-style-panel-identity"
            role="tabpanel"
            aria-labelledby="playing-style-tab-identity"
            className="space-y-5"
          >
            <PipelineDetailSection title="Identity" id="identity">
              <div className="space-y-4">
                <PipelineDetailMultiline label="Three-year vision" text={idn.threeYearVision} />
                <PipelineDetailMultiline label="Style statement" text={idn.styleStatement} />
                <PipelineDetailMultiline
                  label="Style model"
                  text={idn.styleModel ? labelForPlayingStyleOption(idn.styleModel) : ''}
                />
                <PipelineDetailMultiline label="Non-negotiables" text={idn.nonNegotiables ?? ''} />
                <PipelineDetailMultiline label="Fan experience intent" text={idn.fanExperienceIntent ?? ''} />
                <PipelineDetailMultiline label="Coach profile fit" text={idn.coachProfileFit ?? ''} />
              </div>
            </PipelineDetailSection>
          </div>
        ) : null}

        {tab === 'inPossession' ? (
          <div
            id="playing-style-panel-in-possession"
            role="tabpanel"
            aria-labelledby="playing-style-tab-in-possession"
            className="space-y-5"
          >
            <PipelineDetailSection title="In possession" id="in-possession">
              <div className="space-y-4">
                <PipelineDetailMultiline label="Build-up approach" text={ip.buildUpApproach ?? ''} />
                <PipelineDetailMultiline label="Progression plan" text={ip.progressionPlan ?? ''} />
                <PipelineDetailMultiline label="Final third plan" text={ip.finalThirdPlan ?? ''} />
                <PipelineDetailMultiline label="Width creation" text={ip.widthCreationPlan ?? ''} />
                <PipelineDetailMultiline label="Tempo control" text={ip.tempoControlPlan ?? ''} />
                <PipelineDetailMultiline label="Press resistance" text={ip.pressResistancePlan ?? ''} />
              </div>
            </PipelineDetailSection>
          </div>
        ) : null}

        {tab === 'offensiveTransition' ? (
          <div
            id="playing-style-panel-offensive-transition"
            role="tabpanel"
            aria-labelledby="playing-style-tab-offensive-transition"
            className="space-y-5"
          >
            <PipelineDetailSection title="Offensive transition" id="offensive-transition">
              <div className="space-y-4">
                <PipelineDetailMultiline label="First five seconds" text={ot.firstFiveSecondsPlan ?? ''} />
                <PipelineDetailMultiline label="Directness policy" text={ot.directnessPolicy ?? ''} />
                <PipelineDetailMultiline label="Runner priority" text={ot.runnerPriority ?? ''} />
                <PipelineDetailMultiline label="Trigger zones" text={ot.triggerZones ?? ''} />
                <PipelineDetailMultiline label="Support structure" text={ot.supportStructure ?? ''} />
              </div>
            </PipelineDetailSection>
          </div>
        ) : null}

        {tab === 'finishing' ? (
          <div
            id="playing-style-panel-finishing"
            role="tabpanel"
            aria-labelledby="playing-style-tab-finishing"
            className="space-y-5"
          >
            <PipelineDetailSection title="Finishing" id="finishing">
              <div className="space-y-4">
                <PipelineDetailMultiline label="Chance creation pattern" text={fin.chanceCreationPattern ?? ''} />
                <PipelineDetailMultiline label="Box occupation rules" text={fin.boxOccupationRules ?? ''} />
                <PipelineDetailMultiline label="Shot selection policy" text={fin.shotSelectionPolicy ?? ''} />
                <PipelineDetailMultiline label="Crossing policy" text={fin.crossingPolicy ?? ''} />
                <PipelineDetailMultiline label="Cut-back policy" text={fin.cutbackPolicy ?? ''} />
                <PipelineDetailMultiline label="Settled attack fallback" text={fin.setAttackFallbackPlan ?? ''} />
              </div>
            </PipelineDetailSection>
          </div>
        ) : null}

        {tab === 'outOfPossession' ? (
          <div
            id="playing-style-panel-out-of-possession"
            role="tabpanel"
            aria-labelledby="playing-style-tab-out-of-possession"
            className="space-y-5"
          >
            <PipelineDetailSection title="Out of possession" id="out-of-possession">
              <div className="space-y-4">
                <PipelineDetailRow
                  label="Pressing height"
                  value={labelForPlayingStyleOption(oop.pressingHeight)}
                />
                <PipelineDetailMultiline label="Block structure" text={oop.blockStructure ?? ''} />
                <PipelineDetailMultiline label="Pressing triggers" text={oop.pressingTriggers ?? ''} />
                <PipelineDetailMultiline label="Central protection rules" text={oop.centralProtectionRules ?? ''} />
                <PipelineDetailMultiline label="Wide defending rules" text={oop.wideDefendingRules ?? ''} />
                <PipelineDetailMultiline label="Line compactness rules" text={oop.lineCompactnessRules ?? ''} />
              </div>
            </PipelineDetailSection>
          </div>
        ) : null}

        {tab === 'defensiveTransition' ? (
          <div
            id="playing-style-panel-defensive-transition"
            role="tabpanel"
            aria-labelledby="playing-style-tab-defensive-transition"
            className="space-y-5"
          >
            <PipelineDetailSection title="Defensive transition" id="defensive-transition">
              <div className="space-y-4">
                <PipelineDetailRow
                  label="Transition approach"
                  value={labelForPlayingStyleOption(dt.transitionApproach)}
                />
                <PipelineDetailMultiline label="Rest-defence plan" text={dt.restDefensePlan ?? ''} />
                <PipelineDetailMultiline label="Tactical foul policy" text={dt.tacticalFoulPolicy ?? ''} />
                <PipelineDetailRow
                  label="Counter-press duration (s)"
                  value={fallback(dt.counterPressDurationSeconds)}
                />
                <PipelineDetailMultiline label="Emergency recovery shape" text={dt.emergencyRecoveryShape ?? ''} />
              </div>
            </PipelineDetailSection>
          </div>
        ) : null}

        {tab === 'setPieces' ? (
          <div
            id="playing-style-panel-set-pieces"
            role="tabpanel"
            aria-labelledby="playing-style-tab-set-pieces"
            className="space-y-5"
          >
            <PipelineDetailSection title="Set pieces" id="set-pieces">
              <div className="space-y-4">
                <PipelineDetailMultiline label="Attacking corners" text={sp.attackingCornersPlan ?? ''} />
                <PipelineDetailMultiline label="Defensive set pieces" text={sp.defensiveSetPiecePlan ?? ''} />
                <PipelineDetailMultiline label="Throw-ins" text={sp.throwInPlan ?? ''} />
                <PipelineDetailMultiline label="Attacking free kicks" text={sp.attackingFreeKickPlan ?? ''} />
                <PipelineDetailMultiline label="Defensive free kicks" text={sp.defensiveFreeKickPlan ?? ''} />
                <PipelineDetailMultiline label="Second balls" text={sp.secondBallPlan ?? ''} />
              </div>
            </PipelineDetailSection>
          </div>
        ) : null}

        {tab === 'playerProfiles' ? (
          <div
            id="playing-style-panel-player-profiles"
            role="tabpanel"
            aria-labelledby="playing-style-tab-player-profiles"
            className="space-y-5"
          >
            <PipelineDetailSection title="Player profiles" id="player-profiles">
              <div className="space-y-4">
                <PipelineDetailMultiline label="Key role profiles" text={pp.keyRoleProfiles ?? ''} />
                <PipelineDetailMultiline label="Recruitment fit rules" text={pp.recruitmentFitRules ?? ''} />
                <PipelineDetailMultiline label="Academy fit rules" text={pp.academyFitRules ?? ''} />
                <PipelineDetailMultiline label="Role depth requirements" text={pp.roleDepthRequirements ?? ''} />
                <PipelineDetailMultiline label="Leadership profile rules" text={pp.leadershipProfileRules ?? ''} />
                <PipelineDetailMultiline label="Physical threshold rules" text={pp.physicalThresholdRules ?? ''} />
              </div>
            </PipelineDetailSection>
          </div>
        ) : null}

        {tab === 'matchManagement' ? (
          <div
            id="playing-style-panel-match-management"
            role="tabpanel"
            aria-labelledby="playing-style-tab-match-management"
            className="space-y-5"
          >
            <PipelineDetailSection title="Match management" id="match-management">
              <div className="space-y-4">
                <PipelineDetailMultiline label="Ahead — plan" text={mm.gameStateAheadPlan ?? ''} />
                <PipelineDetailMultiline label="Behind — plan" text={mm.gameStateBehindPlan ?? ''} />
                <PipelineDetailMultiline label="Ten players" text={mm.tenMenPlan ?? ''} />
                <PipelineDetailMultiline label="Level score" text={mm.equalGameStatePlan ?? ''} />
                <PipelineDetailMultiline label="Substitution model" text={mm.substitutionModel ?? ''} />
                <PipelineDetailMultiline
                  label="Opponent-specific adjustments"
                  text={mm.opponentSpecificAdjustments ?? ''}
                />
              </div>
            </PipelineDetailSection>
          </div>
        ) : null}

        {tab === 'kpiTargets' ? (
          <div
            id="playing-style-panel-kpi-targets"
            role="tabpanel"
            aria-labelledby="playing-style-tab-kpi-targets"
            className="space-y-5"
          >
            <PipelineDetailSection title="KPI targets" id="kpi-targets">
              <div className="space-y-4">
                <PipelineDetailRow label="Possession % target" value={fallback(kpi.possessionPctTarget)} />
                <PipelineDetailRow label="PPDA target" value={fallback(kpi.ppdaTarget)} />
                <PipelineDetailRow label="Final-third entries" value={fallback(kpi.finalThirdEntriesTarget)} />
                <PipelineDetailRow label="Box entries" value={fallback(kpi.boxEntriesTarget)} />
                <PipelineDetailRow label="High regains" value={fallback(kpi.highRegainsTarget)} />
                <PipelineDetailRow label="Field tilt % target" value={fallback(kpi.fieldTiltPctTarget)} />
                <PipelineDetailRow label="Transition xG for" value={fallback(kpi.transitionXgForTarget)} />
                <PipelineDetailRow label="Transition xG against cap" value={fallback(kpi.transitionXgAgainstCap)} />
                <PipelineDetailRow label="Set-piece xG for" value={fallback(kpi.setPieceXgForTarget)} />
                <PipelineDetailRow label="Set-piece xG against cap" value={fallback(kpi.setPieceXgAgainstCap)} />
              </div>
            </PipelineDetailSection>
          </div>
        ) : null}

        {tab === 'implementationRoadmap' ? (
          <div
            id="playing-style-panel-implementation-roadmap"
            role="tabpanel"
            aria-labelledby="playing-style-tab-implementation-roadmap"
            className="space-y-5"
          >
            <PipelineDetailSection title="Implementation roadmap" id="roadmap">
              <div className="space-y-4">
                <PipelineDetailMultiline label="Season one focus" text={road.seasonOneFocus ?? ''} />
                <PipelineDetailMultiline label="Season two focus" text={road.seasonTwoFocus ?? ''} />
                <PipelineDetailMultiline label="Season three focus" text={road.seasonThreeFocus ?? ''} />
                <PipelineDetailMultiline label="Monthly milestones" text={road.monthlyMilestones ?? ''} />
                <PipelineDetailMultiline label="Capability gaps" text={road.capabilityGaps ?? ''} />
                <PipelineDetailMultiline label="Hiring plan" text={road.hiringPlan ?? ''} />
              </div>
            </PipelineDetailSection>
          </div>
        ) : null}

        {tab === 'governance' ? (
          <div
            id="playing-style-panel-governance"
            role="tabpanel"
            aria-labelledby="playing-style-tab-governance"
            className="space-y-5"
          >
            <PipelineDetailSection title="Governance" id="governance">
              <div className="space-y-4">
                <PipelineDetailRow label="Owner" value={gov.owner ?? '—'} />
                <PipelineDetailRow label="Technical owner" value={gov.technicalOwner ?? '—'} />
                <PipelineDetailRow label="Review cadence" value={gov.reviewCadence ?? '—'} />
                <PipelineDetailRow label="Decision forum" value={gov.decisionForum ?? '—'} />
                <PipelineDetailMultiline label="Approval rules" text={gov.approvalRules ?? ''} />
                <PipelineDetailMultiline label="Escalation rules" text={gov.escalationRules ?? ''} />
              </div>
            </PipelineDetailSection>
            {c.notes?.trim() ? (
              <PipelineDetailSection title="Notes" id="notes">
                <PipelineDetailMultiline label="Working notes" text={c.notes} />
              </PipelineDetailSection>
            ) : null}
          </div>
        ) : null}
      </div>
    </div>
  )
}

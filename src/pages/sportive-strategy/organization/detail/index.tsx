import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getOrganization } from '../../../../api/organization'
import { EmptyState } from '../../../../components/empty-state/EmptyState'
import { PageHeader } from '../../../../components/page-header/PageHeader'
import { pageStack, proseErrorSm, proseMutedSm } from '../../../../components/styles/pageChromeStyles'
import type { OrganizationRecord } from '../../../../types/organization'
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
  PipelineDetailSection,
  PipelineDetailStatus,
} from '../../../director-pipelines/detail/PipelineDetailPrimitives'
import { ORGANIZATION_FORM_STEPS } from '../form/organizationFormStepsMeta'
import { formatOrganizationListDate, organizationListRowTitle } from '../organizationListFormat'

const ORGANIZATION_DETAIL_TABS = [
  'governance',
  'sportingOperations',
  'developmentSystem',
  'pathway',
  'healthPerformance',
  'dataAnalytics',
  'corporateInterface',
] as const

type OrganizationDetailTab = (typeof ORGANIZATION_DETAIL_TABS)[number]

function tabSlug(tabId: OrganizationDetailTab): string {
  return tabId.replace(/([A-Z])/g, '-$1').replace(/^-/, '').toLowerCase()
}

function OrganizationDetailBody({ record }: { record: OrganizationRecord }) {
  const [tab, setTab] = useState<OrganizationDetailTab>('governance')
  const title = useMemo(() => organizationListRowTitle(record), [record])

  const p = record.payload
  const gov = p.governance ?? {}
  const sport = p.sporting_operations ?? {}
  const dev = p.development_system ?? {}
  const path = p.pathway ?? {}
  const health = p.health_performance ?? {}
  const data = p.data_analytics ?? {}
  const corp = p.corporate_interface ?? {}

  return (
    <div className={pageStack}>
      <PageHeader
        breadcrumbItems={[
          { label: 'Sportive Strategy', to: '/sportive-strategy/organization' },
          { label: 'Organization', to: '/sportive-strategy/organization' },
          { label: title },
        ]}
        title={title}
        description="Read-only summary of the saved organization blueprint."
        end={
          <aside className={pipelineDetailHeaderRecordPanelClass}>
            <p className={pipelineDetailHeaderRecordPanelTitleClass}>Record</p>
            <p className={pipelineDetailHeaderRecordValueEmphasisClass}>
              <PipelineDetailStatus status={record.status} />
              {' · '}
              Stage {record.stage}
            </p>
            <p className="mt-2 text-xs text-fume-600 dark:text-fume-300">
              Updated {formatOrganizationListDate(record.updatedAt)}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <Link
                to={`/sportive-strategy/organization/edit?id=${encodeURIComponent(record.id)}`}
                className={pipelinePrimaryButtonClass}
              >
                Edit
              </Link>
              <Link to="/sportive-strategy/organization" className={pipelineSecondaryButtonClass}>
                Back to list
              </Link>
            </div>
          </aside>
        }
      />

      <div className="space-y-5">
        <div className="space-y-2">
          <div className={pipelineTabListClass} role="tablist" aria-label="Organization detail sections">
            {ORGANIZATION_DETAIL_TABS.map((tabId, index) => {
              const label = ORGANIZATION_FORM_STEPS[index]?.title ?? tabId
              const slug = tabSlug(tabId)
              const tabDomId = `organization-tab-${slug}`
              const panelDomId = `organization-panel-${slug}`
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

        {tab === 'governance' ? (
          <div
            id="organization-panel-governance"
            role="tabpanel"
            aria-labelledby="organization-tab-governance"
          >
            <PipelineDetailSection title={ORGANIZATION_FORM_STEPS[0].title}>
              <PipelineDetailMultiline label="Club context" text={gov.clubContext ?? ''} />
              <PipelineDetailMultiline label="Upper management line" text={gov.upperManagementLine ?? ''} />
              <PipelineDetailMultiline label="Critical roles" text={gov.criticalRolesSummary ?? ''} />
              <PipelineDetailMultiline label="Decision rights summary" text={gov.decisionRightsSummary ?? ''} />
              <PipelineDetailMultiline label="Committees overview" text={gov.committeesOverview ?? ''} />
              <PipelineDetailMultiline label="Veto & escalation" text={gov.vetoEscalation ?? ''} />
              <PipelineDetailMultiline label="Policy & principles" text={gov.policyPrinciples ?? ''} />
              <PipelineDetailMultiline label="Versioning & review" text={gov.versioningOrReviewNotes ?? ''} />
            </PipelineDetailSection>
          </div>
        ) : null}

        {tab === 'sportingOperations' ? (
          <div
            id="organization-panel-sporting-operations"
            role="tabpanel"
            aria-labelledby="organization-tab-sporting-operations"
          >
            <PipelineDetailSection title={ORGANIZATION_FORM_STEPS[1].title}>
              <PipelineDetailMultiline label="Department / unit inventory" text={sport.departmentInventory ?? ''} />
              <PipelineDetailMultiline label="Reporting lines" text={sport.reportingLines ?? ''} />
              <PipelineDetailMultiline
                label="Core processes (matchday, training, travel, facilities)"
                text={sport.coreProcessesMatchdayTraining ?? ''}
              />
              <PipelineDetailMultiline
                label="Planned headcount (FTE)"
                text={sport.headcountPlannedFte != null ? String(sport.headcountPlannedFte) : ''}
              />
              <PipelineDetailMultiline label="Facilities & assets" text={sport.facilitiesAllocation ?? ''} />
              <PipelineDetailMultiline label="Outsourced services" text={sport.outsourcedServices ?? ''} />
              <PipelineDetailMultiline label="Org chart / structure" text={sport.orgChartOrStructureNote ?? ''} />
              <PipelineDetailMultiline label="Capability gaps" text={sport.capabilityGaps ?? ''} />
            </PipelineDetailSection>
          </div>
        ) : null}

        {tab === 'developmentSystem' ? (
          <div
            id="organization-panel-development-system"
            role="tabpanel"
            aria-labelledby="organization-tab-development-system"
          >
            <PipelineDetailSection title={ORGANIZATION_FORM_STEPS[2].title}>
              <PipelineDetailMultiline
                label="Playing philosophy reference"
                text={dev.playingPhilosophyReference ?? ''}
              />
              <PipelineDetailMultiline label="Age-group matrix" text={dev.ageGroupMatrix ?? ''} />
              <PipelineDetailMultiline label="Curriculum & periodisation" text={dev.curriculumPeriodization ?? ''} />
              <PipelineDetailMultiline label="Coach standards" text={dev.coachStandards ?? ''} />
              <PipelineDetailMultiline label="Evaluation cadence" text={dev.evaluationCadence ?? ''} />
              <PipelineDetailMultiline label="Video & analysis routine" text={dev.videoAnalysisRoutine ?? ''} />
              <PipelineDetailMultiline label="Language & terminology" text={dev.terminologyReference ?? ''} />
              <PipelineDetailMultiline label="Quality KPIs" text={dev.qualityKpis ?? ''} />
            </PipelineDetailSection>
          </div>
        ) : null}

        {tab === 'pathway' ? (
          <div id="organization-panel-pathway" role="tabpanel" aria-labelledby="organization-tab-pathway">
            <PipelineDetailSection title={ORGANIZATION_FORM_STEPS[3].title}>
              <PipelineDetailMultiline label="Pathway stages & criteria" text={path.pathwayStagesAndCriteria ?? ''} />
              <PipelineDetailMultiline label="Transition decision owners" text={path.transitionDecisionOwners ?? ''} />
              <PipelineDetailMultiline label="Game time & load policy" text={path.gameTimeLoadPolicy ?? ''} />
              <PipelineDetailMultiline label="Dual career & education" text={path.dualCareerEducation ?? ''} />
              <PipelineDetailMultiline
                label="Registration & scouting overview"
                text={path.scoutingRegistrationOverview ?? ''}
              />
              <PipelineDetailMultiline label="First team ↔ academy bridge" text={path.firstTeamAcademyBridge ?? ''} />
              <PipelineDetailMultiline label="Exit / release policy" text={path.exitPolicy ?? ''} />
              <PipelineDetailMultiline
                label="Women’s / parallel pathway"
                text={path.womensOrParallelPathwayNotes ?? ''}
              />
            </PipelineDetailSection>
          </div>
        ) : null}

        {tab === 'healthPerformance' ? (
          <div
            id="organization-panel-health-performance"
            role="tabpanel"
            aria-labelledby="organization-tab-health-performance"
          >
            <PipelineDetailSection title={ORGANIZATION_FORM_STEPS[4].title}>
              <PipelineDetailMultiline label="Medical lead & reporting" text={health.medicalLeadAndReporting ?? ''} />
              <PipelineDetailMultiline label="Multidisciplinary roles" text={health.multidisciplinaryRoles ?? ''} />
              <PipelineDetailMultiline label="Screening protocol" text={health.screeningProtocol ?? ''} />
              <PipelineDetailMultiline label="Injury & load monitoring" text={health.injuryLoadMonitoring ?? ''} />
              <PipelineDetailMultiline label="Rehab & return-to-play" text={health.rehabReturnToPlay ?? ''} />
              <PipelineDetailMultiline label="Mental health & safeguarding" text={health.mentalHealthWelfare ?? ''} />
              <PipelineDetailMultiline label="Nutrition & ergogenic aids" text={health.nutritionPolicy ?? ''} />
              <PipelineDetailMultiline
                label="Minimum standards checklist"
                text={health.minimumStandardsChecklist ?? ''}
              />
            </PipelineDetailSection>
          </div>
        ) : null}

        {tab === 'dataAnalytics' ? (
          <div
            id="organization-panel-data-analytics"
            role="tabpanel"
            aria-labelledby="organization-tab-data-analytics"
          >
            <PipelineDetailSection title={ORGANIZATION_FORM_STEPS[5].title}>
              <PipelineDetailMultiline label="Data inventory" text={data.dataInventory ?? ''} />
              <PipelineDetailMultiline label="Integration status" text={data.integrationStatus ?? ''} />
              <PipelineDetailMultiline label="Reporting ritual" text={data.reportingRitual ?? ''} />
              <PipelineDetailMultiline label="Decision-support rules" text={data.decisionSupportRules ?? ''} />
              <PipelineDetailMultiline label="Access & privacy" text={data.accessPrivacy ?? ''} />
              <PipelineDetailMultiline label="Data quality" text={data.dataQuality ?? ''} />
              <PipelineDetailMultiline label="Roadmap / backlog" text={data.roadmap ?? ''} />
              <PipelineDetailMultiline label="Backup & continuity" text={data.continuityBackup ?? ''} />
            </PipelineDetailSection>
          </div>
        ) : null}

        {tab === 'corporateInterface' ? (
          <div
            id="organization-panel-corporate-interface"
            role="tabpanel"
            aria-labelledby="organization-tab-corporate-interface"
          >
            <PipelineDetailSection title={ORGANIZATION_FORM_STEPS[6].title}>
              <PipelineDetailMultiline label="Budget process" text={corp.budgetProcess ?? ''} />
              <PipelineDetailMultiline
                label="Spending authority & dual sign-off"
                text={corp.spendingAuthorityThresholds ?? ''}
              />
              <PipelineDetailMultiline label="Legal & compliance" text={corp.legalCompliance ?? ''} />
              <PipelineDetailMultiline label="HR interface" text={corp.hrInterface ?? ''} />
              <PipelineDetailMultiline label="Communications & crisis" text={corp.communicationsCrisis ?? ''} />
              <PipelineDetailMultiline label="Stakeholder mapping" text={corp.stakeholderMapping ?? ''} />
              <PipelineDetailMultiline label="Contract lifecycle" text={corp.contractLifecycle ?? ''} />
            </PipelineDetailSection>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export function OrganizationDetailPage() {
  const { organizationId } = useParams<{ organizationId: string }>()
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [error, setError] = useState<string | null>(null)
  const [record, setRecord] = useState<OrganizationRecord | null>(null)

  useEffect(() => {
    if (!organizationId) return
    let cancelled = false
    ;(async () => {
      setStatus('loading')
      setError(null)
      try {
        const data = await getOrganization(organizationId)
        if (cancelled) return
        setRecord(data)
        setStatus('ready')
      } catch (e) {
        if (cancelled) return
        setStatus('error')
        setError(e instanceof Error ? e.message : 'Organization blueprint could not be loaded.')
      }
    })()
    return () => {
      cancelled = true
    }
  }, [organizationId])

  if (!organizationId) {
    return (
      <div className={pageStack}>
        <EmptyState title="Missing id" description="No organization id was provided in the URL." icon="circleHelp" />
      </div>
    )
  }

  if (status === 'loading') {
    return (
      <div className={pageStack}>
        <p className={proseMutedSm}>Loading organization blueprint…</p>
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

  return <OrganizationDetailBody key={record.id} record={record} />
}

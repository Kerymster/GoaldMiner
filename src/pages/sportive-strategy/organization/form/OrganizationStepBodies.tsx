import type { ReactNode } from 'react'
import type { OrganizationFormStepHandlers } from './organizationStepTypes'
import {
  pipelineFieldLabelClass,
  pipelineHelpClass,
  pipelineInputClass,
  pipelineMultiLineListClass,
} from '../../playing-style/playingStyleStyles'

function Field({
  label,
  help,
  children,
}: {
  label: string
  help?: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className={pipelineFieldLabelClass}>{label}</span>
      {help ? <p className={`mt-0.5 ${pipelineHelpClass}`}>{help}</p> : null}
      {children}
    </label>
  )
}

function TextArea({
  value,
  onChange,
  maxLength,
}: {
  value: string
  onChange: (v: string) => void
  maxLength?: number
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      maxLength={maxLength}
      rows={4}
      className={pipelineMultiLineListClass}
    />
  )
}

function OptionalNumber({
  value,
  onChange,
  min,
  max,
}: {
  value: number | null | undefined
  onChange: (v: number | null) => void
  min?: number
  max?: number
}) {
  return (
    <input
      type="number"
      value={value === null || value === undefined ? '' : value}
      onChange={(e) => {
        const raw = e.target.value
        if (raw === '') {
          onChange(null)
          return
        }
        const n = Number(raw)
        if (Number.isNaN(n)) return
        onChange(n)
      }}
      min={min}
      max={max}
      className={pipelineInputClass}
    />
  )
}

export function OrganizationStepBody({ step, payload, patchPayload }: OrganizationFormStepHandlers & { step: number }) {
  const gov = payload.governance ?? {}
  const sport = payload.sporting_operations ?? {}
  const dev = payload.development_system ?? {}
  const path = payload.pathway ?? {}
  const health = payload.health_performance ?? {}
  const data = payload.data_analytics ?? {}
  const corp = payload.corporate_interface ?? {}

  if (step === 0) {
    return (
      <div className="space-y-5">
        <Field
          label="Club context"
          help="League level; number of professional teams; academy (yes/no + short note); women’s team (yes/no + short note)."
        >
          <TextArea
            value={gov.clubContext ?? ''}
            onChange={(clubContext) => patchPayload({ governance: { ...gov, clubContext } })}
            maxLength={2500}
          />
        </Field>
        <Field
          label="Upper management line"
          help="How the board / general assembly relates to the sporting line — narrative or reference to an org diagram."
        >
          <TextArea
            value={gov.upperManagementLine ?? ''}
            onChange={(upperManagementLine) => patchPayload({ governance: { ...gov, upperManagementLine } })}
            maxLength={2500}
          />
        </Field>
        <Field
          label="Critical roles"
          help="Sporting director, head coach, academy director, CEO/GM, etc. Names optional; “role filled / vacant” is enough."
        >
          <TextArea
            value={gov.criticalRolesSummary ?? ''}
            onChange={(criticalRolesSummary) => patchPayload({ governance: { ...gov, criticalRolesSummary } })}
            maxLength={2500}
          />
        </Field>
        <Field
          label="Decision rights summary"
          help="Structured view: who has final sign-off on transfers, extensions, loans, head-coach changes, academy releases, etc. (role → authority)."
        >
          <TextArea
            value={gov.decisionRightsSummary ?? ''}
            onChange={(decisionRightsSummary) => patchPayload({ governance: { ...gov, decisionRightsSummary } })}
            maxLength={4000}
          />
        </Field>
        <Field
          label="Committees overview"
          help="Name, purpose, membership (by role), meeting cadence, example agenda items."
        >
          <TextArea
            value={gov.committeesOverview ?? ''}
            onChange={(committeesOverview) => patchPayload({ governance: { ...gov, committeesOverview } })}
            maxLength={4000}
          />
        </Field>
        <Field
          label="Veto & escalation"
          help="Which topics go to upper management; thresholds (e.g. above budget)."
        >
          <TextArea
            value={gov.vetoEscalation ?? ''}
            onChange={(vetoEscalation) => patchPayload({ governance: { ...gov, vetoEscalation } })}
            maxLength={2500}
          />
        </Field>
        <Field
          label="Policy & principles"
          help="Transparency, ethics, conflicts of interest, stakeholders — document link and/or short summary."
        >
          <TextArea
            value={gov.policyPrinciples ?? ''}
            onChange={(policyPrinciples) => patchPayload({ governance: { ...gov, policyPrinciples } })}
            maxLength={4000}
          />
        </Field>
        <Field
          label="Versioning & review"
          help="Effective date for this section; pointer to prior version if the strategy is updated annually."
        >
          <TextArea
            value={gov.versioningOrReviewNotes ?? ''}
            onChange={(versioningOrReviewNotes) =>
              patchPayload({ governance: { ...gov, versioningOrReviewNotes } })
            }
            maxLength={2000}
          />
        </Field>
      </div>
    )
  }

  if (step === 1) {
    return (
      <div className="space-y-5">
        <Field
          label="Department / unit inventory"
          help="Unit name, short mandate, active vs dormant."
        >
          <TextArea
            value={sport.departmentInventory ?? ''}
            onChange={(departmentInventory) =>
              patchPayload({ sporting_operations: { ...sport, departmentInventory } })
            }
            maxLength={4000}
          />
        </Field>
        <Field
          label="Reporting lines"
          help="For each unit: parent unit or parent role it reports into."
        >
          <TextArea
            value={sport.reportingLines ?? ''}
            onChange={(reportingLines) => patchPayload({ sporting_operations: { ...sport, reportingLines } })}
            maxLength={4000}
          />
        </Field>
        <Field
          label="Core processes (ownership)"
          help="Which unit owns matchday, training day, travel, facility booking — ownership level, not every task."
        >
          <TextArea
            value={sport.coreProcessesMatchdayTraining ?? ''}
            onChange={(coreProcessesMatchdayTraining) =>
              patchPayload({ sporting_operations: { ...sport, coreProcessesMatchdayTraining } })
            }
            maxLength={4000}
          />
        </Field>
        <Field
          label="Planned headcount (FTE)"
          help="Optional: planned FTE per unit or a minimum staffing note (0–5000)."
        >
          <OptionalNumber
            value={sport.headcountPlannedFte}
            onChange={(headcountPlannedFte) =>
              patchPayload({ sporting_operations: { ...sport, headcountPlannedFte } })
            }
            min={0}
            max={5000}
          />
        </Field>
        <Field
          label="Facilities & assets"
          help="Which unit has priority access to which sites or assets."
        >
          <TextArea
            value={sport.facilitiesAllocation ?? ''}
            onChange={(facilitiesAllocation) =>
              patchPayload({ sporting_operations: { ...sport, facilitiesAllocation } })
            }
            maxLength={2500}
          />
        </Field>
        <Field
          label="Outsourced services"
          help="What is delivered by vendors (security, catering, video, etc.) — unit + contract type at a useful level of detail."
        >
          <TextArea
            value={sport.outsourcedServices ?? ''}
            onChange={(outsourcedServices) =>
              patchPayload({ sporting_operations: { ...sport, outsourcedServices } })
            }
            maxLength={2500}
          />
        </Field>
        <Field
          label="Org chart / structure"
          help="Single visual reference or editable tree — product choice; describe what you use."
        >
          <TextArea
            value={sport.orgChartOrStructureNote ?? ''}
            onChange={(orgChartOrStructureNote) =>
              patchPayload({ sporting_operations: { ...sport, orgChartOrStructureNote } })
            }
            maxLength={4000}
          />
        </Field>
        <Field
          label="Capability gaps (backlog)"
          help="Units you still need but have not defined."
        >
          <TextArea
            value={sport.capabilityGaps ?? ''}
            onChange={(capabilityGaps) => patchPayload({ sporting_operations: { ...sport, capabilityGaps } })}
            maxLength={2500}
          />
        </Field>
      </div>
    )
  }

  if (step === 2) {
    return (
      <div className="space-y-5">
        <Field
          label="Playing philosophy reference"
          help="Which top-level strategy document this section points to (ID or label)."
        >
          <TextArea
            value={dev.playingPhilosophyReference ?? ''}
            onChange={(playingPhilosophyReference) =>
              patchPayload({ development_system: { ...dev, playingPhilosophyReference } })
            }
            maxLength={1200}
          />
        </Field>
        <Field
          label="Age-group matrix"
          help="U6 through first team: per row, target outcomes (short text or level tags)."
        >
          <TextArea
            value={dev.ageGroupMatrix ?? ''}
            onChange={(ageGroupMatrix) => patchPayload({ development_system: { ...dev, ageGroupMatrix } })}
            maxLength={4000}
          />
        </Field>
        <Field
          label="Curriculum & periodisation"
          help="Weekly template, periodisation philosophy; who owns authoring (role)."
        >
          <TextArea
            value={dev.curriculumPeriodization ?? ''}
            onChange={(curriculumPeriodization) =>
              patchPayload({ development_system: { ...dev, curriculumPeriodization } })
            }
            maxLength={4000}
          />
        </Field>
        <Field
          label="Coach standards"
          help="Minimum licence level, role descriptions, mentoring yes/no."
        >
          <TextArea
            value={dev.coachStandards ?? ''}
            onChange={(coachStandards) => patchPayload({ development_system: { ...dev, coachStandards } })}
            maxLength={4000}
          />
        </Field>
        <Field
          label="Evaluation cadence"
          help="How often player development reports run and who completes them."
        >
          <TextArea
            value={dev.evaluationCadence ?? ''}
            onChange={(evaluationCadence) =>
              patchPayload({ development_system: { ...dev, evaluationCadence } })
            }
            maxLength={2500}
          />
        </Field>
        <Field
          label="Video & analysis routine"
          help="Minimum analysis per match; who produces it."
        >
          <TextArea
            value={dev.videoAnalysisRoutine ?? ''}
            onChange={(videoAnalysisRoutine) =>
              patchPayload({ development_system: { ...dev, videoAnalysisRoutine } })
            }
            maxLength={2500}
          />
        </Field>
        <Field
          label="Language & terminology"
          help="In-house glossary or “game principles” reference."
        >
          <TextArea
            value={dev.terminologyReference ?? ''}
            onChange={(terminologyReference) =>
              patchPayload({ development_system: { ...dev, terminologyReference } })
            }
            maxLength={2000}
          />
        </Field>
        <Field
          label="Quality KPIs"
          help="e.g. coach education hours, curriculum adherence — keep simple at first."
        >
          <TextArea
            value={dev.qualityKpis ?? ''}
            onChange={(qualityKpis) => patchPayload({ development_system: { ...dev, qualityKpis } })}
            maxLength={2500}
          />
        </Field>
      </div>
    )
  }

  if (step === 3) {
    return (
      <div className="space-y-5">
        <Field
          label="Pathway stages & criteria"
          help="Stage name, age band, promotion criteria — structured list plus free text."
        >
          <TextArea
            value={path.pathwayStagesAndCriteria ?? ''}
            onChange={(pathwayStagesAndCriteria) =>
              patchPayload({ pathway: { ...path, pathwayStagesAndCriteria } })
            }
            maxLength={4000}
          />
        </Field>
        <Field
          label="Transition decision owners"
          help="Who approves moves; appeal / review process."
        >
          <TextArea
            value={path.transitionDecisionOwners ?? ''}
            onChange={(transitionDecisionOwners) =>
              patchPayload({ pathway: { ...path, transitionDecisionOwners } })
            }
            maxLength={2500}
          />
        </Field>
        <Field
          label="Game time & load policy"
          help="Principles for match load with young players — text or tags."
        >
          <TextArea
            value={path.gameTimeLoadPolicy ?? ''}
            onChange={(gameTimeLoadPolicy) => patchPayload({ pathway: { ...path, gameTimeLoadPolicy } })}
            maxLength={2500}
          />
        </Field>
        <Field
          label="Dual career & education"
          help="School partnerships; mandatory education support yes/no."
        >
          <TextArea
            value={path.dualCareerEducation ?? ''}
            onChange={(dualCareerEducation) => patchPayload({ pathway: { ...path, dualCareerEducation } })}
            maxLength={2500}
          />
        </Field>
        <Field
          label="Registration & scouting overview"
          help="Regional trials, invite-only paths — short summary."
        >
          <TextArea
            value={path.scoutingRegistrationOverview ?? ''}
            onChange={(scoutingRegistrationOverview) =>
              patchPayload({ pathway: { ...path, scoutingRegistrationOverview } })
            }
            maxLength={2000}
          />
        </Field>
        <Field
          label="First team ↔ academy bridge"
          help="Training call-ups, special invitation rules."
        >
          <TextArea
            value={path.firstTeamAcademyBridge ?? ''}
            onChange={(firstTeamAcademyBridge) =>
              patchPayload({ pathway: { ...path, firstTeamAcademyBridge } })
            }
            maxLength={2500}
          />
        </Field>
        <Field
          label="Exit / release policy"
          help="End of registration, references, inter-club communication — high-level text."
        >
          <TextArea
            value={path.exitPolicy ?? ''}
            onChange={(exitPolicy) => patchPayload({ pathway: { ...path, exitPolicy } })}
            maxLength={2500}
          />
        </Field>
        <Field
          label="Women’s / parallel pathway"
          help="Separate pathway block or “same template + differences”."
        >
          <TextArea
            value={path.womensOrParallelPathwayNotes ?? ''}
            onChange={(womensOrParallelPathwayNotes) =>
              patchPayload({ pathway: { ...path, womensOrParallelPathwayNotes } })
            }
            maxLength={2000}
          />
        </Field>
      </div>
    )
  }

  if (step === 4) {
    return (
      <div className="space-y-5">
        <Field
          label="Medical lead & reporting"
          help="Lead role, reporting line, emergency protocol summary or document link."
        >
          <TextArea
            value={health.medicalLeadAndReporting ?? ''}
            onChange={(medicalLeadAndReporting) =>
              patchPayload({ health_performance: { ...health, medicalLeadAndReporting } })
            }
            maxLength={2500}
          />
        </Field>
        <Field
          label="Multidisciplinary roles"
          help="Doctor, physio, S&C, nutrition, psychology — coverage and remit."
        >
          <TextArea
            value={health.multidisciplinaryRoles ?? ''}
            onChange={(multidisciplinaryRoles) =>
              patchPayload({ health_performance: { ...health, multidisciplinaryRoles } })
            }
            maxLength={4000}
          />
        </Field>
        <Field
          label="Screening protocol"
          help="Pre-season medicals, cardiac screening, etc. — yes/no + standard note."
        >
          <TextArea
            value={health.screeningProtocol ?? ''}
            onChange={(screeningProtocol) =>
              patchPayload({ health_performance: { ...health, screeningProtocol } })
            }
            maxLength={2500}
          />
        </Field>
        <Field
          label="Injury & load monitoring"
          help="Load tools, daily wellness surveys — in use or not."
        >
          <TextArea
            value={health.injuryLoadMonitoring ?? ''}
            onChange={(injuryLoadMonitoring) =>
              patchPayload({ health_performance: { ...health, injuryLoadMonitoring } })
            }
            maxLength={2500}
          />
        </Field>
        <Field
          label="Rehab & return-to-play"
          help="Stages; criteria to return to head-coach control."
        >
          <TextArea
            value={health.rehabReturnToPlay ?? ''}
            onChange={(rehabReturnToPlay) =>
              patchPayload({ health_performance: { ...health, rehabReturnToPlay } })
            }
            maxLength={2500}
          />
        </Field>
        <Field
          label="Mental health & safeguarding"
          help="Internal helpline, external partner, confidentiality summary."
        >
          <TextArea
            value={health.mentalHealthWelfare ?? ''}
            onChange={(mentalHealthWelfare) =>
              patchPayload({ health_performance: { ...health, mentalHealthWelfare } })
            }
            maxLength={2500}
          />
        </Field>
        <Field
          label="Nutrition & ergogenic aids"
          help="Club policy; supplement rules."
        >
          <TextArea
            value={health.nutritionPolicy ?? ''}
            onChange={(nutritionPolicy) => patchPayload({ health_performance: { ...health, nutritionPolicy } })}
            maxLength={2000}
          />
        </Field>
        <Field
          label="Minimum standards checklist"
          help="Pitch-side kit, ambulance, etc. — yes/no items; can align with UEFA medical guidance."
        >
          <TextArea
            value={health.minimumStandardsChecklist ?? ''}
            onChange={(minimumStandardsChecklist) =>
              patchPayload({ health_performance: { ...health, minimumStandardsChecklist } })
            }
            maxLength={4000}
          />
        </Field>
      </div>
    )
  }

  if (step === 5) {
    return (
      <div className="space-y-5">
        <Field
          label="Data inventory"
          help="Data type (match, training, health, scouting), source system, owning unit."
        >
          <TextArea
            value={data.dataInventory ?? ''}
            onChange={(dataInventory) => patchPayload({ data_analytics: { ...data, dataInventory } })}
            maxLength={4000}
          />
        </Field>
        <Field
          label="Integration status"
          help="Manual, semi-automated, API — between systems."
        >
          <TextArea
            value={data.integrationStatus ?? ''}
            onChange={(integrationStatus) =>
              patchPayload({ data_analytics: { ...data, integrationStatus } })
            }
            maxLength={2500}
          />
        </Field>
        <Field
          label="Reporting ritual"
          help="Who receives which report how often — by role."
        >
          <TextArea
            value={data.reportingRitual ?? ''}
            onChange={(reportingRitual) => patchPayload({ data_analytics: { ...data, reportingRitual } })}
            maxLength={2500}
          />
        </Field>
        <Field
          label="Decision-support rules"
          help="When data is mandatory vs expert judgement is enough."
        >
          <TextArea
            value={data.decisionSupportRules ?? ''}
            onChange={(decisionSupportRules) =>
              patchPayload({ data_analytics: { ...data, decisionSupportRules } })
            }
            maxLength={4000}
          />
        </Field>
        <Field
          label="Access & privacy"
          help="Role-based access; high-level retention for player data."
        >
          <TextArea
            value={data.accessPrivacy ?? ''}
            onChange={(accessPrivacy) => patchPayload({ data_analytics: { ...data, accessPrivacy } })}
            maxLength={2500}
          />
        </Field>
        <Field
          label="Data quality"
          help="Validation, deduplication (e.g. player master ID)."
        >
          <TextArea
            value={data.dataQuality ?? ''}
            onChange={(dataQuality) => patchPayload({ data_analytics: { ...data, dataQuality } })}
            maxLength={2000}
          />
        </Field>
        <Field
          label="Roadmap / backlog"
          help="Missing datasets or planned tools."
        >
          <TextArea
            value={data.roadmap ?? ''}
            onChange={(roadmap) => patchPayload({ data_analytics: { ...data, roadmap } })}
            maxLength={2500}
          />
        </Field>
        <Field
          label="Backup & continuity"
          help="Optional: business continuity for critical systems."
        >
          <TextArea
            value={data.continuityBackup ?? ''}
            onChange={(continuityBackup) => patchPayload({ data_analytics: { ...data, continuityBackup } })}
            maxLength={2000}
          />
        </Field>
      </div>
    )
  }

  if (step === 6) {
    return (
      <div className="space-y-5">
        <Field
          label="Budget process"
          help="How the sporting budget is proposed, approval steps, transfer spend limits (figures or narrative)."
        >
          <TextArea
            value={corp.budgetProcess ?? ''}
            onChange={(budgetProcess) => patchPayload({ corporate_interface: { ...corp, budgetProcess } })}
            maxLength={4000}
          />
        </Field>
        <Field
          label="Spending authority & dual sign-off"
          help="Threshold table — structured here or PDF reference."
        >
          <TextArea
            value={corp.spendingAuthorityThresholds ?? ''}
            onChange={(spendingAuthorityThresholds) =>
              patchPayload({ corporate_interface: { ...corp, spendingAuthorityThresholds } })
            }
            maxLength={2500}
          />
        </Field>
        <Field
          label="Legal & compliance"
          help="FIFA/UEFA/local rules; which unit owns contract templates."
        >
          <TextArea
            value={corp.legalCompliance ?? ''}
            onChange={(legalCompliance) => patchPayload({ corporate_interface: { ...corp, legalCompliance } })}
            maxLength={2500}
          />
        </Field>
        <Field
          label="HR interface"
          help="HR’s role in sporting hires."
        >
          <TextArea
            value={corp.hrInterface ?? ''}
            onChange={(hrInterface) => patchPayload({ corporate_interface: { ...corp, hrInterface } })}
            maxLength={2000}
          />
        </Field>
        <Field
          label="Communications & crisis"
          help="Official spokesperson, approved messaging, social media rules."
        >
          <TextArea
            value={corp.communicationsCrisis ?? ''}
            onChange={(communicationsCrisis) =>
              patchPayload({ corporate_interface: { ...corp, communicationsCrisis } })
            }
            maxLength={2500}
          />
        </Field>
        <Field
          label="Stakeholder mapping"
          help="Investors, sponsors, fan representation — information flow summary."
        >
          <TextArea
            value={corp.stakeholderMapping ?? ''}
            onChange={(stakeholderMapping) =>
              patchPayload({ corporate_interface: { ...corp, stakeholderMapping } })
            }
            maxLength={2500}
          />
        </Field>
        <Field
          label="Contract lifecycle"
          help="Who initiates, negotiates, and signs — role workflow."
        >
          <TextArea
            value={corp.contractLifecycle ?? ''}
            onChange={(contractLifecycle) =>
              patchPayload({ corporate_interface: { ...corp, contractLifecycle } })
            }
            maxLength={2500}
          />
        </Field>
      </div>
    )
  }

  return null
}

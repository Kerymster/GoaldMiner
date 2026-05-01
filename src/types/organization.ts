/** Organization blueprint — wire shape aligned with backend `payload` (snake_case top-level keys). */

export type OrganizationGovernance = {
  clubContext?: string
  upperManagementLine?: string
  criticalRolesSummary?: string
  decisionRightsSummary?: string
  committeesOverview?: string
  vetoEscalation?: string
  policyPrinciples?: string
  versioningOrReviewNotes?: string
}

export type OrganizationSportingOperations = {
  departmentInventory?: string
  reportingLines?: string
  coreProcessesMatchdayTraining?: string
  headcountPlannedFte?: number | null
  facilitiesAllocation?: string
  outsourcedServices?: string
  orgChartOrStructureNote?: string
  capabilityGaps?: string
}

export type OrganizationDevelopmentSystem = {
  playingPhilosophyReference?: string
  ageGroupMatrix?: string
  curriculumPeriodization?: string
  coachStandards?: string
  evaluationCadence?: string
  videoAnalysisRoutine?: string
  terminologyReference?: string
  qualityKpis?: string
}

export type OrganizationPathway = {
  pathwayStagesAndCriteria?: string
  transitionDecisionOwners?: string
  gameTimeLoadPolicy?: string
  dualCareerEducation?: string
  scoutingRegistrationOverview?: string
  firstTeamAcademyBridge?: string
  exitPolicy?: string
  womensOrParallelPathwayNotes?: string
}

export type OrganizationHealthPerformance = {
  medicalLeadAndReporting?: string
  multidisciplinaryRoles?: string
  screeningProtocol?: string
  injuryLoadMonitoring?: string
  rehabReturnToPlay?: string
  mentalHealthWelfare?: string
  nutritionPolicy?: string
  minimumStandardsChecklist?: string
}

export type OrganizationDataAnalytics = {
  dataInventory?: string
  integrationStatus?: string
  reportingRitual?: string
  decisionSupportRules?: string
  accessPrivacy?: string
  dataQuality?: string
  roadmap?: string
  continuityBackup?: string
}

export type OrganizationCorporateInterface = {
  budgetProcess?: string
  spendingAuthorityThresholds?: string
  legalCompliance?: string
  hrInterface?: string
  communicationsCrisis?: string
  stakeholderMapping?: string
  contractLifecycle?: string
}

export type OrganizationPayload = {
  governance?: OrganizationGovernance
  sporting_operations?: OrganizationSportingOperations
  development_system?: OrganizationDevelopmentSystem
  pathway?: OrganizationPathway
  health_performance?: OrganizationHealthPerformance
  data_analytics?: OrganizationDataAnalytics
  corporate_interface?: OrganizationCorporateInterface
}

export type OrganizationRecordCreateBody = {
  title?: string
  payload?: OrganizationPayload
}

export type OrganizationRecordPatchBody = {
  title?: string | null
  payload?: OrganizationPayload
  stage?: number
}

export type OrganizationStatus = 'active' | 'archived'

export type OrganizationRecord = {
  id: string
  title: string | null
  status: OrganizationStatus
  /** 1–7 wizard step persisted by the API */
  stage: number
  payload: OrganizationPayload
  createdAt: string
  updatedAt: string
}

function emptyGovernance(): OrganizationGovernance {
  return {}
}

function emptySportingOperations(): OrganizationSportingOperations {
  return {}
}

function emptyDevelopmentSystem(): OrganizationDevelopmentSystem {
  return {}
}

function emptyPathway(): OrganizationPathway {
  return {}
}

function emptyHealthPerformance(): OrganizationHealthPerformance {
  return {}
}

function emptyDataAnalytics(): OrganizationDataAnalytics {
  return {}
}

function emptyCorporateInterface(): OrganizationCorporateInterface {
  return {}
}

export function emptyOrganizationPayload(): OrganizationPayload {
  return {
    governance: emptyGovernance(),
    sporting_operations: emptySportingOperations(),
    development_system: emptyDevelopmentSystem(),
    pathway: emptyPathway(),
    health_performance: emptyHealthPerformance(),
    data_analytics: emptyDataAnalytics(),
    corporate_interface: emptyCorporateInterface(),
  }
}

export function normalizeOrganizationPayload(
  input: OrganizationPayload | undefined | null,
): OrganizationPayload {
  const base = emptyOrganizationPayload()
  if (!input) return base
  return {
    governance: { ...base.governance, ...input.governance },
    sporting_operations: { ...base.sporting_operations, ...input.sporting_operations },
    development_system: { ...base.development_system, ...input.development_system },
    pathway: { ...base.pathway, ...input.pathway },
    health_performance: { ...base.health_performance, ...input.health_performance },
    data_analytics: { ...base.data_analytics, ...input.data_analytics },
    corporate_interface: { ...base.corporate_interface, ...input.corporate_interface },
  }
}

export function organizationPayloadFromRecord(record: OrganizationRecord | null | undefined): OrganizationPayload {
  return normalizeOrganizationPayload(record?.payload)
}

function hasValue(value: string | undefined): boolean {
  return Boolean(value && value.trim().length > 0)
}

const MAX_TITLE = 160

export function validateOrganizationCreateBody(body: OrganizationRecordCreateBody): string[] {
  const errors: string[] = []
  if (body.title != null && body.title.trim().length > MAX_TITLE) {
    errors.push(`title: must be at most ${MAX_TITLE} characters`)
  }
  const gov = body.payload?.governance
  if (!hasValue(gov?.clubContext)) {
    errors.push('payload.governance.clubContext: required')
  } else if ((gov!.clubContext!.trim().length ?? 0) > 2500) {
    errors.push('payload.governance.clubContext: must be at most 2500 characters')
  }
  return errors
}

export function organizationGovernanceStepErrors(payload: OrganizationPayload): string[] {
  return validateOrganizationCreateBody({ payload }).filter((e) => e.startsWith('payload.governance.'))
}

export function mergeOrganizationPayload(prev: OrganizationPayload, patch: Partial<OrganizationPayload>): OrganizationPayload {
  const base = normalizeOrganizationPayload(prev)
  return {
    governance: patch.governance !== undefined ? { ...base.governance, ...patch.governance } : base.governance,
    sporting_operations:
      patch.sporting_operations !== undefined
        ? { ...base.sporting_operations, ...patch.sporting_operations }
        : base.sporting_operations,
    development_system:
      patch.development_system !== undefined
        ? { ...base.development_system, ...patch.development_system }
        : base.development_system,
    pathway: patch.pathway !== undefined ? { ...base.pathway, ...patch.pathway } : base.pathway,
    health_performance:
      patch.health_performance !== undefined
        ? { ...base.health_performance, ...patch.health_performance }
        : base.health_performance,
    data_analytics:
      patch.data_analytics !== undefined ? { ...base.data_analytics, ...patch.data_analytics } : base.data_analytics,
    corporate_interface:
      patch.corporate_interface !== undefined
        ? { ...base.corporate_interface, ...patch.corporate_interface }
        : base.corporate_interface,
  }
}

export const styleModels = [
  'possession',
  'high_press',
  'direct',
  'balanced',
  'adaptive',
  'other',
] as const

export const pressingHeights = ['high', 'mid', 'low', 'adaptive'] as const

export const transitionApproaches = ['counter_press', 'regroup', 'mixed'] as const

export type StyleModel = (typeof styleModels)[number]
export type PressingHeight = (typeof pressingHeights)[number]
export type TransitionApproach = (typeof transitionApproaches)[number]

export type PlayingStyleIdentity = {
  threeYearVision: string
  styleStatement: string
  styleModel?: StyleModel
  nonNegotiables?: string
  fanExperienceIntent?: string
  coachProfileFit?: string
}

export type PlayingStyleInPossession = {
  buildUpApproach?: string
  progressionPlan?: string
  finalThirdPlan?: string
  widthCreationPlan?: string
  tempoControlPlan?: string
  pressResistancePlan?: string
}

export type PlayingStyleOffensiveTransition = {
  firstFiveSecondsPlan?: string
  directnessPolicy?: string
  runnerPriority?: string
  triggerZones?: string
  supportStructure?: string
}

export type PlayingStyleFinishing = {
  chanceCreationPattern?: string
  boxOccupationRules?: string
  shotSelectionPolicy?: string
  crossingPolicy?: string
  cutbackPolicy?: string
  setAttackFallbackPlan?: string
}

export type PlayingStyleOutOfPossession = {
  pressingHeight?: PressingHeight
  blockStructure?: string
  pressingTriggers?: string
  centralProtectionRules?: string
  wideDefendingRules?: string
  lineCompactnessRules?: string
}

export type PlayingStyleDefensiveTransition = {
  transitionApproach?: TransitionApproach
  restDefensePlan?: string
  tacticalFoulPolicy?: string
  counterPressDurationSeconds?: number | null
  emergencyRecoveryShape?: string
}

export type PlayingStyleSetPieces = {
  attackingCornersPlan?: string
  defensiveSetPiecePlan?: string
  throwInPlan?: string
  attackingFreeKickPlan?: string
  defensiveFreeKickPlan?: string
  secondBallPlan?: string
}

export type PlayingStylePlayerProfiles = {
  keyRoleProfiles?: string
  recruitmentFitRules?: string
  academyFitRules?: string
  roleDepthRequirements?: string
  leadershipProfileRules?: string
  physicalThresholdRules?: string
}

export type PlayingStyleMatchManagement = {
  gameStateAheadPlan?: string
  gameStateBehindPlan?: string
  tenMenPlan?: string
  equalGameStatePlan?: string
  substitutionModel?: string
  opponentSpecificAdjustments?: string
}

export type PlayingStyleKpiTargets = {
  possessionPctTarget?: number | null
  ppdaTarget?: number | null
  finalThirdEntriesTarget?: number | null
  boxEntriesTarget?: number | null
  highRegainsTarget?: number | null
  fieldTiltPctTarget?: number | null
  transitionXgForTarget?: number | null
  transitionXgAgainstCap?: number | null
  setPieceXgForTarget?: number | null
  setPieceXgAgainstCap?: number | null
}

export type PlayingStyleImplementationRoadmap = {
  seasonOneFocus?: string
  seasonTwoFocus?: string
  seasonThreeFocus?: string
  monthlyMilestones?: string
  capabilityGaps?: string
  hiringPlan?: string
}

export type PlayingStyleGovernance = {
  owner?: string
  technicalOwner?: string
  reviewCadence?: string
  decisionForum?: string
  approvalRules?: string
  escalationRules?: string
}

export type PlayingStyleContext = {
  identity: PlayingStyleIdentity
  inPossession?: PlayingStyleInPossession
  offensiveTransition?: PlayingStyleOffensiveTransition
  finishing?: PlayingStyleFinishing
  outOfPossession?: PlayingStyleOutOfPossession
  defensiveTransition?: PlayingStyleDefensiveTransition
  setPieces?: PlayingStyleSetPieces
  playerProfiles?: PlayingStylePlayerProfiles
  matchManagement?: PlayingStyleMatchManagement
  kpiTargets?: PlayingStyleKpiTargets
  implementationRoadmap?: PlayingStyleImplementationRoadmap
  governance?: PlayingStyleGovernance
  notes?: string
}

export type PlayingStyleRecordCreateBody = {
  title?: string
  context: PlayingStyleContext
}

export type PlayingStyleRecordPatchBody = {
  title?: string | null
  context?: PlayingStyleContext
  stage?: number
}

export type PlayingStyleStatus = 'active' | 'archived'

export type PlayingStyleRecord = {
  id: string
  title: string | null
  status: PlayingStyleStatus
  /** 1–12 wizard step persisted by the API */
  stage: number
  context: PlayingStyleContext
  createdAt: string
  updatedAt: string
}

export const playingStyleOptionLabels: Record<string, string> = {
  possession: 'Possession',
  high_press: 'High press',
  direct: 'Direct',
  balanced: 'Balanced',
  adaptive: 'Adaptive',
  other: 'Other',
  high: 'High',
  mid: 'Mid',
  low: 'Low',
  counter_press: 'Counter-press',
  regroup: 'Regroup',
  mixed: 'Mixed',
}

export function labelForPlayingStyleOption(value: string | undefined | null): string {
  if (!value) return '—'
  return playingStyleOptionLabels[value] ?? value.replace(/_/g, ' ')
}

function emptyInPossession(): PlayingStyleInPossession {
  return {
    buildUpApproach: '',
    progressionPlan: '',
    finalThirdPlan: '',
    widthCreationPlan: '',
    tempoControlPlan: '',
    pressResistancePlan: '',
  }
}

function emptyOffensiveTransition(): PlayingStyleOffensiveTransition {
  return {
    firstFiveSecondsPlan: '',
    directnessPolicy: '',
    runnerPriority: '',
    triggerZones: '',
    supportStructure: '',
  }
}

function emptyFinishing(): PlayingStyleFinishing {
  return {
    chanceCreationPattern: '',
    boxOccupationRules: '',
    shotSelectionPolicy: '',
    crossingPolicy: '',
    cutbackPolicy: '',
    setAttackFallbackPlan: '',
  }
}

function emptyOutOfPossession(): PlayingStyleOutOfPossession {
  return {
    blockStructure: '',
    pressingTriggers: '',
    centralProtectionRules: '',
    wideDefendingRules: '',
    lineCompactnessRules: '',
  }
}

function emptyDefensiveTransition(): PlayingStyleDefensiveTransition {
  return {
    restDefensePlan: '',
    tacticalFoulPolicy: '',
    counterPressDurationSeconds: null,
    emergencyRecoveryShape: '',
  }
}

function emptySetPieces(): PlayingStyleSetPieces {
  return {
    attackingCornersPlan: '',
    defensiveSetPiecePlan: '',
    throwInPlan: '',
    attackingFreeKickPlan: '',
    defensiveFreeKickPlan: '',
    secondBallPlan: '',
  }
}

function emptyPlayerProfiles(): PlayingStylePlayerProfiles {
  return {
    keyRoleProfiles: '',
    recruitmentFitRules: '',
    academyFitRules: '',
    roleDepthRequirements: '',
    leadershipProfileRules: '',
    physicalThresholdRules: '',
  }
}

function emptyMatchManagement(): PlayingStyleMatchManagement {
  return {
    gameStateAheadPlan: '',
    gameStateBehindPlan: '',
    tenMenPlan: '',
    equalGameStatePlan: '',
    substitutionModel: '',
    opponentSpecificAdjustments: '',
  }
}

function emptyKpiTargets(): PlayingStyleKpiTargets {
  return {
    possessionPctTarget: null,
    ppdaTarget: null,
    finalThirdEntriesTarget: null,
    boxEntriesTarget: null,
    highRegainsTarget: null,
    fieldTiltPctTarget: null,
    transitionXgForTarget: null,
    transitionXgAgainstCap: null,
    setPieceXgForTarget: null,
    setPieceXgAgainstCap: null,
  }
}

function emptyImplementationRoadmap(): PlayingStyleImplementationRoadmap {
  return {
    seasonOneFocus: '',
    seasonTwoFocus: '',
    seasonThreeFocus: '',
    monthlyMilestones: '',
    capabilityGaps: '',
    hiringPlan: '',
  }
}

function emptyGovernance(): PlayingStyleGovernance {
  return {
    owner: '',
    technicalOwner: '',
    reviewCadence: '',
    decisionForum: '',
    approvalRules: '',
    escalationRules: '',
  }
}

export function createEmptyPlayingStyleContext(): PlayingStyleContext {
  return {
    identity: {
      threeYearVision: '',
      styleStatement: '',
      nonNegotiables: '',
      fanExperienceIntent: '',
      coachProfileFit: '',
    },
    inPossession: emptyInPossession(),
    offensiveTransition: emptyOffensiveTransition(),
    finishing: emptyFinishing(),
    outOfPossession: emptyOutOfPossession(),
    defensiveTransition: emptyDefensiveTransition(),
    setPieces: emptySetPieces(),
    playerProfiles: emptyPlayerProfiles(),
    matchManagement: emptyMatchManagement(),
    kpiTargets: emptyKpiTargets(),
    implementationRoadmap: emptyImplementationRoadmap(),
    governance: emptyGovernance(),
    notes: '',
  }
}

function hasValue(value: string | undefined): boolean {
  return Boolean(value && value.trim().length > 0)
}

/** Merge API record into form context (fills missing nested objects). */
export function playingStyleContextFromRecord(record: PlayingStyleRecord | null | undefined): PlayingStyleContext {
  const base = createEmptyPlayingStyleContext()
  if (!record?.context) return base
  const c = record.context
  return {
    identity: { ...base.identity, ...c.identity },
    inPossession: { ...base.inPossession, ...c.inPossession },
    offensiveTransition: { ...base.offensiveTransition, ...c.offensiveTransition },
    finishing: { ...base.finishing, ...c.finishing },
    outOfPossession: { ...base.outOfPossession, ...c.outOfPossession },
    defensiveTransition: {
      ...base.defensiveTransition,
      ...c.defensiveTransition,
    },
    setPieces: { ...base.setPieces, ...c.setPieces },
    playerProfiles: { ...base.playerProfiles, ...c.playerProfiles },
    matchManagement: { ...base.matchManagement, ...c.matchManagement },
    kpiTargets: { ...base.kpiTargets, ...c.kpiTargets },
    implementationRoadmap: { ...base.implementationRoadmap, ...c.implementationRoadmap },
    governance: { ...base.governance, ...c.governance },
    notes: c.notes ?? '',
  }
}

export function validatePlayingStyleCreateBody(payload: PlayingStyleRecordCreateBody): string[] {
  const errors: string[] = []
  if (payload.title != null && payload.title.trim().length > 160) {
    errors.push('title: must be at most 160 characters')
  }
  const idn = payload.context.identity
  if (!hasValue(idn.threeYearVision)) {
    errors.push('context.identity.threeYearVision: required')
  } else if (idn.threeYearVision.trim().length > 2000) {
    errors.push('context.identity.threeYearVision: must be at most 2000 characters')
  }
  if (!hasValue(idn.styleStatement)) {
    errors.push('context.identity.styleStatement: required')
  } else if (idn.styleStatement.trim().length > 1500) {
    errors.push('context.identity.styleStatement: must be at most 1500 characters')
  }
  if (idn.nonNegotiables != null && idn.nonNegotiables.trim().length > 2000) {
    errors.push('context.identity.nonNegotiables: must be at most 2000 characters')
  }
  if (idn.fanExperienceIntent != null && idn.fanExperienceIntent.trim().length > 1200) {
    errors.push('context.identity.fanExperienceIntent: must be at most 1200 characters')
  }
  if (idn.coachProfileFit != null && idn.coachProfileFit.trim().length > 1200) {
    errors.push('context.identity.coachProfileFit: must be at most 1200 characters')
  }
  return errors
}

export function playingStyleIdentityStepErrors(context: PlayingStyleContext): string[] {
  return validatePlayingStyleCreateBody({ context }).filter((e) => e.startsWith('context.identity.'))
}

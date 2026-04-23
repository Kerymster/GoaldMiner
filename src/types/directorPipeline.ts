export const ownershipModels = [
  'state_or_sovereign',
  'family_private',
  'private_equity',
  'hedge_fund',
  'multi_club_group',
  'listed_company',
  'fan_owned',
  'community_trust',
  'other',
] as const

export const ownershipTenures = ['established', 'new', 'in_transition'] as const
export const ownerMandates = [
  'sustainable_growth',
  'trophy_win',
  'investment_asset',
  'develop_and_sell',
  'survival',
  'rebuild',
  'other',
] as const

export const primaryObjectives = [
  'win_domestic_title',
  'qualify_champions_league',
  'qualify_europe',
  'mid_table_consolidation',
  'avoid_relegation',
  'promote_tier',
  'develop_and_trade',
  'rebuild',
] as const

export const playingStyles = [
  'possession',
  'high_press',
  'gegenpress',
  'direct',
  'defensive_counter',
  'balanced',
  'flexible',
  'other',
] as const

export const transferApproaches = [
  'buy_to_win',
  'develop_and_sell',
  'loan_heavy',
  'academy_first',
  'mixed',
] as const

export const ffpStatuses = ['compliant', 'monitoring', 'restricted', 'na'] as const
export const academyIntegrationLevels = ['low', 'medium', 'high', 'core'] as const

export type OwnershipModel = (typeof ownershipModels)[number]
export type OwnershipTenure = (typeof ownershipTenures)[number]
export type OwnerMandate = (typeof ownerMandates)[number]
export type PrimaryObjective = (typeof primaryObjectives)[number]
export type PlayingStyle = (typeof playingStyles)[number]
export type TransferApproach = (typeof transferApproaches)[number]
export type FfpStatus = (typeof ffpStatuses)[number]
export type AcademyIntegrationLevel = (typeof academyIntegrationLevels)[number]
export type ClubProfile = {
  clubName: string
  clubShortName?: string
  country?: string
  league?: string
  leagueTier?: number
  seasonLabel?: string
}
export type Ownership = {
  model: OwnershipModel
  displayName?: string
  tenure?: OwnershipTenure
  mandate: OwnerMandate
  boardExpectations?: string
}
export type SportingObjectives = {
  timeHorizonYears: number
  primaryObjective: PrimaryObjective
  /** Free text; backend may normalize later. */
  secondaryObjectives?: string
  targetLeaguePositionFrom?: number
  targetLeaguePositionTo?: number
  cupAmbitions?: string
}
export type PlayingIdentity = {
  style?: PlayingStyle
  styleNotes?: string
  /** Free text; backend may normalize later. */
  preferredFormations?: string
  nonNegotiables?: string
  academyIntegration?: AcademyIntegrationLevel
}
export type FinancialFramework = {
  currency: string
  seasonOperatingBudget?: number | null
  transferBudgetNet?: number | null
  transferBudgetGross?: number | null
  annualWageBudget?: number | null
  wageToRevenueCapPct?: number | null
  ffpStatus?: FfpStatus
  profitTargetPerSeason?: number | null
}
export type SquadStrategy = {
  targetSquadSize?: number
  foreignPlayerLimit?: number | null
  homegrownQuotaPct?: number | null
  transferApproach?: TransferApproach
  targetAverageAge?: number
}
export type Constraints = {
  /** Free text; backend may normalize later. */
  items?: string
  keyRisks?: string
}
export type Stakeholders = {
  ownerName?: string
  ceoName?: string
  currentHeadCoach?: string
  reportsTo?: string
}
export type DirectorContext = {
  club: ClubProfile
  ownership: Ownership
  objectives: SportingObjectives
  playingIdentity?: PlayingIdentity
  financial?: FinancialFramework
  squadStrategy?: SquadStrategy
  constraints?: Constraints
  stakeholders?: Stakeholders
  mandate: string
  notes?: string
}
export type DirectorContextPartial = Partial<DirectorContext>
export type DirectorPipelineCreateBody = {
  title?: string
  context: DirectorContext
}
export type DirectorPipelinePatchBody = {
  title?: string | null
  context?: Record<string, unknown>
}

export type DirectorPipelineStatus = 'active' | 'archived'

export type DirectorPipeline = {
  id: string
  title: string | null
  status: DirectorPipelineStatus
  context: DirectorContext
  createdAt: string
  updatedAt: string
}

export const requiredStepOneFields = [
  'club.clubName',
  'ownership.model',
  'ownership.mandate',
  'objectives.primaryObjective',
  'objectives.timeHorizonYears',
  'mandate',
] as const

/** Normalize legacy `string[]` API values into a single string for form display. */
export function coerceContextListFieldToString(value: unknown): string {
  if (value == null) return ''
  if (typeof value === 'string') return value
  if (Array.isArray(value)) {
    return value
      .map((v) => String(v).trim())
      .filter(Boolean)
      .join('\n')
  }
  return String(value)
}

export function createEmptyDirectorContext(): DirectorContext {
  return {
    club: {
      clubName: '',
      clubShortName: '',
      country: '',
      league: '',
      seasonLabel: '',
    },
    ownership: {
      model: ownershipModels[0],
      displayName: '',
      tenure: undefined,
      mandate: ownerMandates[0],
      boardExpectations: '',
    },
    objectives: {
      timeHorizonYears: 3,
      primaryObjective: primaryObjectives[0],
      secondaryObjectives: '',
      cupAmbitions: '',
    },
    playingIdentity: {
      style: undefined,
      styleNotes: '',
      preferredFormations: '',
      nonNegotiables: '',
      academyIntegration: undefined,
    },
    financial: {
      currency: 'EUR',
      seasonOperatingBudget: null,
      transferBudgetNet: null,
      transferBudgetGross: null,
      annualWageBudget: null,
      wageToRevenueCapPct: null,
      ffpStatus: undefined,
      profitTargetPerSeason: null,
    },
    squadStrategy: {
      targetSquadSize: undefined,
      foreignPlayerLimit: null,
      homegrownQuotaPct: null,
      transferApproach: undefined,
      targetAverageAge: undefined,
    },
    constraints: {
      items: '',
      keyRisks: '',
    },
    stakeholders: {
      ownerName: '',
      ceoName: '',
      currentHeadCoach: '',
      reportsTo: '',
    },
    mandate: '',
    notes: '',
  }
}

export const optionLabels: Record<string, string> = {
  state_or_sovereign: 'State / sovereign',
  family_private: 'Family private',
  private_equity: 'Private equity',
  hedge_fund: 'Hedge fund',
  multi_club_group: 'Multi-club group',
  listed_company: 'Listed company',
  fan_owned: 'Fan owned',
  community_trust: 'Community trust',
  other: 'Other',
  established: 'Established',
  new: 'New',
  in_transition: 'In transition',
  sustainable_growth: 'Sustainable growth',
  trophy_win: 'Trophy win',
  investment_asset: 'Investment asset',
  develop_and_sell: 'Develop and sell',
  survival: 'Survival',
  rebuild: 'Rebuild',
  win_domestic_title: 'Win domestic title',
  qualify_champions_league: 'Qualify for Champions League',
  qualify_europe: 'Qualify for Europe',
  mid_table_consolidation: 'Mid-table consolidation',
  avoid_relegation: 'Avoid relegation',
  promote_tier: 'Promote tier',
  develop_and_trade: 'Develop and trade',
  possession: 'Possession',
  high_press: 'High press',
  gegenpress: 'Gegenpress',
  direct: 'Direct',
  defensive_counter: 'Defensive counter',
  balanced: 'Balanced',
  flexible: 'Flexible',
  buy_to_win: 'Buy to win',
  loan_heavy: 'Loan heavy',
  academy_first: 'Academy first',
  compliant: 'Compliant',
  monitoring: 'Monitoring',
  restricted: 'Restricted',
  na: 'N/A',
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  core: 'Core',
  mixed: 'Mixed',
}

export function labelForOption(value: string | undefined | null): string {
  if (!value) return '—'
  return optionLabels[value] ?? value
}

export function buildMandateBrief(context: DirectorContext): string {
  const club = context.club.clubName || 'this club'
  const horizon = context.objectives.timeHorizonYears
  const objective = labelForOption(context.objectives.primaryObjective)
  const style = context.playingIdentity?.style
    ? ` with a ${labelForOption(context.playingIdentity.style).toLowerCase()} identity`
    : ''
  return `Over the next ${horizon} years at ${club}, we target ${objective.toLowerCase()}${style} while following the ownership mandate: ${labelForOption(context.ownership.mandate).toLowerCase()}.`
}

function hasValue(value: string | undefined): boolean {
  return Boolean(value && value.trim().length > 0)
}

export function validateDirectorPipelineCreateBody(payload: DirectorPipelineCreateBody): string[] {
  const errors: string[] = []

  if (payload.title && payload.title.trim().length > 160) {
    errors.push('title: must be at most 160 characters')
  }

  if (!hasValue(payload.context.club.clubName) || payload.context.club.clubName.trim().length > 120) {
    errors.push('context.club.clubName: required and must be at most 120 characters')
  }

  if (payload.context.club.leagueTier != null && (payload.context.club.leagueTier < 1 || payload.context.club.leagueTier > 6)) {
    errors.push('context.club.leagueTier: must be between 1 and 6')
  }

  if (payload.context.objectives.timeHorizonYears < 1 || payload.context.objectives.timeHorizonYears > 10) {
    errors.push('context.objectives.timeHorizonYears: must be between 1 and 10')
  }

  if (
    payload.context.objectives.targetLeaguePositionFrom != null &&
    payload.context.objectives.targetLeaguePositionTo != null &&
    payload.context.objectives.targetLeaguePositionFrom > payload.context.objectives.targetLeaguePositionTo
  ) {
    errors.push('context.objectives.targetLeaguePositionFrom: must be less than or equal to targetLeaguePositionTo')
  }

  if (!hasValue(payload.context.mandate) || payload.context.mandate.trim().length > 4000) {
    errors.push('context.mandate: required and must be at most 4000 characters')
  }

  return errors
}

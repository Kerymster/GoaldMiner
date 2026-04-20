/**
 * Pro-level scout report — form shape for UI and future API payload.
 * Serialize with JSON; map field names to backend when the save endpoint exists.
 */

/** Canonical values for `playerInformation.preferredFoot` (POST / UI). */
export const SCOUT_PREFERRED_FOOT_OPTIONS = [
  'Left Only',
  'Left',
  'Right Only',
  'Right',
  'Both',
] as const

export type ScoutReportPlayerInformation = {
  name: string
  /** Backend field name; UI uses ISO `YYYY-MM-DD` via `<input type="date" />`. */
  ageOrDob: string
  nationality: string
  heightCm: number | null
  weightKg: number | null
  /** One of `SCOUT_PREFERRED_FOOT_OPTIONS` when set from the create form. */
  preferredFoot: string
  /** FM-style code (e.g. GK, ST) — see `FM_POSITION_CODES` in `src/data/fmPositionRoles.ts`. */
  position: string
  /** Optional second position code; empty string = not set. */
  secondaryPosition: string
  /** Role name from `FM_POSITION_ROLES[position]`; required when `position` is set. */
  mostlyUsedRole: string
  /** Free-text other roles (not validated against FM lists). */
  otherRoles: string
  club: string
  contractIfKnown: string
}

/** 4–5 sentences max — single narrative covering the four questions */
export type ScoutReportExecutiveSummary = {
  narrative: string
}

export type ScoutReportPlayingStyle = {
  systemFit: string
  tacticalIntelligence: string
  roleOnPitch: string
  systemVsIndividual: string
  bestFormations: string
}

export type ScoutReportTechnicalBallControl = {
  firstTouch: string
  tightSpaceQuality: string
}

export type ScoutReportTechnicalPassing = {
  shortAndLong: string
  creativity: string
}

export type ScoutReportTechnicalDribbling = {
  oneVsOne: string
  changeOfDirection: string
}

export type ScoutReportTechnicalFinishing = {
  shotQuality: string
  penaltyAreaEffectiveness: string
}

export type ScoutReportTechnical = {
  ballControl: ScoutReportTechnicalBallControl
  passing: ScoutReportTechnicalPassing
  dribbling: ScoutReportTechnicalDribbling
  finishing: ScoutReportTechnicalFinishing
}

export type ScoutReportTacticalPositioning = {
  rightPlace: string
  findingSpace: string
}

export type ScoutReportTacticalOffBall = {
  runsWithoutBall: string
  creatingSpace: string
}

export type ScoutReportTacticalDefensive = {
  pressing: string
  trackingBack: string
  tackleTiming: string
}

export type ScoutReportTactical = {
  positioning: ScoutReportTacticalPositioning
  offBallMovement: ScoutReportTacticalOffBall
  defensiveContribution: ScoutReportTacticalDefensive
}

export type ScoutReportPhysical = {
  paceAccelerationSprint: string
  stamina: string
  strength: string
  balance: string
}

export type ScoutReportMental = {
  decisionMaking: string
  gameIntelligence: string
  discipline: string
  confidence: string
  performanceUnderPressure: string
}

export type ScoutReportStatisticalPerMatch = {
  passPercent: string
  shots: string
  keyPasses: string
  ballLosses: string
  defensiveActions: string
}

export type ScoutReportStatisticalSnapshot = {
  dataSource: string
  perMatch: ScoutReportStatisticalPerMatch
  /** Interpretation — not raw numbers only */
  interpretation: string
}

export type ScoutReportStrengthsWeaknesses = {
  strengths: string
  weaknesses: string
}

export type ScoutReportPotential = {
  ceiling: string
  developmentAreas: string
  riskFactors: string
}

export type ScoutReportComparison = {
  playingStyleComparison: string
  levelComparison: string
}

export type ScoutReportTeamFit = {
  whichTeams: string
  whichSystems: string
  transferRecommendation: string
  finalVerdict: string
  ratingOutOfFive: number | null
}

export const STAFF_RATING_MIN = 5
export const STAFF_RATING_MAX = 10

export type ScoutReportForm = {
  reportDate: string
  playerInformation: ScoutReportPlayerInformation
  executiveSummary: ScoutReportExecutiveSummary
  playingStyle: ScoutReportPlayingStyle
  technical: ScoutReportTechnical
  tactical: ScoutReportTactical
  physical: ScoutReportPhysical
  mental: ScoutReportMental
  statisticalSnapshot: ScoutReportStatisticalSnapshot
  strengthsWeaknesses: ScoutReportStrengthsWeaknesses
  potential: ScoutReportPotential
  comparison: ScoutReportComparison
  teamFit: ScoutReportTeamFit
}

export type ScoutReportStepMeta = {
  id: string
  title: string
  description: string
}

export const SCOUT_REPORT_STEPS: readonly ScoutReportStepMeta[] = [
  {
    id: 'player-information',
    title: 'Player information',
    description: 'Report date, identity, physique, club context.',
  },
  {
    id: 'playing-style',
    title: 'Playing style & role',
    description: 'System fit, tactical intelligence — position & role from step 1 shown here.',
  },
  {
    id: 'technical',
    title: 'Technical analysis',
    description: 'Ball control, passing, dribbling, finishing.',
  },
  {
    id: 'tactical',
    title: 'Tactical analysis',
    description: 'Positioning, off-ball work, defensive contribution.',
  },
  {
    id: 'physical',
    title: 'Physical profile',
    description: 'Pace, stamina, strength, balance.',
  },
  {
    id: 'mental',
    title: 'Mental profile',
    description: 'Decisions, IQ, discipline, pressure.',
  },
  {
    id: 'statistical',
    title: 'Statistical snapshot',
    description: 'Per-match metrics + interpretation (e.g. SofaScore).',
  },
  {
    id: 'strengths-weaknesses',
    title: 'Strengths & weaknesses',
    description: 'Clear pros and cons.',
  },
  {
    id: 'potential',
    title: 'Potential assessment',
    description: 'Ceiling, development, risks.',
  },
  {
    id: 'comparison',
    title: 'Comparison (optional)',
    description: 'Style and level vs reference players.',
  },
  {
    id: 'team-fit',
    title: 'Team fit & recommendation',
    description: 'Verdict, transfer stance, star rating.',
  },
  {
    id: 'executive-summary',
    title: 'Executive summary',
    description: '4–5 sentences max — synthesize everything above.',
  },
] as const

export function createEmptyScoutReportForm(): ScoutReportForm {
  const today = new Date().toISOString().slice(0, 10)
  return {
    reportDate: today,
    playerInformation: {
      name: '',
      ageOrDob: '',
      nationality: '',
      heightCm: null,
      weightKg: null,
      preferredFoot: '',
      position: '',
      secondaryPosition: '',
      mostlyUsedRole: '',
      otherRoles: '',
      club: '',
      contractIfKnown: '',
    },
    executiveSummary: { narrative: '' },
    playingStyle: {
      systemFit: '',
      tacticalIntelligence: '',
      roleOnPitch: '',
      systemVsIndividual: '',
      bestFormations: '',
    },
    technical: {
      ballControl: { firstTouch: '', tightSpaceQuality: '' },
      passing: { shortAndLong: '', creativity: '' },
      dribbling: { oneVsOne: '', changeOfDirection: '' },
      finishing: { shotQuality: '', penaltyAreaEffectiveness: '' },
    },
    tactical: {
      positioning: { rightPlace: '', findingSpace: '' },
      offBallMovement: { runsWithoutBall: '', creatingSpace: '' },
      defensiveContribution: {
        pressing: '',
        trackingBack: '',
        tackleTiming: '',
      },
    },
    physical: {
      paceAccelerationSprint: '',
      stamina: '',
      strength: '',
      balance: '',
    },
    mental: {
      decisionMaking: '',
      gameIntelligence: '',
      discipline: '',
      confidence: '',
      performanceUnderPressure: '',
    },
    statisticalSnapshot: {
      dataSource: '',
      perMatch: {
        passPercent: '',
        shots: '',
        keyPasses: '',
        ballLosses: '',
        defensiveActions: '',
      },
      interpretation: '',
    },
    strengthsWeaknesses: { strengths: '', weaknesses: '' },
    potential: { ceiling: '', developmentAreas: '', riskFactors: '' },
    comparison: { playingStyleComparison: '', levelComparison: '' },
    teamFit: {
      whichTeams: '',
      whichSystems: '',
      transferRecommendation: '',
      finalVerdict: '',
      ratingOutOfFive: null,
    },
  }
}

import {
  getRolesForPosition,
  isPositionCode,
} from '../../../data/positionRoles'
import type { ScoutReportForm } from '../../../types/scoutReportForm'

/** Field keys are unique within a single step (used for `errors[key]` under inputs). */
export type ScoutReportStepErrors = Partial<Record<string, string>>

const REQUIRED = 'required'

export const HEIGHT_CM_MIN = 120
export const HEIGHT_CM_MAX = 230
export const WEIGHT_KG_MIN = 35
export const WEIGHT_KG_MAX = 130

function heightRangeMessage() {
  return `Use ${HEIGHT_CM_MIN}–${HEIGHT_CM_MAX} cm`
}

function weightRangeMessage() {
  return `Use ${WEIGHT_KG_MIN}–${WEIGHT_KG_MAX} kg`
}

function need(errors: ScoutReportStepErrors, key: string, value: string) {
  if (!value.trim()) errors[key] = REQUIRED
}

function needHeightCm(errors: ScoutReportStepErrors, n: number | null) {
  if (n == null || !Number.isFinite(n) || !Number.isInteger(n)) {
    errors.heightCm = REQUIRED
    return
  }
  if (n < HEIGHT_CM_MIN || n > HEIGHT_CM_MAX) errors.heightCm = heightRangeMessage()
}

/** Optional: empty is OK; when set, must be an integer in range. */
function validateWeightKgOptional(errors: ScoutReportStepErrors, n: number | null) {
  if (n == null) return
  if (!Number.isFinite(n) || !Number.isInteger(n)) {
    errors.weightKg = REQUIRED
    return
  }
  if (n < WEIGHT_KG_MIN || n > WEIGHT_KG_MAX) errors.weightKg = weightRangeMessage()
}

/**
 * Validates every field shown on the given wizard step. Empty strings fail.
 * Rating on step 10 must be 1–5 (not “Not set”).
 */
export function validateScoutReportStep(
  step: number,
  form: ScoutReportForm,
): ScoutReportStepErrors {
  const e: ScoutReportStepErrors = {}
  const p = form.playerInformation

  switch (step) {
    case 0:
      need(e, 'reportDate', form.reportDate)
      need(e, 'name', p.name)
      need(e, 'ageOrDob', p.ageOrDob)
      need(e, 'nationality', p.nationality)
      needHeightCm(e, p.heightCm)
      validateWeightKgOptional(e, p.weightKg)
      need(e, 'preferredFoot', p.preferredFoot)
      need(e, 'position', p.position)
      {
        const pos = p.position.trim()
        if (pos) {
          if (!isPositionCode(pos)) {
            e.position = 'Select a valid position'
          } else {
            need(e, 'mostlyUsedRole', p.mostlyUsedRole)
            const allowed = getRolesForPosition(pos)
            if (
              p.mostlyUsedRole.trim() &&
              allowed.length > 0 &&
              !allowed.includes(p.mostlyUsedRole.trim())
            ) {
              e.mostlyUsedRole = 'Pick a role for this position'
            }
          }
        }
      }
      {
        const sec = p.secondaryPosition.trim()
        if (sec && !isPositionCode(sec)) e.secondaryPosition = 'Select a valid position or None'
      }
      need(e, 'club', p.club)
      break
    case 1:
      need(e, 'role', form.playingStyle.role)
      need(e, 'systemFit', form.playingStyle.systemFit)
      need(e, 'tacticalIntelligence', form.playingStyle.tacticalIntelligence)
      need(e, 'roleOnPitch', form.playingStyle.roleOnPitch)
      need(e, 'systemVsIndividual', form.playingStyle.systemVsIndividual)
      need(e, 'bestFormations', form.playingStyle.bestFormations)
      break
    case 2: {
      const t = form.technical
      need(e, 'firstTouch', t.ballControl.firstTouch)
      need(e, 'tightSpaceQuality', t.ballControl.tightSpaceQuality)
      need(e, 'shortAndLong', t.passing.shortAndLong)
      need(e, 'creativity', t.passing.creativity)
      need(e, 'oneVsOne', t.dribbling.oneVsOne)
      need(e, 'changeOfDirection', t.dribbling.changeOfDirection)
      need(e, 'shotQuality', t.finishing.shotQuality)
      need(e, 'penaltyAreaEffectiveness', t.finishing.penaltyAreaEffectiveness)
      break
    }
    case 3: {
      const t = form.tactical
      need(e, 'rightPlace', t.positioning.rightPlace)
      need(e, 'findingSpace', t.positioning.findingSpace)
      need(e, 'runsWithoutBall', t.offBallMovement.runsWithoutBall)
      need(e, 'creatingSpace', t.offBallMovement.creatingSpace)
      need(e, 'pressing', t.defensiveContribution.pressing)
      need(e, 'trackingBack', t.defensiveContribution.trackingBack)
      need(e, 'tackleTiming', t.defensiveContribution.tackleTiming)
      break
    }
    case 4:
      need(e, 'paceAccelerationSprint', form.physical.paceAccelerationSprint)
      need(e, 'stamina', form.physical.stamina)
      need(e, 'strength', form.physical.strength)
      need(e, 'balance', form.physical.balance)
      break
    case 5:
      need(e, 'decisionMaking', form.mental.decisionMaking)
      need(e, 'gameIntelligence', form.mental.gameIntelligence)
      need(e, 'discipline', form.mental.discipline)
      need(e, 'confidence', form.mental.confidence)
      need(e, 'performanceUnderPressure', form.mental.performanceUnderPressure)
      break
    case 6: {
      const s = form.statisticalSnapshot
      need(e, 'dataSource', s.dataSource)
      need(e, 'passPercent', s.perMatch.passPercent)
      need(e, 'shots', s.perMatch.shots)
      need(e, 'keyPasses', s.perMatch.keyPasses)
      need(e, 'ballLosses', s.perMatch.ballLosses)
      need(e, 'defensiveActions', s.perMatch.defensiveActions)
      need(e, 'interpretation', s.interpretation)
      break
    }
    case 7:
      need(e, 'strengths', form.strengthsWeaknesses.strengths)
      need(e, 'weaknesses', form.strengthsWeaknesses.weaknesses)
      break
    case 8:
      need(e, 'ceiling', form.potential.ceiling)
      need(e, 'developmentAreas', form.potential.developmentAreas)
      need(e, 'riskFactors', form.potential.riskFactors)
      break
    case 9:
      need(e, 'playingStyleComparison', form.comparison.playingStyleComparison)
      need(e, 'levelComparison', form.comparison.levelComparison)
      break
    case 10: {
      const tf = form.teamFit
      need(e, 'whichTeams', tf.whichTeams)
      need(e, 'whichSystems', tf.whichSystems)
      need(e, 'transferRecommendation', tf.transferRecommendation)
      need(e, 'finalVerdict', tf.finalVerdict)
      if (tf.ratingOutOfFive == null) e.ratingOutOfFive = REQUIRED
      break
    }
    case 11:
      need(e, 'executiveNarrative', form.executiveSummary.narrative)
      break
    default:
      break
  }

  return e
}

export function hasStepErrors(errors: ScoutReportStepErrors): boolean {
  return Object.keys(errors).length > 0
}

import {
  buildMandateBrief,
  createEmptyDirectorContext,
  type DirectorContext,
} from '../../../types/directorPipeline'
import type { DirectorPipelineFormStepHandlers } from './directorPipelineFormStepHandlers'
import { parseInteger, parseNullableInteger, parseOptionalNumber } from './formHelpers'

/**
 * Builds `DirectorPipelineFormStepHandlers` for the current `context` snapshot — keeps nested context
 * updates in one place instead of the route component (`DirectorPipelineForm`).
 */
export function createDirectorPipelineFormStepHandlers(
  context: DirectorContext,
  setContextPatch: (patch: Partial<DirectorContext>) => void,
): DirectorPipelineFormStepHandlers {
  return {
    context,
    setContextPatch,
    parseInteger,
    parseNullableInteger,
    parseOptionalNumber,
    updateClub(key, value) {
      setContextPatch({ club: { ...context.club, [key]: value } })
    },
    updateOwnership(key, value) {
      setContextPatch({ ownership: { ...context.ownership, [key]: value } })
    },
    updateObjectives(key, value) {
      setContextPatch({ objectives: { ...context.objectives, [key]: value } })
    },
    updatePlayingIdentity(key, value) {
      setContextPatch({ playingIdentity: { ...context.playingIdentity, [key]: value } })
    },
    updateFinancial(key, value) {
      const financial =
        (context.financial ??
          createEmptyDirectorContext().financial) as NonNullable<DirectorContext['financial']>
      setContextPatch({ financial: { ...financial, [key]: value } })
    },
    updateSquad(key, value) {
      setContextPatch({ squadStrategy: { ...context.squadStrategy, [key]: value } })
    },
    updateConstraints(key, value) {
      setContextPatch({ constraints: { ...context.constraints, [key]: value } })
    },
    updateStakeholders(key, value) {
      setContextPatch({ stakeholders: { ...context.stakeholders, [key]: value } })
    },
  }
}

/** “Generate planning brief” — fills mandate when empty, otherwise keeps existing text. */
export function mergePlanningBriefDraftIntoMandate(context: DirectorContext): Partial<DirectorContext> {
  const draft = buildMandateBrief(context)
  return { mandate: context.mandate.trim() ? context.mandate : draft }
}

/** Modal confirm: overwrite mandate with the full generated brief. */
export function mandatePatchFromGeneratedBrief(context: DirectorContext): Partial<DirectorContext> {
  return { mandate: buildMandateBrief(context) }
}

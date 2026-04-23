import type { DirectorContext } from '../../../types/directorPipeline'

/**
 * Update callbacks passed into each pipeline form step — mirrors `DirectorPipelineForm` state helpers.
 */
export type DirectorPipelineFormStepHandlers = {
  context: DirectorContext
  setContextPatch: (patch: Partial<DirectorContext>) => void
  updateClub: <K extends keyof DirectorContext['club']>(key: K, value: DirectorContext['club'][K]) => void
  updateOwnership: <K extends keyof DirectorContext['ownership']>(key: K, value: DirectorContext['ownership'][K]) => void
  updateObjectives: <K extends keyof DirectorContext['objectives']>(key: K, value: DirectorContext['objectives'][K]) => void
  updatePlayingIdentity: <K extends keyof NonNullable<DirectorContext['playingIdentity']>>(
    key: K,
    value: NonNullable<DirectorContext['playingIdentity']>[K],
  ) => void
  updateFinancial: <K extends keyof NonNullable<DirectorContext['financial']>>(
    key: K,
    value: NonNullable<DirectorContext['financial']>[K],
  ) => void
  updateSquad: <K extends keyof NonNullable<DirectorContext['squadStrategy']>>(
    key: K,
    value: NonNullable<DirectorContext['squadStrategy']>[K],
  ) => void
  updateConstraints: <K extends keyof NonNullable<DirectorContext['constraints']>>(
    key: K,
    value: NonNullable<DirectorContext['constraints']>[K],
  ) => void
  updateStakeholders: <K extends keyof NonNullable<DirectorContext['stakeholders']>>(
    key: K,
    value: NonNullable<DirectorContext['stakeholders']>[K],
  ) => void
  parseInteger: (value: string) => number | undefined
  parseNullableInteger: (value: string) => number | null | undefined
  parseOptionalNumber: (value: string) => number | undefined
}

import {
  coerceContextListFieldToString,
  createEmptyDirectorContext,
  type DirectorContext,
  type DirectorPipeline,
} from '../../../types/directorPipeline'

export function parseInteger(value: string): number | undefined {
  const trimmed = value.trim()
  if (!trimmed) return undefined
  const n = Number(trimmed)
  return Number.isFinite(n) ? Math.trunc(n) : undefined
}

export function parseNullableInteger(value: string): number | null | undefined {
  if (!value.trim()) return null
  return parseInteger(value)
}

export function parseOptionalNumber(value: string): number | undefined {
  const trimmed = value.trim()
  if (!trimmed) return undefined
  const n = Number(trimmed)
  return Number.isFinite(n) ? n : undefined
}

export function stepOneErrors(context: DirectorContext): string[] {
  const errors: string[] = []
  if (!context.club.clubName.trim()) errors.push('Club name is required.')
  if (!context.ownership.model) errors.push('Ownership model is required.')
  if (!context.ownership.mandate) errors.push('Ownership mandate is required.')
  if (!context.objectives.primaryObjective) errors.push('Primary objective is required.')
  if (!context.objectives.timeHorizonYears) errors.push('Time horizon is required.')
  if (!context.mandate.trim()) errors.push('Mandate summary is required.')
  return errors
}

export function getContextFromPipeline(p: DirectorPipeline | null | undefined): DirectorContext {
  const base = createEmptyDirectorContext()
  if (!p) return base
  const rawObjectives = p.context.objectives
  const rawPlaying = p.context.playingIdentity
  const rawConstraints = p.context.constraints

  return {
    ...base,
    ...p.context,
    club: { ...base.club, ...p.context.club },
    ownership: { ...base.ownership, ...p.context.ownership },
    objectives: {
      ...base.objectives,
      ...rawObjectives,
      secondaryObjectives: coerceContextListFieldToString(rawObjectives?.secondaryObjectives),
    },
    playingIdentity: {
      ...base.playingIdentity,
      ...(rawPlaying ?? {}),
      preferredFormations: coerceContextListFieldToString(rawPlaying?.preferredFormations),
    },
    financial: {
      ...(base.financial as NonNullable<DirectorContext['financial']>),
      ...(p.context.financial ?? {}),
    },
    squadStrategy: { ...base.squadStrategy, ...(p.context.squadStrategy ?? {}) },
    constraints: {
      ...base.constraints,
      ...(rawConstraints ?? {}),
      items: coerceContextListFieldToString(rawConstraints?.items),
    },
    stakeholders: { ...base.stakeholders, ...(p.context.stakeholders ?? {}) },
  }
}

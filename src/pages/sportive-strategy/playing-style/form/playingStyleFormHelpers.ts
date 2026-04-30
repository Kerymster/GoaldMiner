import type { PlayingStyleContext } from '../../../../types/playingStyle'

/** Deep-merge known `PlayingStyleContext` slices for PATCH-sized local edits. */
export function mergePlayingStyleContext(
  prev: PlayingStyleContext,
  patch: Partial<PlayingStyleContext>,
): PlayingStyleContext {
  return {
    ...prev,
    ...patch,
    identity: patch.identity ? { ...prev.identity, ...patch.identity } : prev.identity,
    inPossession:
      patch.inPossession !== undefined
        ? { ...(prev.inPossession ?? {}), ...patch.inPossession }
        : prev.inPossession,
    offensiveTransition:
      patch.offensiveTransition !== undefined
        ? { ...(prev.offensiveTransition ?? {}), ...patch.offensiveTransition }
        : prev.offensiveTransition,
    finishing: patch.finishing !== undefined ? { ...(prev.finishing ?? {}), ...patch.finishing } : prev.finishing,
    outOfPossession:
      patch.outOfPossession !== undefined
        ? { ...(prev.outOfPossession ?? {}), ...patch.outOfPossession }
        : prev.outOfPossession,
    defensiveTransition:
      patch.defensiveTransition !== undefined
        ? { ...(prev.defensiveTransition ?? {}), ...patch.defensiveTransition }
        : prev.defensiveTransition,
    setPieces: patch.setPieces !== undefined ? { ...(prev.setPieces ?? {}), ...patch.setPieces } : prev.setPieces,
    playerProfiles:
      patch.playerProfiles !== undefined
        ? { ...(prev.playerProfiles ?? {}), ...patch.playerProfiles }
        : prev.playerProfiles,
    matchManagement:
      patch.matchManagement !== undefined
        ? { ...(prev.matchManagement ?? {}), ...patch.matchManagement }
        : prev.matchManagement,
    kpiTargets:
      patch.kpiTargets !== undefined ? { ...(prev.kpiTargets ?? {}), ...patch.kpiTargets } : prev.kpiTargets,
    implementationRoadmap:
      patch.implementationRoadmap !== undefined
        ? { ...(prev.implementationRoadmap ?? {}), ...patch.implementationRoadmap }
        : prev.implementationRoadmap,
    governance:
      patch.governance !== undefined ? { ...(prev.governance ?? {}), ...patch.governance } : prev.governance,
    notes: patch.notes !== undefined ? patch.notes : prev.notes,
  }
}

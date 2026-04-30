import type { PlayingStyleContext } from '../../../../types/playingStyle'

export type PlayingStyleFormStepHandlers = {
  context: PlayingStyleContext
  patchContext: (patch: Partial<PlayingStyleContext>) => void
}

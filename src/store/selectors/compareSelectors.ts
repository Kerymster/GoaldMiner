import type { RootState } from '../store'

export const selectComparePlayerAId = (state: RootState) =>
  state.compare.playerAId

export const selectComparePlayerBId = (state: RootState) =>
  state.compare.playerBId

import { createSelector } from '@reduxjs/toolkit'
import type { RootState } from '../store'

export const selectPlayersState = (state: RootState) => state.players

export const selectPlayersList = (state: RootState) => state.players.items

export const selectPlayersStatus = (state: RootState) => state.players.status

export const selectPlayersError = (state: RootState) => state.players.error

export const selectPlayerById = createSelector(
  [selectPlayersList, (_state: RootState, playerId: string | undefined) => playerId],
  (items, playerId) =>
    playerId ? items.find((p) => p.id === playerId) : undefined,
)

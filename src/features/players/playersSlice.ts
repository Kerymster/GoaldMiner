import {
  createSlice,
  type PayloadAction,
} from '@reduxjs/toolkit'
import type { Player } from '../../types/player'
import { players as seedPlayers } from '../../data/players'

export type PlayersStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

export type PlayersState = {
  items: Player[]
  status: PlayersStatus
  error: string | null
}

const initialState: PlayersState = {
  items: seedPlayers,
  status: 'succeeded',
  error: null,
}

export const playersSlice = createSlice({
  name: 'players',
  initialState,
  reducers: {
    setPlayersLoading(state) {
      state.status = 'loading'
      state.error = null
    },
    setPlayers(state, action: PayloadAction<Player[]>) {
      state.items = action.payload
      state.status = 'succeeded'
      state.error = null
    },
    setPlayersError(state, action: PayloadAction<string>) {
      state.status = 'failed'
      state.error = action.payload
    },
  },
})

export const { setPlayers, setPlayersLoading, setPlayersError } =
  playersSlice.actions

export const playersReducer = playersSlice.reducer

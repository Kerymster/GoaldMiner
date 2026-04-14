import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { players as seedPlayers } from '../../data/players'

export type CompareState = {
  playerAId: string
  playerBId: string
}

const initialState: CompareState = {
  playerAId: seedPlayers[0]?.id ?? '',
  playerBId: seedPlayers[1]?.id ?? '',
}

export const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    setComparePlayerA(state, action: PayloadAction<string>) {
      if (action.payload !== state.playerBId) {
        state.playerAId = action.payload
      }
    },
    setComparePlayerB(state, action: PayloadAction<string>) {
      if (action.payload !== state.playerAId) {
        state.playerBId = action.payload
      }
    },
  },
})

export const { setComparePlayerA, setComparePlayerB } = compareSlice.actions

export const compareReducer = compareSlice.reducer

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getPlayerScoutReports, type PlayerScoutReportRow } from '../../api/players'
import { isApiErr } from '../../types/api'

export type ScoutReportsForPlayerState = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
  items: PlayerScoutReportRow[]
}

export type ScoutReportFeatureState = {
  byPlayerId: Record<string, ScoutReportsForPlayerState>
}

const initialState: ScoutReportFeatureState = {
  byPlayerId: {},
}

export const loadScoutReportsForPlayer = createAsyncThunk(
  'scoutReports/loadForPlayer',
  async (playerId: string, { rejectWithValue }) => {
    try {
      const items = await getPlayerScoutReports(playerId)
      return { playerId, items }
    } catch (e) {
      if (isApiErr(e)) return rejectWithValue(e.message)
      return rejectWithValue(e instanceof Error ? e.message : 'Could not load scout reports.')
    }
  },
  {
    condition: (playerId, { getState }) => {
      const s = (getState() as { scoutReports: ScoutReportFeatureState }).scoutReports
        .byPlayerId[playerId]
      if (s?.status === 'loading') return false
      return true
    },
  },
)

export const scoutReportsSlice = createSlice({
  name: 'scoutReports',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadScoutReportsForPlayer.pending, (state, action) => {
        const playerId = action.meta.arg
        state.byPlayerId[playerId] = {
          status: 'loading',
          error: null,
          items: [],
        }
      })
      .addCase(loadScoutReportsForPlayer.fulfilled, (state, action) => {
        const { playerId, items } = action.payload
        state.byPlayerId[playerId] = {
          status: 'succeeded',
          error: null,
          items,
        }
      })
      .addCase(loadScoutReportsForPlayer.rejected, (state, action) => {
        const playerId = action.meta.arg
        state.byPlayerId[playerId] = {
          status: 'failed',
          error:
            typeof action.payload === 'string'
              ? action.payload
              : action.error.message ?? 'Could not load scout reports.',
          items: [],
        }
      })
  },
})

export const scoutReportsReducer = scoutReportsSlice.reducer

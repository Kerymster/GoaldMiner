import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getLeaguesList } from '../../api/leagues'
import { isApiErr } from '../../types/api'
import type { LeagueMeta, TeamsFileMeta } from '../../types/api'

type LeaguesState = {
  items: LeagueMeta[]
  meta: TeamsFileMeta | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: LeaguesState = {
  items: [],
  meta: null,
  status: 'idle',
  error: null,
}

export const loadLeagues = createAsyncThunk(
  'leagues/load',
  async (_, { rejectWithValue }) => {
    try {
      return await getLeaguesList()
    } catch (e) {
      if (isApiErr(e)) return rejectWithValue(e.message)
      return rejectWithValue(
        e instanceof Error ? e.message : 'Could not load leagues',
      )
    }
  },
  {
    condition: (_, { getState }) => {
      const s = getState() as { leagues: LeaguesState }
      if (s.leagues.status === 'loading' || s.leagues.status === 'succeeded') {
        return false
      }
      return true
    },
  },
)

export const leaguesSlice = createSlice({
  name: 'leagues',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadLeagues.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadLeagues.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload.items ?? []
        state.meta = action.payload.meta ?? null
      })
      .addCase(loadLeagues.rejected, (state, action) => {
        state.status = 'failed'
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : action.error.message ?? 'Could not load leagues'
      })
  },
})

export const leaguesReducer = leaguesSlice.reducer

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getNationalities } from '../../api/nationalities'
import { isApiErr } from '../../types/api'
import type { NationalityItem } from '../../types/nationalities'

type NationalitiesState = {
  items: NationalityItem[]
  total: number
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: NationalitiesState = {
  items: [],
  total: 0,
  status: 'idle',
  error: null,
}

export const loadNationalities = createAsyncThunk(
  'nationalities/load',
  async (_, { rejectWithValue }) => {
    try {
      return await getNationalities()
    } catch (e) {
      if (isApiErr(e)) return rejectWithValue(e.message)
      return rejectWithValue(
        e instanceof Error ? e.message : 'Could not load nationalities.',
      )
    }
  },
  {
    condition: (_, { getState }) => {
      const s = (getState() as { nationalities: NationalitiesState }).nationalities
      if (s.status === 'loading' || s.status === 'succeeded') return false
      return true
    },
  },
)

export const nationalitiesSlice = createSlice({
  name: 'nationalities',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadNationalities.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loadNationalities.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload.items ?? []
        state.total = action.payload.total ?? state.items.length
      })
      .addCase(loadNationalities.rejected, (state, action) => {
        state.status = 'failed'
        state.error =
          typeof action.payload === 'string'
            ? action.payload
            : action.error.message ?? 'Could not load nationalities.'
      })
  },
})

export const nationalitiesReducer = nationalitiesSlice.reducer

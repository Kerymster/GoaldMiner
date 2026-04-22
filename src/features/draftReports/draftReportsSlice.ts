import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  createScoutReportDraft,
  deleteScoutReportDraft,
  getScoutReportDraftById,
  getScoutReportDrafts,
  publishScoutReportDraft,
  updateScoutReportDraft,
  type StoredScoutReportDraft,
} from '../../api/scoutReportDrafts'
import { isApiErr } from '../../types/api'
import type { ScoutReportForm } from '../../types/scoutReportForm'

type AsyncStatus = 'idle' | 'loading' | 'succeeded' | 'failed'

type DraftDetailState = {
  status: AsyncStatus
  error: string | null
}

export type DraftReportsState = {
  byId: Record<string, StoredScoutReportDraft>
  listIds: string[]
  listStatus: AsyncStatus
  listError: string | null
  byDraftId: Record<string, DraftDetailState>
}

const initialState: DraftReportsState = {
  byId: {},
  listIds: [],
  listStatus: 'idle',
  listError: null,
  byDraftId: {},
}

type SaveDraftPayload = {
  id?: string
  title?: string | null
  playerId?: string | null
  draft: Partial<ScoutReportForm>
}

type PublishDraftPayload = {
  id: string
  playerId?: string
}

function getErrorMessage(e: unknown, fallback: string): string {
  if (isApiErr(e)) return e.message
  return e instanceof Error ? e.message : fallback
}

function upsertDraft(state: DraftReportsState, row: StoredScoutReportDraft) {
  state.byId[row.id] = row
  if (!state.listIds.includes(row.id)) {
    state.listIds.unshift(row.id)
  }
}

export const loadDraftReports = createAsyncThunk(
  'draftReports/loadList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getScoutReportDrafts()
      return response.items
    } catch (e) {
      return rejectWithValue(getErrorMessage(e, 'Could not load drafts.'))
    }
  },
)

export const loadDraftReportById = createAsyncThunk(
  'draftReports/loadById',
  async (id: string, { rejectWithValue }) => {
    try {
      const row = await getScoutReportDraftById(id)
      return row
    } catch (e) {
      return rejectWithValue(getErrorMessage(e, 'Could not load draft.'))
    }
  },
)

export const saveDraftReport = createAsyncThunk(
  'draftReports/save',
  async (payload: SaveDraftPayload, { rejectWithValue }) => {
    try {
      if (payload.id) {
        return await updateScoutReportDraft(payload.id, {
          title: payload.title,
          playerId: payload.playerId,
          draft: payload.draft,
        })
      }
      return await createScoutReportDraft({
        title: payload.title,
        playerId: payload.playerId,
        draft: payload.draft,
      })
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)

export const deleteDraftReport = createAsyncThunk(
  'draftReports/delete',
  async (id: string, { rejectWithValue }) => {
    try {
      await deleteScoutReportDraft(id)
      return id
    } catch (e) {
      return rejectWithValue(getErrorMessage(e, 'Could not delete draft.'))
    }
  },
)

export const publishDraftReport = createAsyncThunk(
  'draftReports/publish',
  async ({ id, playerId }: PublishDraftPayload, { rejectWithValue }) => {
    try {
      await publishScoutReportDraft(id, playerId ? { playerId } : undefined)
      return id
    } catch (e) {
      return rejectWithValue(e)
    }
  },
)

export const draftReportsSlice = createSlice({
  name: 'draftReports',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadDraftReports.pending, (state) => {
        state.listStatus = 'loading'
        state.listError = null
      })
      .addCase(loadDraftReports.fulfilled, (state, action) => {
        state.listStatus = 'succeeded'
        state.listError = null
        state.listIds = action.payload.map((row) => row.id)
        for (const row of action.payload) {
          state.byId[row.id] = row
          state.byDraftId[row.id] = { status: 'succeeded', error: null }
        }
      })
      .addCase(loadDraftReports.rejected, (state, action) => {
        state.listStatus = 'failed'
        state.listError =
          typeof action.payload === 'string'
            ? action.payload
            : action.error.message ?? 'Could not load drafts.'
      })
      .addCase(loadDraftReportById.pending, (state, action) => {
        const id = action.meta.arg
        state.byDraftId[id] = { status: 'loading', error: null }
      })
      .addCase(loadDraftReportById.fulfilled, (state, action) => {
        const row = action.payload
        upsertDraft(state, row)
        state.byDraftId[row.id] = { status: 'succeeded', error: null }
      })
      .addCase(loadDraftReportById.rejected, (state, action) => {
        const id = action.meta.arg
        state.byDraftId[id] = {
          status: 'failed',
          error:
            typeof action.payload === 'string'
              ? action.payload
              : action.error.message ?? 'Could not load draft.',
        }
      })
      .addCase(saveDraftReport.fulfilled, (state, action) => {
        const row = action.payload
        upsertDraft(state, row)
        state.byDraftId[row.id] = { status: 'succeeded', error: null }
      })
      .addCase(deleteDraftReport.fulfilled, (state, action) => {
        const id = action.payload
        delete state.byId[id]
        delete state.byDraftId[id]
        state.listIds = state.listIds.filter((item) => item !== id)
      })
      .addCase(publishDraftReport.fulfilled, (state, action) => {
        const id = action.payload
        delete state.byId[id]
        delete state.byDraftId[id]
        state.listIds = state.listIds.filter((item) => item !== id)
      })
  },
})

export const draftReportsReducer = draftReportsSlice.reducer

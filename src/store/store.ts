import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { compareReducer } from '../features/compare/compareSlice'
import { leaguesReducer } from '../features/leagues/leaguesSlice'

const rootReducer = combineReducers({
  leagues: leaguesReducer,
  compare: compareReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

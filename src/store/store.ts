import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { compareReducer } from '../features/compare/compareSlice'
import { draftReportsReducer } from '../features/draftReports/draftReportsSlice'
import { nationalitiesReducer } from '../features/nationalities/nationalitiesSlice'
import { scoutReportsReducer } from '../features/scoutReports/scoutReportsSlice'

const rootReducer = combineReducers({
  compare: compareReducer,
  draftReports: draftReportsReducer,
  scoutReports: scoutReportsReducer,
  nationalities: nationalitiesReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

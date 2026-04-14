import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { compareReducer } from '../features/compare/compareSlice'
import { playersReducer } from '../features/players/playersSlice'

const rootReducer = combineReducers({
  players: playersReducer,
  compare: compareReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch

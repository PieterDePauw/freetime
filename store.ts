import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import authTokensSlice from "./features/authentication/authTokensSlice"
import calendarsSlice from "./features/availability/calendarsSlice"

export const store = configureStore({
  reducer: {
    calendars: calendarsSlice,
    authTokens: authTokensSlice,
  },
})

setupListeners(store.dispatch)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<String>
>

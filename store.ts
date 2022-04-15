import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/dist/query"
import authTokensSlice from "./redux/authTokensSlice"
import calendarsSlice from "./redux/calendarsSlice"

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

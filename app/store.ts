import {Action, configureStore, ThunkAction} from "@reduxjs/toolkit"
import {setupListeners} from "@reduxjs/toolkit/dist/query"
import calendarsSlice from "../features/availability/calendarsSlice"
import availableCalendarsSlice from "../features/availability/availableCalendars"

export const store = configureStore({
  reducer: {
    calendars: calendarsSlice,
    availableCalendars: availableCalendarsSlice,
  },
})

setupListeners(store.dispatch)

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
  AppState,
  unknown,
  Action<String>>

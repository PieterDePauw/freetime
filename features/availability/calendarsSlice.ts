import { createSlice } from "@reduxjs/toolkit"
import { AppState } from "../../store"

const initialState = {
  data: [{ id: "john@gmail.com" }, { id: "will@gmail.com" }],
}

const calendarsSlice = createSlice({
  name: "calendars",
  initialState,
  reducers: {},
})

export const selectCalendars = (state: AppState) => state.calendars
export default calendarsSlice.reducer

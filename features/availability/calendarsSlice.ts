import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import {AppState} from "../../app/store"
import axios from "axios";
import {calendar_v3} from "googleapis";
import {GoogleCalendar} from "../../app/types";

interface CalendarsState {
  data: GoogleCalendar[]
  status: "idle" | "busy" | "error"
  error: string | undefined
}

const initialState: CalendarsState = {
  data: [],
  status: "idle",
  error: undefined,
}

const calendarsSlice = createSlice({
  name: "calendars",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getCalendarListAsync.pending, (state, action) => {
      state.status = "busy"
    })
      .addCase(getCalendarListAsync.rejected, (state, actions) => {
        state.status = "error"
        state.error = actions.error.message
      })
      .addCase(getCalendarListAsync.fulfilled, (state, actions) => {
        state.status = "idle"
        state.data = actions.payload
      })
  }
})
export const getCalendarListAsync = createAsyncThunk(
  "calendar/getList",
  async (_, thunkApi) => {
    const response = await axios.get("api/calendar/list")
    const list = response.data as calendar_v3.Schema$CalendarListEntry[]
    return list.map(c => {
      return {id: c.id} as GoogleCalendar
    })
  }
)

export const selectCalendarState = (state: AppState) => state.calendars
export default calendarsSlice.reducer

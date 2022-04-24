import {AvailableCalendarSearchParams, FreeBusyCalendar, GoogleFeeBusyCalendarResponse} from "../../app/types";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {AppState} from "../../app/store";
import moment from "moment-timezone";

interface SearchState {
  status: "idle" | "busy" | "error"
  error?: string
  data: FreeBusyCalendar.Item[]
}

const initialState: SearchState = {
  status: "idle",
  data: []
}

const availableCalendarsSlice = createSlice({
  name: "availableCalendars",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(searchAsync.pending, (state, actions) => {
      state.status = "busy"
    })
      .addCase(searchAsync.rejected, (state, actions) => {
        state.status = "error"
        state.error = actions.error.message
      })
      .addCase(searchAsync.fulfilled, (state, actions) => {
        state.status = "idle"
        state.data = actions.payload.map(c => {
          return {
            ...c,
            busy: c.busy.map(b => {
              return {
                start: moment(b.start).format("DD-MM-YYYY HH:mm"),
                end: moment(b.end).format("DD-MM-YYYY HH:mm"),
              }
            })
          }
        })
      })
  }
})

export const searchAsync = createAsyncThunk(
  "availableCalendars/search",
  async (params: AvailableCalendarSearchParams) => {
    const response = await axios.post("api/calendar/freebusy", params)
    const fbResponse = response.data as GoogleFeeBusyCalendarResponse
    return !fbResponse.calendars ? [] : Object.entries(fbResponse.calendars).map(([id, c], _) => {
      return {id, busy: c.busy, errors: c.errors} as FreeBusyCalendar.Item
    })
  }
)

export const selectAvailableCalendarState = (state: AppState) => state.availableCalendars
export default availableCalendarsSlice.reducer
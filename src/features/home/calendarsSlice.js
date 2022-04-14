import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [{ id: "john@gmail.com" }, { id: "will@gmail.com" }]
};

const calendarsSlice = createSlice({
  name: "calendars",
  initialState,
  reducers: {}
});

export const { calendarSelected } = calendarsSlice.actions;
export default calendarsSlice.reducer;

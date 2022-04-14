import { configureStore } from "@reduxjs/toolkit";
import calendarsSlice from "./features/home/calendarsSlice";

export default configureStore({
  reducer: {
    calendars: calendarsSlice
  }
});

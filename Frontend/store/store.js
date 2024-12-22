import {configureStore} from "@reduxjs/toolkit"
import authReduser from "./slices/authSlice"
import tripReduser from "./slices/tripSlice"

const store = configureStore({
  reducer: {
    auth: authReduser,
    trips: tripReduser,
  },
});

export default store
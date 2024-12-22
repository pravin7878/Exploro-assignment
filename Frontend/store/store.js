import {configureStore} from "@reduxjs/toolkit"
import authReduser from "./slices/authSlice"
import tripReduser from "./slices/tripSlice"
import cartReduser from "./slices/cartSlice"


const store = configureStore({
  reducer: {
    auth: authReduser,
    trips: tripReduser,
    cart : cartReduser
  },
});

export default store
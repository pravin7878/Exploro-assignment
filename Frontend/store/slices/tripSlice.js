import { createSlice } from "@reduxjs/toolkit";
import {
  createTrip,
  deleteTrip,
  getTripById,
  getTrips,
  updateTrip,
} from "../actions/trips";
import { toast } from "react-toastify";

const initialState = {
  isLodding: false,
  error: { isErr: false, message: "" },
  addedSuccess: false,
  result: [],
  tripInfo: {},
  updated: false,
};

const tripSlices = createSlice({
  name: "trip",
  initialState,
  extraReducers: (bulder) => {
    bulder
      // tunk for gating Trips
      .addCase(getTrips.pending, (state) => {
        state.isLodding = true;
      })
      .addCase(getTrips.fulfilled, (state, { payload }) => {
        (state.isLodding = false),
          (state.error = { isErr: false, message: "" }),
          (state.result = payload);
      })
      .addCase(getTrips.rejected, (state, payload) => {
        (state.isLodding = false),
          (state.error.isErr = true),
          (state.error.message =
            payload?.payload?.message || "something went wrong");
      })

      // tunk for adding Trips
      .addCase(createTrip.pending, (state) => {
        state.isLodding = true;
      })
      .addCase(createTrip.fulfilled, (state, { payload }) => {
        (state.isLodding = false),
          (state.error = { isErr: false, message: "" }),
          (state.result = payload);
        state.addedSuccess = true;
        toast.success("trip added success");
      })
      .addCase(createTrip.rejected, (state, payload) => {
        (state.isLodding = false), (state.result = {});
        (state.error.isErr = true),
          (state.error.message = payload?.payload?.error || "something went wrong");
      })

      // tunk for update Trips
      .addCase(updateTrip.pending, (state) => {
        state.isLodding = true;
      })
      .addCase(updateTrip.fulfilled, (state, { payload }) => {
        (state.isLodding = false),
          (state.error = { isErr: false, message: "" }),
          (state.result = payload);
        state.updated = true;
        toast.success(payload?.message);
      })
      .addCase(updateTrip.rejected, (state, payload) => {
        (state.isLodding = false), (state.result = []);
        (state.error.isErr = true),
          (state.error.message = payload || "something went wrong");
      })

      // tunk for remove Trips
      .addCase(deleteTrip.pending, (state) => {
        state.isLodding = true;
      })
      .addCase(deleteTrip.fulfilled, (state, { payload }) => {
        (state.isLodding = false),
          (state.error = { isErr: false, message: "" }),
          (state.result = payload);
      })
      .addCase(deleteTrip.rejected, (state, payload) => {
        (state.isLodding = false), (state.result = []);
        (state.error.isErr = true),
          (state.error.message = payload || "something went wrong");
        toast.success(payload?.message);
      })

      // thunk for get Trip By Id
      .addCase(getTripById.pending, (state) => {
        state.isLodding = true;
      })
      .addCase(getTripById.fulfilled, (state, { payload }) => {
        (state.isLodding = false),
          (state.error = { isErr: false, message: "" }),
          (state.tripInfo = payload);
      })
      .addCase(getTripById.rejected, (state, payload) => {
        (state.isLodding = false),
          (state.error.isErr = true),
          (state.error.message = payload || "something went wrong");
      });
  },
});

export default tripSlices.reducer;

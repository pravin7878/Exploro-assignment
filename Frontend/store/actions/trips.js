import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import axios from "axios";

export const getTripById = createAsyncThunk(
  "GET_TRIP",
  async ({ url }, { rejectWithValue }) => {
    try {
      const res = await axios.get(url)
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);
export const getTrips = createAsyncThunk(
  "GET_TRIPS",
  async ({ url }, { rejectWithValue }) => {
    try {
      const res = await axios({
        method: "GET",
        url,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        // params: queryParams, 
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

export const createTrip = createAsyncThunk(
  "ADD_TRIPS",
  async ({ url, token, data }, { rejectWithValue, dispatch }) => {
    try {
      const res = await axios.post(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(getTrips({url}));
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

export const deleteTrip = createAsyncThunk(
  "DELETE_TRIPS",
  async ({ url, token }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

export const updateTrip = createAsyncThunk(
  "UPDATE_TRIPS",
  async ({ url, token, data }, { rejectWithValue }) => {
    try {
      const res = await axios.patch(url, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response ? err.response.data : err.message);
    }
  }
);

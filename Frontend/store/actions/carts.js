import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Add to Cart
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ url, tripId, token }, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        url,
       {tripId},
        {
           headers: { Authorization: `Bearer ${token}` },
        }
    );
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Get Cart Data
export const getCartData = createAsyncThunk(
  "cart/getCartData",
  async ({ url, token }, { rejectWithValue }) => {
    try {
      const res = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Remove from Cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ url, token }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Clear Cart
export const clearCart = createAsyncThunk(
  "cart/clearCart",
  async ({ url, token }, { rejectWithValue }) => {
    try {
      const res = await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

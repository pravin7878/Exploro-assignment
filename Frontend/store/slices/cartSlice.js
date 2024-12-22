import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addToCart,
  getCartData,
  removeFromCart,
  clearCart,
} from "../actions/carts";

const initialState = {
  trips: [],
  totalQuantity: 0,
  isLoading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Add trip to cart
      .addCase(addToCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.trips = payload?.cart || [];
        state.totalQuantity = state.trips.length;
        toast.success(payload?.message || "Item added to cart successfully!");
      })
      .addCase(addToCart.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        toast.error("Failed to add item to cart.");
      })

      // Get trips from cart
      .addCase(getCartData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getCartData.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.trips = payload?.cart || [];
        state.totalQuantity = state.trips.length;
      })
      .addCase(getCartData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.trips = [];
        state.totalQuantity = 0;
      })

      // Delete a single trip from cart
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.trips = payload?.cart || [];
        state.totalQuantity = state.trips.length;
        toast.success(payload?.message || "Item removed from cart.");
      })
      .addCase(removeFromCart.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        toast.error("Error while removing item from cart.");
      })

      // Clear entire cart
      .addCase(clearCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(clearCart.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.trips = [];
        state.totalQuantity = 0;
        toast.success(payload?.message || "Cart cleared successfully!");
      })
      .addCase(clearCart.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        toast.error("Error while clearing the cart.");
      });
  },
});

export const { resetError } = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addToCart,
  getCartData,
  removeFromCart,
  clearCart,
} from "../actions/carts";

// Retrieve initial state from local storage or default to initial values
const getInitialState = () => {
  const storedCart = JSON.parse(localStorage.getItem("cart"));
  return {
    trips: storedCart?.trips || [],
    totalItem: storedCart?.totalItem || 0,
    isLoading: false,
    error: null,
  };
};

const initialState = getInitialState();

const saveCartToLocalStorage = (state) => {
  localStorage.setItem(
    "cart",
    JSON.stringify({ trips: state.trips, totalItem: state.totalItem })
  );
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
        state.error = null;
        state.isLoading = false;
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
        state.trips = payload?.trips || [];
        state.totalItem = payload?.trips?.length 
        saveCartToLocalStorage(state);
      })
      .addCase(getCartData.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.error = payload;
        state.trips = [];
        state.totalItem = 0;
        saveCartToLocalStorage(state);
      })

      // Delete a single trip from cart
      .addCase(removeFromCart.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(removeFromCart.fulfilled, (state, { payload }) => {
        state.isLoading = false;
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
        state.totalItem = 0;
        saveCartToLocalStorage(state);
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

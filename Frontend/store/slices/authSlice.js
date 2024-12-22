import { createSlice } from "@reduxjs/toolkit";
import { registerNewUser, loginUser } from "../actions/auth";
import { toast } from "react-toastify";

const initialState = {
  isRegister: false,
  isLogged: JSON.parse(localStorage.getItem("isLogged")) || false,
  result: JSON.parse(localStorage.getItem("user")) || {},
  isLoading: false,
  error: "",
};

const handleFulfilled = (state, payload, isLogin = false) => {
  state.isLoading = false;
  state.error = "";
  if (isLogin) {
    state.isLogged = true;
    localStorage.setItem("isLogged", JSON.stringify(true));
    toast.success("Login successful!");
  } else {
    state.isRegister = true;
    toast.success("Registration successful!");
  }
  state.result = payload;
  localStorage.setItem("user", JSON.stringify(payload));
};

const handleRejected = (state, payload, isLogin = false) => {
  state.isLoading = false;
  state.error = payload || (isLogin ? "Login failed" : "Registration failed");
  toast.error(state.error);
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetState: (state) => {
      state.error = "",
      state.isLoading = false,
      state.isLogged = false,
      state.isRegister = false,
      state.result = {}
    },
    logoutUser: (state) => {
      state.isLogged = false;
      state.result = {};
      state.error = "";
      state.isRegister = false;

      localStorage.removeItem("user");
      localStorage.removeItem("isLogged");
      toast.info("Logged out successfully!");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerNewUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerNewUser.fulfilled, (state, { payload }) => {
        handleFulfilled(state, payload, false);
      })
      .addCase(registerNewUser.rejected, (state, { payload }) => {
        handleRejected(state, payload, false);
      })

      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        handleFulfilled(state, payload, true);
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        handleRejected(state, payload, true);
      });
  },
});

export default authSlice.reducer;
export const { resetState, logoutUser } = authSlice.actions;

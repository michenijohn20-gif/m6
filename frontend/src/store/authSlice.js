import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import client from "../api/client";

export const login = createAsyncThunk("auth/login", async ({ email, password }) => {
  const response = await client.post("/auth/login", { email, password });
  return response.data;
});

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password }) => {
    const response = await client.post("/auth/register", { email, password });
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    email: null,
    token: localStorage.getItem("token"),
    status: "idle",
    error: null,
  },
  reducers: {
    logout(state) {
      state.email = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        (action) => [login.pending.type, register.pending.type].includes(action.type),
        (state) => {
          state.status = "loading";
          state.error = null;
        }
      )
      .addMatcher(
        (action) => [login.fulfilled.type, register.fulfilled.type].includes(action.type),
        (state, action) => {
          state.status = "succeeded";
          state.email = action.payload.email;
          state.token = action.payload.access_token;
          localStorage.setItem("token", action.payload.access_token);
        }
      )
      .addMatcher(
        (action) => [login.rejected.type, register.rejected.type].includes(action.type),
        (state, action) => {
          state.status = "failed";
          state.error =
            action.error.message === "Request failed with status code 401"
              ? "Invalid email or password"
              : action.error.message === "Request failed with status code 409"
              ? "That email is already registered"
              : "Something went wrong, please try again";
        }
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

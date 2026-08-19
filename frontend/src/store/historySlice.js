import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import client from "../api/client";

export const fetchHistory = createAsyncThunk("history/fetch", async () => {
  const response = await client.get("/history");
  return response.data.history;
});

const historySlice = createSlice({
  name: "history",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHistory.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default historySlice.reducer;

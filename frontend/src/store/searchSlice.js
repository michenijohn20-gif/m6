import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import client from "../api/client";

export const runSearch = createAsyncThunk("search/runSearch", async (query) => {
  const response = await client.get("/search", { params: { q: query } });
  return response.data;
});

export const rerankResults = createAsyncThunk(
  "search/rerankResults",
  async ({ listings, weights }) => {
    const response = await client.post("/search/filter", { listings, weights });
    return response.data.results;
  }
);

const searchSlice = createSlice({
  name: "search",
  initialState: {
    query: "",
    results: [],
    allResults: [],
    status: "idle", // idle | loading | succeeded | failed
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(runSearch.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(runSearch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.query = action.payload.query;
        state.results = action.payload.results;
        state.allResults = action.payload.results;
      })
      .addCase(runSearch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(rerankResults.fulfilled, (state, action) => {
        state.results = action.payload;
      });
  },
});

export default searchSlice.reducer;

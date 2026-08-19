import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import client from "../api/client";

export const fetchReviews = createAsyncThunk("reviews/fetch", async (query) => {
  const response = await client.get("/search/reviews", { params: { q: query } });
  return response.data;
});

export const addReview = createAsyncThunk(
  "reviews/add",
  async ({ query, shop, author, comment, rating }) => {
    const response = await client.post("/search/reviews", {
      query,
      shop,
      author,
      comment,
      rating,
    });
    return response.data;
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    query: "",
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.query = action.payload.query;
        state.items = action.payload.reviews;
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.items = [action.payload, ...state.items];
      });
  },
});

export default reviewsSlice.reducer;

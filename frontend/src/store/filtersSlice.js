import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  weights: {
    rating: 0.35,
    delivery_cost: 0.15,
    trust: 0.1,
  },
  priceRange: { min: 0, max: 0 },
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setWeight(state, action) {
      const { key, value } = action.payload;
      state.weights[key] = value;
    },
    setPriceRange(state, action) {
      const { min, max } = action.payload;
      state.priceRange = { min, max };
    },
  },
});

export const { setWeight, setPriceRange } = filtersSlice.actions;
export default filtersSlice.reducer;

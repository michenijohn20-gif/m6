import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import filtersReducer from "./filtersSlice";
import historyReducer from "./historySlice";
import searchReducer from "./searchSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    filters: filtersReducer,
    auth: authReducer,
    history: historyReducer,
  },
});

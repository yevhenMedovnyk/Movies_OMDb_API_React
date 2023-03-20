import {configureStore} from "@reduxjs/toolkit";
import movies from "./features/movieSlice";
import search from "./features/searchSlice";

export const store = configureStore({
  reducer: {
    movies,
    search,
  },
});

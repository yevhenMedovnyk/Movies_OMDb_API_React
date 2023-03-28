import {configureStore} from "@reduxjs/toolkit";
import movies from "./features/movieSlice";
import search from "./features/searchSlice";
import {setLocalStorage} from "./services/localStorage";

export const store = configureStore({
  reducer: {
    movies,
    search,
  },
});

store.subscribe(() => {
  setLocalStorage("want", store.getState().movies.want);
  setLocalStorage("watched", store.getState().movies.watched);
});

import {configureStore} from "@reduxjs/toolkit";
import movies from "./features/movieSlice";
import search from "./features/searchSlice";
import user from "./features/userSlice";
import {setLocalStorage} from "./services/localStorage";

export const store = configureStore({
  reducer: {
    movies,
    search,
    user,
  },
});

store.subscribe(() => {
  setLocalStorage("want", store.getState().movies.want);
  setLocalStorage("watched", store.getState().movies.watched);
  setLocalStorage("user", store.getState().user);
});

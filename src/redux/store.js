import {configureStore} from "@reduxjs/toolkit";
import movies from "./slices/movieSlice";
import search from "./slices/searchSlice";
import user from "./slices/userSlice";
import {setLocalStorage} from "../services/localStorage";

export const store = configureStore({
  reducer: {
    movies,
    search,
    user,
  },
});

store.subscribe(() => {
  setLocalStorage("user", store.getState().user);
});

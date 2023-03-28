import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import { getLocalStorage } from "../services/localStorage";

export const fetchMovie = createAsyncThunk("movies/fetchMovie", async (url, {rejectWithValue}) => {
  try {
    const response = await axios.get(url);
    return await response.data;
  } catch (error) {
    console.log(error.message);
    return rejectWithValue(error.message);
  }
});



const initialState = {
  want: getLocalStorage('want'),
  watched: getLocalStorage('watched'),
  details: {},
  status: null,
  error: null,
};

export const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovieToWant: (state, action) => {
      const findMovie = state.want.find((item) => item.imdbID === action.payload.imdbID);
      if (!findMovie) {
        state.want.push(action.payload);
        state.watched = state.watched.filter((item) => item.imdbID !== action.payload.imdbID);
      }
    },
    addMovieToWatched: (state, action) => {
      const findMovie = state.watched.find((item) => item.imdbID === action.payload.imdbID);
      if (!findMovie) {
        state.watched.push(action.payload);
        state.want = state.want.filter((item) => item.imdbID !== action.payload.imdbID);
      }
    },
    removeFromWant: (state, action) => {
      state.want = state.want.filter((item) => item.imdbID !== action.payload);
    },
    removeFromWatched: (state, action) => {
      state.watched = state.watched.filter((item) => item.imdbID !== action.payload);
    },
  },
  extraReducers: {
    [fetchMovie.pending]: (state) => {
      state.status = "loading";
      state.error = "null";
    },
    [fetchMovie.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.details = action.payload;
    },
    [fetchMovie.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});

export const {movieDetails, addMovieToWant, removeFromWant, addMovieToWatched, removeFromWatched} =
  movieSlice.actions;

export default movieSlice.reducer;

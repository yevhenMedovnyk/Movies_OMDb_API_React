import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const searchMovies = createAsyncThunk("movies/searchMovies", async (url, {dispatch}) => {
  try {
    const response = await axios.get(url);
    dispatch(searchMovie(response.data.Search));
  } catch (error) {
    console.log(error);
  }
});
export const fetchMovie = createAsyncThunk("movies/fetchMovie", async (url, {dispatch}) => {
  try {
    const response = await axios.get(url);
    dispatch(movieDetails(response.data));
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  want: [],
  watched: [],
  search: [],
  details: {},
};

export const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addMovieToWant: (state, action) => {
      const findMovie = state.want.some((item) => item.imdbID === action.payload.id);
      if (!findMovie) {
        state.want.push(action.payload);
      }
    },
    addMovieToWatched: (state, action) => {
      const findMovie = state.watched.some((item) => item.imdbID === action.payload.id);
      if (!findMovie) {
        state.watched.push(action.payload);
        state.want = state.want.filter((item) => item.imdbID !== action.payload.id);
      }
    },
    searchMovie: (state, action) => {
      state.search = action.payload;
    },
    movieDetails: (state, action) => {
      state.details = action.payload;
    },
  },
});

export const {addMovieToWant, addMovieToWatched, searchMovie, movieDetails} = moviesSlice.actions;

export default moviesSlice.reducer;

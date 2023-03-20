import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const searchMovies = createAsyncThunk(
  "movies/searchMovies",
  async (url, {rejectWithValue, dispatch}) => {
    try {
      const response = await axios.get(url);
      dispatch(totalRes(response.data.totalResults));
      return await response.data.Search;
    } catch (error) {
      console.log(error.message);
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  search: [],
  inputValue: "",
  totalMovieCount: null,
  status: null,
  error: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setInputValue: (state, action) => {
      state.inputValue = action.payload;
    },
    totalRes: (state, action) => {
      state.totalMovieCount = action.payload;
    },
  },
  extraReducers: {
    [searchMovies.pending]: (state) => {
      state.status = "loading";
      state.error = "null";
    },
    [searchMovies.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.search = action.payload;
    },
    [searchMovies.rejected]: (state, action) => {
      state.status = "rejected";
      state.error = action.payload;
    },
  },
});
export const {setInputValue, totalRes} = searchSlice.actions;
export default searchSlice.reducer;

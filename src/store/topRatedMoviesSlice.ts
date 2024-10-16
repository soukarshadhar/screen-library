import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

type Movie = {
  id: string;
  backdropPath: string;
  title: string;
  overview: string;
};

type TopRatedMoviesState = {
  list: Movie[];
  loading: boolean;
};

const initialState: TopRatedMoviesState = {
  list: [],
  loading: false,
};

const topRatedMoviesSlice = createSlice({
  name: "topRatedMovies",
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<Movie[]>) => {
      state.list.push(...action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    reset: (state) => {
      state.list = [];
      state.loading = false;
    },
  },
});

export const topRatedMoviesActions = topRatedMoviesSlice.actions;
export const selectTopRatedMoviesList = (state: RootState) =>
  state.topRatedMovies.list;
export const selectTopRatedMoviesLoading = (state: RootState) =>
  state.topRatedMovies.loading;
export default topRatedMoviesSlice.reducer;

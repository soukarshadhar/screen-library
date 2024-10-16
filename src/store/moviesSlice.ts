import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

type Movie = {
  id: string;
  posterPath: string;
  title: string;
};

type MoviesState = {
  list: Movie[];
  totalPages: number;
  loading: boolean;
  pageNumber: number;
};

const initialState: MoviesState = {
  list: [],
  totalPages: 0,
  loading: false,
  pageNumber: 0,
};

const moviesSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<Movie[]>) => {
      state.list.push(...action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setPageNumber: (state, action: PayloadAction<number>) => {
      state.pageNumber = action.payload;
    },
    reset: (state) => {
      state.list = [];
      state.totalPages = 0;
      state.loading = false;
      state.pageNumber = 0;
    },
  },
});

export const moviesActions = moviesSlice.actions;
export const selectMoviesList = (state: RootState) => state.movies.list;
export const selectMoviesLoading = (state: RootState) => state.movies.loading;
export const selectMoviesTotalPages = (state: RootState) =>
  state.movies.totalPages;
export const selectMoviesPageNumber = (state: RootState) =>
  state.movies.pageNumber;
export default moviesSlice.reducer;

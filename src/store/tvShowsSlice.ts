import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

type TVShow = {
  id: string;
  posterPath: string;
  title: string;
};

type TVShowsState = {
  list: TVShow[];
  totalPages: number;
  loading: boolean;
  pageNumber: number;
};

const initialState: TVShowsState = {
  list: [],
  totalPages: 0,
  loading: false,
  pageNumber: 0,
};

const tvShowsSlice = createSlice({
  name: "tvShows",
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<TVShow[]>) => {
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

export const selectTVShowsList = (state: RootState) => state.tvShows.list;
export const selectTVShowsLoading = (state: RootState) => state.tvShows.loading;
export const selectTVShowsTotalPages = (state: RootState) =>
  state.tvShows.totalPages;
export const selectTVShowsPageNumber = (state: RootState) =>
  state.tvShows.pageNumber;
export const tvShowsAction = tvShowsSlice.actions;
export default tvShowsSlice.reducer;

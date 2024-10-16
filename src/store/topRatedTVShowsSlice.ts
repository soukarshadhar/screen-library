import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./index";

type TVShows = {
  id: string;
  backdropPath: string;
  title: string;
  overview: string;
};

type TopRatedTVShowsState = {
  list: TVShows[];
  loading: boolean;
};

const initialState: TopRatedTVShowsState = {
  list: [],
  loading: false,
};

const topRatedTVShowsSlice = createSlice({
  name: "topRatedTVShows",
  initialState,
  reducers: {
    setList: (state, action: PayloadAction<TVShows[]>) => {
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

export const topRatedTVShowsActions = topRatedTVShowsSlice.actions;
export const selectTopRatedTVShowsList = (state: RootState) =>
  state.topRatedTVShows.list;
export const selectTopRatedTVShowsLoading = (state: RootState) =>
  state.topRatedTVShows.loading;
export default topRatedTVShowsSlice.reducer;

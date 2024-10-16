import { configureStore } from "@reduxjs/toolkit";
import moviesReducer, {
  selectMoviesList,
  selectMoviesLoading,
  selectMoviesPageNumber,
  selectMoviesTotalPages,
  moviesActions,
} from "./moviesSlice";
import tvShowsReducer, {
  selectTVShowsList,
  selectTVShowsLoading,
  selectTVShowsPageNumber,
  selectTVShowsTotalPages,
  tvShowsAction,
} from "./tvShowsSlice";
import topRatedMoviesReducer, {
  selectTopRatedMoviesList,
  selectTopRatedMoviesLoading,
  topRatedMoviesActions,
} from "./topRatedMoviesSlice";
import topRatedTVShowsReducer, {
  selectTopRatedTVShowsList,
  selectTopRatedTVShowsLoading,
  topRatedTVShowsActions,
} from "./topRatedTVShowsSlice";
import dialogReducer from "./dialogSlice";
import formReducer from "./formSlice";
import userReducer from "./userSlice";
import watchListReducer from "./watchListSlice";
import assetDetailsReducer from "./assetDetailsSlice";
import { AssetType } from "../utils/constants";

const store = configureStore({
  reducer: {
    [AssetType.Movies]: moviesReducer,
    [AssetType.TVShows]: tvShowsReducer,
    [AssetType.TopRatedMovies]: topRatedMoviesReducer,
    [AssetType.TopRatedTVShows]: topRatedTVShowsReducer,
    dialog: dialogReducer,
    form: formReducer,
    user: userReducer,
    watchList: watchListReducer,
    assetDetails: assetDetailsReducer,
  },
});

export const selectors = {
  [AssetType.Movies]: {
    selectList: selectMoviesList,
    selectLoading: selectMoviesLoading,
    selectPageNumber: selectMoviesPageNumber,
    selectTotalPages: selectMoviesTotalPages,
  },
  [AssetType.TVShows]: {
    selectList: selectTVShowsList,
    selectLoading: selectTVShowsLoading,
    selectPageNumber: selectTVShowsPageNumber,
    selectTotalPages: selectTVShowsTotalPages,
  },
  [AssetType.TopRatedMovies]: {
    selectList: selectTopRatedMoviesList,
    selectLoading: selectTopRatedMoviesLoading,
  },
  [AssetType.TopRatedTVShows]: {
    selectList: selectTopRatedTVShowsList,
    selectLoading: selectTopRatedTVShowsLoading,
  },
};

export const actions = {
  [AssetType.Movies]: moviesActions,
  [AssetType.TVShows]: tvShowsAction,
  [AssetType.TopRatedMovies]: topRatedMoviesActions,
  [AssetType.TopRatedTVShows]: topRatedTVShowsActions,
};

type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export default store;

import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import {
  GET_REQUEST_INIT,
  ASSET_TYPE_TO_API_PATH,
  AssetType,
} from "../utils/constants";
import { RootState, AppDispatch } from "./index";
import { setLoading } from "./appLoaderSlice";

type Asset = {
  id: string;
  posterPath: string;
  title: string;
  averageVote: number;
};

type WatchListState = {
  movieIds: string[];
  tvShowIds: string[];
  isMoviesTabActive: boolean;
  isListLoading: boolean;
  movies: Asset[];
  tvShows: Asset[];
};

const initialState: WatchListState = {
  movieIds: [],
  tvShowIds: [],
  isMoviesTabActive: true,
  isListLoading: false,
  movies: [],
  tvShows: [],
};

export const hydrateWatchListIds = (userEmailId: string) => {
  return async (dispatch: AppDispatch) => {
    const userRef = doc(db, "users", userEmailId);
    const docSnap = await getDoc(userRef);
    const docData = docSnap.data();
    const movieIds: string[] = docData && docData.movies ? docData.movies : [];
    const tvShowIds: string[] =
      docData && docData.tvShows ? docData.tvShows : [];
    dispatch(hydrateMovieIds(movieIds));
    dispatch(hydrateTVShowIds(tvShowIds));
    dispatch(setLoading(false));
  };
};

export const updateWatchListMovieIds = createAsyncThunk(
  "watchList/updateMovieIds",
  async (
    {
      movieId,
      canUpdateWatchListMovies = false,
    }: { movieId: string; canUpdateWatchListMovies?: boolean },
    thunkAPI
  ) => {
    const userEmailId = thunkAPI.getState().user.email;
    const userRef = doc(db, "users", userEmailId);
    const docSnap = await getDoc(userRef);
    const docData = docSnap.data();
    const movieIds: string[] = docData && docData.movies ? docData.movies : [];
    const indexOfMovieId = movieIds.indexOf(movieId);
    if (indexOfMovieId !== -1) {
      movieIds.splice(indexOfMovieId, 1);
    } else {
      movieIds.push(movieId);
    }
    await updateDoc(userRef, {
      movies: movieIds,
    });

    if (canUpdateWatchListMovies)
      thunkAPI.dispatch(updateWatchListMovies(movieId));

    return movieId;
  }
);

export const updateWatchListTVShowIds = createAsyncThunk(
  "watchList/updateTVShowIds",
  async (
    {
      tvShowId,
      canUpdateWatchListTVShows = false,
    }: { tvShowId: string; canUpdateWatchListTVShows?: boolean },
    thunkAPI
  ) => {
    const userEmailId = thunkAPI.getState().user.email;
    const userRef = doc(db, "users", userEmailId);
    const docSnap = await getDoc(userRef);
    const docData = docSnap.data();
    const tvShowIds = docData && docData.tvShows ? docData.tvShows : [];
    const indexOfTVShowId = tvShowIds.indexOf(tvShowId);
    if (indexOfTVShowId !== -1) {
      tvShowIds.splice(indexOfTVShowId, 1);
    } else {
      tvShowIds.push(tvShowId);
    }
    await updateDoc(userRef, {
      tvShows: tvShowIds,
    });

    if (canUpdateWatchListTVShows)
      thunkAPI.dispatch(updateWatchListTVShows(tvShowId));

    return tvShowId;
  }
);

const fetchAsset = async (type: AssetType, id: string): Promise<Asset> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${ASSET_TYPE_TO_API_PATH[type]}/${id}?language=en-US`,
    GET_REQUEST_INIT
  );
  const data = await response.json();
  return {
    id: id,
    posterPath: data.poster_path,
    title: data.title,
    averageVote:
      data.vote_average !== undefined && data.vote_average !== null
        ? data.vote_average
        : 0,
  };
};

export const fetchWatchListMovies = createAsyncThunk(
  "watchList/fetchMovies",
  async (args, thunkAPI) => {
    const movieIds = thunkAPI.getState().watchList.movieIds;
    thunkAPI.dispatch(deleteWatchListMovies());

    const promises: Promise<Asset>[] = [];
    movieIds.forEach((movieId: string) => {
      promises.push(fetchAsset(AssetType.Movies, movieId));
    });

    const response = await Promise.all(promises);

    return response;
  }
);

export const fetchTVShows = createAsyncThunk(
  "watchList/fetchTVShows",
  async (args, thunkAPI) => {
    const tvShowIds = thunkAPI.getState().watchList.tvShowIds;
    thunkAPI.dispatch(deleteWatchListTVShows());

    const promises: Promise<Asset>[] = [];
    tvShowIds.forEach((tvShowId: string) => {
      promises.push(fetchAsset(AssetType.TVShows, tvShowId));
    });

    const response = await Promise.all(promises);

    return response;
  }
);

const watchListSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {
    toggleActiveTab: (state) => {
      state.isMoviesTabActive = !state.isMoviesTabActive;
    },
    hydrateMovieIds: (state, action: PayloadAction<string[]>) => {
      state.movieIds = action.payload;
    },
    hydrateTVShowIds: (state, action: PayloadAction<string[]>) => {
      state.tvShowIds = action.payload;
    },
    deleteWatchListMovies: (state) => {
      state.movies = [];
    },
    deleteWatchListTVShows: (state) => {
      state.tvShows = [];
    },
    updateWatchListMovies: (state, action: PayloadAction<string>) => {
      const indexOfMovieId = state.movies.findIndex(
        (movie) => movie.id === action.payload
      );
      if (indexOfMovieId !== -1) state.movies.splice(indexOfMovieId, 1);
    },
    updateWatchListTVShows: (state, action: PayloadAction<string>) => {
      const indexOfMovieId = state.tvShows.findIndex(
        (tvShow) => tvShow.id === action.payload
      );
      state.tvShows.splice(indexOfMovieId, 1);
    },
    resetWatchList: (state) => {
      state.movieIds = [];
      state.tvShowIds = [];
      state.isMoviesTabActive = true;
      state.movies = [];
      state.tvShows = [];
      state.isListLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updateWatchListMovieIds.fulfilled, (state, action) => {
      const indexOfMovieId = state.movieIds.indexOf(action.payload);
      if (indexOfMovieId !== -1) {
        state.movieIds.splice(indexOfMovieId, 1);
      } else {
        state.movieIds.push(action.payload);
      }
    });
    builder.addCase(updateWatchListTVShowIds.fulfilled, (state, action) => {
      const indexOfTVShowId = state.tvShowIds.indexOf(action.payload);
      if (indexOfTVShowId !== -1) {
        state.tvShowIds.splice(indexOfTVShowId, 1);
      } else {
        state.tvShowIds.push(action.payload);
      }
    });
    builder.addCase(fetchWatchListMovies.pending, (state) => {
      state.isListLoading = true;
    });
    builder.addCase(fetchWatchListMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
      state.isListLoading = false;
    });
    builder.addCase(fetchTVShows.pending, (state) => {
      state.isListLoading = true;
    });
    builder.addCase(fetchTVShows.fulfilled, (state, action) => {
      state.tvShows = action.payload;
      state.isListLoading = false;
    });
  },
});

export const {
  resetWatchList,
  toggleActiveTab,
  updateWatchListMovies,
  updateWatchListTVShows,
  deleteWatchListMovies,
  deleteWatchListTVShows,
  hydrateMovieIds,
  hydrateTVShowIds,
} = watchListSlice.actions;
export const selectWatchListMovieIds = (state: RootState) =>
  state.watchList.movieIds;
export const selectWatchListTVShowIds = (state: RootState) =>
  state.watchList.tvShowIds;
export const selectWatchListMovies = (state: RootState) =>
  state.watchList.movies;
export const selectWatchListTVShows = (state: RootState) =>
  state.watchList.tvShows;
export const selectWatchListIsListLoading = (state: RootState) =>
  state.watchList.isListLoading;
export const selectWatchListIsMoviesTabActive = (state: RootState) =>
  state.watchList.isMoviesTabActive;
export default watchListSlice.reducer;

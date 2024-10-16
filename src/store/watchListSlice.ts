import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import {
  GET_REQUEST_INIT,
  ASSET_TYPE_TO_API_PATH,
  AssetType,
} from "../utils/constants";
import { RootState } from "./index";

type Asset = {
  id: string;
  posterPath: string;
  title: string;
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

export const hydrateWatchListIds = createAsyncThunk(
  "watchList/hydrateIds",
  async (userEmailId: string) => {
    const userRef = doc(db, "users", userEmailId);
    const docSnap = await getDoc(userRef);
    const docData = docSnap.data();
    const movieIds: string[] = docData && docData.movies ? docData.movies : [];
    const tvShowIds: string[] =
      docData && docData.tvShows ? docData.tvShows : [];
    return { movieIds, tvShowIds };
  }
);

export const updateWatchListMovieIds = createAsyncThunk(
  "watchList/updateMovieIds",
  async (movieId: string, thunkAPI) => {
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
    return movieId;
  }
);

export const updateWatchListTVShowIds = createAsyncThunk(
  "watchList/updateTVShowIds",
  async (tvShowId: string, thunkAPI) => {
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
    return tvShowId;
  }
);

const fetchAsset = async (type: AssetType, id: string): Promise<Asset> => {
  const response = await fetch(
    `https://api.themoviedb.org/3/${ASSET_TYPE_TO_API_PATH[type]}/${id}?language=en-US`,
    GET_REQUEST_INIT
  );
  const data = await response.json();
  return { id: id, posterPath: data.poster_path, title: data.title };
};

export const fetchMovies = createAsyncThunk(
  "watchList/fetchMovies",
  async (args, thunkAPI) => {
    const movieIds = thunkAPI.getState().watchList.movieIds;

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
    builder.addCase(fetchMovies.pending, (state) => {
      state.isListLoading = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
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
    builder.addCase(hydrateWatchListIds.fulfilled, (state, action) => {
      state.movieIds = action.payload.movieIds;
      state.tvShowIds = action.payload.tvShowIds;
    });
  },
});

export const { resetWatchList, toggleActiveTab } = watchListSlice.actions;
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

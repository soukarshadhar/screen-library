import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  GET_REQUEST_INIT,
  AssetType,
  ASSET_TYPE_TO_API_PATH,
} from "../utils/constants";
import { RootState } from "./index";

type AssetInfo = {
  title: string;
  overview: string;
  averageVote: number;
  releaseDate: string;
  noOfSeasons?: number;
  noOfEpisodes?: number;
  runtime: number;
  backdropPath: string;
  genres: { id: string; name: string }[];
};

type AssetDetailsState = {
  isLoading: boolean;
  showVideoPlayer: boolean;
  assetInfo: AssetInfo;
  assetType: string;
  assetVideo: any;
  assetCast: any[];
};

const assetInfoInitialState = {
  title: "",
  overview: "",
  averageVote: 0,
  releaseDate: "",
  noOfSeasons: 0,
  noOfEpisodes: 0,
  runtime: 0,
  genres: [],
  backdropPath: "",
};

const initialState: AssetDetailsState = {
  isLoading: false,
  showVideoPlayer: false,
  assetInfo: assetInfoInitialState,
  assetType: "",
  assetCast: [],
  assetVideo: null,
};

export const fetchAssetDetails = createAsyncThunk(
  "assetDetails/add",
  async ({ assetType, id }: { assetType: AssetType; id: string }) => {
    const apiPath = ASSET_TYPE_TO_API_PATH[assetType];
    const assetDetailResponse = await fetch(
      `https://api.themoviedb.org/3/${apiPath}/${id}`,
      GET_REQUEST_INIT
    );
    const assetData = await assetDetailResponse.json();
    const assetInfo: AssetInfo = {
      title: assetData.title || assetData.name,
      overview: assetData.overview,
      averageVote: assetData.vote_average,
      releaseDate:
        assetData.release_date ||
        assetData.last_air_date ||
        assetData.first_air_date,
      runtime: assetData.runtime || assetData.episode_run_time[0] || 0,
      genres: assetData.genres,
      backdropPath: assetData.backdrop_path,
    };

    if (assetType === AssetType.TVShows) {
      assetInfo["noOfSeasons"] = assetData.number_of_seasons;
      assetInfo["noOfEpisodes"] = assetData.number_of_episodes;
    }

    const assetCreditResponse = await fetch(
      `https://api.themoviedb.org/3/${apiPath}/${id}/credits?language=en-US`,
      GET_REQUEST_INIT
    );
    const assetCredit = await assetCreditResponse.json();

    const assetVideoResponse = await fetch(
      `https://api.themoviedb.org/3/${apiPath}/${id}/videos`,
      GET_REQUEST_INIT
    );
    const assetVideos = await assetVideoResponse.json();

    const filteredVideo = assetVideos.results.find(
      (video: any) => video.type === "Trailer" || video.type === "Teaser"
    );

    return {
      assetInfo,
      assetType,
      assetCast: assetCredit.cast,
      assetVideo: filteredVideo ? filteredVideo : null,
    };
  }
);

const assetDetailsSlice = createSlice({
  name: "assetDetails",
  initialState,
  reducers: {
    toggleVideoPlayer: (state) => {
      state.showVideoPlayer = !state.showVideoPlayer;
    },
    resetAssetDetails: (state) => {
      state.assetType = "";
      state.assetCast = [];
      state.assetInfo = { ...assetInfoInitialState };
      state.assetVideo = null;
      state.isLoading = false;
      state.showVideoPlayer = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAssetDetails.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAssetDetails.fulfilled, (state, action) => {
      state.assetType = action.payload.assetType;
      state.assetCast = action.payload.assetCast;
      state.assetInfo = action.payload.assetInfo;
      state.assetVideo = action.payload.assetVideo;
      state.isLoading = false;
    });
  },
});

export const { resetAssetDetails, toggleVideoPlayer } =
  assetDetailsSlice.actions;
export const selectAssetInfo = (state: RootState) =>
  state.assetDetails.assetInfo;
export const selectAssetDetailsCast = (state: RootState) =>
  state.assetDetails.assetCast;
export const selectAssetDetailsVideo = (state: RootState) =>
  state.assetDetails.assetVideo;
export const selectAssetDetailsIsLoading = (state: RootState) =>
  state.assetDetails.isLoading;
export const selectAssetDetailsShowVideoPlayer = (state: RootState) =>
  state.assetDetails.showVideoPlayer;
export default assetDetailsSlice.reducer;

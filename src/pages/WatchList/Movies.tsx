import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectWatchListMovies,
  selectWatchListIsListLoading,
  selectWatchListMovieIds,
  updateWatchListMovieIds,
  fetchWatchListMovies,
} from "../../store/watchListSlice";
import { AppDispatch } from "../../store";
import { AssetType } from "../../utils/constants";
import Listing from "../../components/Listing";

const Movies = () => {
  const dispatch = useDispatch<AppDispatch>();
  const watchListMovies = useSelector(selectWatchListMovies);
  const isLoading = useSelector(selectWatchListIsListLoading);
  const watchListMovieIds = useSelector(selectWatchListMovieIds);

  useEffect(() => {
    if (watchListMovies.length !== watchListMovieIds.length) {
      dispatch(fetchWatchListMovies());
    }
  }, []);

  const handleOnItemClick = (ev: any) => {
    if (ev.target.dataset.id) {
      const arg = {
        movieId: ev.target.dataset.id,
        canUpdateWatchListMovies: true,
      };
      dispatch(updateWatchListMovieIds(arg));
    }
  };

  return (
    <Listing
      list={watchListMovies}
      loading={isLoading}
      fetchMore={() => {}}
      onItemClick={handleOnItemClick}
      selectedItems={watchListMovieIds}
      noOfItemsLoading={watchListMovieIds.length}
      buildCardLink={(assetId) => `/${AssetType.Movies}/${assetId}`}
    />
  );
};

export default Movies;

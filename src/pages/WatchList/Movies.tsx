import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectWatchListMovies,
  selectWatchListIsListLoading,
  selectWatchListMovieIds,
  updateWatchListMovieIds,
  fetchMovies,
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
      dispatch(fetchMovies());
    }
  }, [watchListMovies, watchListMovieIds]);

  const handleOnItemClick = (ev: any) => {
    if (ev.target.dataset.watchid) {
      dispatch(updateWatchListMovieIds(ev.target.dataset.watchid));
    }
  };

  return (
    <Listing
      list={watchListMovies}
      loading={isLoading}
      fetchMore={() => {}}
      onItemClick={handleOnItemClick}
      selectedItems={watchListMovieIds}
      buildCardLink={(id) => `/${AssetType.Movies}/${id}`}
    />
  );
};

export default Movies;

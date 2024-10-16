import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectWatchListTVShows,
  selectWatchListIsListLoading,
  selectWatchListTVShowIds,
  updateWatchListTVShowIds,
  fetchTVShows,
} from "../../store/watchListSlice";
import { AppDispatch } from "../../store";
import { AssetType } from "../../utils/constants";
import Listing from "../../components/Listing";

const TVShows = () => {
  const dispatch = useDispatch<AppDispatch>();
  const watchListTVShows = useSelector(selectWatchListTVShows);
  const isLoading = useSelector(selectWatchListIsListLoading);
  const watchListTVShowIds = useSelector(selectWatchListTVShowIds);

  useEffect(() => {
    if (watchListTVShows.length !== watchListTVShowIds.length) {
      dispatch(fetchTVShows());
    }
  }, [watchListTVShows, watchListTVShowIds]);

  const handleOnItemClick = (ev: any) => {
    if (ev.target.dataset.watchid) {
      dispatch(updateWatchListTVShowIds(ev.target.dataset.watchid));
    }
  };

  return (
    <Listing
      list={watchListTVShows}
      loading={isLoading}
      fetchMore={() => {}}
      onItemClick={handleOnItemClick}
      selectedItems={watchListTVShowIds}
      buildCardLink={(id) => `/${AssetType.TVShows}/${id}`}
    />
  );
};

export default TVShows;

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
  }, []);

  const handleOnItemClick = (ev: any) => {
    if (ev.target.dataset.id) {
      const arg = {
        tvShowId: ev.target.dataset.id,
        canUpdateWatchListTVShows: true,
      };
      dispatch(updateWatchListTVShowIds(arg));
    }
  };

  return (
    <Listing
      list={watchListTVShows}
      loading={isLoading}
      fetchMore={() => {}}
      onItemClick={handleOnItemClick}
      selectedItems={watchListTVShowIds}
      noOfItemsLoading={watchListTVShowIds.length}
      buildCardLink={(assetId) => `/${AssetType.TVShows}/${assetId}`}
    />
  );
};

export default TVShows;

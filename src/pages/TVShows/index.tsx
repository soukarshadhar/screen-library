import React from "react";
import { useSelector, useDispatch } from "react-redux";
import useTopRatedList from "../../hooks/useTopRatedList";
import Listing from "../../components/Listing";
import Carousel from "../../components/Carousel";
import Filter from "../../components/Filter";
import useURLSearchParams from "../../hooks/useURLSearchParams";
import useListing from "../../hooks/useListing";
import { buildListingParams } from "../../utils/utils";
import { AssetType } from "../../utils/constants";
import { selectors, AppDispatch } from "../../store";
import { selectUser } from "../../store/userSlice";
import { toggleDialog } from "../../store/dialogSlice";
import {
  updateWatchListTVShowIds,
  selectWatchListTVShowIds,
} from "../../store/watchListSlice";

const TVShows = () => {
  const dispatch = useDispatch<AppDispatch>();
  useTopRatedList(AssetType.TopRatedTVShows);
  const sortBy = useURLSearchParams("sortBy");
  const genres = useURLSearchParams("genres");
  const tvShowsList = useSelector(selectors[AssetType.TVShows].selectList);
  const loggedInUser = useSelector(selectUser);
  const tvShowsLoading = useSelector(
    selectors[AssetType.TVShows].selectLoading
  );
  const topRatedTVShowsList = useSelector(
    selectors[AssetType.TopRatedTVShows].selectList
  );
  const topRatedTVShowsListLoading = useSelector(
    selectors[AssetType.TopRatedTVShows].selectLoading
  );
  const watchListTVShowIds = useSelector(selectWatchListTVShowIds);

  const { fetchMore } = useListing(
    AssetType.TVShows,
    buildListingParams(sortBy.value, genres.value)
  );

  const handleOnItemClick = (ev: any) => {
    if (ev.target.dataset.id && !loggedInUser) {
      dispatch(toggleDialog());
    }

    if (ev.target.dataset.id && !!loggedInUser) {
      dispatch(updateWatchListTVShowIds({ tvShowId: ev.target.dataset.id }));
    }
  };

  return (
    <>
      <Carousel
        list={topRatedTVShowsList}
        assetType={AssetType.TVShows}
        loading={topRatedTVShowsListLoading}
      />
      <Filter />
      <Listing
        list={tvShowsList}
        loading={tvShowsLoading}
        fetchMore={fetchMore}
        onItemClick={handleOnItemClick}
        selectedItems={watchListTVShowIds}
        buildCardLink={(id) => `/${AssetType.TVShows}/${id}`}
      />
    </>
  );
};

export default TVShows;

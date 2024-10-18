import React from "react";
import { useSelector, useDispatch } from "react-redux";
import useTopRatedList from "../../hooks/useTopRatedList";
import Listing from "../../components/Listing";
import Carousel from "../../components/Carousel";
import Filter from "../../components/Filter";
import useURLSearchParams from "../../hooks/useURLSearchParams";
import useListing from "../../hooks/useListing";
import { selectors, AppDispatch } from "../../store";
import { selectUser } from "../../store/userSlice";
import { toggleDialog } from "../../store/dialogSlice";
import {
  updateWatchListMovieIds,
  selectWatchListMovieIds,
} from "../../store/watchListSlice";
import { buildListingParams } from "../../utils/utils";
import { AssetType } from "../../utils/constants";

const Movies = () => {
  const dispatch = useDispatch<AppDispatch>();
  useTopRatedList(AssetType.TopRatedMovies);
  const sortBy = useURLSearchParams("sortBy");
  const genres = useURLSearchParams("genres");
  const moviesList = useSelector(selectors[AssetType.Movies].selectList);
  const moviesLoading = useSelector(selectors[AssetType.Movies].selectLoading);
  const topRatedMoviesList = useSelector(
    selectors[AssetType.TopRatedMovies].selectList
  );
  const loggedInUser = useSelector(selectUser);
  const watchListMovieIds = useSelector(selectWatchListMovieIds);

  const { fetchMore } = useListing(
    AssetType.Movies,
    buildListingParams(sortBy.value, genres.value)
  );

  const handleOnItemClick = (ev: any) => {
    if (ev.target.dataset.id && !loggedInUser) {
      dispatch(toggleDialog());
    }

    if (ev.target.dataset.id && !!loggedInUser) {
      dispatch(updateWatchListMovieIds({ movieId: ev.target.dataset.id }));
    }
  };

  return (
    <>
      <Carousel list={topRatedMoviesList} assetType={AssetType.Movies} />
      <Filter />
      <Listing
        list={moviesList}
        loading={moviesLoading}
        fetchMore={fetchMore}
        onItemClick={handleOnItemClick}
        selectedItems={watchListMovieIds}
        buildCardLink={(id) => `/${AssetType.Movies}/${id}`}
      />
    </>
  );
};

export default Movies;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import {
  toggleActiveTab,
  selectWatchListIsMoviesTabActive,
} from "../../store/watchListSlice";
import Tab from "../../components/Tab";
import Movies from "./Movies";
import TVShows from "./TVShows";
import "../../styles/watchlist.scss";

const WatchList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isMoviesTabActive = useSelector(selectWatchListIsMoviesTabActive);
  const handleOnTabClick = () => {
    dispatch(toggleActiveTab());
  };

  return (
    <>
      <div className="tab-group">
        <Tab
          label="Movies"
          isActive={isMoviesTabActive}
          onClick={handleOnTabClick}
        />
        <Tab
          label="TV Shows"
          isActive={!isMoviesTabActive}
          onClick={handleOnTabClick}
        />
      </div>
      {isMoviesTabActive ? <Movies /> : <TVShows />}
    </>
  );
};

export default WatchList;

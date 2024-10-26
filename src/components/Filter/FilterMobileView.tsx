import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilter,
  faXmark,
  faSquareCheck,
} from "@fortawesome/free-solid-svg-icons";
import { GENRE_LIST, SORT_BY_LIST } from "../../utils/constants";

const FilterMobileView = () => {
  const [openFilterMobile, setOpenFilterMobile] = useState(false);
  const [filterTab, setFilterTab] = useState("GENRES");

  const handleOnToggleFilterMobile = () => {
    setOpenFilterMobile(!openFilterMobile);
  };

  const handleOnFilterTabClick = (ev: React.MouseEvent<HTMLElement>) => {
    setFilterTab((ev.target as any).id);
  };

  return (
    <>
      <div className="filter-icon" onClick={handleOnToggleFilterMobile}>
        <FontAwesomeIcon icon={faFilter} />
      </div>
      {openFilterMobile && (
        <div className="filter-mobile">
          <div className="heading">
            <h2>Filters</h2>
            <FontAwesomeIcon
              onClick={handleOnToggleFilterMobile}
              className="close-filter"
              icon={faXmark}
            />
          </div>
          <div className="content">
            <div className="col-1" onClick={handleOnFilterTabClick}>
              <div
                id="GENRES"
                className={`filter-tab${
                  filterTab === "GENRES" ? " tab-selected" : ""
                }`}
              >
                Genres
              </div>
              <div
                id="SORT_BY"
                className={`filter-tab${
                  filterTab === "SORT_BY" ? " tab-selected" : ""
                }`}
              >
                Sort By
              </div>
            </div>
            <div className="col-2">
              <div className="options">
                {filterTab === "GENRES" &&
                  GENRE_LIST.map((genre) => {
                    return (
                      <div className="genre-option">
                        <FontAwesomeIcon
                          className="checkbox"
                          icon={faSquareCheck}
                        />
                        {genre.label}
                      </div>
                    );
                  })}
                {filterTab === "SORT_BY" &&
                  SORT_BY_LIST.map((sortBy) => {
                    return <div>{sortBy.name}</div>;
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterMobileView;

import React from "react";
import MultiSelectDropdown from "../MultiSelectDropdown";
import Dropdown from "../Dropdown";
import useURLSearchParams from "../../hooks/useURLSearchParams";
import ChipList from "../ChipList";
import { GENRE_LIST, SORT_BY_LIST } from "../../utils/constants";
import { getGenresBySelectedIds } from "../../utils/utils";
import "../../styles/filter.scss";

const Filter = () => {
  const sortBy = useURLSearchParams("sortBy");
  const genres = useURLSearchParams("genres");

  const handleOnSortBySelect = (id: string) => {
    sortBy.setValue(id);
  };

  const handleOnGenreSelect = (id: string) => {
    const selectedGenre = getGenresBySelectedIds(genres.value).map(
      (genre) => genre.id
    );

    const indexOfGenre = selectedGenre.findIndex((genreId) => genreId === id);

    if (indexOfGenre === -1) {
      selectedGenre.push(id);
    } else {
      selectedGenre.splice(indexOfGenre, 1);
    }

    genres.setValue(selectedGenre.join(","));
  };

  const getChips = () => {
    const genreIds = getGenresBySelectedIds(genres.value);
    return genreIds.map((genre) => {
      return {
        label: genre.name,
        id: genre.id,
      };
    });
  };

  return (
    <div className="filter">
      <div className="row1">
        <MultiSelectDropdown
          label="Genres"
          options={GENRE_LIST.map((val) => {
            return { value: "" + val.id, label: val.name };
          })}
          value={getGenresBySelectedIds(genres.value).map((genre) => genre.id)}
          onSelect={handleOnGenreSelect}
        />
        <Dropdown
          label="Sort By"
          options={SORT_BY_LIST.map((val) => {
            return { value: val.id, label: val.name };
          })}
          value={sortBy.value}
          onSelect={handleOnSortBySelect}
        />
      </div>
      <ChipList chips={getChips()} onDelete={handleOnGenreSelect} />
    </div>
  );
};

export default Filter;

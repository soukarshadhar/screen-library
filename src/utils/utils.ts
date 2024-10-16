import { GENRE_LIST, SORT_BY_LIST } from "./constants";

export const resolveToArrayIndex = (
  currentIndex: number,
  arrLength: number
) => {
  let index = currentIndex;

  if (index >= 0) {
    index = index % arrLength;
  }

  while (index < 0) {
    index = arrLength + index;
  }

  return index;
};

export const getMotionPicturesWithGenre = (motionPictures: any[]) => {
  return motionPictures.filter(
    (motionPicture) =>
      motionPicture.genre_ids && motionPicture.genre_ids.length > 0
  );
};

export const getGenresBySelectedIds = (genreIds: string) => {
  const ids = genreIds.split(",");
  const selectedGenres: { id: string; name: string }[] = [];
  ids.forEach((id) => {
    const genreById = GENRE_LIST.find((genre) => genre.id === parseInt(id));
    if (genreById) {
      selectedGenres.push({ id: "" + genreById.id, name: genreById.name });
    }
  });

  return selectedGenres;
};

export const buildListingParams = (
  sortByValue: string,
  genresValues: string
) => {
  const params = [];

  const sortByValueIndex = SORT_BY_LIST.findIndex(
    (sortByItems) => sortByItems.id === sortByValue
  );

  if (sortByValueIndex !== -1) {
    params.push(`sort_by=${sortByValue}`);
  }

  const genres = getGenresBySelectedIds(genresValues);
  genresValues = genres.map((genre) => genre.id).join("|");

  if (genresValues) {
    params.push(`with_genres=${genresValues}`);
  }

  return params.join("&");
};

export const getSearchParamPopularityDesc = () => {
  const url = new URLSearchParams();
  url.set("sortBy", "popularity.desc");
  return url.toString();
};

export const formatRuntime = (runtime: number) => {
  const hours = Math.floor(runtime / 60);
  const minutes = Math.floor(runtime % 60);
  return `${hours ? `${hours} hr` : ""}${hours ? " " : ""}${
    minutes ? `${minutes} min` : ""
  }`;
};

export const formatReleaseDate = (releaseDate: string) => {
  const parts = [];
  const date = new Date(releaseDate);

  if (date.getDate() < 10) {
    parts.push(`0${date.getDate()}`);
  } else {
    parts.push(date.getDate());
  }

  const month = date.getMonth() + 1;
  if (month < 10) {
    parts.push(`0${month}`);
  } else {
    parts.push(month);
  }

  parts.push(date.getFullYear());

  return parts.join("/");
};

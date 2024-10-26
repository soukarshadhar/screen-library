export const SIGN_IN_LABEL = "Sign In";
export const SIGN_UP_LABEL = "Sign Up";
export const getAssetImageURL = (size: string) =>
  `https://image.tmdb.org/t/p/${size}`;

export enum AssetType {
  Movies = "movies",
  TVShows = "tvShows",
  TopRatedMovies = "topRatedMovies",
  TopRatedTVShows = "topRatedTVShows",
}

export const ASSET_TYPE_TO_API_PATH = {
  [AssetType.Movies]: "movie",
  [AssetType.TVShows]: "tv",
  [AssetType.TopRatedMovies]: "movie",
  [AssetType.TopRatedTVShows]: "tv",
};

export const GET_REQUEST_INIT = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
  },
};

export const GENRE_LIST = [
  {
    value: "28",
    label: "Action",
  },
  {
    value: "12",
    label: "Adventure",
  },
  {
    value: "16",
    label: "Animation",
  },
  {
    value: "35",
    label: "Comedy",
  },
  {
    value: "80",
    label: "Crime",
  },
  {
    value: "10751",
    label: "Family",
  },
  {
    value: "14",
    label: "Fantasy",
  },
  {
    value: "36",
    label: "History",
  },
  {
    value: "27",
    label: "Horror",
  },
  {
    value: "10402",
    label: "Music",
  },
  {
    value: "9648",
    label: "Mystery",
  },
  {
    value: "878",
    label: "Science Fiction",
  },
  {
    value: "10770",
    label: "TV Movie",
  },
  {
    value: "53",
    label: "Thriller",
  },
  {
    value: "10752",
    label: "War",
  },
  {
    value: "37",
    label: "Western",
  },
];

export const SORT_BY_LIST = [
  {
    id: "popularity.desc",
    name: "Popularity: High to Low",
  },
  {
    id: "popularity.asc",
    name: "Popularity: Low to High",
  },
];

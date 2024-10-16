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
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
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

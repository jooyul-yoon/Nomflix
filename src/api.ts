const API_KEY = "79237aa8c0758e58f65a9c70bbc66c18";
const BASE_URL = "https://api.themoviedb.org/3/";

interface IMovie {
  id: number;
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  original_language: string;
  original_title: String;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: false;
  vote_average: number;
  vote_count: number;
}

export interface IGetMoviesResult {
  dates: { maximum: string; minimum: string };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export function getNowPlayingMovies() {
  return fetch(`${BASE_URL}movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getTopRatedMovies() {
  return fetch(`${BASE_URL}movie/top_rated?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getUpcomingMovies() {
  return fetch(`${BASE_URL}movie/upcoming?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

export function getGenreData() {
  return fetch(`${BASE_URL}genre/movie/list`, {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3OTIzN2FhOGMwNzU4ZTU4ZjY1YTljNzBiYmM2NmMxOCIsInN1YiI6IjYxZTQyNjA5MGNkMzJhMDA5ZGU1MTAzZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lL55mrv6DWQA8waZg14tBigsilqs9NfE1zRxohf8Ms4",
    },
  }).then((response) => response.json());
}

const API_KEY = "79237aa8c0758e58f65a9c70bbc66c18";
const BASE_URL = "https://api.themoviedb.org/3/";
// const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

// type imageType = "original" | "w500";

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

export function getMovies() {
  return fetch(`${BASE_URL}movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

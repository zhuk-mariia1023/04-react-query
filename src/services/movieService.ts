import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = "https://api.themoviedb.org/3";

const token = import.meta.env.VITE_TMDB_TOKEN;

if (!token) {
  throw new Error("TMDB token is not defined in environment variables");
}

interface FetchMoviesParams {
  query: string;
  page?: number;
}

interface FetchMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export async function fetchMovies({
  query,
  page = 1,
}: FetchMoviesParams): Promise<FetchMoviesResponse> {
  const config = {
    params: {
      query,
      page,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response: AxiosResponse<FetchMoviesResponse> = await axios.get(
    `${BASE_URL}/search/movie`,
    config
  );
  return response.data;
}

import { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { fetchMovies } from "../../services/movieService";
import type { Movie } from "../../types/movie";
import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    if (!query) return;

    const getMovies = async () => {
      try {
        setError(false);
        setLoading(true);
        const data = await fetchMovies({ query });
        if (data.results.length === 0) {
          toast.error("No movies found for your request.");
        }
        setMovies(data.results);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [query]);

  const handleSubmit = (newQuery: string) => {
    setQuery(newQuery);
    setMovies([]);
  };

  return (
    <>
      <Toaster />
      <SearchBar onSubmit={handleSubmit} />
      {loading && <Loader />}
      {error && <ErrorMessage />}
      {!loading && !error && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
      )}
      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </>
  );
}

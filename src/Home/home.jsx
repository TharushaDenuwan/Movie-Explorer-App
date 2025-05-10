import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Moon, Sun, Search, ArrowLeft, Film, Star } from 'lucide-react';
import axios from 'axios';
import Styles from './home.module.css';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';
import MovieCard from '../components/MovieCard.jsx';

// TMDb API configuration
const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p';

// Image sizes
const posterSizes = {
  small: `${IMAGE_BASE_URL}/w185`,
  medium: `${IMAGE_BASE_URL}/w342`,
  large: `${IMAGE_BASE_URL}/w500`,
  original: `${IMAGE_BASE_URL}/original`,
};

// Create axios instance with base configuration
const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [loading, setLoading] = useState(false);
  const [detailLoading, setDetailLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchError, setSearchError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [genres, setGenres] = useState({});
  const lastMovieElementRef = useRef();
  const [searchPage, setSearchPage] = useState(1);
  const [searching, setSearching] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  // Save darkMode to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Fetch genre mapping
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await api.get('/genre/movie/list');
        const genreMap = {};
        response.data.genres.forEach(genre => {
          genreMap[genre.id] = genre.name;
        });
        setGenres(genreMap);
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    };

    fetchGenres();
  }, []);

  // Format movie data from API to our app format
  const formatMovieData = (movie) => {
    return {
      id: movie.id,
      title: movie.title,
      year: movie.release_date ? new Date(movie.release_date).getFullYear() : 'Unknown',
      rating: movie.vote_average,
      poster: movie.poster_path
        ? `${posterSizes.medium}${movie.poster_path}`
        : 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg',
      overview: movie.overview || 'No description available',
      genre: movie.genres ? movie.genres.map(g => g.name) :
        movie.genre_ids ? movie.genre_ids.map(id => genres[id] || 'Unknown') : [],
      cast: movie.credits?.cast?.slice(0, 10).map(c => c.name) || [],
      runtime: movie.runtime || 0,
      backdrop: movie.backdrop_path
        ? `${posterSizes.original}${movie.backdrop_path}`
        : null
    };
  };

  // Fetch trending movies
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/trending/movie/week');
        const formattedMovies = response.data.results.map(formatMovieData);
        setTrendingMovies(formattedMovies);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        setError('Failed to load trending movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  }, [genres]);

  // Handle search
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setMovies([]);
      setSearching(false);
      return;
    }

    setMovies([]);
    setSearchPage(1);
    setSearching(true);
    setHasMore(true);
    await searchMovies(searchQuery, 1, true);
  };

  // Search movies function
  const searchMovies = async (query, page, isNewSearch = false) => {
    if (!query.trim()) return;

    if (isNewSearch) {
      setMovies([]);
    }

    setSearchError(null);
    setLoading(true);

    try {
      const response = await api.get('/search/movie', {
        params: {
          query,
          page,
          include_adult: false
        }
      });

      const formattedMovies = response.data.results.map(formatMovieData);

      if (isNewSearch) {
        setMovies(formattedMovies);
        setTotalResults(response.data.total_results);
      } else {
        setMovies(prev => [...prev, ...formattedMovies]);
      }

      setHasMore(page < response.data.total_pages);
      setSearchPage(page + 1);
    } catch (error) {
      console.error('Error searching movies:', error);
      setSearchError('Failed to search movies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Infinite scroll implementation
  const handleObserver = useCallback((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && hasMore && !loading && searching) {
      searchMovies(searchQuery, searchPage);
    }
  }, [hasMore, loading, searchPage, searchQuery, searching]);

  useEffect(() => {
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: '20px',
      threshold: 1.0
    });

    if (lastMovieElementRef.current) {
      observer.observe(lastMovieElementRef.current);
    }

    return () => {
      if (lastMovieElementRef.current) {
        observer.unobserve(lastMovieElementRef.current);
      }
    };
  }, [handleObserver, movies]);

  // Get movie details
  const getMovieDetails = async (movieId) => {
    setDetailLoading(true);
    try {
      const response = await api.get(`/movie/${movieId}`, {
        params: {
          append_to_response: 'credits'
        }
      });
      const formattedMovie = formatMovieData(response.data);
      setSelectedMovie(formattedMovie);
    } catch (error) {
      console.error('Error getting movie details:', error);
      setError('Failed to load movie details. Please try again later.');
    } finally {
      setDetailLoading(false);
    }
  };

  // Handle movie selection
  const handleMovieSelect = (movie) => {
    if (!movie.cast || movie.cast.length === 0) {
      getMovieDetails(movie.id);
    } else {
      setSelectedMovie(movie);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Retry functions
  const retryFetchTrending = async () => {
    setError(null);
    const fetchTrendingMovies = async () => {
      setLoading(true);
      try {
        const response = await api.get('/trending/movie/week');
        const formattedMovies = response.data.results.map(formatMovieData);
        setTrendingMovies(formattedMovies);
      } catch (error) {
        console.error('Error fetching trending movies:', error);
        setError('Failed to load trending movies. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTrendingMovies();
  };

  const retrySearch = () => {
    setSearchError(null);
    handleSearch({ preventDefault: () => { } });
  };

  return (
    <div className={`${Styles.container} ${darkMode ? Styles.darkMode : Styles.lightMode}`}>
      <header className={Styles.header}>
        <div className={Styles.logoContainer}>
          <Film className={Styles.logoIcon} />
          <h1>Movie Explorer</h1>
        </div>
        <button onClick={toggleDarkMode} className={Styles.themeToggle}
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}>
          {darkMode ? <Sun /> : <Moon />}
        </button>
      </header>

      <form onSubmit={handleSearch} className={Styles.searchBar}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for movies..."
          className={Styles.searchInput}
        />
        <button type="submit" className={Styles.searchButton} aria-label="Search">
          <Search />
        </button>
      </form>

      {error && (
        <ErrorMessage message={error} retry={retryFetchTrending} />
      )}

      {selectedMovie ? (
        <div className={Styles.movieDetail}>
          {detailLoading ? (
            <LoadingSpinner size="large" />
          ) : (
            <>
              <button onClick={() => setSelectedMovie(null)} className={Styles.backButton}>
                <ArrowLeft className={Styles.backIcon} />
                Back to Results
              </button>

              {selectedMovie.backdrop && (
                <div className={Styles.backdrop}
                  style={{ backgroundImage: `url(${selectedMovie.backdrop})` }}>
                  <div className={Styles.backdropOverlay}></div>
                </div>
              )}

              <div className={Styles.detailContent}>
                <div className={Styles.posterContainer}>
                  <img
                    src={selectedMovie.poster}
                    alt={selectedMovie.title}
                    className={Styles.detailPoster}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg';
                    }}
                  />
                </div>
                <div className={Styles.detailInfo}>
                  <h2>{selectedMovie.title} <span className={Styles.year}>({selectedMovie.year})</span></h2>

                  <div className={Styles.ratingContainer}>
                    <Star className={Styles.starIcon} />
                    <span className={Styles.rating}>{selectedMovie.rating.toFixed(1)}/10</span>
                  </div>

                  <div className={Styles.genres}>
                    {selectedMovie.genre.map(g => (
                      <span key={g} className={Styles.genre}>{g}</span>
                    ))}
                  </div>

                  <div className={Styles.overview}>
                    <h3>Overview</h3>
                    <p>{selectedMovie.overview}</p>
                  </div>

                  {selectedMovie.cast && selectedMovie.cast.length > 0 && (
                    <div className={Styles.cast}>
                      <h3>Cast</h3>
                      <p>{selectedMovie.cast.join(', ')}</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      ) : (
        <>
          {searching ? (
            <section className={Styles.searchResults}>
              <h2>Search Results {totalResults > 0 && <span>({totalResults})</span>}</h2>

              {searchError && (
                <ErrorMessage message={searchError} retry={retrySearch} />
              )}

              {movies.length > 0 ? (
                <div className={Styles.movieGrid}>
                  {movies.map((movie, index) => {
                    if (movies.length === index + 1) {
                      return (
                        <div ref={lastMovieElementRef} key={`${movie.id}-${index}`}>
                          <MovieCard
                            movie={movie}
                            onClick={handleMovieSelect}
                          />
                        </div>
                      );
                    } else {
                      return (
                        <MovieCard
                          key={`${movie.id}-${index}`}
                          movie={movie}
                          onClick={handleMovieSelect}
                        />
                      );
                    }
                  })}
                </div>
              ) : !loading && !searchError ? (
                <div className={Styles.noResults}>
                  <p>No movies found matching your search.</p>
                </div>
              ) : null}

              {loading && <LoadingSpinner />}

              {!hasMore && movies.length > 0 && (
                <p className={Styles.endMessage}>You've reached the end of the results</p>
              )}
            </section>
          ) : (
            <section className={Styles.trending}>
              <h2>Trending Movies This Week</h2>

              {loading ? (
                <LoadingSpinner size="large" />
              ) : (
                <div className={Styles.movieGrid}>
                  {trendingMovies.map((movie, index) => (
                    <MovieCard
                      key={`${movie.id}-${index}`}
                      movie={movie}
                      onClick={handleMovieSelect}
                    />
                  ))}
                </div>
              )}
            </section>
          )}
        </>
      )}
    </div>
  );
}

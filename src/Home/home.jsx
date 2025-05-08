import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FiSearch, FiMoon, FiSun } from 'react-icons/fi';
import Styles from './home.module.css';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  // Simulated API data - Replace with actual API calls
  useEffect(() => {
    const fetchTrendingMovies = async () => {
      // Replace with actual API call
      const mockTrending = [
        {
          id: 1,
          title: "Inception",
          year: 2010,
          rating: 8.8,
          poster: "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg",
          overview: "A thief who enters the dreams of others to steal secrets from their subconscious.",
          genre: ["Action", "Sci-Fi"],
          cast: ["Leonardo DiCaprio", "Ellen Page"]
        },
        // Add more mock movies
        {
            id: 1,
            title: "Inception",
            year: 2010,
            rating: 8.8,
            poster: "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg",
            overview: "A thief who enters the dreams of others to steal secrets from their subconscious.",
            genre: ["Action", "Sci-Fi"],
            cast: ["Leonardo DiCaprio", "Ellen Page"]
          },
      ];
      setTrendingMovies(mockTrending);
    };

    fetchTrendingMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    // Replace with actual API call
    const mockResults = [
      {
        id: 2,
        title: searchQuery,
        year: 2024,
        rating: 7.5,
        poster: "https://images.pexels.com/photos/3945317/pexels-photo-3945317.jpeg",
        overview: "A fascinating movie about...",
        genre: ["Drama"],
        cast: ["Actor 1", "Actor 2"]
      },
      // Add more mock results
    ];
    setMovies(mockResults);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${Styles.container} ${darkMode ? Styles.darkMode : Styles.lightMode}`}>
      <header className={Styles.header}>
        <h1>Movie Explorer</h1>
        <button onClick={toggleDarkMode} className={Styles.themeToggle}>
          {darkMode ? <FiSun /> : <FiMoon />}
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
        <button type="submit" className={Styles.searchButton}>
          <FiSearch />
        </button>
      </form>

      {selectedMovie ? (
        <div className={Styles.movieDetail}>
          <button onClick={() => setSelectedMovie(null)} className={Styles.backButton}>
            Back to Results
          </button>
          <div className={Styles.detailContent}>
            <img src={selectedMovie.poster} alt={selectedMovie.title} />
            <div className={Styles.detailInfo}>
              <h2>{selectedMovie.title} ({selectedMovie.year})</h2>
              <p className={Styles.rating}>Rating: {selectedMovie.rating}/10</p>
              <p className={Styles.overview}>{selectedMovie.overview}</p>
              <div className={Styles.genres}>
                {selectedMovie.genre.map(g => (
                  <span key={g} className={Styles.genre}>{g}</span>
                ))}
              </div>
              <div className={Styles.cast}>
                <h3>Cast</h3>
                <p>{selectedMovie.cast.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {movies.length > 0 && (
            <section className={Styles.searchResults}>
              <h2>Search Results</h2>
              <div className={Styles.movieGrid}>
                {movies.map(movie => (
                  <div
                    key={movie.id}
                    className={Styles.movieCard}
                    onClick={() => setSelectedMovie(movie)}
                  >
                    <img src={movie.poster} alt={movie.title} />
                    <div className={Styles.movieInfo}>
                      <h3>{movie.title}</h3>
                      <p>{movie.year}</p>
                      <p className={Styles.rating}>{movie.rating}/10</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className={Styles.trending}>
            <h2>Trending Movies</h2>
            <div className={Styles.movieGrid}>
              {trendingMovies.map(movie => (
                <div
                  key={movie.id}
                  className={Styles.movieCard}
                  onClick={() => setSelectedMovie(movie)}
                >
                  <img src={movie.poster} alt={movie.title} />
                  <div className={Styles.movieInfo}>
                    <h3>{movie.title}</h3>
                    <p>{movie.year}</p>
                    <p className={Styles.rating}>{movie.rating}/10</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}
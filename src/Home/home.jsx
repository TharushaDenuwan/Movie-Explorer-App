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
          cast: ["Leonardo DiCaprio", "Ellen Page", "Joseph Gordon-Levitt", "Tom Hardy"]
        },
        {
          id: 2,
          title: "The Shawshank Redemption",
          year: 1994,
          rating: 9.3,
          poster: "https://images.pexels.com/photos/1022692/pexels-photo-1022692.jpeg",
          overview: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
          genre: ["Drama"],
          cast: ["Tim Robbins", "Morgan Freeman", "Bob Gunton", "William Sadler"]
        },
        {
          id: 3,
          title: "The Dark Knight",
          year: 2008,
          rating: 9.0,
          poster: "https://images.pexels.com/photos/2850287/pexels-photo-2850287.jpeg",
          overview: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
          genre: ["Action", "Crime", "Drama"],
          cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart", "Michael Caine"]
        },
        {
          id: 4,
          title: "Pulp Fiction",
          year: 1994,
          rating: 8.9,
          poster: "https://images.pexels.com/photos/2874752/pexels-photo-2874752.jpeg",
          overview: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
          genre: ["Crime", "Drama"],
          cast: ["John Travolta", "Samuel L. Jackson", "Uma Thurman", "Bruce Willis"]
        },
        {
          id: 5,
          title: "Interstellar",
          year: 2014,
          rating: 8.6,
          poster: "https://images.pexels.com/photos/1169754/pexels-photo-1169754.jpeg",
          overview: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
          genre: ["Adventure", "Drama", "Sci-Fi"],
          cast: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain", "Michael Caine"]
        },
        {
          id: 6,
          title: "The Matrix",
          year: 1999,
          rating: 8.7,
          poster: "https://images.pexels.com/photos/2085832/pexels-photo-2085832.jpeg",
          overview: "A computer programmer discovers that reality as he knows it is a simulation created by machines, and joins a rebellion to break free.",
          genre: ["Action", "Sci-Fi"],
          cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss", "Hugo Weaving"]
        }
      ];
      setTrendingMovies(mockTrending);
    };

    fetchTrendingMovies();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) {
      setMovies([]);
      return;
    }

    const searchTerm = searchQuery.toLowerCase();
    const filteredMovies = trendingMovies.filter(movie => 
      movie.title.toLowerCase().includes(searchTerm) ||
      movie.overview.toLowerCase().includes(searchTerm) ||
      movie.genre.some(g => g.toLowerCase().includes(searchTerm)) ||
      movie.cast.some(c => c.toLowerCase().includes(searchTerm))
    );
    
    setMovies(filteredMovies);
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
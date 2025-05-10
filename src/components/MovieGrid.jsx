// import React from 'react';
// import MovieCard from './MovieCard';
// import LoadingSpinner from './LoadingSpinner';

// const MovieGrid = ({ movies, onSelectMovie, loading = false }) => {
//   return (
//     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
//       {movies.map(movie => (
//         <MovieCard
//           key={`${movie.id}-${movie.title}`}
//           movie={movie}
//           onClick={onSelectMovie}
//         />
//       ))}
//       {loading && (
//         <div className="col-span-full py-4">
//           <LoadingSpinner />
//         </div>
//       )}
//     </div>
//   );
// };

// export default MovieGrid;


import React, { useState, useEffect } from 'react';
import styles from './MovieGrid.module.css';

const MovieGrid = ({ movies, isLoading, errorMessage }) => {
  return (
    <div className={styles.movieGridContainer}>
      {isLoading && (
        <div className={styles.loadingSpinner}>
          <svg viewBox="0 0 50 50" className={styles.spinner}>
            <circle cx="25" cy="25" r="20" stroke="#ff6347" strokeWidth="5" fill="none" />
          </svg>
        </div>
      )}
      {errorMessage && <div className={styles.errorMessage}>{errorMessage}</div>}
      {!isLoading && !errorMessage && movies.length === 0 && (
        <div className={styles.endMessage}>No movies found!</div>
      )}
      <div className={styles.movieGrid}>
        {movies.map((movie) => (
          <div key={movie.id} className={styles.movieCard}>
            <img src={movie.posterUrl} alt={movie.title} className={styles.movieImage} />
            <div className={styles.movieInfo}>
              <h3 className={styles.movieTitle}>{movie.title}</h3>
              <p className={styles.movieReleaseDate}>{movie.releaseDate}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;

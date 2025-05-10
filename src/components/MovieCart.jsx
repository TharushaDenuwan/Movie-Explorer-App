// import React from 'react';
// import { Star } from 'lucide-react';

// const MovieCard = ({ movie, onClick, className = '' }) => {
//   return (
//     <div 
//       className={`
//         bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md 
//         hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1
//         cursor-pointer relative ${className}
//       `}
//       onClick={() => onClick(movie)}
//     >
//       <div className="relative pb-[150%] overflow-hidden">
//         <img 
//           src={movie.poster} 
//           alt={movie.title}
//           className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 hover:scale-105"
//           onError={(e) => {
//             e.target.src = 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg';
//           }}
//         />
//         <div className="absolute top-2 right-2 bg-black/70 text-yellow-400 rounded-full px-2 py-1 text-xs flex items-center">
//           <Star className="w-3 h-3 mr-1 inline" fill="currentColor" />
//           <span>{movie.rating.toFixed(1)}</span>
//         </div>
//       </div>
//       <div className="p-3">
//         <h3 className="font-semibold text-gray-900 dark:text-white truncate">{movie.title}</h3>
//         <p className="text-gray-600 dark:text-gray-400 text-sm">{movie.year}</p>
//       </div>
//     </div>
//   );
// };

// export default MovieCard;


import React from 'react';
import { Star } from 'lucide-react';
import styles from './MovieCard.module.css';

const MovieCard = ({ movie, onClick, className = '' }) => {
  return (
    <div 
      className={`${styles.movieCard} ${className}`}
      onClick={() => onClick(movie)}
    >
      <div className={styles.imageContainer}>
        <img 
          src={movie.poster} 
          alt={movie.title}
          className={styles.movieImage}
          onError={(e) => {
            e.target.src = 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg';
          }}
        />
        <div className={styles.rating}>
          <Star className={styles.starIcon} fill="currentColor" />
          <span>{movie.rating.toFixed(1)}</span>
        </div>
      </div>
      <div className={styles.movieInfo}>
        <h3 className={styles.movieTitle}>{movie.title}</h3>
        <p className={styles.movieYear}>{movie.year}</p>
      </div>
    </div>
  );
};

export default MovieCard;

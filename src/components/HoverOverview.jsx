// src/components/HoverOverview.jsx
import React from 'react';
import { Link } from 'react-router';

function HoverOverview({ movies, listType, isLoading }) {
  // listType will be 'favorites' or 'watchlist'

  const cardStyles = "absolute top-full mt-2 w-72 bg-[#333] rounded-lg shadow-lg p-4 z-50";

  if (isLoading) {
    return (
      <div className={cardStyles}>
        <p className="text-gray-400 text-center">Loading...</p>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className={cardStyles}>
        <p className="text-gray-400">Your list is empty.</p>
      </div>
    );
  }

  return (
    <div className={cardStyles}>
      <ul className="space-y-3">
        {/* Show first 3 movies in the overview */}
        {movies.slice(0, 3).map((movie) => (
          <li key={movie.id} className="flex items-center space-x-3">
            <img 
              // Note: You might need to adjust the image path based on your API
              src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
              alt={movie.title} 
              className="w-10 h-14 object-cover rounded bg-gray-500"
            />
            <span className="text-white text-sm font-semibold truncate">{movie.title}</span>
          </li>
        ))}
      </ul>
      {movies.length > 3 && (
        <p className="text-xs text-gray-500 mt-2">...and {movies.length - 3} more.</p>
      )}
      <hr className="my-3 border-gray-600" />
      <Link 
        to={`/${listType}`} 
        className="block text-center text-sm text-blue-400 hover:underline"
      >
        View All
      </Link>
    </div>
  );
}

export default HoverOverview;
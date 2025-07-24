import React, { useState } from "react";
import { Heart, Bookmark, Check } from "lucide-react";

// (movieData and genreMap objects remain the same as before...)
const movieData = {
  adult: false,
  backdrop_path: "/mljnZyk8gwO2YH9EDC5SMy4XgeP.jpg",
  genre_ids: [18, 14],
  id: 1295181,
  original_language: "it",
  original_title: "Avatar",
  overview:
    "Based on Théophile Gautier's novel of the same name, the film tells of the tragic love affair of Ottavio de Saville. He falls madly in love with Madame Prascovie Labinska, a woman very faithful to her husband, the Polish count Olaf Labinski. Alarmed by the growing physical and mental weariness of the desperate young man, his relatives and friends decide to turn to Doctor Balthazar, who has just returned from a trip to the Indies where he was initiated into the secrets of Brahman.",
  popularity: 0.3399,
  poster_path: "/nUTlHxnwomoIwojD0AF0OMzkonw.jpg",
  release_date: "1916-03-06",
  title: "Avatar",
  video: false,
  vote_average: 4.844,
  vote_count: 16,
};

const genreMap = {
  18: "Drama",
  14: "Fantasy",
  28: "Action",
  12: "Adventure",
  878: "Science Fiction",
};

function MovieDetailPage() {
  const backdropUrl = `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;

  // Step 1: Add state for favorite and watchlist buttons
  const [isFavorited, setIsFavorited] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);

  // Step 2: Create click handlers to toggle the state
  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
    // In a real app, you'd also make an API call here
    console.log(
      `Movie ${!isFavorited ? "added to" : "removed from"} favorites`
    );
  };

  const handleWatchlistClick = () => {
    setInWatchlist(!inWatchlist);
    console.log(
      `Movie ${!inWatchlist ? "added to" : "removed from"} watchlist`
    );
  };

  return (
    <div
      style={{ backgroundImage: `url(${backdropUrl})` }}
      className="bg-cover bg-center min-h-screen"
    >
      <div className="bg-black/60 min-h-screen flex items-center justify-center p-4 md:p-8">
        <div className="max-w-6xl w-full flex flex-col md:flex-row bg-black/50 backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl">
          <div className="w-full md:w-1/3">
            <img
              src={posterUrl}
              alt={`${movieData.title} Poster`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="w-full md:w-2/3 p-6 md:p-8 text-white flex flex-col">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {movieData.title}
            </h1>
            <div className="flex items-center space-x-4 text-gray-300 mb-4">
              <span className="flex items-center">
                ⭐ {movieData.vote_average.toFixed(1)}
              </span>
              <span>|</span>
              <span>{new Date(movieData.release_date).getFullYear()}</span>
              <span>|</span>
              <span className="uppercase font-semibold">
                {movieData.original_language}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {movieData.genre_ids.map((id) => (
                <span
                  key={id}
                  className="bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {genreMap[id] || "Unknown Genre"}
                </span>
              ))}
            </div>

            {/* Step 3: Add the action buttons */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={handleFavoriteClick}
                className="bg-white/10 p-3 rounded-full transition-all duration-300 ease-in-out hover:bg-white/20 active:scale-95"
                aria-label="Toggle Favorite"
              >
                {isFavorited ? (
                  <Heart size={24} className="text-red-500 fill-current" />
                ) : (
                  <Heart size={24} />
                )}
              </button>

              <button
                onClick={handleWatchlistClick}
                className="flex items-center gap-2 bg-white/10 px-4 py-3 rounded-full transition-all duration-300 ease-in-out hover:bg-white/20 active:scale-95"
                aria-label="Toggle Watchlist"
              >
                {inWatchlist ? (
                  <>
                    <Check size={24} className="text-sky-400" />
                    <span>In Watchlist</span>
                  </>
                ) : (
                  <>
                    <Bookmark size={24} />
                    <span>Add to Watchlist</span>
                  </>
                )}
              </button>
            </div>
            <div className=" border-l-4 border-[#515151] bg-[#232121]"> 
              <div className="flex-grow px-2">
                <h2 className="text-2xl font-semibold mb-2 italic">Overview</h2>
                <p className="text-gray-300 leading-relaxed">
                  {movieData.overview}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;

import React, { useEffect, useState } from "react";
import { Heart, Bookmark, Check } from "lucide-react";
import { useLoaderData, useParams } from "react-router";
import { searchById } from "../api/tmdb";
import { useSelector } from "react-redux";
import databaseService from "../appwrite/databaseService";

function MovieDetailPage() {
  // const [movieData, setMovieData] = useState(null);
  const [isFavorited, setIsFavorited] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);
  const params = useParams();
  const movieId = params.movieId;

  const movieData = useLoaderData();

  // Get the current user's data from Redux
  const userData = useSelector((state) => state.auth.user);

  useEffect(() => {
    // Check if the user is logged in and we have their profile
    if (userData) {
      databaseService.getUserProfile(userData.userId).then((profile) => {
        if (profile) {
          // Check if the current movie's ID is in the user's lists
          setIsFavorited(profile.favorites.includes(String(movieData.id)));
          setInWatchlist(profile.watchList.includes(String(movieData.id)));
        }
      });
    }
  }, [userData, movieData]); // Re-run when user or movie changes

  const handleFavoriteClick = async () => {
    setIsFavorited(!isFavorited);
    if (!userData) {
      alert("Please log in to save movies!");
      return;
    }

    try {
      console.log(
        `Updating favorites for user: ${userData.userId} with movie: ${movieData.id}`
      );

      // Call your new service function
      await databaseService.updateFavorites(
        userData.userId,
        String(movieData.id)
      );

      alert(`'${movieData.title}' has been updated in your favorites!`);
      // Optionally, you can update the UI here to show a filled/unfilled heart icon
    } catch (error) {
      alert("Failed to update favorites. Please try again.");
    }
  };

  if (!movieData)
    return (
      <h1 className="text-white text-4xl flex justify-center items-center min-h-screen">
        Loading...
      </h1>
    );

  const backdropUrl = `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;

  // Step 1: Add state for favorite and watchlist buttons

  // Step 2: Create click handlers to toggle the state

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
              {movieData.genres.map((genre) => (
                <span
                  key={genre.id}
                  className="bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full"
                >
                  {genre.name || "Unknown Genre"}
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

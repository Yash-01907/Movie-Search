import React, { useEffect, useState } from "react";
import { Heart, Bookmark, Check } from "lucide-react";
import { useLoaderData, useParams } from "react-router";
import { useSelector } from "react-redux";
import databaseService from "../appwrite/databaseService";

function MovieDetailPage() {
  const { movieId } = useParams();
  const movieData = useLoaderData();
  const userData = useSelector((state) => state.auth.user);

  const [isFavorited, setIsFavorited] = useState(false);
  const [inWatchlist, setInWatchlist] = useState(false);

  const backdropUrl = `https://image.tmdb.org/t/p/original${movieData?.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w500${movieData?.poster_path}`;

  // Check for favorite & watchlist status on load
  useEffect(() => {
    const checkUserLists = async () => {
      if (!userData || !movieData?.id) return;

      const profile = await databaseService.getUserProfile(userData.userId);
      if (!profile) return;

      const movieIdStr = String(movieData.id);
      setIsFavorited(profile.favorites.includes(movieIdStr));
      setInWatchlist(profile.watchList.includes(movieIdStr));
    };

    checkUserLists();
  }, [userData, movieData]);

  const handleFavoriteClick = async () => {
    if (!userData) return alert("Please log in to save movies!");

    setIsFavorited((prev) => !prev);

    try {
      await databaseService.updateFavorites(
        userData.userId,
        String(movieData.id)
      );
      alert(`'${movieData.title}' has been updated in your favorites!`);
    } catch (error) {
      alert("Failed to update favorites. Please try again.");
    }
  };

  const handleWatchlistClick = async () => {
    if (!userData) return alert("Please log in to save movies!");

    setInWatchlist((prev) => !prev);
    try {
      await databaseService.updateWatchlist(
        userData.userId,
        String(movieData.id)
      );
      alert(`'${movieData.title}' has been updated in your favorites!`);
    } catch (error) {
      alert("Failed to update favorites. Please try again.");
    }
    // You can optionally persist this to DB if needed
  };

  if (!movieData) {
    return (
      <h1 className="text-white text-4xl flex justify-center items-center min-h-screen">
        Loading...
      </h1>
    );
  }

  return (
    <div
      style={{ backgroundImage: `url(${backdropUrl})` }}
      className="bg-cover bg-center min-h-screen"
    >
      <div className="bg-black/60 min-h-screen flex items-center justify-center p-4 md:p-8">
        <div className="max-w-6xl w-full flex flex-col md:flex-row bg-black/50 backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl">
          {/* Poster */}
          <div className="w-full md:w-1/3">
            <img
              src={posterUrl}
              alt={`${movieData.title} Poster`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Details */}
          <div className="w-full md:w-2/3 p-6 md:p-8 text-white flex flex-col">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">
              {movieData.title}
            </h1>

            {/* Meta info */}
            <div className="flex items-center space-x-4 text-gray-300 mb-4">
              <span>⭐ {movieData.vote_average.toFixed(1)}</span>
              <span>|</span>
              <span>{new Date(movieData.release_date).getFullYear()}</span>
              <span>|</span>
              <span className="uppercase font-semibold">
                {movieData.original_language}
              </span>
            </div>

            {/* Genres */}
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

            {/* Actions */}
            <div className="flex items-center gap-4 mb-6">
              <button
                onClick={handleFavoriteClick}
                className="bg-white/10 p-3 rounded-full transition hover:bg-white/20 active:scale-95"
                aria-label="Toggle Favorite"
              >
                <Heart
                  size={24}
                  className={isFavorited ? "text-red-500 fill-current" : ""}
                />
              </button>

              <button
                onClick={handleWatchlistClick}
                className="flex items-center gap-2 bg-white/10 px-4 py-3 rounded-full transition hover:bg-white/20 active:scale-95"
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

            {/* Overview */}
            <div className="border-l-4 border-[#515151] bg-[#232121] px-2 py-2">
              <h2 className="text-2xl font-semibold mb-2 italic">Overview</h2>
              <p className="text-gray-300 leading-relaxed">
                {movieData.overview}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;

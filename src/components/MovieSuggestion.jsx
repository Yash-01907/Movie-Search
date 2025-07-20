import React from "react";
import MovieCard from "./MovieCard";
import { useSelector } from "react-redux";

function MovieSuggestion() {
  const { movieData: movie } = useSelector((state) => state.movieData);

  return (
    <div className="flex flex-wrap justify-center gap-4 px-4 mt-5">
      {movie?.length > 0 ? (
        movie.map((mov, idx) => (
          <div key={idx} className="w-[200px]">
            <MovieCard movie={mov} />
          </div>
        ))
      ) : (
        <p className="text-white text-xl">No movies found</p>
      )}
    </div>
  );
}

export default MovieSuggestion;

import React from "react";
import MovieCard from "./MovieCard";
import { useSelector } from "react-redux";

function MovieSuggestion() {
  const { movieData: movie } = useSelector((state) => state.movieData);

  return (
    <div className="flex flex-wrap justify-center gap-3 px-4 mt-5">
      {!movie ? (
        <div className="flex w-screen h-screen justify-center items-center">
          <p className="text-white text-center mt-10 text-xl">Loading...</p>
        </div>
      ) : movie?.length > 0 ? (
        movie.map((mov, idx) => (
          <div key={idx} className="w-[230px]">
            <MovieCard movie={mov} />
          </div>
        ))
      ) : (
        <div className="flex w-screen h-screen justify-center items-center">
          <p className="text-white text-center mt-10 text-xl">
            No movies Found
          </p>
        </div>
      )}
    </div>
  );
}

export default MovieSuggestion;

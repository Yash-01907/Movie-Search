import React, { useEffect } from "react";
import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import "./App.css";
import { popularMovies } from "./api/tmdb";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "./slice/movieDataSlice";
import MovieSuggestion from "./components/MovieSuggestion";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchPopularMovies() {
      const popularMoviesData = await popularMovies(); // ✅ await the result
      dispatch(addData(popularMoviesData)); // ✅ dispatch actual movie array
    }
    fetchPopularMovies();
  }, []);

  const { movieData } = useSelector((state) => state.movieData);

  return (
    <>
      <Header />
      {(!movieData || movieData.length === 0) && (
        <div className="flex w-screen h-screen justify-center items-center">
          <p className="text-white text-center mt-10 text-xl">Loading...</p>
        </div>
      )}
      <MovieSuggestion/>
    </>
  );
}

export default App;

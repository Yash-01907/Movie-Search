import React, { useEffect } from "react";
import Header from "./components/Header";
import MovieCard from "./components/MovieCard";
import "./App.css";
import { popularMovies } from "./api/tmdb";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "./slice/movieDataSlice";
import MovieSuggestion from "./components/MovieSuggestion";
import MovieDetailPage from "./components/MovieDetailPage";
import Footer from "./components/Footer";
import { Outlet } from "react-router";

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
      
      <Outlet/>
      <Footer/>
      
    </>
  );
}

export default App;

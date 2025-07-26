import React, { useEffect } from "react";
import Header from "./components/Header";
import "./App.css";
import { popularMovies } from "./api/tmdb";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "./slice/movieDataSlice";
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


  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;

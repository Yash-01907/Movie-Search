import React, { useEffect } from "react";
import Header from "./components/Header";
import "./App.css";
import { popularMovies } from "./api/tmdb";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "./slice/movieDataSlice";
import Footer from "./components/Footer";
import { Outlet } from "react-router";
import databaseService from "./appwrite/databaseService";
import auth from "./appwrite/auth";
import { logout } from "./slice/authSlice";

function App() {
  // auth.logout()
  const dispatch = useDispatch();
  // const isLoggedIn=useSelector((state)=>state.auth.userLoggedIn)

  // if(isLoggedIn){
  //   auth.logout()
  //   dispatch(logout())
  // }
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

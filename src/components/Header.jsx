import { useEffect, useState } from "react";
import { customMovieSearch } from "../api/tmdb";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../slice/movieDataSlice";
import { Link, useNavigate } from "react-router";
import { logout } from "../slice/authSlice";
import auth from "../appwrite/auth";
import databaseService from "../appwrite/databaseService"; // To get user lists

import HoverOverview from "./HoverOverview";

function Header() {
  // auth.logout()
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const authStatus = useSelector((state) => state.auth.userLoggedIn);
  const userData = useSelector((state) => state.auth.user);

  const [movieSearch, setMovieSearch] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // auth.logout()
  console.log(authStatus, userData, userData?.userId);
  useEffect(() => {
    if (authStatus && userData) {
      setIsLoading(true);
      databaseService
        .getUserProfile(userData.userId)
        .then((profile) => {
          if (profile) {
            // NOTE: You need a service to fetch movie details by ID from an API like TMDB
            // Here, we'll simulate it with a placeholder.
            // In a real app, you would make API calls with the IDs from profile.favorites and profile.watchList
            console.log("Favorites IDs:", profile.favorites);
            console.log("Watchlist IDs:", profile.watchList);
            // setFavoriteMovies(fetchedMovies);
            // setWatchlistMovies(fetchedMovies);
          }
        })
        .catch((error) => console.error("Failed to fetch user profile:", error))
        .finally(() => setIsLoading(false));
    } else {
      setFavoriteMovies([]);
      setWatchlistMovies([]);
      setIsLoading(false);
    }
  }, [authStatus, userData]);

  const searchMovie = async function (e) {
    if (e.key === "Enter") {
      dispatch(addData(null));
      const data = await customMovieSearch(movieSearch);
      dispatch(addData(data.results));
    }
  };

  const navItems = [
    { name: "Login", active: !authStatus, slug: "/login" },
    { name: "Sign Up", active: !authStatus, slug: "/signup" },
  ];

  const logoutHandler = async () => {
    try {
      await auth.logout();
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="flex px-5 py-10 justify-between bg-[#ff4f4f] h-20 items-center ">
      <Link to={"/"}>
        <div className="text-white font-bold text-3xl cursor-pointer">
          Movies
        </div>
      </Link>
      <input
        // className="border-2 rounded-full px-5 w-[30%] text-lg   focus-within:ring-2 focus:outline-none py-2"
        className="w-1/3 px-6 py-2 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-white bg-white/80 placeholder:text-gray-500 shadow-sm transition duration-200"
        placeholder="Search movies..."
        type="text"
        value={movieSearch}
        onChange={(e) => setMovieSearch(e.target.value)}
        onKeyDown={(e) => searchMovie(e)}
      />
      <div>
        <ul className="flex ml-auto ">
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  onClick={() => {
                    navigate(item.slug, { preventScrollReset: true });
                  }}
                  className="inline-block px-4 py-2 duration-200 hover:bg-[#ff7a7a] rounded-full font-semibold"
                >
                  {item.name}
                </button>
              </li>
            ) : null
          )}
          {authStatus && (
            <>
              {/* This is for favoriteMovies */}
              <li
              className="relative"
                onMouseEnter={() => setHoveredItem("favorites")}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <button
                  className="inline-block px-4 py-2 duration-200 hover:bg-[#ff7a7a] rounded-full font-semibold"
                  onClick={() => {
                    navigate("/favorites");
                  }}
                >
                  Favorites
                </button>
                {hoveredItem === "favorites" && (
                  <HoverOverview
                    movies={favoriteMovies}
                    listType={hoveredItem}
                    isLoading={isLoading}
                  />
                )}
              </li>
              {/* This is for Watchlist */}
              <li
                            className="relative"

                onMouseEnter={() => setHoveredItem("watchlist")}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <button
                  className="inline-block px-4 py-2 duration-200 hover:bg-[#ff7a7a] rounded-full font-semibold"
                  onClick={() => {
                    navigate("/watchlist");
                  }}
                >
                  WatchList
                </button>
                {hoveredItem === "watchlist" && (
                  <HoverOverview
                    movies={watchlistMovies}
                    isLoading={isLoading}
                    listType="watchlist"
                  />
                )}
              </li>

              {/* This is for logout button */}
              <li>
                <button
                  className="inline-block px-4 py-2 duration-200 hover:bg-[#ff7a7a] rounded-full font-semibold"
                  onClick={logoutHandler}
                >
                  logout
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Header;

// // src/components/Header.jsx

// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router';
// import { useSelector, useDispatch } from 'react-redux';
// import { logout as authLogout } from '../slice/authSlice';
// import authService from '../appwrite/auth';
// import databaseService from '../appwrite/databaseService'; // To get user lists
// import HoverOverview from './HoverOverview'; // The new component

// function Header() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
// // authService.logout()
//   const authStatus = useSelector((state) => state.auth.userLoggedIn);
//   const userData = useSelector((state) => state.auth.user);

//   // State to manage which nav item is being hovered
//   const [hoveredItem, setHoveredItem] = useState(null);
//   // State to hold the movie details for the overviews
//   const [favoriteMovies, setFavoriteMovies] = useState([]);
//   const [watchlistMovies, setWatchlistMovies] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   // This effect runs when the user logs in or out
//   useEffect(() => {
//     // If the user is logged in, fetch their movie lists
//     if (authStatus && userData) {
//       setIsLoading(true);
//       databaseService.getUserProfile(userData.$id)
//         .then((profile) => {
//           if (profile) {
//             // NOTE: You need a service to fetch movie details by ID from an API like TMDB
//             // Here, we'll simulate it with a placeholder.
//             // In a real app, you would make API calls with the IDs from profile.favorites and profile.watchList
//             console.log("Favorites IDs:", profile.favorites);
//             console.log("Watchlist IDs:", profile.watchList);
//             // setFavoriteMovies(fetchedMovies);
//             // setWatchlistMovies(fetchedMovies);
//           }
//         })
//         .catch(error => console.error("Failed to fetch user profile:", error))
//         .finally(() => setIsLoading(false));
//     } else {
//       // Clear the lists when the user logs out
//       setFavoriteMovies([]);
//       setWatchlistMovies([]);
//     }
//   }, [authStatus, userData]);

//   const navItems = [
//     { name: "Login", active: !authStatus, slug: "/login" },
//     { name: "Sign Up", active: !authStatus, slug: "/signup" },
//   ];

//   const logoutHandler = async () => {
//     try {
//       await authService.logout();
//       dispatch(authLogout());
//       navigate("/");
//     } catch (error) {
//       console.error("Logout failed:", error);
//     }
//   };

//   return (
//     <header className="py-3 shadow bg-[#2a2a2a] text-white">
//       <nav className="flex items-center justify-between px-4">
//         <div>
//           <Link to="/">Your Logo</Link>
//         </div>
//         <ul className="flex ml-auto items-center">
//           {/* Unauthenticated Nav Items */}
//           {navItems.map((item) =>
//             item.active ? (
//               <li key={item.name}>
//                 <button
//                   onClick={() => navigate(item.slug)}
//                   className="inline-block px-4 py-2 duration-200 hover:bg-[#ff7a7a] rounded-full font-semibold"
//                 >
//                   {item.name}
//                 </button>
//               </li>
//             ) : null
//           )}

//           {/* Authenticated Nav Items */}
//           {authStatus && (
//             <>
//               {/* Favorites with Hover */}
//               <li
//                 className="relative"
//                 onMouseEnter={() => setHoveredItem('favorites')}
//                 onMouseLeave={() => setHoveredItem(null)}
//               >
//                 <button
//                   onClick={() => navigate('/favorites')}
//                   className="inline-block px-4 py-2 duration-200 hover:bg-[#ff7a7a] rounded-full font-semibold"
//                 >
//                   Favorites
//                 </button>
//                 {hoveredItem === 'favorites' && <HoverOverview movies={favoriteMovies} isLoading={isLoading} listType="favorites" />}
//               </li>

//               {/* Watchlist with Hover */}
//               <li
//                 className="relative"
//                 onMouseEnter={() => setHoveredItem('watchlist')}
//                 onMouseLeave={() => setHoveredItem(null)}
//               >
//                 <button
//                   onClick={() => navigate('/watchlist')}
//                   className="inline-block px-4 py-2 duration-200 hover:bg-[#ff7a7a] rounded-full font-semibold"
//                 >
//                   Watch List
//                 </button>
//                 {hoveredItem === 'watchlist' && <HoverOverview movies={watchlistMovies} isLoading={isLoading} listType="watchlist" />}
//               </li>

//               {/* Logout Button */}
//               <li>
//                 <button
//                   className="inline-block px-4 py-2 duration-200 hover:bg-[#ff7a7a] rounded-full font-semibold"
//                   onClick={logoutHandler}
//                 >
//                   Logout
//                 </button>
//               </li>
//             </>
//           )}
//         </ul>
//       </nav>
//     </header>
//   );
// }

// export default Header;

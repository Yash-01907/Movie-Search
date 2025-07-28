// src/components/Header.jsx

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router"; // Correct import path

// API and Appwrite Services
import { customMovieSearch, searchById } from "../api/tmdb"; // Ensure you have searchById
import authService from "../appwrite/auth";
import databaseService from "../appwrite/databaseService";

// Redux Slices
import { addData } from "../slice/movieDataSlice";
import { logout as authLogout } from "../slice/authSlice"; // Renamed for clarity

// Components
import HoverOverview from "./HoverOverview";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
// authService.logout()
  // Redux State
  const authStatus = useSelector((state) => state.auth.userLoggedIn);
  const userData = useSelector((state) => state.auth.user);

  // Local State
  const [movieSearch, setMovieSearch] = useState("");
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [watchlistMovies, setWatchlistMovies] = useState([]);
  
  // FIX: State to manage the hide delay timeout
  const [hideTimeoutId, setHideTimeoutId] = useState(null);

  useEffect(() => {
    // Only run if the user is logged in
    if (authStatus && userData) {
      setIsLoading(true);
      
      databaseService.getUserProfile(userData.userId)
        .then((profile) => {
          if (profile) {
            // Fetch movie details for favorites
            if (profile.favorites && profile.favorites.length > 0) {
              const favoritePromises = profile.favorites.map(id => searchById(id));
              Promise.all(favoritePromises).then(setFavoriteMovies);
            } else {
              setFavoriteMovies([]);
            }
            
            // Fetch movie details for watchlist
            if (profile.watchList && profile.watchList.length > 0) {
              const watchlistPromises = profile.watchList.map(id => searchById(id));
              Promise.all(watchlistPromises).then(setWatchlistMovies);
            } else {
              setWatchlistMovies([]);
            }
          }
        })
        .catch((error) => console.error("Failed to fetch user profile:", error))
        .finally(() => setIsLoading(false));
    } else {
      // Clear lists if user logs out
      setFavoriteMovies([]);
      setWatchlistMovies([]);
    }
  }, [authStatus, userData]);

  const searchMovie = async (e) => {
    if (e.key === "Enter" && movieSearch.trim()) {
      dispatch(addData(null));
      const data = await customMovieSearch(movieSearch);
      dispatch(addData(data.results));
      navigate('/search-results');
    }
  };

  const logoutHandler = async () => {
    try {
      await authService.logout();
      dispatch(authLogout());
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // --- FIX: Hover handlers with delay ---
  const handleMouseEnter = (itemType) => {
    // If a hide timer is running, cancel it
    if (hideTimeoutId) {
      clearTimeout(hideTimeoutId);
    }
    setHoveredItem(itemType);
  };

  const handleMouseLeave = () => {
    // Set a timer to hide the overview after a short delay (e.g., 200ms)
    const timeoutId = setTimeout(() => {
      setHoveredItem(null);
    }, 200);
    setHideTimeoutId(timeoutId);
  };
  
  const unauthenticatedNavItems = [
    { name: "Login", slug: "/login" },
    { name: "Sign Up", slug: "/signup" },
  ];

  const authenticatedNavItems = [
    { name: "Favorites", slug: "/favorites", movies: favoriteMovies, type: "favorites" },
    { name: "Watch List", slug: "/watchlist", movies: watchlistMovies, type: "watchlist" },
  ];

  return (
    <nav className="flex px-5 py-10 justify-between bg-[#ff4f4f] h-20 items-center text-white">
      <Link to={"/"}>
        <div className="font-bold text-3xl cursor-pointer">Movies</div>
      </Link>
      <input
        className="w-1/3 px-6 py-2 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-white bg-white/80 text-black placeholder:text-gray-600 shadow-sm"
        placeholder="Search movies..."
        type="text"
        value={movieSearch}
        onChange={(e) => setMovieSearch(e.target.value)}
        onKeyDown={searchMovie}
      />
      <div>
        <ul className="flex ml-auto items-center">
          {!authStatus && unauthenticatedNavItems.map((item) => (
            <li key={item.name}>
              <button
                onClick={() => navigate(item.slug)}
                className="inline-block px-4 py-2 duration-200 hover:bg-[#ff7a7a] rounded-full font-semibold text-[#1e1e1e]"
              >
                {item.name}
              </button>
            </li>
          ))}

          {authStatus && (
            <>
              {authenticatedNavItems.map((item) => (
                <li
                  key={item.name}
                  className="relative"
                  // FIX: Use the new handlers
                  onMouseEnter={() => handleMouseEnter(item.type)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-4 py-2 duration-200 hover:bg-[#ff7a7a] rounded-full font-semibold text-[#1e1e1e]"
                  >
                    {item.name}
                  </button>
                  {hoveredItem === item.type && (
                    <HoverOverview
                      movies={item.movies}
                      listType={item.type}
                      isLoading={isLoading}
                    />
                  )}
                </li>
              ))}
              <li>
                <button
                  onClick={logoutHandler}
                  className="inline-block px-4 py-2 duration-200 hover:bg-[#ff7a7a] rounded-full font-semibold text-[#1e1e1e]"
                >
                  Logout
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

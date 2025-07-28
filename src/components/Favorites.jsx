import  { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import databaseService from "../appwrite/databaseService";
import { searchById } from "../api/tmdb";
import MovieCard from "./MovieCard";


function Favorites() {
  const userData = useSelector((state) => state.auth.user);
  const authStatus = useSelector((state) => state.auth.userLoggedIn);
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    if (authStatus && userData) {
      setIsLoading(true);

      databaseService
        .getUserProfile(userData.userId)
        .then((profile) => {
          if (profile) {
            if (profile.favorites && profile.favorites.length > 0) {
              const favoritePromises = profile.favorites.map(id => searchById(id));
              Promise.all(favoritePromises).then(setMovies);
            } else {
              setMovies([]);
            }
          }
        })
        .catch((err) => console.log(err.message))
        .finally(() => setIsLoading(false));
    }
  }, [userData, authStatus]);
  return (
    <div className="flex flex-wrap justify-center gap-3 px-4 mt-5">
      {!userData ? (
        <div className="flex w-screen h-screen justify-center items-center">
          <p className="text-white text-center mt-10 text-xl">Login to see watchlist...</p>
        </div>
      ) : movies?.length > 0 ? (
        movies.map((mov, idx) => (
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

export default Favorites;

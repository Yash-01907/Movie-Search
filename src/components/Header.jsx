import  {  useState } from "react";
import { customMovieSearch } from "../api/tmdb";
import { useDispatch } from "react-redux";
import { addData } from "../slice/movieDataSlice";
import { Link } from "react-router";


function Header() {
  const dispatch = useDispatch();
  const [movieSearch, setMovieSearch] = useState("");
  const searchMovie = async function (e) {
    if (e.key === "Enter") {
      dispatch(addData(null))
      const data = await customMovieSearch(movieSearch);
      dispatch(addData(data.results))
      // console.log(...data.results);
    }
  };

  return (
    <nav className="flex px-5 py-10 justify-between bg-[#ff4f4f] h-20 items-center ">
      <Link to={"/"}>
      <div className="text-white font-bold text-3xl cursor-pointer">Movies</div>
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
      <div>Services</div>
    </nav>
  );
}

export default Header;

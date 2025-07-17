import React, { useEffect, useState } from "react";
import { customMovieSearch } from "../api/tmdb";
function Header() {
  const [movieSearch, setMovieSearch] = useState("");
  const searchMovie = async function (e) {
    if(e.key==="Enter"){
      const data = await customMovieSearch(movieSearch)
      console.log(data)
    }
    
  };

  return (
    <nav className="flex justify-between bg-[#ff4f4f] h-20 items-center ">
      <div>Movies</div>
      <input
        className="border-2 rounded-full px-5 w-[30%] text-2xl"
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

import React, { useEffect, useState } from "react";

function Header() {
  const [movieSearch, setMovieSearch] = useState("");
  const searchMovie = function (e) {
    if(e.key==="Enter")
    console.log(movieSearch)
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

import config from "../../config";

async function customMovieSearch(moveiName) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${config.tmdbApiKey}`,
    },
  };

  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?&query=${moveiName}`,
    options
  );

  if (!res.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await res.json();
  return data;
}

export { customMovieSearch };

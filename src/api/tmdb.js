import config from "../../config";

async function customMovieSearch(moveiName) {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${config.tmdbApiKey}`,
    },
  };

  fetch(
    `https://api.themoviedb.org/3/search/movie?&query=${moveiName}`,
    options
  )
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}

export { customMovieSearch };

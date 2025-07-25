import { Link } from "react-router";

function MovieCard({ movie }) {
  if (!movie || movie.length === 0) return;
  const { title, poster_path, vote_average, release_date, id } = movie;
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w500${poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <Link to={`/movie/${id}`}>
      <div className="w-52 rounded-xl overflow-hidden shadow-lg bg-white hover:scale-105 transition-transform duration-300 mt-2">
        <img src={posterUrl} alt={title} className="w-full h-72 object-cover" />
        <div className="p-3">
          <h3 className="text-md font-semibold truncate">{title}</h3>
          <p className="text-sm text-gray-600">
            ⭐ {vote_average.toFixed(2)} | 📅{" "}
            {release_date ? release_date.substring(0, 4) : "NA"}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;

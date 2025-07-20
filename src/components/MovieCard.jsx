

function MovieCard({movie}) {
 
    if (!movie || movie.length === 0) return;
    const { title, poster_path, vote_average, release_date } = movie;
    const posterUrl = poster_path
      ? `https://image.tmdb.org/t/p/w500${poster_path}`
      : "https://via.placeholder.com/500x750?text=No+Image";

  return (
    <div className="w-48 rounded-xl overflow-hidden shadow-lg bg-white hover:scale-105 transition-transform duration-300 mt-2">
      <img src={posterUrl} alt={title} className="w-full h-72 object-cover" />
      <div className="p-3">
        <h3 className="text-md font-semibold truncate">{title}</h3>
        <p className="text-sm text-gray-600">
          ⭐ {vote_average.toFixed(2)} | 📅 {release_date}
        </p>
      </div>
    </div>
  );
}

export default MovieCard;

import React from "react";

// In a real app, this data would come from an API call via props or state
const movieData = {
      "adult": false,
      "backdrop_path": "/mljnZyk8gwO2YH9EDC5SMy4XgeP.jpg",
      "genre_ids": [
        18,
        14
      ],
      "id": 1295181,
      "original_language": "it",
      "original_title": "Avatar",
      "overview": "Based on Théophile Gautier's novel of the same name, the film tells of the tragic love affair of Ottavio de Saville. He falls madly in love with Madame Prascovie Labinska, a woman very faithful to her husband, the Polish count Olaf Labinski. Alarmed by the growing physical and mental weariness of the desperate young man, his relatives and friends decide to turn to Doctor Balthazar, who has just returned from a trip to the Indies where he was initiated into the secrets of Brahman.",
      "popularity": 0.3399,
      "poster_path": "/nUTlHxnwomoIwojD0AF0OMzkonw.jpg",
      "release_date": "1916-03-06",
      "title": "Avatar",
      "video": false,
      "vote_average": 4.844,
      "vote_count": 16
    }

// NOTE: In a real app, you would fetch this genre list from the TMDb API
// endpoint: /genre/movie/list
const genreMap = {
  18: "Drama",
  14: "Fantasy",
  28: "Action",
  12: "Adventure",
  878: "Science Fiction",
};

function MovieDetailPage() {
  const backdropUrl = `https://image.tmdb.org/t/p/original${movieData.backdrop_path}`;
  const posterUrl = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`;

  return (
    // Main container with dynamic backdrop image
    <div
      style={{ backgroundImage: `url(${backdropUrl})` }}
      className="bg-cover bg-center min-h-screen"
    >
      {/* Dark overlay for better text readability */}
      <div className="bg-black/60 min-h-screen flex items-center justify-center p-4 md:p-8">
        
        {/* Content Card */}
        <div className="max-w-6xl w-full flex flex-col md:flex-row bg-black/50 backdrop-blur-lg rounded-xl overflow-hidden shadow-2xl">
          
          {/* Left Side: Poster Image */}
          <div className="w-full md:w-1/3">
            <img
              src={posterUrl}
              alt={`${movieData.title} Poster`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side: Movie Details */}
          <div className="w-full md:w-2/3 p-6 md:p-8 text-white flex flex-col">
            <h1 className="text-4xl md:text-5xl font-bold mb-2">{movieData.title}</h1>
            
            {/* Stats: Rating and Year */}
            <div className="flex items-center space-x-4 text-gray-300 mb-4">
              <span className="flex items-center">
                ⭐ {movieData.vote_average.toFixed(1)}
              </span>
              <span>|</span>
              <span>{new Date(movieData.release_date).getFullYear()}</span>
              <span>|</span>
              <span className="uppercase font-semibold">{movieData.original_language}</span>
            </div>

            {/* Genres */}
            <div className="flex flex-wrap gap-2 mb-6">
              {movieData.genre_ids.map((id) => (
                <span key={id} className="bg-white/10 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {genreMap[id] || "Unknown Genre"}
                </span>
              ))}
            </div>

            {/* Overview */}
            <div className="flex-grow">
              <h2 className="text-2xl font-semibold mb-2">Overview</h2>
              <p className="text-gray-300 leading-relaxed">
                {movieData.overview}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieDetailPage;